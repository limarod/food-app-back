const {Router} = require("express")
const OrdersController = require("../controllers/OrdersController")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.post("/", ensureAuthenticated, ordersController.create)
ordersRoutes.get("/", ensureAuthenticated, ordersController.index)
ordersRoutes.put("/", ensureAuthenticated, ordersController.update)



module.exports = ordersRoutes