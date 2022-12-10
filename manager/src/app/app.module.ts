import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManagerHeaderComponent } from './manager-header/manager-header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { ManagerListingsComponent } from './manager-listings/manager-listings.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http"
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    ManagerHeaderComponent,
    ManagerNavComponent,
    ManagerListingsComponent,
    FileUploaderComponent
  ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        MatInputModule,
        HttpClientModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
