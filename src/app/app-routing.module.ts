import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryLeaguesComponent} from "./standings/country-leagues/country-leagues.component";
import {TeamDetailsComponent} from "./standings/team-details/team-details.component";
import {teamFixturesResolver} from "./shared/resolvers/team-fixtures.resolver";
import {NotFoundComponent} from "./shared/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: CountryLeaguesComponent
  },
  {
    path: "team/:id",
    component: TeamDetailsComponent,
    resolve: {
      fixtures: teamFixturesResolver
    }
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
