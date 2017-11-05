import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../../models/BankAccount';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts:BankAccount[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/accounts').subscribe(data => {

      let i = 0;
      while(data[i]) {
        this.accounts.push(new BankAccount(
            data[i]['_id'],
            data[i]['name'],
            data[i]['value'],
            data[i]['owner']
        ));
        i++;
      }
      
    });
  }

}
