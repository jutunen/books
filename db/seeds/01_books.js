const TABLE_NAME = "books";

exports.seed = function (knex) {
  const ROWS = require("./data/books.js");
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert(ROWS);
    });
};
