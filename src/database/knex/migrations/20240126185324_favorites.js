exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable('favorites');

    if (!tableExists) {
      return knex.schema.createTable('favorites', function (table) {
      table.increments("id");
      table.integer("user_id").references("id").inTable("users");
      table.integer("dish_id").references("id").inTable("dishs").onDelete("CASCADE");
      table.boolean("is_favorite").defaultTo("true");
      table.unique(["user_id", "dish_id"]);
      })
    }
}
  
  
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('favorites');
};