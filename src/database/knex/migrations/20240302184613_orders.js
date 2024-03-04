exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.enum("status", ["pendente", "em_preparo", "saiu_para_entrega", "entregue"],{useNative: true, enumName:"status"}).defaultTo("pendente");
    
    table.timestamp("created_at").defaultTo(knex.fn.now('localtime'));
});


  
exports.down =  knex => knex.schema.dropTable("orders");