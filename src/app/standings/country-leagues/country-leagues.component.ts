import { Component } from '@angular/core';
import {SoccerService} from "../../core/soccer.service";
import {catchError, filter, map, Observable, of, tap} from "rxjs";
import {Country} from "../../core/model/Country";

@Component({
  selector: 'app-country-leagues',
  templateUrl: './country-leagues.component.html',
  styleUrls: ['./country-leagues.component.scss']
})
export class CountryLeaguesComponent {
  shownCountries: string[] = ["england", "spain", "germany", "france", "italy"];

  countries$: Observable<Country[]> = this.soccerService.countries$.pipe(
    tap(data => console.log(data)),
    map((countries: Country[]) => countries.filter(c => {
      return this.shownCountries.includes(c.name.toLowerCase());
    })),
  );

  constructor(private soccerService: SoccerService) { }
}
