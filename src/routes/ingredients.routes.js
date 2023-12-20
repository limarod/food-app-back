const {Router} = require("express")
const IngredientsController = require("../controllers/IngredientsController")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")

const ingredientsRoutes = Router()

const ingredientsController = new IngredientsController()

ingredientsRoutes.get("/", ingredientsController.index )
ingredientsRoutes.delete("/:id", verifyUserAuthorization("admin"), ingredientsController.delete )



module.exports = ingredientsRoutes