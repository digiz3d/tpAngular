import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BankAccount } from '../../models/BankAccount';
import { BankTransaction } from '../../models/BankTransaction';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  @Output() transactionAdded = new EventEmitter();

  account: BankAccount;
  transaction:BankTransaction = new BankTransaction("", 0, "", new Date(), "");

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.account = new BankAccount(params['id'], "", 0, "");
    });
  }

  onSubmit() {
    this.http.post('/api/transactions/'+this.account.id, {value: this.transaction.value, message: this.transaction.message}).subscribe(data => {
      if (data['success']) {
        console.log("transaction added !");
        this.transactionAdded.emit(data['transaction']);

        
      }
      else {
        console.log("transaction failed !");
      }
    });
  }
}
