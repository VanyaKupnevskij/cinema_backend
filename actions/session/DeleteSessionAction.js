import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class DeleteSessionAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  run = async (req, res) => {
    const { id } = this.validate(req.params);

    await this.postService.deletePostById(id);

    return res.json({ success: true, message: `Seccesful deleted post by id: ${id}` });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default DeleteSessionAction;
