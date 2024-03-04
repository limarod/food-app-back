exports.up = knex => knex.schema.table("orders_history", table =>{
    table.enum("status", ["pendente", "em_preparo", "saiu_para_entrega", "entregue"],{useNative: true, enumName:"status"})
    .defaultTo("pendente");
})

exports.down = knex => knex.schema.table("orders_history", table => {
    table.dropColumn("status");
  });