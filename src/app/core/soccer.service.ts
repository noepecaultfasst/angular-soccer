import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, shareReplay, tap} from "rxjs";
import {Country} from "./model/Country";

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
    this.http.get<Country[]>(`${this.baseUrl}/countries`, this.options).pipe(
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
}
