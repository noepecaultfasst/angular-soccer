import { Component } from '@angular/core';
import {SoccerService} from "../../core/soccer.service";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Country} from "../../core/model/Country";

@Component({
  selector: 'app-country-leagues',
  templateUrl: './country-leagues.component.html',
  styleUrls: ['./country-leagues.component.scss']
})
export class CountryLeaguesComponent {
  countries$: Observable<Country[]> = this.soccerService.countries$.pipe(
    map((countries: Country[]) => countries.filter(c => this.shownCountries.includes(c.name.toLowerCase()))),
  );

  // Stub data for the exam but could be replaced by an Observable containing user preferences.
  private readonly shownCountries: string[] = ["england", "spain", "germany", "france", "italy"];
  private readonly selectedLeaguesByCountry: Map<string, number> = new Map([
    ["england", 39],
    ["spain", 140],
    ["germany", 78],
    ["france", 61],
    ["italy", 135],
  ]);

  private selectedCountry = new BehaviorSubject<Country | null>(null);

  constructor(private soccerService: SoccerService) {
    this.selectedCountry.subscribe(country => console.log(country));
  }

  onSelectCountryClicked(country: Country) {
    this.selectedCountry.next(country);
  }
}
