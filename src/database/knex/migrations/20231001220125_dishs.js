
exports.up = knex => knex.schema.createTable("dishs", table => {
  table.increments("id");
  table.text("image_plate").nullable();
  table.text("name");
  table.text("category")
  table.text("description");
  table.decimal("price")
  table.timestamp("created_at").default(knex.fn.now('localtime'))
})

exports.down = knex => schema.dropTable("dishs")


