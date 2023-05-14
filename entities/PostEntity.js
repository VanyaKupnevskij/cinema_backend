import IEntity from './IEntity.js';

class PostEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.title = '';
    this.text = '';
    this.created = new Date(Date.now());
    this.modified = new Date(Date.now());
    this.facebook_info = null;
    this.telegram_info = null;
    this.tags = [];
  }
}

export default PostEntity;
