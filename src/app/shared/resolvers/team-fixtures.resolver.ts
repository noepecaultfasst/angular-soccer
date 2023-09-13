import {ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {catchError, EMPTY, Observable} from "rxjs";
import {SoccerService} from "../../core/soccer.service";
import {Fixture} from "../../core/model/fixture.model";
import {environment} from "../../../environments/environment";

export const teamFixturesResolver: ResolveFn<Fixture[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router: Router = inject(Router),
  soccerService: SoccerService = inject(SoccerService)): Observable<Fixture[]> => {
  let teamIdStr: string | null = route.paramMap.get("id");
  let leagueIdStr: string | null = route.queryParamMap.get("league");

  if (leagueIdStr === null || teamIdStr === null || !/\d+/.test(teamIdStr) || !/\d+/.test(leagueIdStr)) {
    router.navigateByUrl("/notfound");
    return EMPTY;
  }

  let teamId = parseInt(teamIdStr);
  let leagueId = parseInt(leagueIdStr);

  if (![...environment.countriesTopLeagues.values()].includes(leagueId)) {
    console.log("Other leagues than top leagues are not supported. Use the home page to access team details");

    router.navigateByUrl("/");
    return EMPTY;
  }

  return soccerService.getTeamFixtures(leagueId, teamId).pipe(
    catchError(err => {
      console.log(`An error occurred when fetching team details from API.`)
      return EMPTY;
    })
  );
};
