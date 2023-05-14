import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import PostService from '../../services/PostService.js';
import PostRepository from '../../repositories/PostRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import FacebookInfoEntity from '../../entities/FacebookInfoEntity.js';
import TelegramInfoEntity from '../../entities/TelegramInfoEntity.js';

class CreateAction extends IAction {
  constructor() {
    super();

    this.postService = new PostService(new PostRepository());
  }

  get accessTag() {
    return 'post:create';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    let validData = this.validate(req.body);

    // TODO: remove to facebook and telegram sevices
    if (validData.facebook_info) {
      let facebook = new FacebookInfoEntity();
      facebook.id_post = validData.facebook_info.id_post;
      facebook.files = validData.facebook_info.files;

      validData.facebook_info = facebook;
    }
    if (validData.telegram_info) {
      let telegram = new TelegramInfoEntity();
      telegram.id_files_post = telegram_info.id_files_post;
      telegram.id_post = validData.telegram_info.id_post;
      telegram.files = validData.telegram_info.files;

      validData.telegram_info = telegram;
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

export default CreateAction;
