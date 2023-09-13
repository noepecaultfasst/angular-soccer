import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, shareReplay, tap} from "rxjs";
import {Country} from "./model/country.model";
import {SoccerResponse} from "./model/soccer-reponse.model";
import {LeagueStandings} from "./model/league-standings.model";
import {Fixture} from "./model/fixture.model";

@Injectable({
  providedIn: 'root'
})
export class SoccerService {
  private readonly baseUrl: string = "https://v3.football.api-sports.io"
  private readonly apiKey: string = "ea09f878d82ed46986e5b2b480010afd";
  private readonly options: { headers?: HttpHeaders } = {
    headers: new HttpHeaders({'x-rapidapi-key': this.apiKey})
  }

  countries$: Observable<Country[]> =
    this.http.get<SoccerResponse<Country[]>>(`${this.baseUrl}/countries`, this.options).pipe(
      map(call => call.response),
      shareReplay(1),
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

  constructor(private http: HttpClient) { }

  getCurrentLeagueStandings(leagueId: number): Observable<LeagueStandings> {
    return this.http.get<SoccerResponse<LeagueStandings[]>>(`${this.baseUrl}/standings`, {
        ...this.options,
        params: new HttpParams().set("league", leagueId).set("season", new Date().getUTCFullYear())
      }
    ).pipe(
      map(call => call.response[0])
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
      map(call => call.response)
    );
  }
}
