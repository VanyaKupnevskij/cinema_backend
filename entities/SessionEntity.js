import IEntity from './IEntity.js';

class SessionEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.date = new Date(Date.now());
    this.film = null;
    this.price = 0;
    this.free_place = 0;
  }
}

export default SessionEntity;
