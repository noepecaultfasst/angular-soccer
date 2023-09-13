import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CountryLeaguesComponent} from './country-leagues/country-leagues.component';
import {TeamDetailsComponent} from './team-details/team-details.component';
import {RouterLink} from "@angular/router";


@NgModule({
    declarations: [
        CountryLeaguesComponent,
        TeamDetailsComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        RouterLink
    ]
})
export class StandingsModule {
}
