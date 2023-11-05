const {Router} = require("express")
const WishListController = require("../controllers/WishListController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")


const wishListRoutes = Router()

const wishListController = new WishListController

wishListRoutes.use("/", ensureAuthenticated, wishListController.create )

module.exports = wishListRoutes