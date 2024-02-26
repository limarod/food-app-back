const {Router} = require ("express");
const FavoritesDishsController = require ("../controllers/FavoritesDishsController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")

const favoriteDishsRoutes = Router();
const favoritesDishsController = new FavoritesDishsController();

favoriteDishsRoutes.post("/", ensureAuthenticated, favoritesDishsController.create);
favoriteDishsRoutes.get("/", ensureAuthenticated, favoritesDishsController.index);
favoriteDishsRoutes.delete("/:id", ensureAuthenticated, favoritesDishsController.delete);

module.exports = favoriteDishsRoutes;