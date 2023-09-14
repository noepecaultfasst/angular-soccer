import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, shareReplay} from "rxjs";
import {Country} from "./model/country.model";
import {SoccerResponse} from "./model/soccer-reponse.model";
import {LeagueStandings} from "./model/league-standings.model";
import {Fixture} from "./model/fixture.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SoccerService {
  private readonly options: { headers?: HttpHeaders } = {
    headers: new HttpHeaders({'x-rapidapi-key': environment.apiKey})
  }

  countries$: Observable<Country[]> =
    this.http.get<SoccerResponse<Country[]>>(`${environment.baseUrl}/countries`, this.options).pipe(
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
    return this.http.get<SoccerResponse<LeagueStandings[]>>(`${environment.baseUrl}/standings`, {
        ...this.options,
        params: new HttpParams().set("league", leagueId).set("season", new Date().getUTCFullYear())
      }
    ).pipe(
      map(call => call.response[0])
    );
  }

  getTeamFixtures(leagueId: number, teamId: number): Observable<Fixture[]> {
    return this.http.get<SoccerResponse<Fixture[]>>(`${environment.baseUrl}/fixtures`, {
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
