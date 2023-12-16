const knex = require ("../database/knex");

class IngredientsController{
  async index(request, response){

    const {id} = request.params

    const ingredients = await knex("ingredients")
    
    // const ingredients = await knex("ingredients")
    // .where({id: dish_id})

    // modelo para trazer as tags (ingredients) com base no id da dish

    return response.json(ingredients)
  }
}


module.exports = IngredientsController