import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';

const createCinemaQuery = loadQuery('createCinema');

class CinemaRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newCinema) {
    await connection.query(createCinemaQuery, [
      newCinema.id,
      newCinema.name,
      newCinema.adress,
      newCinema.halls.map((hall) => [hall.id, newCinema.id, hall.number, hall.seats]),
    ]);

    return this.getById(newCinema.id);
  }

  async update(id, newCinema) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM cinemas WHERE id = ?', [id]);

    const cinema = rows[0];
    if (!cinema) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return cinema;
  }

  async getAll() {
    const [rows] = await connection.execute('SELECT id, name, adress FROM cinemas');

    return rows;
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM cinemas WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByName(name) {
    const [rows] = await connection.execute('SELECT * FROM cinemas WHERE name = ?', [name]);

    return rows;
  }
}

export default CinemaRepository;
