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
  account: BankAccount;
  transactions: BankTransaction[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.account = new BankAccount(params['id'], "", 0, "");
      this.http.get('/api/transactions/' + this.account.id).subscribe(data => {
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
    console.log("addTransaction");
    console.log(transaction);
    this.transactions.push(transaction);
  }
}
