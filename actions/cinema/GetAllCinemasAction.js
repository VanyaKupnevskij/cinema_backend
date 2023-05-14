import IAction from '../IAction.js';

import CinemaService from '../../services/CinemaService.js';
import CinemaRepository from '../../repositories/CinemaRepository.js';

class GetAllCinemasAction extends IAction {
  constructor() {
    super();

    this.postService = new CinemaService(new CinemaRepository());
  }

  run = async (req, res) => {
    const postes = await this.postService.getPostes();

    return res.json(postes);
  };

  validate(input) {}
}

export default GetAllCinemasAction;
