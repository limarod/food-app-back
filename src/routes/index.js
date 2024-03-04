const {Router} = require("express")
const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")
const dishsRoutes = require("./dishs.routes")
const ingredientsRoutes = require("./ingredients.routes")
const shoppingCartRoutes = require("./shoppingCart.routes")
const favoriteDishsRoutes = require("./FavoritesDishs.routes")
const ordersHistoryRoutes = require("./OrdersHistory.routes")
const ordersRoutes = require("./orders.routes")
const shoppingCartDeleteAllRoutes = require("./ShoppingCartDeleteAll.routes")

const routes = Router();

routes.use("/users", usersRoutes );
routes.use("/sessions", sessionsRoutes );
routes.use("/menu", dishsRoutes );
routes.use("/ingredients", ingredientsRoutes)
routes.use("/shoppingCart", shoppingCartRoutes)
routes.use("/favorites", favoriteDishsRoutes)
routes.use("/shoppingCartDeleteAll", shoppingCartDeleteAllRoutes)
routes.use("/orders", ordersRoutes)
routes.use("/history", ordersHistoryRoutes)

module.exports = routes;