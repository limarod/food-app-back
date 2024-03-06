
  exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable('ingredients');

    if (!tableExists) {
      return knex.schema.createTable('ingredients', function (table) {
      table.increments("id");
      table.text("tags").nullable();
      table.integer("dish_id").references("id").inTable("dishs").onDelete("CASCADE")
      })
    }
}


exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ingredients');
};