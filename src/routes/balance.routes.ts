

import { Router } from 'express';

import AccountsRepository from '../repositories/AccountsRepository';

const balanceRouter = Router();

const accountsRepository = new AccountsRepository();

balanceRouter.get('/', (request, response) => {
  try {
    const { account_id } = request.query;
    const balance = accountsRepository.getBalanceByAccountId(account_id);

    return response.status(200).json(balance);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default balanceRouter;
