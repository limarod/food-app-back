exports.up = knex => knex.schema.createTable("dishsForUser", table =>{
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.integer("dish_id").references("id").inTable("dishs");
  table.integer("quantity").defaultTo(1);
  table.timestamp("created_at").default(knex.fn.now());
});


exports.down =  knex => knex.schema.dropTable("dishsForUser");
