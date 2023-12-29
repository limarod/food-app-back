const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const sqliteConnetion = require("../database/sqlite");
const  DiskStorage = require("../providers/DiskStorage")


class DishsController{
  
  async create (request, response){
    const {name, category, description, price, ingredients} = request.body;

    const imageDishFilename = request.file.filename;

    const diskStorage = new DiskStorage()

    const filename = await diskStorage.saveFile(imageDishFilename)

    const [dish_id] = await knex("dishs").insert({
      name, category, description, price, 
      image_plate: filename
    })

    if(ingredients){
      
      const ingredientsInsert = ingredients.map( tags => {
        return {
          dish_id,
          tags
        }
      })
      await knex("ingredients").insert(ingredientsInsert)
    }

 

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
    // await knex("ingredients")
    // .insert(ingredients.map(ingredient => ({tags:ingredient.tag || "", dish_id:id})))

    if(ingredients){
      const ingredientsInsert = ingredients.map( tags => {
        return {
          dish_id:id,
          tags
        }
      })
      await knex("ingredients").insert(ingredientsInsert)
    }

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


    if (ingredients || name) {
      dishs = await knex("dishs")
        .innerJoin("ingredients", "dishs.id", "ingredients.dish_id")
        .select("dishs.*")
        .modify((queryBuilder) => {
          if (ingredients) {
            const filterIngredients = ingredients
              .split(",")
              .map((ingredient) => ingredient.trim());

              queryBuilder.where((builder) => {
                for (const ingredient of filterIngredients) {
                  builder.orWhere("ingredients.tags", "like", `%${ingredient}`);
                }
              });
            }
 
            if (name) {
              queryBuilder.orWhere("dishs.name", "like", `%${name}%`);
            }
          })
        .distinct("dishs.id", "dishs.name")
        .orderBy("dishs.name");
      
      } else {
        dishs = await knex("dishs").orderBy("dishs.name");
      }

    // if(ingredients){
    //   const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

    //   dishs = await knex("ingredients")
    //   .select("dishs.*")
    //   .where((builder) => {
    //     for (const ingredient of filterIngredients){
    //       builder.orWhere( "tags", "like", `%${ingredient}`);
    //     }})
    //   .distinct("dishs.id", "dishs.name")
    //   .innerJoin("dishs", "dishs.id", "ingredients.dish_id")
    //   .orderBy("dishs.name")



    // } else if (name){
    //   dishs = await knex("dishs")
    //   .whereLike("name", `%${name}%`)
    //   .orderBy("name")
    // } else{
    //   dishs = await knex("dishs").orderBy("name")
    // }

     let dishsWithIngredients = await knex("ingredients")
       dishsWithIngredients = dishs.map(dish => {
        const dishsIngredients = dishsWithIngredients.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishsIngredients
      };
      
    });

    return response.json(dishsWithIngredients)
  }
}

module.exports = DishsController
