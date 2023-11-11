const DiskStorage = require("../providers/DiskStorage");
const knex = require("knex");
const AppError = require("../utils/AppError");
const sqliteConnetion = require("../database/sqlite")


class DishImageController{
  async update(request, response){
    // const user_id = request.user.id;
    const {id} = request.params;
    const dishImageFilename = request.file.filename;

    const diskStorage = new DiskStorage();
    const database = await sqliteConnetion();

    // const dish = await knex("dishs").where({id}).first();
    const dish = await database.get("SELECT * FROM dishs WHERE id = (?)", [id])


    if(!dish){
      throw new AppError("Prato não encontrado", 404)
    }

    if (dish.image_plate){
      await diskStorage.deleteFile(dish.image_plate);
    }

    const filename = await diskStorage.saveFile(dishImageFilename);
    dish.image_plate = filename

    // const { id: _, ...dishToUpdate } = dish;

    // await knex("dishs").where({id}).update(dish)

    await database.run(
      `UPDATE dishs SET
      image_plate = ?
      WHERE id = ?`,
      [dish.image_plate, id ]
    )

    return response.json(dish)
  }
}

module.exports = DishImageController