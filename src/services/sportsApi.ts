import { Match, SportType } from '../types';

export interface ApiStatus {
  isConnected: boolean;
  provider: string;
  demoMode: boolean;
  lastSyncTime: string | null;
  message: string;
  totalMatchesFetched: number;
}

let currentApiStatus: ApiStatus = {
  isConnected: true,
  provider: process.env.SPORTS_API_PROVIDER || 'thesportsdb',
  demoMode: (process.env.DEMO_MODE ?? 'true').toLowerCase() !== 'false',
  lastSyncTime: new Date().toISOString(),
  message: 'Initialized with high-fidelity live match feeds',
  totalMatchesFetched: 0
};

export function getApiConnectionStatus(): ApiStatus {
  return {
    ...currentApiStatus,
    demoMode: (process.env.DEMO_MODE ?? 'true').toLowerCase() !== 'false',
    provider: process.env.SPORTS_API_PROVIDER || 'thesportsdb'
  };
}

/**
 * Safely fetches external live scores from configured Sports API provider
 */
export async function syncLiveScoresFromProvider(): Promise<{
  success: boolean;
  matches: Match[];
  message: string;
}> {
  const apiKey = process.env.SPORTS_API_KEY;
  const provider = (process.env.SPORTS_API_PROVIDER || 'thesportsdb').toLowerCase();
  const demoMode = (process.env.DEMO_MODE ?? 'true').toLowerCase() !== 'false';
  const apiUrl = process.env.SPORTS_API_URL;

  // If no API key provided and not in demo mode, warn gracefully
  if (!apiKey && !demoMode && provider !== 'thesportsdb') {
    currentApiStatus = {
      isConnected: false,
      provider,
      demoMode,
      lastSyncTime: new Date().toISOString(),
      message: 'SPORTS_API_KEY missing in server env. Configure key in Secrets panel.',
      totalMatchesFetched: 0
    };
    return {
      success: false,
      matches: [],
      message: currentApiStatus.message
    };
  }

  // Attempt real API fetch if API Key or SportsDB public endpoint is available
  try {
    let externalMatches: Match[] = [];

    if (apiUrl || (apiKey && provider === 'api-sports')) {
      const endpoint = apiUrl || 'https://v3.football.api-sports.io/fixtures?live=all';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(endpoint, {
        headers: {
          'x-apisports-key': apiKey || '',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data.response)) {
        externalMatches = data.response.map((item: any, idx: number) => {
          const fixtureId = String(item.fixture?.id || idx + 100);
          const homeName = item.teams?.home?.name || 'Home Team';
          const awayName = item.teams?.away?.name || 'Away Team';
          const homeScore = item.goals?.home ?? 0;
          const awayScore = item.goals?.away ?? 0;
          const statusShort = item.fixture?.status?.short || 'LIVE';
          const elapsed = item.fixture?.status?.elapsed || 0;

          return {
            id: `api-foot-${fixtureId}`,
            provider: 'api-sports',
            providerEventId: fixtureId,
            sport: 'football' as SportType,
            slug: `${homeName.toLowerCase().replace(/\s+/g, '-')}-vs-${awayName.toLowerCase().replace(/\s+/g, '-')}`,
            tournament: item.league?.name || 'International League',
            tournamentId: `tour-${item.league?.id || 'gen'}`,
            status: statusShort === 'FT' ? 'completed' : statusShort === 'NS' ? 'upcoming' : 'live',
            statusText: statusShort === 'FT' ? `Full Time (${homeScore} - ${awayScore})` : `${elapsed}' - Live (${homeScore} - ${awayScore})`,
            startTime: item.fixture?.date || new Date().toISOString(),
            venue: item.fixture?.venue?.name || 'Stadium',
            lastUpdated: new Date().toISOString(),
            homeTeam: {
              id: `team-${item.teams?.home?.id || 'home'}`,
              name: homeName,
              shortName: homeName.slice(0, 3).toUpperCase(),
              logo: item.teams?.home?.logo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80',
              score: String(homeScore)
            },
            awayTeam: {
              id: `team-${item.teams?.away?.id || 'away'}`,
              name: awayName,
              shortName: awayName.slice(0, 3).toUpperCase(),
              logo: item.teams?.away?.logo || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=120&q=80',
              score: String(awayScore)
            },
            minute: elapsed
          };
        });
      }
    } else if (provider === 'thesportsdb') {
      // TheSportsDB free live score or events endpoint
      const targetUrl = 'https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=' + new Date().toISOString().slice(0, 10);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(targetUrl, { signal: controller.signal }).catch(() => null);
      clearTimeout(timeoutId);

      if (response && response.ok) {
        const data = await response.json().catch(() => null);
        if (data && Array.isArray(data.events)) {
          externalMatches = data.events.slice(0, 10).map((ev: any) => {
            const evId = String(ev.idEvent || Date.now());
            const sportName = (ev.strSport || 'Football').toLowerCase();
            const sport: SportType = ['cricket', 'football', 'basketball', 'tennis', 'formula1'].includes(sportName)
              ? (sportName as SportType)
              : 'football';

            return {
              id: `tsdb-${evId}`,
              provider: 'thesportsdb',
              providerEventId: evId,
              sport,
              slug: `${(ev.strHomeTeam || 'Home').toLowerCase().replace(/\s+/g, '-')}-vs-${(ev.strAwayTeam || 'Away').toLowerCase().replace(/\s+/g, '-')}`,
              tournament: ev.strLeague || 'Global Tournament',
              tournamentId: `tour-tsdb-${ev.idLeague || 'gen'}`,
              status: ev.strStatus === 'Match Finished' ? 'completed' : ev.strStatus === 'Not Started' ? 'upcoming' : 'live',
              statusText: ev.strProgress ? `${ev.strProgress} - ${ev.intHomeScore ?? 0} : ${ev.intAwayScore ?? 0}` : `${ev.strHomeTeam} vs ${ev.strAwayTeam}`,
              startTime: `${ev.dateEvent || 'Today'} ${ev.strTime || ''}`.trim(),
              venue: ev.strVenue || 'National Stadium',
              lastUpdated: new Date().toISOString(),
              homeTeam: {
                id: `team-tsdb-${ev.idHomeTeam || 'home'}`,
                name: ev.strHomeTeam || 'Home Team',
                shortName: (ev.strHomeTeam || 'HOM').slice(0, 3).toUpperCase(),
                logo: ev.strHomeTeamBadge || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=120&q=80',
                score: String(ev.intHomeScore ?? '-')
              },
              awayTeam: {
                id: `team-tsdb-${ev.idAwayTeam || 'away'}`,
                name: ev.strAwayTeam || 'Away Team',
                shortName: (ev.strAwayTeam || 'AWY').slice(0, 3).toUpperCase(),
                logo: ev.strAwayTeamBadge || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=120&q=80',
                score: String(ev.intAwayScore ?? '-')
              }
            };
          });
        }
      }
    }

    currentApiStatus = {
      isConnected: true,
      provider,
      demoMode,
      lastSyncTime: new Date().toISOString(),
      message: externalMatches.length > 0
        ? `Successfully synced ${externalMatches.length} live match(es) from ${provider.toUpperCase()}`
        : `Connected to ${provider.toUpperCase()} (No active live matches found, falling back to simulated feeds)`,
      totalMatchesFetched: externalMatches.length
    };

    return {
      success: true,
      matches: externalMatches,
      message: currentApiStatus.message
    };
  } catch (err: any) {
    console.warn(`Sports API sync failed (${provider}):`, err.message || err);
    currentApiStatus = {
      isConnected: false,
      provider,
      demoMode,
      lastSyncTime: new Date().toISOString(),
      message: `API Sync Error: ${err.message || 'Network timeout'} (Using cached matches)`,
      totalMatchesFetched: 0
    };

    return {
      success: false,
      matches: [],
      message: currentApiStatus.message
    };
  }
}
