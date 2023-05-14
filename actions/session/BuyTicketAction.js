import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class BuyTicketAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  run = async (req, res) => {
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

export default BuyTicketAction;
