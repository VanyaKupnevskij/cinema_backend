class IRepository {
  constructor() {
    if (this.add === undefined) {
      throw new Error('Must override .add() method');
    }

    if (this.update === undefined) {
      throw new Error('Must override .update() method');
    }

    if (this.getById === undefined) {
      throw new Error('Must override .getById() method');
    }

    if (this.getAll === undefined) {
      throw new Error('Must override .getAll() method');
    }

    if (this.remove === undefined) {
      throw new Error('Must override .remove() method');
    }
  }
}

export default IRepository;
