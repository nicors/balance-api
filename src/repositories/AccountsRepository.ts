import Account from '../models/Account';



class AccountsRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];


  }

  public getBalanceByAccountId(account_id: number) {
    const account: Account = this.accounts.filter((account: Account) => {
      if (account.id === account_id) {
        return account;
      }
    });

    const balance = account.amount;

    return balance;
  }

  public accountEvent({ id, type, amount }): Account {
    const account = new Account({ id, type, amount });
    this.accounts.push(account);

    return account;
  }
}

export default AccountsRepository;
