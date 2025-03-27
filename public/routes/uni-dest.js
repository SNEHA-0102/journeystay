const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("uni-dest");
});

module.exports = router;
