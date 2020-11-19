import { Router } from 'express';

import AppointmentRouter from './appointments.routes';
import UserRouter from './user.routes';
import SessionsRouter from './session.routes';

const routes = Router();

routes.use('/appointments', AppointmentRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
