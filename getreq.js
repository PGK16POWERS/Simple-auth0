const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/private", (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'public', "private.html", req.oidc.isAuthenticated()));
});

module.exports = router;