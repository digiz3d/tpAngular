export class BankAccount {
    id: string;
    name: string;
    value: number;
    owner: string;

    constructor(id: string, name: string, value: number, owner: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.owner = owner;
    }
}