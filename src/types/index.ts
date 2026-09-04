export type SportType = 'cricket' | 'football' | 'basketball' | 'tennis' | 'formula1';

export type MatchStatus = 'live' | 'upcoming' | 'completed';

export interface CricketBatter {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: number;
  dismissal?: string;
  isOut: boolean;
  isBattingNow?: boolean;
}

export interface CricketBowler {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  isBowlingNow?: boolean;
}

export interface CricketInnings {
  teamName: string;
  runs: number;
  wickets: number;
  overs: number;
  maxOvers: number;
  declared?: boolean;
  batting: CricketBatter[];
  bowling: CricketBowler[];
  fallOfWickets?: { wicket: number; score: number; over: string; player: string }[];
  partnerships?: { runs: number; balls: number; player1: string; player2: string }[];
}

export interface CommentaryBall {
  id: string;
  over: string;
  ball: number;
  runs: number;
  isWicket: boolean;
  isFour: boolean;
  isSix: boolean;
  text: string;
  timestamp: string;
}

export interface FootballEvent {
  id: string;
  minute: number;
  team: 'home' | 'away';
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var';
  player: string;
  detail?: string; // e.g. "Assist: De Bruyne" or "Off: Saka, On: Sterling"
}

export interface FootballLineupPlayer {
  number: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  isCaptain?: boolean;
}

export interface FootballLineups {
  homeFormation: string;
  awayFormation: string;
  homeStarting: FootballLineupPlayer[];
  awayStarting: FootballLineupPlayer[];
  homeSubs: FootballLineupPlayer[];
  awaySubs: FootballLineupPlayer[];
}

export interface FootballStats {
  possession: [number, number]; // [home, away] e.g. [58, 42]
  shotsOnTarget: [number, number];
  totalShots: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  passAccuracy: [number, number];
}

export interface Match {
  id: string;
  provider?: string; // e.g. "sports-api", "thesportsdb", "api-football", "demo"
  providerEventId?: string; // Provider's original match/event ID
  manualOverride?: boolean; // True if admin manually updated scores
  lastUpdated?: string; // ISO timestamp of last update
  isDemo?: boolean; // True if this is a demo match
  sport: SportType;
  slug: string;
  tournament: string;
  tournamentId: string;
  status: MatchStatus;
  statusText: string; // e.g. "IND need 24 runs in 18 balls" or "82' - Goal!" or "Full Time"
  startTime: string;
  venue: string;
  tossInfo?: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    score?: string; // Cricket "284/5 (48.2 ov)" or Football "2"
    runs?: number;
    wickets?: number;
    overs?: number;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    score?: string;
    runs?: number;
    wickets?: number;
    overs?: number;
  };
  currentInnings?: number;
  targetRuns?: number;
  runRate?: number;
  requiredRunRate?: number;
  // Football specific
  minute?: number;
  cricketData?: {
    innings: CricketInnings[];
    commentary: CommentaryBall[];
  };
  footballData?: {
    events: FootballEvent[];
    stats: FootballStats;
    lineups?: FootballLineups;
  };
  recentForm?: {
    home: ('W' | 'L' | 'D')[];
    away: ('W' | 'L' | 'D')[];
  };
  headToHead?: {
    homeWins: number;
    awayWins: number;
    draws: number;
    lastMatches: { date: string; winner: string; score: string }[];
  };
  predictionOptions?: {
    homeOption: string;
    awayOption: string;
    drawOption?: string;
  };
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  content: string;
  featuredImage: string;
  imageAlt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  category: 'Cricket' | 'Football' | 'Basketball' | 'Tennis' | 'Formula 1' | 'Transfers' | 'Analysis';
  tags: string[];
  sport: SportType;
  isBreaking?: boolean;
  relatedMatchId?: string;
  relatedTeamId?: string;
  viewsCount: number;
}

export interface BreakingNews {
  id: string;
  text: string;
  linkText?: string;
  linkUrl?: string;
  sport: SportType;
  timestamp: string;
}

export interface UserPrediction {
  id: string;
  matchId: string;
  matchTitle: string;
  predictedChoice: 'home' | 'away' | 'draw';
  predictedWinnerName: string;
  predictedAt: string;
  status: 'pending' | 'correct' | 'incorrect';
  pointsAwarded: number;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  totalPoints: number;
  dailyPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
  rank: number;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  sport: SportType;
  country: string;
  logo: string;
  bannerImage: string;
  description: string;
  coach: string;
  founded: string;
  homeGround: string;
  trophies: { year: string; name: string }[];
  squadIds: string[];
  stats: {
    matchesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
  };
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  sport: SportType;
  photo: string;
  teamId: string;
  teamName: string;
  nationality: string;
  position: string; // Batter / Fast Bowler / Midfielder / Forward / Point Guard
  age: number;
  bio: string;
  jerseyNumber?: number;
  careerStats: Record<string, string | number>;
  recentForm: string[];
}

export interface Tournament {
  id: string;
  slug: string;
  name: string;
  sport: SportType;
  season: string;
  logo: string;
  banner: string;
  description: string;
  standings: StandingsRow[];
  topPerformers?: {
    title: string;
    playerName: string;
    teamName: string;
    metric: string;
    photo: string;
  }[];
}

export interface StandingsRow {
  position: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  lost: number;
  drawn?: number;
  points: number;
  netRunRate?: string; // Cricket
  goalDifference?: number; // Football
  form: string[];
}

export interface AdPlacement {
  id: string;
  title: string;
  position: 'header_top' | 'sidebar' | 'in_feed' | 'footer_top' | 'match_detail';
  imageUrl: string;
  targetUrl: string;
  sponsorName: string;
  isActive: boolean;
}

export interface SEOConfig {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  twitterHandle: string;
  canonicalBase: string;
}

export interface SearchResult {
  type: 'news' | 'match' | 'team' | 'player' | 'tournament';
  id: string;
  title: string;
  subtitle: string;
  url: string;
  image?: string;
  badge?: string;
}
