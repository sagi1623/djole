import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../register/register.service";
import { FormGroup } from "@angular/forms/forms";
import { RegistrationDTO } from "../register/registrationDTO.model";
import { Router } from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
  }

 onSubmit(regDTO: RegistrationDTO, form: FormGroup)
  {
    form.reset();
    regDTO.Role = "AppUser";
    this.registerService.register(regDTO).subscribe(x => { console.log(x); this.router.navigate(['/home']); }, x => alert('Failed to register'));
  }
  
}
