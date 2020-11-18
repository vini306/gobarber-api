import { Router } from 'express';

import AppointmentRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', AppointmentRouter);

export default routes;
