exports.up = knex => knex.schema.table("orders_history", table => {
    table.dropColumn("created_at");
    table.dropColumn("status");
  });
  
  exports.down = knex => knex.schema.table("orders_history", table => {
    table.text("created_at");
    table.text("status");

  });