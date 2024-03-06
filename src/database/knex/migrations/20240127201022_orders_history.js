  exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable('orders_history');
    
    if (!tableExists) {
        return knex.schema.createTable('orders_history', function (table) {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.integer("dish_id").references("id").inTable("dishs");
        table.text("name");
        table.integer("quantity").notNullable();
        table.decimal("total_price", 10, 2).notNullable();



        table.timestamp("created_at").defaultTo(knex.fn.now('localtime'))
        });
    }
}
  
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('orders_history');
};