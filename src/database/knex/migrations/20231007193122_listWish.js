exports.up = function (knex) {
  return knex.schema.renameTable('dishsForUser', 'wishList');
};

exports.down = function (knex) {
  return knex.schema.renameTable('dishsForUser', 'wishList');
};