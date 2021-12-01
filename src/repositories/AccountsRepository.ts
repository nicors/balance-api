import Account from '../models/Account';



class AccountsRepository {
  private accounts: Account[];

  private static INSTANCE: AccountsRepository;

  constructor() {
    this.accounts = [];
  }

  public static getInstance(): AccountsRepository {
    if (!AccountsRepository.INSTANCE) {
      AccountsRepository.INSTANCE = new AccountsRepository();
    }

    return AccountsRepository.INSTANCE;
  }

  public getBalanceByAccountId(account_id: number) {
    const account: Account = this.accounts.find((account: Account) => {
      if (account.id == account_id) {
        return account;
      }
    });

    if (!account) {
      return false
    }

    const balance = account.amount;
    return balance;

  }

  public depositOnAccount(destination, amount) {
    let account: Account = this.accounts.find((account: Account) => {
      if (account.id == destination) {
        return account;
      }
    });

    if (!account) {
      account = this.create(destination)
    }

    account.amount += amount;

    return account;

  }

  public withdrawFromAccount(origin, amount) {
    const account: Account = this.accounts.find((account: Account) => {
      if (account.id == origin) {
        return account;
      }
    });

    if (!account) {
      return false
    }

    account.amount -= amount;

    return account;

  }

  public transfer(origin, amount, destination) {
    const originAccount: Account = this.accounts.find((account: Account) => {
      if (account.id == origin) {
        return account;
      }
    });

    let destinationAccount: Account = this.accounts.find((account: Account) => {
      if (account.id == destination) {
        return account;
      }
    });

    if (!originAccount) {
      return false
    }

    if (!destinationAccount) {
      destinationAccount = this.create(destination)
    }

    originAccount.amount -= amount;
    destinationAccount.amount += amount;

    return {"originAccount": originAccount, "destinationAccount": destinationAccount};

  }

  private create(destination: number): Account {
    const account = new Account({ id: destination });

    this.accounts.push(account);

    return account;
  }

  public resetAccounts() {
    this.accounts = [];

    return true;
  }
}

export default AccountsRepository;
