import { Component, OnInit } from '@angular/core';
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userStatusProviderService: UserStatusProviderService) { }

  ngOnInit() { }

  shouldShowManagers(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

}
