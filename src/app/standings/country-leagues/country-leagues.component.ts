import {Component} from '@angular/core';
import {SoccerService} from "../../core/soccer.service";
import {
    BehaviorSubject, bufferCount, combineLatestAll, delay,
    distinctUntilChanged,
    map, mergeAll,
    Observable, of, share, shareReplay, startWith,
    switchMap, tap
} from "rxjs";
import {Country} from "../../core/model/country.model";
import {LeagueStandings} from "../../core/model/league-standings.model";
import {Team} from "../../core/model/team.model";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {combineLatestInit} from "rxjs/internal/observable/combineLatest";
import {Standing} from "../../core/model/standing.model";

@Component({
    selector: 'app-country-leagues',
    templateUrl: './country-leagues.component.html',
    styleUrls: ['./country-leagues.component.scss']
})
export class CountryLeaguesComponent {
    countries$: Observable<Country[]> = this.soccerService.countries$.pipe(
        map((countries: Country[]) => countries.filter(c => environment.shownCountries.includes(c.name.toLowerCase()))),
    );

    leagueStandings$: Observable<Standing[]>
    leagueId$: Observable<number>
    selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>("england");

    private distinctSelectedCountry$: Observable<string> = this.selectedCountry$.pipe(distinctUntilChanged());

    constructor(private router: Router, private soccerService: SoccerService) {
        this.leagueId$ = this.distinctSelectedCountry$.pipe(
            map(c => environment.countriesTopLeagues.get(c)!!),
            shareReplay(1)
        )

        this.leagueStandings$ = this.leagueId$.pipe(
            switchMap((c: number) =>
                this.soccerService.getCurrentLeagueStandings(c).pipe(
                    tap(val => console.log(val)),
                    map(result => result.standings),
                    startWith([]),
                )
            ));

        let routerState = router.getCurrentNavigation()?.extras.state
        if (routerState && routerState["country"]) {
            this.selectedCountry$.next(routerState["country"]);
        }
    }

    onSelectCountryClicked(country: Country) {
        this.selectedCountry$.next(country.name.toLowerCase());
    }

    onTeamClicked(team: Team) {
        this.leagueId$.subscribe(id => {
            console.log(this.selectedCountry$.value);
            this.router.navigate(["team", team.id], {
                queryParams: {
                    league: id
                },
                state: {
                    country: this.selectedCountry$.value
                }
            });
        });

    }
}
