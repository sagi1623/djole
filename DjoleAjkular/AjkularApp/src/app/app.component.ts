import { Component, OnInit } from '@angular/core';
import { UserStatusProviderService } from "./userStatusProvider.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';

  constructor(private router: Router,private userStatusProviderService: UserStatusProviderService)
  {

  }

  ngOnInit()
  {
    this.router.navigate(['/home']);
  }


  isUserLoggedIn():boolean
  {
    return this.userStatusProviderService.isUserLoggedIn();
  }

}
