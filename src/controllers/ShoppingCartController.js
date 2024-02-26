const AppError = require("../utils/AppError")
const knex = require("../database/knex")



class ShoppingCartController{
  async create (request, response){
    
    // const {quantity, data} = request.body;
    const {name, price, image_plate, quantity} = request.body;
    const user_id = request.user.id

    // if (!name || !image_plate) {
    //   return response.status(400).json({ error: 'Campos de nome e preço são obrigatórios.' });
    // }

    const dishShoppingCart = {
      name,
      price,
      image_plate,
      quantity,
      user_id,
    }


    await knex("shoppingCart").insert(dishShoppingCart)

    return response.status(201).json({message: "Item adicionado com sucesso"})
  }

  async index(request, response){
    const user_id = request.user.id
    let dishs

    dishs = await knex("shoppingCart")
    .select(["shoppingCart.name", "shoppingCart.price", "shoppingCart.quantity", "shoppingCart.id", "shoppingCart.image_plate"])
    .where("shoppingCart.user_id", user_id)

    return response.json(dishs)
  }

  async delete(request, response){
    const {id} = request.params

    await knex("shoppingCart").where({id}).delete();

    return response.json()
  }
}

module.exports = ShoppingCartController