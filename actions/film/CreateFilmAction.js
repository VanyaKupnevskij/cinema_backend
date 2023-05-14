import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import CinemaService from '../../services/CinemaService.js';
import CinemaRepository from '../../repositories/CinemaRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import RoleEntity from '../../entities/RoleEntity.js';

class CreateFilmAction extends IAction {
  constructor() {
    super();

    this.postService = new CinemaService(new CinemaRepository());
  }

  run = async (req, res) => {
    let validData = this.validate(req.body);

    if (validData.facebook_info) {
      let facebook = new RoleEntity();
      facebook.id_post = validData.facebook_info.id_post;
      facebook.files = validData.facebook_info.files;

      validData.facebook_info = facebook;
    }

    const createdPost = await this.postService.create(validData);

    return res.status(STATUS.created).json({ id: createdPost.id, title: createdPost.title });
  };

  validate(input) {
    if (!input.title) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Title', title, 'must exist'));
    }
    if (!input.text) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Text', text, 'must exist'));
    }

    return input;
  }
}

export default CreateFilmAction;
