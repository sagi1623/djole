import { Component, OnInit, NgZone } from '@angular/core';
import { UserStatusProviderService } from "./userStatusProvider.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationHandlerService } from "./notificationHandler.service";
import { Accommodation } from "./accommodation/accommodation.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService, private notificator: NotificationHandlerService, private ngZone: NgZone)
  {

  }

  ngOnInit()
  {
    this.subscribeForNotifications ();
    this.router.navigate(['/home']);
  }

    private subscribeForNotifications () {
    this.notificator.accommodationAddedNotification.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: Accommodation) {
      this.ngZone.run(() => { 
       alert('Accommodation is added.');  
      });  
  }


  isUserLoggedIn():boolean
  {
    return this.userStatusProviderService.isUserLoggedIn();
  }

}
