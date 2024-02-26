const {Router} = require("express")
const ShoppingCartController = require("../controllers/ShoppingCartController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")


const shoppingCartRoutes = Router()

const shoppingCartController = new ShoppingCartController

shoppingCartRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("customer"), shoppingCartController.create )
shoppingCartRoutes.get("/", ensureAuthenticated, verifyUserAuthorization("customer"), shoppingCartController.index )
shoppingCartRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization("customer"), shoppingCartController.delete )

module.exports = shoppingCartRoutes;