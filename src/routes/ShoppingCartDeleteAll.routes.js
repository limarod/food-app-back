const {Router} = require("express")
const ShoppingCartDeleteAllController = require("../controllers/ShoppingCartDeleteAllController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")


const shoppingCartDeleteAllRoutes = Router()

const shoppingCartDeleteAllController = new ShoppingCartDeleteAllController

shoppingCartDeleteAllRoutes.delete("/", ensureAuthenticated, verifyUserAuthorization("customer"), shoppingCartDeleteAllController.delete )


module.exports = shoppingCartDeleteAllRoutes