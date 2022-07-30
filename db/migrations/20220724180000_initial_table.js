const TABLE = "books";

exports.up = function (knex) {
  return knex.schema.createTable(TABLE, function (table) {
    table.increments("id").primary().unsigned();
    table.string("title", 50).notNullable();
    table.string("author", 50).notNullable();
    table.string("description", 500).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TABLE);
};
