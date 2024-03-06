
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable('dishs');

  if (!tableExists) {
    return knex.schema.createTable('dishs', function (table) {
    table.increments("id");
    table.text("image_plate").nullable();
    table.text("name");
    table.text("category")
    table.text("description");
    table.decimal("price")
    table.timestamp("created_at").default(knex.fn.now('localtime'))
    })
  }
}


exports.down = function (knex) {
  return knex.schema.dropTableIfExists('dishs');
};