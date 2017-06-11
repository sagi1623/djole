import { Component } from '@angular/core';
import { UserStatusProviderService } from "./userStatusProvider.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private userStatusProviderService: UserStatusProviderService)
  {

  }

  isUserLoggedIn():boolean
  {
    return this.userStatusProviderService.isUserLoggedIn();
  }

}
