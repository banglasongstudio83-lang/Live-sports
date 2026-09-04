import {
  Match,
  NewsArticle,
  BreakingNews,
  Team,
  Player,
  Tournament,
  LeaderboardUser,
  AdPlacement,
  SEOConfig
} from '../types';

export const INITIAL_SEO_CONFIG: SEOConfig = {
  siteName: 'SportPulse',
  defaultTitle: 'SportPulse - Multi-Sport Live Scores, News & Predictions',
  defaultDescription: 'Experience lightning-fast live sports scores, cricket scorecards, football stats, expert news analysis, and free virtual points predictions.',
  keywords: ['cricket live score', 'football live score', 't20 world cup', 'premier league', 'cricket news', 'football news', 'match predictions'],
  twitterHandle: '@SportPulseApp',
  canonicalBase: 'https://sportpulse-app.ai'
};

export const INITIAL_BREAKING_NEWS: BreakingNews[] = [
  {
    id: 'bn-1',
    text: 'CRICKET: India beat Australia by 6 wickets in dramatic final over at Eden Gardens!',
    linkText: 'Read Match Report',
    linkUrl: '/cricket/match/india-vs-australia-t20-final',
    sport: 'cricket',
    timestamp: '5 mins ago'
  },
  {
    id: 'bn-2',
    text: 'FOOTBALL: Declan Rice completes late comeback for Arsenal against Manchester City!',
    linkText: 'View Match Stats',
    linkUrl: '/football/match/arsenal-vs-man-city',
    sport: 'football',
    timestamp: '12 mins ago'
  },
  {
    id: 'bn-3',
    text: 'TRANSfers: Kylian Mbappé scores debut hat-trick in Champions League group stage.',
    linkText: 'Full Story',
    linkUrl: '/news/mbappe-champions-league-debut-hat-trick',
    sport: 'football',
    timestamp: '30 mins ago'
  },
  {
    id: 'bn-4',
    text: 'FORMULA 1: Max Verstappen secures pole position for Monaco Grand Prix with blistering lap.',
    linkText: 'Qualifying Results',
    linkUrl: '/formula1/monaco-gp',
    sport: 'formula1',
    timestamp: '1 hour ago'
  }
];

export const INITIAL_MATCHES: Match[] = [
  // Live Cricket Match 1
  {
    id: 'm-cric-1',
    provider: 'sports-api',
    providerEventId: 'eve-cric-100482',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'cricket',
    slug: 'india-vs-australia-t20-final',
    tournament: 'ICC T20 World Cup 2026',
    tournamentId: 'tour-cric-t20wc',
    status: 'live',
    statusText: 'India need 18 runs in 12 balls (Target 186)',
    startTime: 'Today, 19:00 IST',
    venue: 'Eden Gardens, Kolkata',
    tossInfo: 'India won the toss and elected to bowl first',
    currentInnings: 2,
    targetRuns: 186,
    runRate: 9.33,
    requiredRunRate: 9.00,
    homeTeam: {
      id: 'team-ind',
      name: 'India',
      shortName: 'IND',
      logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=120&q=80',
      score: '168/4 (18.0 ov)',
      runs: 168,
      wickets: 4,
      overs: 18.0
    },
    awayTeam: {
      id: 'team-aus',
      name: 'Australia',
      shortName: 'AUS',
      logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=120&q=80',
      score: '185/6 (20.0 ov)',
      runs: 185,
      wickets: 6,
      overs: 20.0
    },
    cricketData: {
      innings: [
        {
          teamName: 'Australia',
          runs: 185,
          wickets: 6,
          overs: 20,
          maxOvers: 20,
          batting: [
            { name: 'Travis Head', runs: 64, balls: 38, fours: 7, sixes: 3, sr: 168.4, isOut: true, dismissal: 'c Kohli b Bumrah' },
            { name: 'Mitchell Marsh', runs: 42, balls: 28, fours: 4, sixes: 2, sr: 150.0, isOut: true, dismissal: 'b Axar' },
            { name: 'Glenn Maxwell', runs: 35, balls: 18, fours: 2, sixes: 3, sr: 194.4, isOut: true, dismissal: 'c Hardik b Arshdeep' },
            { name: 'Marcus Stoinis', runs: 21, balls: 14, fours: 1, sixes: 1, sr: 150.0, isOut: false, isBattingNow: false }
          ],
          bowling: [
            { name: 'Jasprit Bumrah', overs: 4, maidens: 0, runs: 28, wickets: 3, economy: 7.00 },
            { name: 'Arshdeep Singh', overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
            { name: 'Hardik Pandya', overs: 4, maidens: 0, runs: 44, wickets: 0, economy: 11.00 },
            { name: 'Axar Patel', overs: 4, maidens: 0, runs: 31, wickets: 1, economy: 7.75 }
          ],
          fallOfWickets: [
            { wicket: 1, score: 72, over: '7.4', player: 'Mitchell Marsh' },
            { wicket: 2, score: 115, over: '12.1', player: 'Travis Head' },
            { wicket: 3, score: 158, over: '16.5', player: 'Glenn Maxwell' }
          ],
          partnerships: [
            { runs: 72, balls: 46, player1: 'Head', player2: 'Marsh' },
            { runs: 43, balls: 27, player1: 'Head', player2: 'Maxwell' }
          ]
        },
        {
          teamName: 'India',
          runs: 168,
          wickets: 4,
          overs: 18,
          maxOvers: 20,
          batting: [
            { name: 'Rohit Sharma', runs: 45, balls: 26, fours: 5, sixes: 3, sr: 173.0, isOut: true, dismissal: 'c Starc b Zampa' },
            { name: 'Yashasvi Jaiswal', runs: 28, balls: 19, fours: 4, sixes: 1, sr: 147.3, isOut: true, dismissal: 'b Hazlewood' },
            { name: 'Virat Kohli', runs: 58, balls: 39, fours: 6, sixes: 1, sr: 148.7, isOut: false, isBattingNow: true },
            { name: 'Suryakumar Yadav', runs: 18, balls: 11, fours: 2, sixes: 1, sr: 163.6, isOut: true, dismissal: 'c Head b Starc' },
            { name: 'Hardik Pandya', runs: 14, balls: 8, fours: 1, sixes: 1, sr: 175.0, isOut: false, isBattingNow: true }
          ],
          bowling: [
            { name: 'Mitchell Starc', overs: 3.4, maidens: 0, runs: 41, wickets: 1, economy: 11.18, isBowlingNow: true },
            { name: 'Josh Hazlewood', overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
            { name: 'Adam Zampa', overs: 4, maidens: 0, runs: 36, wickets: 2, economy: 9.00 }
          ],
          fallOfWickets: [
            { wicket: 1, score: 54, over: '5.2', player: 'Jaiswal' },
            { wicket: 2, score: 108, over: '11.4', player: 'Rohit' },
            { wicket: 3, score: 142, over: '15.3', player: 'Suryakumar' }
          ],
          partnerships: [
            { runs: 54, balls: 32, player1: 'Rohit', player2: 'Jaiswal' },
            { runs: 54, balls: 38, player1: 'Rohit', player2: 'Kohli' }
          ]
        }
      ],
      commentary: [
        { id: 'c1', over: '18.0', ball: 6, runs: 4, isWicket: false, isFour: true, isSix: false, text: 'FOUR! Dispatched through extra cover by Virat Kohli! Superb placement.', timestamp: '19:42' },
        { id: 'c2', over: '17.5', ball: 5, runs: 2, isWicket: false, isFour: false, isSix: false, text: 'Hardik flicks it towards deep midwicket, sharp running brings two runs.', timestamp: '19:41' },
        { id: 'c3', over: '17.4', ball: 4, runs: 6, isWicket: false, isFour: false, isSix: true, text: 'SIX! Massive blow over long-on by Hardik Pandya! Clean as a whistle.', timestamp: '19:40' },
        { id: 'c4', over: '17.3', ball: 3, runs: 1, isWicket: false, isFour: false, isSix: false, text: 'Kohli works it to fine leg for a quick single.', timestamp: '19:39' },
        { id: 'c5', over: '17.2', ball: 2, runs: 0, isWicket: false, isFour: false, isSix: false, text: 'Dot ball. Starc delivers a yorker outside off stump.', timestamp: '19:38' }
      ]
    },
    recentForm: { home: ['W', 'W', 'W', 'L', 'W'], away: ['W', 'L', 'W', 'W', 'W'] },
    headToHead: { homeWins: 18, awayWins: 14, draws: 1, lastMatches: [{ date: '2025-11-12', winner: 'India', score: 'IND won by 5 wkts' }] },
    predictionOptions: { homeOption: 'India Win', awayOption: 'Australia Win' }
  },

  // Live Cricket Match 2 - Bangladesh vs Pakistan
  {
    id: 'm-cric-2',
    provider: 'sports-api',
    providerEventId: 'eve-cric-100483',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'cricket',
    slug: 'bangladesh-vs-pakistan-asiacup',
    tournament: 'Asia Cup ODI Series',
    tournamentId: 'tour-cric-asiacup',
    status: 'live',
    statusText: 'Bangladesh 242/6 (46.4 ov) vs Pakistan',
    startTime: 'Today, 14:30 BDT',
    venue: 'Sher-e-Bangla Stadium, Dhaka',
    tossInfo: 'Bangladesh won toss and elected to bat',
    currentInnings: 1,
    runRate: 5.18,
    homeTeam: {
      id: 'team-ban',
      name: 'Bangladesh',
      shortName: 'BAN',
      logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=120&q=80',
      score: '242/6 (46.4 ov)',
      runs: 242,
      wickets: 6,
      overs: 46.4
    },
    awayTeam: {
      id: 'team-pak',
      name: 'Pakistan',
      shortName: 'PAK',
      logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=120&q=80',
      score: 'Yet to bat',
      runs: 0,
      wickets: 0,
      overs: 0
    },
    cricketData: {
      innings: [
        {
          teamName: 'Bangladesh',
          runs: 242,
          wickets: 6,
          overs: 46.4,
          maxOvers: 50,
          batting: [
            { name: 'Litton Das', runs: 74, balls: 82, fours: 8, sixes: 1, sr: 90.2, isOut: true, dismissal: 'c Rizwan b Shaheen' },
            { name: 'Shakib Al Hasan', runs: 52, balls: 61, fours: 5, sixes: 0, sr: 85.2, isOut: true, dismissal: 'lbw b Shadab' },
            { name: 'Towhid Hridoy', runs: 41, balls: 38, fours: 3, sixes: 1, sr: 107.8, isOut: false, isBattingNow: true },
            { name: 'Mahmudullah', runs: 28, balls: 24, fours: 2, sixes: 1, sr: 116.6, isOut: false, isBattingNow: true }
          ],
          bowling: [
            { name: 'Shaheen Afridi', overs: 9, maidens: 1, runs: 42, wickets: 2, economy: 4.66 },
            { name: 'Naseem Shah', overs: 9, maidens: 0, runs: 48, wickets: 2, economy: 5.33 },
            { name: 'Haris Rauf', overs: 8.4, maidens: 0, runs: 55, wickets: 1, economy: 6.34, isBowlingNow: true }
          ]
        }
      ],
      commentary: [
        { id: 'bc1', over: '46.4', ball: 4, runs: 1, isWicket: false, isFour: false, isSix: false, text: 'Hridoy pushes to deep cover for a single.', timestamp: '18:10' },
        { id: 'bc2', over: '46.3', ball: 3, runs: 4, isWicket: false, isFour: true, isSix: false, text: 'FOUR! Mahmudullah lofts over mid-on!', timestamp: '18:09' }
      ]
    },
    predictionOptions: { homeOption: 'Bangladesh Win', awayOption: 'Pakistan Win' }
  },

  // Live Football Match 1 - Arsenal vs Man City
  {
    id: 'm-foot-1',
    provider: 'api-sports',
    providerEventId: 'eve-foot-884012',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'football',
    slug: 'arsenal-vs-man-city',
    tournament: 'Premier League',
    tournamentId: 'tour-foot-epl',
    status: 'live',
    statusText: '78\' - Live (Arsenal leading 2-1)',
    startTime: 'Today, 16:30 GMT',
    venue: 'Emirates Stadium, London',
    minute: 78,
    homeTeam: {
      id: 'team-ars',
      name: 'Arsenal',
      shortName: 'ARS',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80',
      score: '2'
    },
    awayTeam: {
      id: 'team-mci',
      name: 'Manchester City',
      shortName: 'MCI',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=120&q=80',
      score: '1'
    },
    footballData: {
      events: [
        { id: 'fe1', minute: 14, team: 'away', type: 'goal', player: 'Erling Haaland', detail: 'Assist: Kevin De Bruyne' },
        { id: 'fe2', minute: 38, team: 'home', type: 'goal', player: 'Bukayo Saka', detail: 'Penalty kick scored' },
        { id: 'fe3', minute: 52, team: 'home', type: 'yellow_card', player: 'William Saliba', detail: 'Foul on Haaland' },
        { id: 'fe4', minute: 67, team: 'home', type: 'goal', player: 'Declan Rice', detail: 'Header from corner' },
        { id: 'fe5', minute: 72, team: 'away', type: 'substitution', player: 'Phil Foden', detail: 'Off: Jack Grealish, On: Phil Foden' }
      ],
      stats: {
        possession: [54, 46],
        shotsOnTarget: [6, 4],
        totalShots: [14, 11],
        corners: [7, 3],
        fouls: [9, 11],
        yellowCards: [2, 1],
        redCards: [0, 0],
        passAccuracy: [88, 86]
      },
      lineups: {
        homeFormation: '4-3-3',
        awayFormation: '4-1-4-1',
        homeStarting: [
          { number: 22, name: 'David Raya', position: 'GK' },
          { number: 4, name: 'Ben White', position: 'DEF' },
          { number: 2, name: 'William Saliba', position: 'DEF' },
          { number: 6, name: 'Gabriel Magalhães', position: 'DEF' },
          { number: 12, name: 'Jurriën Timber', position: 'DEF' },
          { number: 41, name: 'Declan Rice', position: 'MID' },
          { number: 8, name: 'Martin Ødegaard', position: 'MID', isCaptain: true },
          { number: 29, name: 'Kai Havertz', position: 'MID' },
          { number: 7, name: 'Bukayo Saka', position: 'FWD' },
          { number: 11, name: 'Gabriel Martinelli', position: 'FWD' },
          { number: 19, name: 'Leandro Trossard', position: 'FWD' }
        ],
        awayStarting: [
          { number: 31, name: 'Ederson', position: 'GK' },
          { number: 2, name: 'Kyle Walker', position: 'DEF', isCaptain: true },
          { number: 3, name: 'Rúben Dias', position: 'DEF' },
          { number: 25, name: 'Manuel Akanji', position: 'DEF' },
          { number: 24, name: 'Josko Gvardiol', position: 'DEF' },
          { number: 16, name: 'Rodri', position: 'MID' },
          { number: 17, name: 'Kevin De Bruyne', position: 'MID' },
          { number: 20, name: 'Bernardo Silva', position: 'MID' },
          { number: 26, name: 'Savinho', position: 'FWD' },
          { number: 10, name: 'Jack Grealish', position: 'FWD' },
          { number: 9, name: 'Erling Haaland', position: 'FWD' }
        ],
        homeSubs: [{ number: 9, name: 'Gabriel Jesus', position: 'FWD' }, { number: 5, name: 'Thomas Partey', position: 'MID' }],
        awaySubs: [{ number: 47, name: 'Phil Foden', position: 'FWD' }, { number: 8, name: 'Mateo Kovacic', position: 'MID' }]
      }
    },
    recentForm: { home: ['W', 'W', 'D', 'W', 'W'], away: ['W', 'W', 'W', 'L', 'D'] },
    headToHead: { homeWins: 10, awayWins: 16, draws: 8, lastMatches: [{ date: '2025-09-22', winner: 'Draw', score: '2-2' }] },
    predictionOptions: { homeOption: 'Arsenal Win', awayOption: 'Man City Win', drawOption: 'Draw' }
  },

  // Live Football Match 2 - Real Madrid vs Barcelona
  {
    id: 'm-foot-2',
    provider: 'api-sports',
    providerEventId: 'eve-foot-884013',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'football',
    slug: 'real-madrid-vs-barcelona-el-clasico',
    tournament: 'La Liga EA Sports',
    tournamentId: 'tour-foot-laliga',
    status: 'upcoming',
    statusText: 'Starts Today, 20:00 CET',
    startTime: 'Today, 20:00 CET',
    venue: 'Santiago Bernabéu, Madrid',
    homeTeam: {
      id: 'team-rma',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80'
    },
    awayTeam: {
      id: 'team-bar',
      name: 'FC Barcelona',
      shortName: 'BAR',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=120&q=80'
    },
    footballData: {
      events: [],
      stats: { possession: [50, 50], shotsOnTarget: [0, 0], totalShots: [0, 0], corners: [0, 0], fouls: [0, 0], yellowCards: [0, 0], redCards: [0, 0], passAccuracy: [0, 0] }
    },
    recentForm: { home: ['W', 'W', 'W', 'W', 'L'], away: ['W', 'W', 'W', 'D', 'W'] },
    headToHead: { homeWins: 105, awayWins: 100, draws: 52, lastMatches: [{ date: '2025-10-26', winner: 'Barcelona', score: '4-0' }] },
    predictionOptions: { homeOption: 'Real Madrid Win', awayOption: 'Barcelona Win', drawOption: 'Draw' }
  },

  // Completed Cricket Match
  {
    id: 'm-cric-3',
    provider: 'sports-api',
    providerEventId: 'eve-cric-100484',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'cricket',
    slug: 'england-vs-south-africa-1st-odi',
    tournament: 'International Bilateral ODI',
    tournamentId: 'tour-cric-bilateral',
    status: 'completed',
    statusText: 'England won by 34 runs',
    startTime: 'Yesterday',
    venue: 'The Oval, London',
    homeTeam: {
      id: 'team-eng',
      name: 'England',
      shortName: 'ENG',
      logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=120&q=80',
      score: '312/7 (50.0 ov)'
    },
    awayTeam: {
      id: 'team-sa',
      name: 'South Africa',
      shortName: 'RSA',
      logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=120&q=80',
      score: '278/10 (47.2 ov)'
    },
    predictionOptions: { homeOption: 'England Win', awayOption: 'South Africa Win' }
  },

  // Live Basketball Match
  {
    id: 'm-bask-1',
    provider: 'thesportsdb',
    providerEventId: 'eve-bask-50211',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'basketball',
    slug: 'lakers-vs-celtics',
    tournament: 'NBA regular season',
    tournamentId: 'tour-bask-nba',
    status: 'live',
    statusText: 'Q3 04:12 - Lakers leading 84-78',
    startTime: 'Today, 21:00 EST',
    venue: 'Crypto.com Arena, Los Angeles',
    homeTeam: {
      id: 'team-lal',
      name: 'LA Lakers',
      shortName: 'LAL',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=120&q=80',
      score: '84'
    },
    awayTeam: {
      id: 'team-bos',
      name: 'Boston Celtics',
      shortName: 'BOS',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=120&q=80',
      score: '78'
    },
    predictionOptions: { homeOption: 'Lakers Win', awayOption: 'Celtics Win' }
  },

  // Tennis Match
  {
    id: 'm-ten-1',
    provider: 'thesportsdb',
    providerEventId: 'eve-ten-99104',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'tennis',
    slug: 'djokovic-vs-alcaraz-wimbledon-final',
    tournament: 'Wimbledon Men\'s Singles Final',
    tournamentId: 'tour-ten-wim',
    status: 'upcoming',
    statusText: 'Tomorrow, 14:00 BST',
    startTime: 'Tomorrow, 14:00 BST',
    venue: 'Centre Court, Wimbledon',
    homeTeam: {
      id: 'player-djok',
      name: 'Novak Djokovic',
      shortName: 'DJO',
      logo: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=120&q=80'
    },
    awayTeam: {
      id: 'player-alca',
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
      logo: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=120&q=80'
    },
    predictionOptions: { homeOption: 'Djokovic Win', awayOption: 'Alcaraz Win' }
  },

  // Formula 1 Grand Prix
  {
    id: 'm-f1-1',
    provider: 'thesportsdb',
    providerEventId: 'eve-f1-77102',
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    sport: 'formula1',
    slug: 'monaco-grand-prix-2026',
    tournament: 'FIA Formula 1 World Championship',
    tournamentId: 'tour-f1-2026',
    status: 'upcoming',
    statusText: 'Sunday, 15:00 CEST (78 Laps)',
    startTime: 'Sunday, 15:00 CEST',
    venue: 'Circuit de Monaco, Monte Carlo',
    homeTeam: {
      id: 'f1-redbull',
      name: 'Red Bull Racing (Verstappen)',
      shortName: 'RBR',
      logo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=120&q=80'
    },
    awayTeam: {
      id: 'f1-ferrari',
      name: 'Scuderia Ferrari (Hamilton)',
      shortName: 'SF',
      logo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=120&q=80'
    },
    predictionOptions: { homeOption: 'Verstappen Win', awayOption: 'Hamilton Win' }
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'india-thrilling-victory-t20-world-cup-final',
    title: 'India Stun Australia in Last-Over Thriller to Reach T20 World Cup Summit',
    seoTitle: 'India vs Australia T20 World Cup Final Highlights & Report | SportPulse',
    metaDescription: 'Read the full match report of India vs Australia T20 World Cup final with ball-by-ball analysis, player statistics, and post-match reactions.',
    keywords: ['india vs australia', 't20 world cup', 'virat kohli', 'jasprit bumrah', 'cricket news'],
    excerpt: 'An extraordinary display of death bowling from Jasprit Bumrah and a composed half-century from Virat Kohli guided India to a sensational victory over Australia.',
    content: `
### An Unforgettable Final at Eden Gardens

Kolkata witnessed history as India held their nerve under immense pressure to secure a nail-biting win against Australia. Needing 18 runs off the final two overs, India's lower order delivered under floodlights before a packed crowd of 66,000 spectators.

#### Key Moments:
1. **Bumrah's Masterclass:** Jasprit Bumrah ended with figures of 3/28 in his 4 overs, conceding just 4 runs in the crucial 19th over.
2. **Kohli's Anchor Role:** Virat Kohli held the chase together with 58 off 39 balls, striking six boundaries and a towering six.
3. **Hardik's Finishing Touch:** Hardik Pandya dispatched Mitchell Starc for a huge six over long-on to seal the triumph.

> "We believed until the last ball. The atmosphere in Kolkata was electric, and this victory belongs to every passionate fan in India," said Indian captain Rohit Sharma in the post-match ceremony.

#### What Next?
India will now prepare for their upcoming Asia Cup campaign starting next month, while Australia look to regroup for their summer Test series against South Africa.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cricket stadium packed with cheering fans under lights',
    author: {
      name: 'Rohan Sen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'Senior Cricket Editor'
    },
    publishedAt: '2026-09-03T18:30:00Z',
    category: 'Cricket',
    tags: ['T20 World Cup', 'India Cricket', 'Match Report', 'Virat Kohli', 'Bumrah'],
    sport: 'cricket',
    isBreaking: true,
    relatedMatchId: 'm-cric-1',
    relatedTeamId: 'team-ind',
    viewsCount: 14250
  },
  {
    id: 'news-2',
    slug: 'arsenal-man-city-tactical-breakdown-premier-league',
    title: 'Tactical Analysis: How Mikel Arteta Outsmarted Pep Guardiola at Emirates Stadium',
    seoTitle: 'Arsenal 2-1 Man City Tactical Analysis & Match Breakdown | SportPulse',
    metaDescription: 'In-depth tactical analysis of Arsenal 2-1 Manchester City. Discover how Declan Rice and Bukayo Saka dominated the midfield and high press.',
    keywords: ['arsenal vs man city', 'mikel arteta', 'pep guardiola', 'tactical analysis', 'premier league'],
    excerpt: 'A masterclass in high pressing, mid-block discipline, and set-piece efficiency saw Arsenal edge past Manchester City in a high-stakes title clash.',
    content: `
### Arteta's Tactical Blueprint

The showdown at the Emirates Stadium proved to be a tactical chess match between student and master. Mikel Arteta deployed a dynamic 4-3-3 shape that morphed into a rigid 4-5-1 out of possession, suffocating Rodri and limiting Kevin De Bruyne's space in the final third.

#### Tactical Insights:
- **High Pressing Traps:** Arsenal forced Manchester City into 14 turnovers in their own half.
- **Set Piece Precision:** Declan Rice's winning header came from a meticulously rehearsed corner routine targeting City's zonal marking weak spot.
- **Saliba vs Haaland:** William Saliba limited Erling Haaland to just 22 touches throughout the 90 minutes.

This crucial victory puts Arsenal 3 points clear at the top of the Premier League table.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Football match stadium floodlights and pitch',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      role: 'Chief European Football Analyst'
    },
    publishedAt: '2026-09-03T16:00:00Z',
    category: 'Analysis',
    tags: ['Premier League', 'Arsenal', 'Man City', 'Tactics', 'Arteta'],
    sport: 'football',
    isBreaking: false,
    relatedMatchId: 'm-foot-1',
    relatedTeamId: 'team-ars',
    viewsCount: 9810
  },
  {
    id: 'news-3',
    slug: 'mbappe-champions-league-debut-hat-trick',
    title: 'Kylian Mbappé Hits Sensational Hat-Trick in Champions League Opener',
    seoTitle: 'Mbappe Hat-Trick Champions League Real Madrid News | SportPulse',
    metaDescription: 'Kylian Mbappe scores three brilliant goals for Real Madrid in their UEFA Champions League opening fixture.',
    keywords: ['mbappe', 'real madrid', 'champions league', 'hat trick', 'football news'],
    excerpt: 'The French superstar delivered a devastating performance to lead Real Madrid to a 4-1 victory over Borussia Dortmund.',
    content: `
Kylian Mbappé announced his arrival in European competition with Real Madrid in unforgettable fashion, netting a 22-minute hat-trick at the Santiago Bernabéu.

"Playing for this club in the Champions League is a dream come true every single time," Mbappé told reporters after collecting the match ball.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Real Madrid football stadium night match',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      role: 'Transfer & European Football Reporter'
    },
    publishedAt: '2026-09-02T21:15:00Z',
    category: 'Transfers',
    tags: ['Champions League', 'Real Madrid', 'Mbappe', 'Hat Trick'],
    sport: 'football',
    isBreaking: false,
    relatedTeamId: 'team-rma',
    viewsCount: 18920
  },
  {
    id: 'news-4',
    slug: 'asia-cup-bangladesh-pakistan-preview',
    title: 'Asia Cup ODI: Shakib and Hridoy Steady Bangladesh Against Pakistan Attack',
    seoTitle: 'Bangladesh vs Pakistan Asia Cup ODI News & Live Coverage | SportPulse',
    metaDescription: 'Full preview and live updates from Dhaka as Bangladesh battle Pakistan in a pivotal Asia Cup group clash.',
    keywords: ['bangladesh cricket', 'pakistan cricket', 'asia cup', 'shakib al hasan', 'litton das'],
    excerpt: 'Litton Das struck a commanding 74 while Towhid Hridoy spearheaded the middle overs against Shaheen Afridi\'s pace attack.',
    content: `
A determined batting display at Sher-e-Bangla Stadium saw Bangladesh build a formidable score against a fiery Pakistan pace bowling trio.

Litton Das laid the foundation with an elegant 74 before Shakib Al Hasan and Towhid Hridoy consolidated during the spinners\' middle spell.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cricket pitch with stumps and green outfield',
    author: {
      name: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      role: 'South Asia Cricket Correspondent'
    },
    publishedAt: '2026-09-03T15:00:00Z',
    category: 'Cricket',
    tags: ['Asia Cup', 'Bangladesh', 'Pakistan', 'Litton Das', 'ODI'],
    sport: 'cricket',
    isBreaking: false,
    relatedMatchId: 'm-cric-2',
    relatedTeamId: 'team-ban',
    viewsCount: 8400
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-ind',
    slug: 'india-cricket-team',
    name: 'India Men\'s National Cricket Team',
    shortName: 'IND',
    sport: 'cricket',
    country: 'India',
    logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'The Indian national cricket team, governed by the Board of Control for Cricket in India (BCCI), is one of the world\'s premier multi-format cricket teams.',
    coach: 'Gautam Gambhir',
    founded: '1926',
    homeGround: 'Eden Gardens, Wankhede Stadium',
    trophies: [
      { year: '1983, 2011', name: 'ICC ODI World Cup Champions' },
      { year: '2007, 2024', name: 'ICC T20 World Cup Champions' },
      { year: '2002, 2013', name: 'ICC Champions Trophy' }
    ],
    squadIds: ['p-kohli', 'p-bumrah', 'p-rohit'],
    stats: { matchesPlayed: 1100, wins: 640, losses: 380, draws: 80, winRate: 58.2 }
  },
  {
    id: 'team-ars',
    slug: 'arsenal-fc',
    name: 'Arsenal Football Club',
    shortName: 'ARS',
    sport: 'football',
    country: 'England',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    description: 'Arsenal FC is an iconic English professional football club based in Islington, London. Known for its rich history, attacking philosophy, and Invincibles era.',
    coach: 'Mikel Arteta',
    founded: '1886',
    homeGround: 'Emirates Stadium, London',
    trophies: [
      { year: '13 Titles', name: 'English First Division / Premier League' },
      { year: '14 Titles', name: 'FA Cup Champions (Record)' },
      { year: '17 Titles', name: 'FA Community Shield' }
    ],
    squadIds: ['p-saka', 'p-rice', 'p-odegaard'],
    stats: { matchesPlayed: 3200, wins: 1850, losses: 720, draws: 630, winRate: 57.8 }
  },
  {
    id: 'team-ban',
    slug: 'bangladesh-cricket-team',
    name: 'Bangladesh National Cricket Team',
    shortName: 'BAN',
    sport: 'cricket',
    country: 'Bangladesh',
    logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'The Bangladesh national cricket team, known as The Tigers, is administered by the Bangladesh Cricket Board (BCB).',
    coach: 'Chandika Hathurusingha',
    founded: '1977',
    homeGround: 'Sher-e-Bangla National Cricket Stadium',
    trophies: [{ year: '1997', name: 'ICC Trophy Champions' }, { year: '2020', name: 'U19 World Cup Champions' }],
    squadIds: ['p-shakib', 'p-litton', 'p-mushfiq'],
    stats: { matchesPlayed: 430, wins: 162, losses: 245, draws: 23, winRate: 37.6 }
  },
  {
    id: 'team-rma',
    slug: 'real-madrid-cf',
    name: 'Real Madrid CF',
    shortName: 'RMA',
    sport: 'football',
    country: 'Spain',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    description: 'Real Madrid Club de Fútbol is the most successful club in European football history with 15 UEFA Champions League titles.',
    coach: 'Carlo Ancelotti',
    founded: '1902',
    homeGround: 'Santiago Bernabéu, Madrid',
    trophies: [{ year: '15 Titles', name: 'UEFA Champions League' }, { year: '36 Titles', name: 'La Liga Champions' }],
    squadIds: ['p-mbappe', 'p-vinicius', 'p-bellingham'],
    stats: { matchesPlayed: 3500, wins: 2200, losses: 700, draws: 600, winRate: 62.8 }
  }
];

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p-kohli',
    slug: 'virat-kohli',
    name: 'Virat Kohli',
    sport: 'cricket',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    teamId: 'team-ind',
    teamName: 'India',
    nationality: 'Indian',
    position: 'Top-order Batter',
    age: 37,
    bio: 'Virat Kohli is widely regarded as one of the greatest batsmen in the history of international cricket, holding numerous records in ODIs and Tests.',
    jerseyNumber: 18,
    careerStats: {
      'ODI Runs': 13848,
      'ODI Average': 58.67,
      'Test Runs': 8848,
      'T20I Runs': 4188,
      'Centuries': 80
    },
    recentForm: ['58*', '42', '112', '76', '14']
  },
  {
    id: 'p-saka',
    slug: 'bukayo-saka',
    name: 'Bukayo Saka',
    sport: 'football',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    teamId: 'team-ars',
    teamName: 'Arsenal FC',
    nationality: 'English',
    position: 'Right Winger',
    age: 24,
    bio: 'Bukayo Saka is Arsenal\'s star winger, recognized for his explosive pace, dribbling skill, tactical intelligence, and goalscoring consistency.',
    jerseyNumber: 7,
    careerStats: {
      'Appearances': 230,
      'Goals': 64,
      'Assists': 58,
      'Pass Accuracy': '84%'
    },
    recentForm: ['1 Goal', '1 Assist', '1 Goal', '2 Assists', '7.8 Rating']
  },
  {
    id: 'p-bumrah',
    slug: 'jasprit-bumrah',
    name: 'Jasprit Bumrah',
    sport: 'cricket',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    teamId: 'team-ind',
    teamName: 'India',
    nationality: 'Indian',
    position: 'Right-arm Fast Bowler',
    age: 32,
    bio: 'Jasprit Bumrah is India\'s premier pace bowler, famous for his orthodox slinging action, lethal yorkers, and unmatched death-overs control.',
    jerseyNumber: 93,
    careerStats: {
      'Test Wickets': 170,
      'ODI Wickets': 149,
      'T20I Wickets': 89,
      'Economy': 4.12
    },
    recentForm: ['3/28', '2/18', '4/32', '1/22', '5/45']
  },
  {
    id: 'p-mbappe',
    slug: 'kylian-mbappe',
    name: 'Kylian Mbappé',
    sport: 'football',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    teamId: 'team-rma',
    teamName: 'Real Madrid CF',
    nationality: 'French',
    position: 'Forward / Winger',
    age: 27,
    bio: 'Kylian Mbappé is a FIFA World Cup winner and one of the world\'s top footballers, renowned for his lightning speed and clinical finishing.',
    jerseyNumber: 9,
    careerStats: {
      'Career Goals': 310,
      'Assists': 135,
      'World Cup Goals': 12,
      'Hat-tricks': 18
    },
    recentForm: ['3 Goals', '1 Goal', '2 Goals', '1 Assist', '2 Goals']
  }
];

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'tour-cric-t20wc',
    slug: 'icc-t20-world-cup-2026',
    name: 'ICC Men\'s T20 World Cup 2026',
    sport: 'cricket',
    season: '2026',
    logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'The premier international T20 cricket championship featuring 20 nations competing across India & Sri Lanka.',
    standings: [
      { position: 1, teamId: 'team-ind', teamName: 'India', teamLogo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=100&q=80', played: 5, won: 5, lost: 0, points: 10, netRunRate: '+2.14', form: ['W', 'W', 'W', 'W', 'W'] },
      { position: 2, teamId: 'team-aus', teamName: 'Australia', teamLogo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=100&q=80', played: 5, won: 4, lost: 1, points: 8, netRunRate: '+1.45', form: ['W', 'L', 'W', 'W', 'W'] },
      { position: 3, teamId: 'team-eng', teamName: 'England', teamLogo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=100&q=80', played: 5, won: 3, lost: 2, points: 6, netRunRate: '+0.82', form: ['L', 'W', 'W', 'L', 'W'] },
      { position: 4, teamId: 'team-sa', teamName: 'South Africa', teamLogo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=100&q=80', played: 5, won: 2, lost: 3, points: 4, netRunRate: '-0.21', form: ['W', 'L', 'L', 'W', 'L'] }
    ],
    topPerformers: [
      { title: 'Top Run Scorer', playerName: 'Virat Kohli', teamName: 'India', metric: '298 Runs (Avg 74.5)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { title: 'Top Wicket Taker', playerName: 'Jasprit Bumrah', teamName: 'India', metric: '14 Wickets (Econ 5.8)', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'tour-foot-epl',
    slug: 'premier-league-2025-26',
    name: 'English Premier League',
    sport: 'football',
    season: '2025/26',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    description: 'The top tier of English football, recognized worldwide for its intensity, legendary clubs, and star talents.',
    standings: [
      { position: 1, teamId: 'team-ars', teamName: 'Arsenal', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=100&q=80', played: 28, won: 21, drawn: 5, lost: 2, points: 68, goalDifference: 42, form: ['W', 'W', 'D', 'W', 'W'] },
      { position: 2, teamId: 'team-mci', teamName: 'Manchester City', teamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=100&q=80', played: 28, won: 20, drawn: 5, lost: 3, points: 65, goalDifference: 38, form: ['W', 'W', 'W', 'L', 'D'] },
      { position: 3, teamId: 'team-liv', teamName: 'Liverpool', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=100&q=80', played: 28, won: 18, drawn: 7, lost: 3, points: 61, goalDifference: 31, form: ['W', 'D', 'W', 'W', 'L'] },
      { position: 4, teamId: 'team-che', teamName: 'Chelsea', teamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=100&q=80', played: 28, won: 16, drawn: 6, lost: 6, points: 54, goalDifference: 19, form: ['D', 'W', 'L', 'W', 'W'] }
    ],
    topPerformers: [
      { title: 'Top Scorer (Golden Boot)', playerName: 'Erling Haaland', teamName: 'Man City', metric: '24 Goals', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80' },
      { title: 'Playmaker (Most Assists)', playerName: 'Bukayo Saka', teamName: 'Arsenal', metric: '14 Assists', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: 'usr-1', username: 'CricketWizard_99', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', totalPoints: 1240, dailyPoints: 40, weeklyPoints: 190, monthlyPoints: 480, correctPredictions: 88, totalPredictions: 102, accuracy: 86.2, rank: 1 },
  { id: 'usr-2', username: 'PremierPredictor', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80', totalPoints: 1180, dailyPoints: 30, weeklyPoints: 160, monthlyPoints: 450, correctPredictions: 82, totalPredictions: 98, accuracy: 83.6, rank: 2 },
  { id: 'usr-3', username: 'TigerFan_Dhaka', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80', totalPoints: 1050, dailyPoints: 50, weeklyPoints: 210, monthlyPoints: 410, correctPredictions: 75, totalPredictions: 95, accuracy: 78.9, rank: 3 },
  { id: 'usr-4', username: 'TacticalMaster', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', totalPoints: 940, dailyPoints: 20, weeklyPoints: 120, monthlyPoints: 370, correctPredictions: 68, totalPredictions: 89, accuracy: 76.4, rank: 4 },
  { id: 'usr-5', username: 'ElClasicoGuru', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', totalPoints: 890, dailyPoints: 10, weeklyPoints: 140, monthlyPoints: 330, correctPredictions: 63, totalPredictions: 85, accuracy: 74.1, rank: 5 }
];

export const INITIAL_ADS: AdPlacement[] = [
  {
    id: 'ad-1',
    title: 'Official Sports Gear Sale - Up to 40% Off',
    position: 'header_top',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '#',
    sponsorName: 'ProSportsGear',
    isActive: true
  },
  {
    id: 'ad-2',
    title: 'Download SportPulse Mobile App - Live Alerts',
    position: 'sidebar',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80',
    targetUrl: '#',
    sponsorName: 'SportPulse App',
    isActive: true
  }
];
