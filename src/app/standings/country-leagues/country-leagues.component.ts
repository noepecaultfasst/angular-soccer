import {Component, OnDestroy, TrackByFunction} from '@angular/core';
import {SoccerService} from "../../core/soccer.service";
import {
  BehaviorSubject, catchError, distinctUntilChanged, map, Observable, of, shareReplay, startWith, Subscription,
  switchMap
} from "rxjs";
import {Country} from "../../core/model/country.model";
import {Team} from "../../core/model/team.model";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Standing} from "../../core/model/standing.model";

@Component({
  selector: 'app-country-leagues',
  templateUrl: './country-leagues.component.html',
  styleUrls: ['./country-leagues.component.scss']
})
export class CountryLeaguesComponent implements OnDestroy {
  countries$: Observable<Country[]> = this.soccerService.countries$.pipe(
    map((countries: Country[]) => countries.filter(c => environment.shownCountries.includes(c.name.toLowerCase()))),
  );

  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>("england");
  leagueStandings$: Observable<Standing[]>;
  standingError$: Observable<Error | null>;

  private leagueId$: Observable<number> = this.selectedCountry$.pipe(
    distinctUntilChanged(),
    map(c => environment.countriesTopLeagues.get(c)!!),
    shareReplay(1)
  );
  private leagueStandingsOrError$: Observable<Standing[] | Error>;

  private leagueId: number | null = null;
  private leagueIdSubscription: Subscription;

  constructor(private router: Router, private soccerService: SoccerService) {
    this.leagueIdSubscription = this.leagueId$.subscribe({
      next: id => this.leagueId = id
    });

    this.leagueStandingsOrError$ = this.leagueId$.pipe(
      switchMap((c: number) => {
          return this.soccerService.getCurrentLeagueStandings(c).pipe(
            map(result => result.league.standings[0]),
            startWith([]),
            catchError(_ => {
              return of(new Error("API call failed"));
            })
          );
        }
      ));

    this.leagueStandings$ = this.leagueStandingsOrError$.pipe(
      map(standings => (standings instanceof Error) ? [] : standings as Standing[])
    );

    this.standingError$ = this.leagueStandingsOrError$.pipe(
      map(error => (error instanceof Error) ? error : null)
    );

    let routerState = router.getCurrentNavigation()?.extras.state;
    if (routerState && routerState["country"]) {
      this.selectedCountry$.next(routerState["country"]);
    }
  }

  ngOnDestroy() {
      this.leagueIdSubscription.unsubscribe();
  }

  onSelectCountryClicked(country: Country) {
    this.selectedCountry$.next(country.name.toLowerCase());
  }

  onTeamClicked(team: Team) {
    if (!this.leagueId)
      return;

    this.router.navigate(["team", team.id], {
      queryParams: {
        league: this.leagueId
      },
      state: {
        country: this.selectedCountry$.value
      }
    });
  }

  standingTrackBy: TrackByFunction<Standing> = (index, standing) => {
    return standing.team.id;
  }
}
