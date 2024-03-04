exports.up = knex => knex.schema.table("orders_history", table =>{
    table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE")})



exports.down = knex => knex.schema.table("orders_history", table => {
    table.dropColumn("order_id");
  })