import { Component, OnInit } from '@angular/core';
import { LoginDTO } from "../login/loginDTO.model";
import { FormGroup } from "@angular/forms/forms";
import { LoginService } from "../login/login.service";
import { TokenParserService } from "../login/token-parser-service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService,TokenParserService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private tokenParserService: TokenParserService ) { }

  ngOnInit() {
  }

 onSubmit(loginDTO: LoginDTO, form: FormGroup)
  {
    form.reset();
    this.loginService.login(loginDTO).subscribe(x =>  this.tokenParserService.parse(x));
  }
}
