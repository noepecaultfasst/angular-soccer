import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class SharedModule {
}
