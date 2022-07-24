const TABLE = "books";

exports.up = function (knex) {
  return knex.schema.createTable(TABLE, function (table) {
    table.increments("id").primary().unsigned();
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.string("description", 500).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLE);
};
