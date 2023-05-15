import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import CinemaEntity from '../entities/CinemaEntity.js';
import HallEntity from '../entities/HallEntity.js';

class CinemaService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (cinemaData) => {
    const findedCinema = (await this.repository.findByName(cinemaData.name))[0];
    if (findedCinema) {
      throw new AppError(ERROR_PRESETS.CREATE(cinemaData.name));
    }

    if (cinemaData.halls) {
      let halls = cinemaData.halls.map((hall) => {
        let hallEntity = new HallEntity();
        hallEntity.number = hall.number;
        hallEntity.seats = hall.seats;
        return hallEntity;
      });

      cinemaData.halls = halls;
    }

    let cinema = new CinemaEntity();
    cinema.name = cinemaData.name;
    cinema.adress = cinemaData.adress;
    cinema.halls = cinemaData.halls;

    const createdPost = await this.repository.add(cinema);

    return createdPost;
  };

  getPostes = async () => {
    const postes = await this.repository.getAll();

    return postes;
  };

  getPostById = async (id) => {
    const post = await this.repository.getById(id);

    return post;
  };

  deletePostById = async (id) => {
    const isSeccessful = await this.repository.remove(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_POST_BY_ID(id));
    }
  };
}

export default CinemaService;
