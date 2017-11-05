export class BankAccount {
    id: String;
    name: String;
    value: Number;
    owner: String;

    constructor(id: String, name: String, value: Number, owner: String) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.owner = owner;
    }
}