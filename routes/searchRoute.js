const express = require("express");
const { searchChildCarer } = require("../controller/search.controller");
const { distanceCal } = require("../utils/measureDistance");

const router = express.Router();

router.post("/", searchChildCarer);
router.get("/test", distanceCal);

module.exports = router;
