// Update with your config settings.
localPbConnection = {
  host: 'localhost',
  database: 'hobbits',
  user: 'Elan',
  password: 'pass'
}

const prodDbConnection = process.env.DATABASE_URL || localPbConnection


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/games.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: prodDbConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  }

};
