import { Component, OnInit } from '@angular/core';
import { RegistrationDTO } from "../register/registrationDTO.model";
import { RegisterService } from "../register/register.service";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css'],
    providers: [RegisterService]
})
export class RegisterManagerComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

onSubmit(regDTO: RegistrationDTO, form: FormGroup)
  {
    form.reset();
    regDTO.Role = "Manager";
    this.registerService.register(regDTO).subscribe(x => console.log(x));
  }

}
