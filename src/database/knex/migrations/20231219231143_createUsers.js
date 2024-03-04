
exports.up = knex => knex.schema.createTableIfNotExists("users", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email");
    table.text("password")
    table.text("avatar").nullable();

    table.enum("role", ["admin", "customer"], {useNative: true, enumName: "roles"})
    .notNullable().default("customer")

    table.timestamp("created_at").defaultTo(knex.fn.now('localtime'))
  })
  
  exports.down = knex => knex.schema.dropTable("users")
  