

import { Router } from 'express';

import AccountsRepository from '../repositories/AccountsRepository';

const resetRouter = Router();

const accountsRepository = AccountsRepository.getInstance();

resetRouter.post('/', (request, response) => {
  try {

    const resetState = accountsRepository.resetAccounts();

    if (!resetState) {
      return response.status(404).send('0');
    }

    return response.status(200).send('OK');


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default resetRouter;
