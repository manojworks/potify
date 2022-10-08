import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManagerHeaderComponent } from './manager-header/manager-header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { ManagerListingsComponent } from './manager-listings/manager-listings.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagerHeaderComponent,
    ManagerNavComponent,
    ManagerListingsComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
