const DiskStorage = require("../providers/DiskStorage");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const sqliteConnetion = require("../database/sqlite")


class DishImageController{
  async update(request, response){
    // const user_id = request.user.id;
    const {id} = request.params;
    // const dishImageFilename = request.file;
    const dishImageFilename = request.file.filename;

    if(!dishImageFilename){
      throw new AppError("Arquivo de imagem não encontrado", 404)
    }

    const diskStorage = new DiskStorage();
    // const database = await sqliteConnetion();

    const dish = await knex("dishs").where({id}).first()

    if(!dish){
      throw new AppError("Prato não encontrado", 404)
    }

    if (dish.image_plate){
      await diskStorage.deleteFile(dish.image_plate);
    }

    const filename = await diskStorage.saveFile(dishImageFilename);
    dish.image_plate = filename

    // const { id: _, ...dishToUpdate } = dish;

    await knex("dishs").update(dish).where({id})

    return response.json(dish)

    // await database.run(
    //   `UPDATE dishs SET
    //   image_plate = ?
    //   WHERE id = ?`,
    //   [dish.image_plate, id ]
    // )

  }
}

module.exports = DishImageController