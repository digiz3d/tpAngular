import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from '../../models/BankAccount';
import { BankTransaction } from '../../models/BankTransaction';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account: BankAccount = new BankAccount("","", 0,"");
  transactions: BankTransaction[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.http.get('/api/accounts/' + params["id"]).subscribe(data => {
        this.account = new BankAccount(data["_id"], data["name"], data["value"], data["owner"]);
      });

      this.http.get('/api/transactions/' + params["id"]).subscribe(data => {
        let i = 0;
        while (data[i]) {
          this.transactions.push(new BankTransaction(
            data[i]['_id'],
            data[i]['value'],
            data[i]['message'],
            data[i]['date'],
            data[i]['account']
          ));
          i++;
        }
      });
    });
  }

  addTransaction(transaction:BankTransaction) {
    this.transactions.push(transaction);
    this.account.value += transaction.value;
  }
}
