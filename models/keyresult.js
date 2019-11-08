const Base = require('./base.js');

class User extends Base {
  constructor(props = 'keyresult') {
    super(props);
  }
}

module.exports = new User()