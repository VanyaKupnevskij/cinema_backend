import IEntity from './IEntity.js';

class FileEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.url = '';
    this.type = '';
  }
}

export default FileEntity;
