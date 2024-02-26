const knex = require("../database/knex")

class ShoppingCartDeleteAllController{
    async delete(request, response){
        const user_id = request.user.id

        await knex("shoppingCart").where({user_id}).delete();

        return response.json()
    }

}

module.exports = ShoppingCartDeleteAllController