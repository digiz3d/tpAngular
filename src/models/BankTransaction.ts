export class BankTransaction {
    id: string;
    value: number;
    message: string;
    date: Date;
    account: string;
    
    constructor(id: string, value: number, message: string, date: Date, account: string) {
        this.id = id;
        this.value = value;
        this.message = message;
        this.date = date;
        this.account = account;
    }
}