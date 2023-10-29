exports.up = knex => knex.schema.createTable( "ingredients", table =>{
  table.increments("id");
  table.text("tags").notNullable();
  table.integer("dish_id").references("id").inTable("dishs").onDelete("CASCADE")

}) 


exports.down = knex => knex.schema.dropTable("ingredients")
