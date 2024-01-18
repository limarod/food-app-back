const knex = require ("../database/knex");

class IngredientsController{
  async index(request, response){

    const {id} = request.params

    const ingredients = await knex("ingredients")
    
    return response.json(ingredients)
  }


  async delete(request, response){
    const {id} = request.params

    await knex("ingredients").where({id}).delete();

    return response.json()

  }

}


module.exports = IngredientsController