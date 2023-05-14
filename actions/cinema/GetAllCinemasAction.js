import IAction from '../IAction.js';

import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';

class GetAllCinemasAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  run = async (req, res) => {
    const postes = await this.postService.getPostes();

    return res.json(postes);
  };

  validate(input) {}
}

export default GetAllCinemasAction;
