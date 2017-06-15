import { Component, OnInit } from '@angular/core';
import { LoginDTO } from "../login/loginDTO.model";
import { FormGroup } from "@angular/forms/forms";
import { LoginService } from "../login/login.service";
import { TokenParserService } from "../login/token-parser-service";
import { Router } from "@angular/router";
import { NotificationHandlerService } from "../notificationHandler.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService,TokenParserService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private tokenParserService: TokenParserService, private notificator: NotificationHandlerService, ) { }

  ngOnInit() {
  }

 onSubmit(loginDTO: LoginDTO, form: FormGroup)
  {
    form.reset();
    this.loginService.login(loginDTO).subscribe(x => { this.tokenParserService.parse(x); this.router.navigate(['/home']); this.notificator.connect(); }, x => alert('Failed to log in!'));
  }
}
