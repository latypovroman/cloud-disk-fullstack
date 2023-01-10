const { Router } = require("express");
const router = new Router();
const auth = require("../middlewares/auth");
const fileController = require("../controllers/fileController");

router.post("", auth, fileController.createDirectory);
router.get("", auth, fileController.getFiles);

export {};
module.exports = router;
