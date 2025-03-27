const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("my-bookings");
});

module.exports = router;
