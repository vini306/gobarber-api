import { getRepository } from 'typeorm';
import User from '../models/Users';

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
      throw new Error('Email address already used.');
    }

    const user = await userRepository.create({
      name,
      password,
      email,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
