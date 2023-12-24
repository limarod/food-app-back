const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

class UsersControllerValidated{
  async index(request, response){
    const {user} = request;

  // const database = await sqliteConnection()
  // const checkUserExist = await database.get("SELECT * FROM users WHERE (user) = (?)" , [user.id])
  const checkUserExist = await knex("users").where({id: user.id})


  if(checkUserExist){
    throw new AppError("Unauthorized", 401)
  }

  return response.status(201).json();
  }
}

module.exports = UsersControllerValidated