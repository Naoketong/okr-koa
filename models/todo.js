const Base = require('./base.js');

class User extends Base {
  constructor(props = 'todo') {
    super(props);
  }
}

module.exports = new User()