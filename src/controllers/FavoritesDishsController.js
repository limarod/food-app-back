const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class FavoritesDishsController{
    async create(request, response){
        const user_id = request.user.id
        const {dish_id} = request.body;
        
        const checkDishFavoriteExists  = await knex("favorites").where({user_id, dish_id}).first();
        
        if(checkDishFavoriteExists ){
           throw new AppError("This dish exists already in database", 401)
        }
  
        await knex("favorites").insert({
            dish_id,
            user_id
        })

        return response.status(201).json()
    }

    async index(request, response){
        const user_id = request.user.id
        let favoriteDishs

        favoriteDishs = await knex("favorites")
        .where({user_id})
        .innerJoin("dishs", "favorites.dish_id", "dishs.id")
        .select("dishs.image_plate", "dishs.name", "dishs.price", "favorites.is_favorite", "favorites.dish_id", "favorites.id")

        return response.json(favoriteDishs)
    }

    async delete(request, response){
        const {id} = request.params
        // const user_id = request.user.id

        await knex("favorites").where({ id}).delete();
    
        return response.json()
    }
}

module.exports = FavoritesDishsController