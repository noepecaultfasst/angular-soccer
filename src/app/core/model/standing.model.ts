import {Team} from "./team.model";

export interface Standing {
    rank: number
    team: Team
    points: number
    goalsDiff: number
    all: {
        played: number
        win: number
        draw: number
        lose: number
    }
}
