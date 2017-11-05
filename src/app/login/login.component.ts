import { Component, OnInit } from '@angular/core';
import { BankUser } from '../../models/BankUser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bankUser:BankUser = new BankUser();

  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('/api/authenticate', {login: this.bankUser.login, password: this.bankUser.password}).subscribe(data => {
      console.log(data);
      if (data['success']) {
        this.router.navigate(['/account-list']);
      }
    });
  }
}
