export class BankAccount {
    id:number
    name:string;
    balance:number;
    idUser:number;

    constructor(id:number, name:string, balance:number, idUser:number) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.idUser = idUser;
    }
}