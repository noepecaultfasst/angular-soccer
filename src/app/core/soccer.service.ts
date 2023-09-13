import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, shareReplay, tap} from "rxjs";
import {Country} from "./model/country.model";
import {SoccerResponse} from "./model/soccer-reponse.model";
import {LeagueStandings} from "./model/league-standings.model";
import {Fixture} from "./model/fixture.model";

/**
 * Duration of the countries cache in seconds (we keep it for one hour)
 */
const CACHE_VALIDITY_DURATION: number = 3600;

@Injectable({
  providedIn: 'root'
})
export class SoccerService {
  private readonly baseUrl: string = "https://v3.football.api-spqsdq.fr"
  private readonly apiKey: string = "ea09f878d82ed46986e5b2b480010afd";
  private readonly options: { headers?: HttpHeaders } = {
    headers: new HttpHeaders({'x-rapidapi-key': this.apiKey})
  }

  countries$: Observable<Country[]> =
    this.http.get<SoccerResponse<Country[]>>(`${this.baseUrl}/countries`, this.options).pipe(
      map(call => call.response),
      tap(val => console.log(val)),
      shareReplay(1, CACHE_VALIDITY_DURATION * 1000),
      catchError(() => of([
          {
            "name": "England",
            "code": "GB",
            "flag": "https://media.api-sports.io/flags/gb.svg"
          },
          {
            "name": "Spain",
            "code": "ES",
            "flag": "https://media.api-sports.io/flags/es.svg"
          },
          {
            "name": "Germany",
            "code": "FR",
            "flag": "https://media.api-sports.io/flags/fr.svg"
          },
          {
            "name": "France",
            "code": "FR",
            "flag": "https://media.api-sports.io/flags/fr.svg"
          },
          {
            "name": "Italy",
            "code": "IT",
            "flag": "https://media.api-sports.io/flags/it.svg"
          }
        ]
      ))
    );

  constructor(private http: HttpClient) {
  }

  getCurrentLeagueStandings(leagueId: number): Observable<LeagueStandings> {
    return this.http.get<SoccerResponse<LeagueStandings[]>>(`${this.baseUrl}/standings`, {
        ...this.options,
        params: new HttpParams().set("league", leagueId).set("season", new Date().getUTCFullYear())
      }
    ).pipe(
      map(call => call.response[0]),
      tap(val => console.log(val)),
      catchError(_ => of({
        league: {
          id: 39,
          name: "Premiere Stub League",
          logo: "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg",
          season: 2023,
          standings: [[{
            rank: 1,
            team: {
              id: 0,
              name: "Sopra United",
              logo: "https://www.soprasteria.com/ResourcePackages/Bootstrap4/assets/dist/favicon/favicon-Corp.ico"
            },
            points: 10,
            goalsDiff: 6,
            all: {
              played: new Date().getSeconds(),
              win: 4,
              lose: 3,
              draw: 2
            }
          }]]
        }
      }))
    );
  }

  getTeamFixtures(leagueId: number, teamId: number): Observable<Fixture[]> {
    return this.http.get<SoccerResponse<Fixture[]>>(`${this.baseUrl}/fixtures`, {
      ...this.options,
      params: new HttpParams()
        .set("league", leagueId)
        .set("team", teamId)
        .set("season", new Date().getUTCFullYear())
        .set("status", "FT-AET-PEN")
    }).pipe(
      map(call => call.response),
      catchError(_ => of([{
        fixture: {
          id: 123453,
          timestamp: 16549872321
        },
        league: {
          id: 39,
          name: "Premier League",
          logo: "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        },
        teams: {
          home: {
            id: 0,
            name: "Sopra United",
            logo: "https://www.soprasteria.com/ResourcePackages/Bootstrap4/assets/dist/favicon/favicon-Corp.ico",
            winner: true
          },
          away: {
            id: 1,
            name: "Paris Saint-Gemini",
            logo: "https://prod.ucwe.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png",
            winner: false
          }
        },
        goals: {
          home: 6,
          away: 2
        }
      }]))
    );
  }
}
