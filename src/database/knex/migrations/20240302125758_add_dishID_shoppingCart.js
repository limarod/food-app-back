exports.up = knex => knex.schema.table("shoppingCart", table =>{
    table.integer("dish_id").references("id").inTable("dishs")

})

exports.down = knex => knex.schema.table("shoppingCart", table => {
    table.dropColumn("dish_id");
  });