module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "postgres",
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
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
