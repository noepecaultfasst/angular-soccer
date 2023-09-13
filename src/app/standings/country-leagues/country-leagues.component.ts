import { Component } from '@angular/core';
import {SoccerService} from "../../core/soccer.service";
import {
  BehaviorSubject,
  catchError,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  Observable,
  switchMap, tap
} from "rxjs";
import {Country} from "../../core/model/Country";
import {LeagueStandings} from "../../core/model/LeagueStandings";

@Component({
  selector: 'app-country-leagues',
  templateUrl: './country-leagues.component.html',
  styleUrls: ['./country-leagues.component.scss']
})
export class CountryLeaguesComponent {
  countries$: Observable<Country[]> = this.soccerService.countries$.pipe(
    map((countries: Country[]) => countries.filter(c => this.shownCountries.includes(c.name.toLowerCase()))),
  );

  leagueStandings$: Observable<LeagueStandings>

  // Stub data for the exam but could be replaced by an Observable containing user preferences.
  private readonly shownCountries: string[] = ["england", "spain", "germany", "france", "italy"];
  private readonly selectedLeaguesByCountry: Map<string, number> = new Map([
    ["england", 39],
    ["spain", 140],
    ["germany", 78],
    ["france", 61],
    ["italy", 135],
  ]);

  private selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>("england");
  private distinctSelectedCountry$: Observable<string> = this.selectedCountry$.pipe(distinctUntilChanged());

  constructor(private soccerService: SoccerService) {
    this.leagueStandings$ = this.distinctSelectedCountry$.pipe(
      map(c => this.selectedLeaguesByCountry.get(c)!!),
      switchMap((leagueId: number) => this.soccerService.getCurrentLeagueStandings(leagueId))
    )
  }

  onSelectCountryClicked(country: Country) {
    this.selectedCountry$.next(country.name.toLowerCase());
  }
}
