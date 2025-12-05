import { Team } from './types';

export const GOOGLE_SHEET_CSV_URL = ''; // Put your published Google Sheet CSV URL here

export const TEAMS: Record<string, Team> = {
  ATL: { id: 'ATL', city: 'Atlanta', name: 'Hawks', abbrev: 'ATL', primaryColor: '#E03A3E', secondaryColor: '#C1D32F' },
  BOS: { id: 'BOS', city: 'Boston', name: 'Celtics', abbrev: 'BOS', primaryColor: '#007A33', secondaryColor: '#BA9653' },
  BKN: { id: 'BKN', city: 'Brooklyn', name: 'Nets', abbrev: 'BKN', primaryColor: '#000000', secondaryColor: '#FFFFFF' },
  CHA: { id: 'CHA', city: 'Charlotte', name: 'Hornets', abbrev: 'CHA', primaryColor: '#1D1160', secondaryColor: '#00788C' },
  CHI: { id: 'CHI', city: 'Chicago', name: 'Bulls', abbrev: 'CHI', primaryColor: '#CE1141', secondaryColor: '#000000' },
  CLE: { id: 'CLE', city: 'Cleveland', name: 'Cavaliers', abbrev: 'CLE', primaryColor: '#860038', secondaryColor: '#041E42' },
  DAL: { id: 'DAL', city: 'Dallas', name: 'Mavericks', abbrev: 'DAL', primaryColor: '#00538C', secondaryColor: '#B8C4CA' },
  DEN: { id: 'DEN', city: 'Denver', name: 'Nuggets', abbrev: 'DEN', primaryColor: '#0E2240', secondaryColor: '#FEC524' },
  DET: { id: 'DET', city: 'Detroit', name: 'Pistons', abbrev: 'DET', primaryColor: '#C8102E', secondaryColor: '#1D42BA' },
  GSW: { id: 'GSW', city: 'Golden State', name: 'Warriors', abbrev: 'GSW', primaryColor: '#1D428A', secondaryColor: '#FFC72C' },
  HOU: { id: 'HOU', city: 'Houston', name: 'Rockets', abbrev: 'HOU', primaryColor: '#CE1141', secondaryColor: '#000000' },
  IND: { id: 'IND', city: 'Indiana', name: 'Pacers', abbrev: 'IND', primaryColor: '#002D62', secondaryColor: '#FDBB30' },
  LAC: { id: 'LAC', city: 'LA', name: 'Clippers', abbrev: 'LAC', primaryColor: '#C8102E', secondaryColor: '#1D428A' },
  LAL: { id: 'LAL', city: 'Los Angeles', name: 'Lakers', abbrev: 'LAL', primaryColor: '#552583', secondaryColor: '#FDB927' },
  MEM: { id: 'MEM', city: 'Memphis', name: 'Grizzlies', abbrev: 'MEM', primaryColor: '#5D76A9', secondaryColor: '#12173F' },
  MIA: { id: 'MIA', city: 'Miami', name: 'Heat', abbrev: 'MIA', primaryColor: '#98002E', secondaryColor: '#F9A01B' },
  MIL: { id: 'MIL', city: 'Milwaukee', name: 'Bucks', abbrev: 'MIL', primaryColor: '#00471B', secondaryColor: '#EEE1C6' },
  MIN: { id: 'MIN', city: 'Minnesota', name: 'Timberwolves', abbrev: 'MIN', primaryColor: '#0C2340', secondaryColor: '#236192' },
  NOP: { id: 'NOP', city: 'New Orleans', name: 'Pelicans', abbrev: 'NOP', primaryColor: '#0C2340', secondaryColor: '#C8102E' },
  NYK: { id: 'NYK', city: 'New York', name: 'Knicks', abbrev: 'NYK', primaryColor: '#006BB6', secondaryColor: '#F58426' },
  OKC: { id: 'OKC', city: 'Oklahoma City', name: 'Thunder', abbrev: 'OKC', primaryColor: '#007AC1', secondaryColor: '#EF3B24' },
  ORL: { id: 'ORL', city: 'Orlando', name: 'Magic', abbrev: 'ORL', primaryColor: '#0077C0', secondaryColor: '#C4CED4' },
  PHI: { id: 'PHI', city: 'Philadelphia', name: '76ers', abbrev: 'PHI', primaryColor: '#006BB6', secondaryColor: '#ED174C' },
  PHX: { id: 'PHX', city: 'Phoenix', name: 'Suns', abbrev: 'PHX', primaryColor: '#1D1160', secondaryColor: '#E56020' },
  POR: { id: 'POR', city: 'Portland', name: 'Trail Blazers', abbrev: 'POR', primaryColor: '#E03A3E', secondaryColor: '#000000' },
  SAC: { id: 'SAC', city: 'Sacramento', name: 'Kings', abbrev: 'SAC', primaryColor: '#5A2D81', secondaryColor: '#63727A' },
  SAS: { id: 'SAS', city: 'San Antonio', name: 'Spurs', abbrev: 'SAS', primaryColor: '#C4CED4', secondaryColor: '#000000' },
  TOR: { id: 'TOR', city: 'Toronto', name: 'Raptors', abbrev: 'TOR', primaryColor: '#CE1141', secondaryColor: '#000000' },
  UTA: { id: 'UTA', city: 'Utah', name: 'Jazz', abbrev: 'UTA', primaryColor: '#002B5C', secondaryColor: '#00471B' },
  WAS: { id: 'WAS', city: 'Washington', name: 'Wizards', abbrev: 'WAS', primaryColor: '#002B5C', secondaryColor: '#E31837' },
};

export const YEARS = [2025, 2026, 2027, 2028, 2029, 2030, 2031];
