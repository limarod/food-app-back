   
exports.up = async function (knex) {
    const tableExists = await knex.schema.hasTable('orders');
  
    if (!tableExists) {
        return knex.schema.createTable('orders', function (table) {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.enum("status", ["pendente", "em_preparo", "saiu_para_entrega", "entregue"],{useNative: true, enumName:"status"}).defaultTo("pendente");
        
        table.timestamp("created_at").defaultTo(knex.fn.now('localtime'));
        })
    }
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders');
  };