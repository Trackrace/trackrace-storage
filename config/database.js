const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5433),
      database: env('DATABASE_NAME', 'trackrace'),
      user: env('DATABASE_USERNAME', 'trackrace'),
      password: env('DATABASE_PASSWORD', 'trackrace'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
    },
    debug: false,
  },
});
