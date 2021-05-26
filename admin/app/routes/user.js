const router = require("koa-router")();
const config = require("config");
const UserController = require("../controllers/user");

const baseApi = config.get("baseApi");
const modelApi = "user";
router.prefix(`/${baseApi}/${modelApi}`);

router.get("/", UserController.text);

module.exports = router;
