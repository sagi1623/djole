import { Component, OnInit } from '@angular/core';
import { LogOutService } from "../logout/logout.service";
import { LocalStorageService } from "../localStorage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogOutService]
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private logOutService: LogOutService, private localStorageService: LocalStorageService ) { }

  ngOnInit() {
  }

  logMeOut()
  {
    this.logOutService.logout().subscribe(x => { this.localStorageService.clear(); this.router.navigate(['/home']); });
  }

}
