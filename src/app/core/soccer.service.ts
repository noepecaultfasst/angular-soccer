import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, shareReplay} from "rxjs";
import {Country} from "./model/Country";
import {LeagueCountry} from "./model/LeagueCountry";
import {SoccerResponse} from "./model/SoccerReponse";
import {League} from "./model/League";

/**
 * Duration of the countries cache in seconds (we keep it for one hour)
 */
const CACHE_VALIDITY_DURATION: number = 3600;

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

  constructor(private http: HttpClient) { }

  getLeague(id: number): Observable<League> {
    return this.http.get<SoccerResponse<LeagueCountry>>(`${this.baseUrl}/leagues`,
      {
        ...this.options,
        params: new HttpParams().set("id", id)
      }
    ).pipe(
      map(leagueResponse => leagueResponse.league)
    );
  }
}
