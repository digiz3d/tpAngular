import { Component, OnInit } from '@angular/core';
import { BankUser } from '../models/BankUser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  bankUser:BankUser = new BankUser();
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('/api/login', {login: this.bankUser.login, password: this.bankUser.password}).subscribe(data => {
      //console.log("test");
      console.log(data);
    });
  }
}
