exports.up = knex => knex.schema.table("shoppingCart", table => {
    table.dropColumn("image_plate");
    table.dropColumn("name");
    table.dropColumn("price");
  });
  
  exports.down = knex => knex.schema.table("shoppingCart", table => {
    table.text("image_plate");
    table.text("name");
    table.decimal("price");
  });