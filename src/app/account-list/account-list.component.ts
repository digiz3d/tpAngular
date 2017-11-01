import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../models/BankAccount';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  bankAccounts:BankAccount[]= [
    new BankAccount(1, 'Compte courant', 8000, 69),
    new BankAccount(2, 'Compte PEL', 35000, 69),
    new BankAccount(3, 'Livret A', 2500, 69),
    new BankAccount(4, 'Compte pro suise', 15000, 69)
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
