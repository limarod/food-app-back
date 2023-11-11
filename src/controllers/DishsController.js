const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const sqliteConnetion = require("../database/sqlite")

class DishsController{
  async create (request, response){
    const {name, category, description, price, ingredients} = request.body;

    const [dish_id] = await knex("dishs").insert({
      name, category, description, price
    })

    const ingredientsInsert = ingredients.map( tags => {
      return {
        dish_id,
        tags
      }
    })

    await knex ("ingredients").insert(ingredientsInsert)

    return response.status(201).json()
  }

  async update (request, response){
    const {name, category, description, price, ingredients} = request.body;

    const {id} = request.params;

    // const database = await sqliteConnetion();

    const dish = await knex("dishs").where({id}).first();

    dish.name = name ?? dish.name
    dish.category = category ?? dish.category
    dish.description = description ?? dish.description
    dish.price = price ?? dish.price
    // dish.image_plate = image_plate ?? dish.image_plate


    // const dish = await database.get("SELECT * FROM dishs WHERE id = (?)", [id])

    // delete dish.id

    await knex("dishs").where({id}).update(dish)

    // updated_at = DATETIME('now')

    // await database.run(`
    //   UPDATE dishs SET
    //   name = ?,
    //   category = ?,
    //   description = ?,
    //   price = ?
    //   WHERE id = ?`,
    //   [dish.name, dish.category, dish.description, dish.price,  id ]
    //   );

    return response.json()
  }

  async show (request, response){
    const {id} = request.params

    const dish = await knex("dishs").where({id}).first()
    const ingredients = await knex("ingredients").where({dish_id: id})

    return response.json({
      ...dish,
      ingredients
    })
  }

  async delete (request, response){
    const {id} = request.params;

    await knex("dishs").where({id}).delete();

    return response.json()
  }

  async index (request, response){
    const {ingredients, name} = request.query
    let dishs

    if(ingredients){
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

      dishs = await knex("ingredients")
      .select(["dishs.id", "dishs.name"])
      .whereLike("ingredients.tags", `%${filterIngredients}`)
    //  .whereIn("tags", filterIngredients)
      .innerJoin("dishs", "dishs.id", "ingredients.dish_id")

    }else{
      dishs = await knex("dishs")
      .whereLike("name", `%${name}%`)
      .orderBy("name")
    }

    let dishsWithIngredients = await knex("ingredients")
    dishsWithIngredients = dishs.map(dishs => {
      const dishsIngredients = dishsWithIngredients.filter(ingredient => ingredient.dish_id === dishs.id)

      return {
        ...dishs,
        ingredients: dishsIngredients
      }
      
    })




    return response.json(dishsWithIngredients)
  }
}

module.exports = DishsController
