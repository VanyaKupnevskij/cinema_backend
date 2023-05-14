import IEntity from './IEntity.js';

class UserEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.email = '';
    this.password = '';
    this.role = 'user';
  }
}

export default UserEntity;
