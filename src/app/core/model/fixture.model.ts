import {League} from "./league.model";
import {Team} from "./team.model";

export interface Fixture {
    fixture: {
        id: number
        date: Date,
    }
    league: League
    teams: {
        home: Team & { winner: boolean }
        away: Team & { winner: boolean }
    }
    goals: {
        home: number
        away: number
    }
}
