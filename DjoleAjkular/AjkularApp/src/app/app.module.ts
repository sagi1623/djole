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
import { CountryDetailedComponent } from './country-detailed/country-detailed.component';
import { AddRegionComponent } from './add-region/add-region.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { RegionDetailedComponent } from './region-detailed/region-detailed.component';
import { PlaceDetailedComponent } from './place-detailed/place-detailed.component';
import { AddAccommodationComponent } from './add-accommodation/add-accommodation.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { AddAccommodationtypeComponent } from './add-accommodationtype/add-accommodationtype.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { AddRoomreservationComponent } from './add-roomreservation/add-roomreservation.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AccommodationDetailedComponent } from './accommodation-detailed/accommodation-detailed.component';
import { AccommodationtypeDetailedComponent } from './accommodationtype-detailed/accommodationtype-detailed.component';
import { CommentDetailedComponent } from './comment-detailed/comment-detailed.component';
import { RoomDetailedComponent } from './room-detailed/room-detailed.component';
import { RoomreservationDetailedComponent } from './roomreservation-detailed/roomreservation-detailed.component';
import { LocalStorageService } from "./localStorage.service";
import { URLProviderService } from "./URLProvider.service";

const Routes = [
  {path:"countries", component: CountryListComponent},
  {path:"country-detailed/:Id", component: CountryDetailedComponent},
  {path:"regions", component: RegionListComponent},
  {path:"region-detailed/:Id", component: RegionDetailedComponent},
  {path:"places", component: PlaceListComponent},
  {path:"place-detailed/:Id", component: PlaceDetailedComponent},
  {path:"accommodations", component: AccommodationListComponent},
  {path:"accommodation-detailed/:Id", component: AccommodationDetailedComponent},
  {path:"accommodationtypes", component: AccommodationtypeListComponent},
  {path:"accommodationtype-detailed/:Id", component: AccommodationtypeDetailedComponent},
  {path:"rooms", component: RoomListComponent},
  {path:"room-detailed/:Id", component: RoomDetailedComponent},
  {path:"roomreservations", component: RoomreservationListComponent},
  {path:"roomreservation-detailed/:Id", component: RoomreservationDetailedComponent},
  {path:"comments", component: CommentListComponent},
  {path:"comment-detailed/:Id", component: CommentDetailedComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
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
    CommentListComponent,
    CountryDetailedComponent,
    AddRegionComponent,
    AddCountryComponent,
    EditCountryComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AddPlaceComponent,
    RegionDetailedComponent,
    PlaceDetailedComponent,
    AddAccommodationComponent,
    RegisterManagerComponent,
    AddAccommodationtypeComponent,
    AddRoomComponent,
    AddRoomreservationComponent,
    AddCommentComponent,
    AccommodationDetailedComponent,
    AccommodationtypeDetailedComponent,
    CommentDetailedComponent,
    RoomDetailedComponent,
    RoomreservationDetailedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [
    LocalStorageService,
    URLProviderService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
