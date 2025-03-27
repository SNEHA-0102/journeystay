const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("special-deals");
});

module.exports = router;
