import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {UserListService} from './user-list.service';
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserListService]
})
export class UserListComponent implements OnInit {

   users: User[];

  constructor(private userService: UserListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.users=[];
  }

  ngOnInit()
  {
    if(this.userStatusProviderService.isUserAdmin())
    {
      this.userService.getAll().subscribe(x => this.users = x.json() as User[]);
    }
  }

  shouldShow(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
