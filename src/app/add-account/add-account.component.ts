import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from '../../models/BankAccount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  account:BankAccount;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.account = new BankAccount("","",0,"");
  }

  onSubmit() {
    this.http.post('/api/accounts', { value: this.account.value, name: this.account.name }).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['/account-list']);
      }
      else {
        alert("Account creation failed : "+ data["message"]);
      }
    });
  }
}
