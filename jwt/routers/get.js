const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
router.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (token) {
        jwt.verify(token, keys.jwtsecret, (err, decode) => {
            if (err) return res.status(403).json("无效的token");
            req.user = decode._doc;
            next();
        })
    } else {
        res.status(403).json("没有找到token");
    }
})


router.get("/", (req, res) => {
    console.log(req.user)
    res.json("jwt验证token成功")
})


module.exports = router;