import { Router } from 'express';

import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const UsersRouter = Router();

const upload = multer(uploadConfig);

interface ResponseUserDTO {
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  id: string;
}
UsersRouter.post('/', async (request, response) => {
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

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    return response.json();
  },
);
export default UsersRouter;
