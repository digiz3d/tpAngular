import { Component, OnInit } from '@angular/core';
import { BankUser } from '../models/BankUser';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  bankUser:BankUser = new BankUser();
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.bankUser);
  }
}
