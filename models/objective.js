const Base = require('./base.js');

class User extends Base {
  constructor(props = 'objective') {
    super(props);
  }
}

module.exports = new User()