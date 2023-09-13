import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CountryLeaguesComponent} from './country-leagues/country-leagues.component';


@NgModule({
  declarations: [
    CountryLeaguesComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class StandingsModule {
}
