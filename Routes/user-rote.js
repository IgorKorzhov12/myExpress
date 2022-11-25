const Router = require("express").Router;
const UserController = require("../controllers/user-controller.js");
const autorizationMiddleware = require("../middleware/autorizationMiddleware");

const router = new Router();

router.post("/registration", UserController.registrationUser);
router.post("/login", UserController.loginUser);
router.get("/users", autorizationMiddleware, UserController.getUsers);
router.post("/updateacesstoken", UserController.updateAccessToken);


module.exports = router;
