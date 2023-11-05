const {Router} = require ("express");
const DishsController = require ("../controllers/DishsController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")


const dishsRoutes = Router();


const dishsController = new DishsController()

dishsRoutes.use(ensureAuthenticated)

dishsRoutes.post("/", dishsController.create)
dishsRoutes.get("/:id", dishsController.show)
dishsRoutes.delete("/:id", dishsController.delete)
dishsRoutes.get("/", dishsController.index)
dishsRoutes.put("/:id", dishsController.update)
// dishsRoutes.put("/:id", dishsController)


module.exports = dishsRoutes