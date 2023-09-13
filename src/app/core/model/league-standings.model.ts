import {Standing} from "./standing.model";

export interface LeagueStandings {
    league: {
        id: number
        name: string
        logo: string
        season: number
        standings: Standing[]
    }
}
