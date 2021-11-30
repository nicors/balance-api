

import { Router } from 'express';
import balanceRouter from './balance.routes';

const routes = Router();

routes.use('/balance', balanceRouter);

export default routes;
