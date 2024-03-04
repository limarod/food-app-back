exports.up = knex => knex.schema.createTable("orders_history", table =>{
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("dish_id").references("id").inTable("dishs");
    table.text("name");
    table.integer("quantity").notNullable();
    table.decimal("total_price", 10, 2).notNullable();



    table.timestamp("created_at").defaultTo(knex.fn.now('localtime'))


});
  
  
  exports.down =  knex => knex.schema.dropTable("orders_history");