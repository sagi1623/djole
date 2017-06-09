import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { RegionListComponent } from './region-list/region-list.component';
import { PlaceComponent } from './place/place.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationtypeComponent } from './accommodationtype/accommodationtype.component';
import { AccommodationtypeListComponent } from './accommodationtype-list/accommodationtype-list.component';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomreservationComponent } from './roomreservation/roomreservation.component';
import { RoomreservationListComponent } from './roomreservation-list/roomreservation-list.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';

const Routes = [
  {path:"countries", component: CountryListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryComponent,
    RegionComponent,
    RegionListComponent,
    PlaceComponent,
    PlaceListComponent,
    AccommodationComponent,
    AccommodationListComponent,
    AccommodationtypeComponent,
    AccommodationtypeListComponent,
    RoomComponent,
    RoomListComponent,
    RoomreservationComponent,
    RoomreservationListComponent,
    CommentComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
