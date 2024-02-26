exports.up = knex => knex.schema.createTable("favorites", table =>{
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("dish_id").references("id").inTable("dishs").onDelete("CASCADE");
    table.boolean("is_favorite").defaultTo("true");
    table.unique(["user_id", "dish_id"]);
  });
  
  
  exports.down =  knex => knex.schema.dropTable("favorites");