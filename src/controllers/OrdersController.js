const knex = require ("../database/knex");

class OrdersController{
  
  async create(request, response){
    const user_id = request.user.id

    const [order_id] = await knex("orders").insert({user_id})

    return response.status(201).json({order_id})
  }
  
  async index(request, response){

    const {id} = request.params

    const orders = await knex("orders")
    .innerJoin("orders_history", "orders_history.order_id", "orders.id")
    .select("orders.id","orders.status","orders.created_at", "orders_history.name", "orders_history.quantity", "orders_history.total_price")
    .orderBy("orders.created_at")

    
    return response.json(orders)
  }

  async update(request, response){
    const {status, id} = request.body

    const order = await knex("orders").where({id}).first();

    if(!order){
      return response.json("Order not found")
    }

    order.status = status ?? order.status


    await knex("orders").where({id}).update(order)

    return response.json()
  }
}


  module.exports = OrdersController