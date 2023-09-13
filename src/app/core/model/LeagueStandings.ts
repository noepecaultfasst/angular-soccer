import {Standing} from "./Standing";
import {League} from "./League";

export type LeagueStandings = {
  season: number
  standings: Standing[]
} & League
