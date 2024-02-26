const AppError = require("../utils/AppError")
const knex = require("../database/knex")



class OrdersHistoryController{

    async create(request, response){
        const {name, total_price, quantity, dish_id} = request.body
        const user_id = request.user.id

        await knex("orders_history").insert({
            name, 
            total_price, 
            quantity, 
            dish_id,
            user_id
        })

        return response.status(201).json()
    }

    async index(request, response){
        const user_id = request.user.id

        let OrdersHistory

        OrdersHistory = await knex("orders_history")
        .select("orders_history.id", "orders_history.name", "orders_history.quantity", "orders_history.total_price", "orders_history.created_at")
        // .where({user_id})

        return response.json(OrdersHistory)
    }
}


module.exports = OrdersHistoryController