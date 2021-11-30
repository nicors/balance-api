

class Account {
  id: number;

  amount: number;

  constructor({ id, amount }: Account) {
    this.id = id;
    this.amount = amount;
  }
}

export default Account;
