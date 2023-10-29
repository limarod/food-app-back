const {Router} = require("express")
const WishListController = require("../controllers/WishListController")

const wishListRoutes = Router()

const wishListController = new WishListController

wishListRoutes.use("/:user_id", wishListController.create )

module.exports = wishListRoutes