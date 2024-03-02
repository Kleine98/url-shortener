const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlsController");

router.route("/").post(urlController.shortenUrl);
router.route("/:shortUrl").get(urlController.redirectToLongUrl);

module.exports = router;
