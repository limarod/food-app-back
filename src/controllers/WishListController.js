const AppError = require("../utils/AppError")
const knex = require("../database/knex")



class WishListController{
  async create (request, response){
    const {quantity} = request.body
    const {dish_id} = request.params
    const user_id = request.user.ir 

    await knex("wishList").insert({
      dish_id,
      quantity,
      user_id
    })

    return response.status(201).json({message: "Item adicionado com sucesso"})
  }
}

module.exports = WishListController