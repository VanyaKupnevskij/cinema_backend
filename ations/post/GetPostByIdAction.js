import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class GetPostByIdAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  get accessTag() {
    return 'post:get-post-by-id';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    const { id } = this.validate(req.params);

    const post = await this.postService.getPostById(id);

    return res.json({ ...post });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default GetPostByIdAction;
