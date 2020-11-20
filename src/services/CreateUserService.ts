import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, password, email }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);
    const checkIfExits = await userRepository.findOne({
      where: { email },
    });

    if (checkIfExits) {
      throw new AppError('Email address already used.');
    }
    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
