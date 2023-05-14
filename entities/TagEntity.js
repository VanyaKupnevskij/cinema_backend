import IEntity from './IEntity.js';

class TagEntity extends IEntity {
  constructor({ uid, text = '' }) {
    super(uid);

    this.text = text;
  }
}

export default TagEntity;
