export class BankTransaction {
    id: String;
    value: Number;
    message: String;
    date: Date;
    account: String;
    
    constructor(id: String, value: Number, message:String, date:Date, account: String) {
        this.id = id;
        this.value = value;
        this.message = message;
        this.date = date;
        this.account = account;
    }
}