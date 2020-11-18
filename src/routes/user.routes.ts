import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const AppointmentsRouter = Router();
interface ResponseUserDTO {
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  id: string;
}
AppointmentsRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    const newUser: ResponseUserDTO = { ...user };
    delete newUser.password;
    return response.json(newUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default AppointmentsRouter;
