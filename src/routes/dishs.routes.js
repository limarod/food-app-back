const {Router, request} = require ("express");
const DishsController = require ("../controllers/DishsController")
const DishImageController = require ("../controllers/DishImageController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const multer = require("multer");
const uploadConfig = require("../configs/upload")


const dishsRoutes = Router();
const upload = multer(uploadConfig.MULTER)



const dishsController = new DishsController()
const dishImageController = new DishImageController()

dishsRoutes.use(ensureAuthenticated)

dishsRoutes.post("/", dishsController.create)
dishsRoutes.get("/:id", dishsController.show)
dishsRoutes.delete("/:id", dishsController.delete)
dishsRoutes.get("/", dishsController.index)
dishsRoutes.put("/:id", dishsController.update)
dishsRoutes.patch("/dishImage/:id", upload.single("dishImage"), dishImageController.update )
// dishsRoutes.put("/:id", dishsController)


module.exports = dishsRoutes