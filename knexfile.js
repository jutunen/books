module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "books",
      user: "books",
      password: "books",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
