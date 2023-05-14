import IEntity from './IEntity.js';

class IncomeEntity extends IEntity {
  constructor({ uid, text = '' }) {
    super(uid);

    this.income_value = 0;
    this.date = new Date(Date.now());
  }
}

export default IncomeEntity;
