import IEntity from './IEntity.js';

class TelegramInfoEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.id_files_post = '';
    this.id_post = '';
    this.files = []; // type FileEntity
  }
}

export default TelegramInfoEntity;
