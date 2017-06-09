import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../register/register.service";
import { FormGroup } from "@angular/forms/forms";
import { RegistrationDTO } from "app/register/registrationDTO.model";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

 onSubmit(regDTO: RegistrationDTO, form: FormGroup)
  {
    form.reset();
    this.registerService.register(regDTO).subscribe(x => console.log(x));
  }
  
}
