

class Account {
  id: number;

  amount: number;

  constructor({ id, amount = 0 }: Account) {
    this.id = id;
    this.amount = amount;
  }
}

export default Account;
