exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable('shoppingCart');
  

    if (!tableExists) {
      return knex.schema.createTable('shoppingCart', function (table) {
      table.increments("id");
      table.integer("user_id").references("id").inTable("users");
      table.text("image_plate");
      table.text("name");
      table.decimal("price");
      table.integer("quantity").defaultTo(1);
      table.timestamp("created_at").default(knex.fn.now('localtime'));
      })
    }
}
  
  
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('shoppingCart');
};