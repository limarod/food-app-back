const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class UsersControllerValidated{
  async index(request, response){
    const {user} = request;

  const checkUserExist = await knex("users").where({id: user.id})


  if(checkUserExist.length === 0){
    throw new AppError("Unauthorized", 401)
  }

  return response.status(201).json();
  }
}

module.exports = UsersControllerValidated