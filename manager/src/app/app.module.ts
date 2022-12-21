import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ManagerHeaderComponent } from './manager-header/manager-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { ManagerListingsComponent } from './manager-listings/manager-listings.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http"
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ListingsService} from "./services/listing/listing.service";

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
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatInputModule,
   ],
  providers: [ListingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
