const AppError = require("../utils/AppError")
const knex = require("../database/knex")



class ShoppingCartController{
  async create (request, response){
    
    const {quantity, dish_id} = request.body;
    const user_id = request.user.id
    let dishShoppingCart


    const checkDishShoppingCartExists  = await knex("shoppingCart").where({user_id, dish_id}).first();

    if(checkDishShoppingCartExists){
      
      const newQuantity = checkDishShoppingCartExists.quantity + quantity
      
      dishShoppingCart ={ quantity: newQuantity}
      
      await knex("shoppingCart").update(dishShoppingCart).where({dish_id, user_id})

    }else{

      dishShoppingCart = {
        quantity,
        dish_id,
        user_id,
      }
    }

    await knex("shoppingCart").insert(dishShoppingCart)

    return response.status(201).json({message: "Item adicionado com sucesso"})
  }

  async index(request, response){
    const user_id = request.user.id
    let dishs

    dishs = await knex("shoppingCart")
    .where("shoppingCart.user_id", user_id)
    .innerJoin("dishs", "shoppingCart.dish_id", "dishs.id")
    .select(["dishs.name", "dishs.price", "shoppingCart.quantity", "shoppingCart.id", "dishs.image_plate"])


    return response.json(dishs)
  }

  async delete(request, response){
    const {id} = request.params

    await knex("shoppingCart").where({id}).delete();

    return response.json()
  }
}

module.exports = ShoppingCartController