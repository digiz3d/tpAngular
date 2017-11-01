import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../models/BankAccount';
import { BankTransaction } from '../models/BankTransaction';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account:BankAccount;
  transactions:BankTransaction[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.account = new BankAccount(1, "default", 15000, 1);

    this.transactions = [
      new BankTransaction(1,  1300, 'September Pay',  new Date(), 1),
      new BankTransaction(2,  -150, 'Restaurant',     new Date(), 1),
      new BankTransaction(3,  1350, 'August Pay',     new Date(), 1),
      new BankTransaction(4,  1300, 'July Pay',       new Date(), 1)
    ];
  }
}
