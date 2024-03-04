exports.up = function (knex) {
    return knex.schema.table("orders_history", (table) => {
      table.dropColumn("dish_id");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("orders_history", (table) => {
      table.integer("dish_id").references("id").inTable("dishs");
    });
  };
