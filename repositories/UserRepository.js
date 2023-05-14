import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class UserRepository extends IRepository {
  constructor() {
    super();
  }

  async add(newUser) {
    await connection.query('INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)', [
      newUser.id,
      newUser.email,
      newUser.password,
      newUser.role,
    ]);

    return this.getById(newUser.id);
  }

  async update(id, newUser) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

    const user = rows[0];
    if (!user) throw new AppError(ERROR_PRESETS.USER_ID_NOT_EXIST(id));

    return user;
  }

  async getAll() {
    const [rows] = await connection.execute('SELECT id, email, role FROM users');

    return rows;
  }

  async remove(id) {
    const result = await connection.query('DELETE FROM users WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByEmail(email) {
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    return rows;
  }
}

export default UserRepository;
