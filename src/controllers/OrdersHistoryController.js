const AppError = require("../utils/AppError")
const knex = require("../database/knex")



class OrdersHistoryController{

    async create(request, response){


        const user_id = request.user.id
        const {orderItems, order_id} = request.body

        await knex.transaction(async (trx) => {

           const orderItemsInsert =  orderItems.map(item =>{

                return{
                    name: item.name, 
                    total_price: item.total_price, 
                    quantity: item.quantity, 
                    user_id,
                    order_id,
                }
            })
            await trx("orders_history").insert(orderItemsInsert)
        })

        return response.status(201).json()
    }

    // async index(request, response){
    //     const user_id = request.user.id

    //     let OrdersHistory

    //     OrdersHistory = await knex("orders")
    //     .innerJoin("orders_history", "orders_history.order_id", "orders.id")
    //     .select("orders.id","orders.created_at","orders_history.id", "orders_history.name", "orders_history.quantity", "orders_history.total_price")
    //     .orderBy("orders.created_at")

    //     return response.json(OrdersHistory)
    // }

    async index(request, response){
        const user_id = request.user.id
        const {order_id} = request.body

        let OrdersHistory

        OrdersHistory = await knex("orders_history")
        .where(order_id)
        .select("name", "quantity")


    }
}


module.exports = OrdersHistoryController