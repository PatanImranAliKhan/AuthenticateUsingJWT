import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private authService: AuthenticateService, private router: Router) {}

  ngOnInit(): void {
    if(this.authService.getToken() == "") {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.removeToken();
    window.location.reload()
  }
}
