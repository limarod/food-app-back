const AppError = require("../utils/AppError")
const knex = require("../database/knex")



class WishListController{
  async create (request, response){
    const {dish_id, quantity} = request.body
    const {user_id} = request.params 

    await knex("wishList").insert({
      dish_id,
      quantity,
      user_id
    })

    return response.status(201).json({message: "Item adicionado com sucesso"})
  }
}

module.exports = WishListController