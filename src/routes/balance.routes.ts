

import { Router } from 'express';

import AccountsRepository from '../repositories/AccountsRepository';

const balanceRouter = Router();

const accountsRepository = AccountsRepository.getInstance();

balanceRouter.get('/', (request, response) => {
  try {
    const { account_id } = request.query;
    const balance = accountsRepository.getBalanceByAccountId(account_id);

    if (!balance) {
      return response.status(404).send('0');
    }

    return response.status(200).json(balance);


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default balanceRouter;
