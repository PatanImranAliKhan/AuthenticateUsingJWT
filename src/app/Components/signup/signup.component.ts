import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public status = true;

  public signupForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.minLength(8), Validators.required]],
    Username: ['', Validators.required],
    Mobile: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private authService: AuthenticateService, private router: Router){}

  register() {
    console.log(this.signupForm.value);
    this.authService.registerUser(this.signupForm.value)
    .subscribe((resp: any) =>{
      console.log(resp);
      if(resp.auth == false) {
        this.status=false;
        return
      }
      this.authService.setToken(resp.token);
      this.router.navigate(['/'])
    })
  }

}
