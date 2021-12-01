

import { Router } from 'express';
import balanceRouter from './balance.routes';
import resetRouter from './reset.routes';
import eventRouter from './event.routes';

const routes = Router();

routes.use('/balance', balanceRouter);
routes.use('/reset', resetRouter);
routes.use('/event', eventRouter);

export default routes;
