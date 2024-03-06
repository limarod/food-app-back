
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable('users');

    if (!tableExists) {
     return knex.schema.createTable('users', function (table) {
        table.increments("id");
        table.text("name").notNullable();
        table.text("email");
        table.text("password")
        table.text("avatar").nullable();

        table.enum("role", ["admin", "customer"], {useNative: true, enumName: "roles"})
        .notNullable().default("customer")

        table.timestamp("created_at").defaultTo(knex.fn.now('localtime'))
      })
    }
}
  
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};