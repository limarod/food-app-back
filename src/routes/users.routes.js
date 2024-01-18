const {Router} = require ("express");
const UsersController = require ("../controllers/UsersController")
const UsersControllerValidated = require ("../controllers/UsersControllerValidated")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const usersRoutes = Router();


const usersController = new UsersController()
const usersControllerValidated = new UsersControllerValidated()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
// usersRoutes.put("/",  usersController.update)
usersRoutes.get("/validated", ensureAuthenticated, usersControllerValidated.index)


module.exports = usersRoutes