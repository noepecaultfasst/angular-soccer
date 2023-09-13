import {Standing} from "./Standing";
import {League} from "./League";

export interface LeagueStandings {
  id: number
  name: string
  logo: string
  season: number
  standings: Standing[]
}
