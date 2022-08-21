// Update with your config settings.
const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'e_transport',
    },
    migrations: {
      directory: path.join(__dirname, './src/migrations'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'e_transport',
    },
    migrations: {
      directory: path.join(__dirname, './src/migrations'),
    },
    useNullAsDefault: true,
  },
};
