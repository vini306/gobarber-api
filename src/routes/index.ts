import { Router } from 'express';

import AppointmentRouter from './appointments.routes';
import UserRouter from './user.routes';

const routes = Router();

routes.use('/appointments', AppointmentRouter);
routes.use('/users', UserRouter);

export default routes;
