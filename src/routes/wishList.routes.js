const {Router} = require("express")
const WishListController = require("../controllers/WishListController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")


const wishListRoutes = Router()

const wishListController = new WishListController

wishListRoutes.use("/", ensureAuthenticated, verifyUserAuthorization("customer"), wishListController.create )

module.exports = wishListRoutes