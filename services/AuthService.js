import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

import { STRENGTH_BCRYCT } from '../config/enums.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import UserEntity from '../entities/UserEntity.js';

class AuthService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  registration = async (email, password, role) => {
    const findedUser = (await this.repository.findByEmail(email))[0];
    if (findedUser) {
      throw new AppError(ERROR_PRESETS.REGISTRATION(email));
    }

    const hashedPassword = await bcrypt.hash(password, STRENGTH_BCRYCT);
    let user = new UserEntity();
    user.email = email;
    user.password = hashedPassword;
    user.role = role;

    const createdUser = await this.repository.add(user);

    return createdUser;
  };

  login = async (email, password) => {
    const findedUser = (await this.repository.findByEmail(email))[0];
    if (!findedUser) {
      throw new AppError(ERROR_PRESETS.AUTHORIZATION);
    }

    const isMatch = await bcrypt.compare(password, findedUser.password);
    if (!isMatch) {
      throw new AppError(ERROR_PRESETS.AUTHORIZATION);
    }

    const token = jwt.sign({ id: findedUser.id, role: findedUser.role }, config.get('jwtSecret'));

    return token;
  };

  getUsers = async () => {
    const users = await this.repository.getAll();

    return users;
  };

  getUserById = async (id) => {
    const user = await this.repository.getById(id);

    return user;
  };

  deleteUserById = async (id) => {
    const isSeccessful = await this.repository.remove(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_USER_BY_ID(id));
    }
  };
}

export default AuthService;
