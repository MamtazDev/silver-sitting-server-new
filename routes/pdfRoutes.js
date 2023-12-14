const express = require("express");
const { changePdfStatus } = require("../controller/pdf.controller");

const router = express.Router();

router.put("/pdfStatus", changePdfStatus);

module.exports = router;
