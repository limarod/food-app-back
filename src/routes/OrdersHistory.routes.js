const {Router} = require ("express");
const OrdersHistoryController = require ("../controllers/OrdersHistoryController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")

const ordersHistoryRoutes = Router();
const ordersHistoryController = new OrdersHistoryController();

ordersHistoryRoutes.post("/", ensureAuthenticated, ordersHistoryController.create);
ordersHistoryRoutes.get("/", ensureAuthenticated, ordersHistoryController.index);
// ordersHistoryRoutes.get("/", ensureAuthenticated, ordersHistoryController.index);


module.exports = ordersHistoryRoutes;