exports.up = knex => knex.schema.createTable("shoppingCart", table =>{
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.text("image_plate");
    table.text("name");
    table.decimal("price");
    table.integer("quantity").defaultTo(1);
    table.timestamp("created_at").default(knex.fn.now());
  });
  
  
  exports.down =  knex => knex.schema.dropTable("shoppingCart");