import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public status = true;

  constructor(private formbuilder: FormBuilder, private authService: AuthenticateService, private router: Router) { }

  loginForm = this.formbuilder.group(
    {
      Email: ['', [Validators.email, Validators.required]],
      Password: ['' , [Validators.minLength(8), Validators.required]]
    }
  )


  ngOnInit(): void {

  }

  submitForm() {
    console.log(this.loginForm.value);
    this.authService.getLoginUser(this.loginForm.value)
    .subscribe((resp: any) => {
      console.log(resp);
      this.status=true;
      this.authService.setToken(resp.token); 
      this.router.navigate(['/'])
    }, (err) => {
      this.status=false;
    })
  }

}

