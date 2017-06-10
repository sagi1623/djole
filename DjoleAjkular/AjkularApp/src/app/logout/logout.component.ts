import { Component, OnInit } from '@angular/core';
import { LogOutService } from "../logout/logout.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogOutService]
})
export class LogoutComponent implements OnInit {

  constructor(private logOutService: LogOutService, private localStorageService: LocalStorageService ) { }

  ngOnInit() {
  }

 onSubmit()
  {
    this.logOutService.logout().subscribe(x =>  this.localStorageService.clear());
  }

}
