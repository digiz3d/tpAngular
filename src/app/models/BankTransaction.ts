export class BankTransaction {
    id:number;
    value:number;
    message:string;
    date:Date;
    idAccount:number;
    
    constructor(id:number,value:number,message:string,date:Date,idAccount:number) {
        this.id = id;
        this.value = value;
        this.message = message;
        this.date = date;
        this.idAccount = idAccount;
    }
}