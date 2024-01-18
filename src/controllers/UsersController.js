const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const {hash, compare} = require ("bcryptjs")

class UsersController{
  async create(request, response){
    const {name, email, password} = request.body;

  const database = await sqliteConnection()
  const checkUserExist = await database.get("SELECT * FROM users WHERE (email) = (?)" , [email])

  if(checkUserExist){
    throw new AppError("Este email de usuário já está cadastrado", 400)
  }

  const hashedPassword =  await hash(password, 3)

  await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword] )

  return response.status(201).json();
}

  async update (request, response){
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;


    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE (id) = (?)", [user_id])

    if (!user){
      throw new AppError("usuário não encontrado.")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE (email) = (?)", [email])




    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id ){
      throw new AppError ("Este email já está cadastrado")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;



    if (password && !old_password){
      throw new AppError ("Você não informou a senha atual")
    }
    
    
    if(password || old_password){
      const checkedPassword = await compare(old_password, user.password);
      
        if(old_password && !password){
          throw new AppError ("Informe a nova senha para alterar.")
        }  

        if(old_password && password){
          if (!checkedPassword){
          throw new AppError ("A senha atual não confere.")
          }
          user.password = await hash(password, 3)
        }
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
      )

    return response.status(201).json();

  }
}

module.exports = UsersController