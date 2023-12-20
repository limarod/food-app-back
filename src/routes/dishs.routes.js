const {Router, request} = require ("express");
const DishsController = require ("../controllers/DishsController")
const DishImageController = require ("../controllers/DishImageController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require ("../middlewares/verifyUserAuthorization")


const multer = require("multer");
const uploadConfig = require("../configs/upload")


const dishsRoutes = Router();
const upload = multer(uploadConfig.MULTER)



const dishsController = new DishsController()
const dishImageController = new DishImageController()

dishsRoutes.use(ensureAuthenticated)

dishsRoutes.get("/", dishsController.index)
dishsRoutes.get("/:id", dishsController.show)
dishsRoutes.post("/", verifyUserAuthorization("admin"), dishsController.create)
dishsRoutes.put("/:id", verifyUserAuthorization("admin"), dishsController.update)
dishsRoutes.delete("/:id", verifyUserAuthorization("admin"), dishsController.delete)
dishsRoutes.patch("/dishImage/:id", verifyUserAuthorization("admin"), upload.single("dishImage"),  dishImageController.update)
// dishImageController.update 
// dishsRoutes.put("/:id", dishsController)


module.exports = dishsRoutes