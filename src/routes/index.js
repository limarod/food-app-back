const {Router} = require("express")
const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")
const dishsRoutes = require("./dishs.routes")
const ingredientsRoutes = require("./ingredients.routes")
const wishListRoutes = require("./wishList.routes")

const routes = Router();

routes.use("/users", usersRoutes );
routes.use("/sessions", sessionsRoutes );
routes.use("/menu", dishsRoutes );
routes.use("/ingredients", ingredientsRoutes)
routes.use("/wishList", wishListRoutes)

module.exports = routes;