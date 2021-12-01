

import { Router } from 'express';
import Account from '../models/Account';

import AccountsRepository from '../repositories/AccountsRepository';

const eventRouter = Router();

const accountsRepository = AccountsRepository.getInstance();

eventRouter.post('/', (request, response) => {
  try {
    const { type, destination, origin, amount } = request.body;
    let accountWithNewBalance: Account;
    switch (type) {
      case 'deposit':
        accountWithNewBalance = accountsRepository.depositOnAccount(destination, amount);

        if (!accountWithNewBalance) {
          return response.status(404).send('0');
        }

        return response.status(201).json({
          "destination": {
            "id": accountWithNewBalance.id,
            "balance": accountWithNewBalance.amount
          }
        });

      case 'withdraw':
        accountWithNewBalance = accountsRepository.withdrawFromAccount(origin, amount);

        if (!accountWithNewBalance) {
          return response.status(404).send('0');
        }

        return response.status(201).json({
          "origin": {
            "id": accountWithNewBalance.id,
            "balance": accountWithNewBalance.amount
          }
        });

      case 'transfer':
        const accountsWithNewBalances = accountsRepository.transfer(origin, amount, destination);

        if (!accountsWithNewBalances) {
          return response.status(404).send('0');
        }

        return response.status(201).json({
          "origin": {
            "id": accountsWithNewBalances.originAccount.id,
            "balance": accountsWithNewBalances.originAccount.amount
          },
          "destination": {
            "id": accountsWithNewBalances.destinationAccount.id,
            "balance": accountsWithNewBalances.destinationAccount.amount
          },
        });

    }


    const resetState = accountsRepository.resetAccounts();

    if (!resetState) {
      return response.status(404).send('0');
    }

    return response.status(200).send('OK');


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default eventRouter;
