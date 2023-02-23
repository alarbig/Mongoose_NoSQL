const { connect, connection } = require('mongoose');

connect('mongodb://localhost/usersAndReactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;