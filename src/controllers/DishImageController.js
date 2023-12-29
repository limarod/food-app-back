const DiskStorage = require("../providers/DiskStorage");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class DishImageController{


  async update(request, response){
    const {id} = request.params;
    const dishImageFilename = request.file.filename;

    if(!dishImageFilename){
      throw new AppError("Arquivo de imagem não encontrado", 404)
    }

    const diskStorage = new DiskStorage();

    const dish = await knex("dishs").where({id}).first()

    if(!dish){
      throw new AppError("Prato não encontrado", 404)
    }

    if (dish.image_plate){
      await diskStorage.deleteFile(dish.image_plate);
    }

    const filename = await diskStorage.saveFile(dishImageFilename);
    dish.image_plate = filename


    await knex("dishs").update(dish).where({id})

    return response.json(dish)

  }

}


module.exports = DishImageController