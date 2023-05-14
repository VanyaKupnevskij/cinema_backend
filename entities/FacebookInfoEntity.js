import IEntity from './IEntity.js';

class FacebookInfoEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.id_post = '';
    this.files = []; // type FileEntity
  }
}

export default FacebookInfoEntity;
