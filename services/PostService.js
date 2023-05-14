import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import PostEntity from '../entities/PostEntity.js';
import TagEntity from '../entities/TagEntity.js';

class PostService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async ({ title, text, tags, facebook_info, telegram_info }) => {
    const findedPost = (await this.repository.findByTitle(title))[0];
    if (findedPost) {
      throw new AppError(ERROR_PRESETS.CREATE(title));
    }

    let post = new PostEntity();
    post.title = title;
    post.text = text;
    post.facebook_info = facebook_info;
    post.telegram_info = telegram_info;
    post.tags = tags.map((tag) => new TagEntity({ text: tag.text }));

    const createdPost = await this.repository.add(post);

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

export default PostService;
