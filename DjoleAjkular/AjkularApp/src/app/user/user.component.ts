import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from "../user/user.model";
import { FormGroup } from "@angular/forms/forms";
import { UserListService } from "../user-list/user-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserListService, LocalStorageService]
})
export class UserComponent implements OnInit {

  @Input() user: User
   //@Output() onUserBanned: EventEmitter<User>;
   show: boolean;

  constructor(private userService: UserListService, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService)
  {
    //this.onUserBanned=new EventEmitter();
    
    this.show=false;
  }

  ngOnInit() { }

  bannUser()
  {
    if(this.userStatusProviderService.isUserAdmin())
    {
      this.user.Banned=true;
      this.userService.update(this.user).subscribe(x => console.log(x));
    }
  }

  shouldShowBann(): boolean
  {
    return (this.userStatusProviderService.isUserAdmin() && (!this.user.Banned));
  }

  isBanned(): boolean
  {
    return this.user.Banned;
  }
}
