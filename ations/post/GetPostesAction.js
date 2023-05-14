import IAction from '../IAction.js';

import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';

class GetPostesAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  get accessTag() {
    return 'post:get-postes';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    const postes = await this.postService.getPostes();

    return res.json(postes);
  };

  validate(input) {}
}

export default GetPostesAction;
