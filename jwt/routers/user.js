const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../model/User");

const keys = require("../config/keys");

/** 注册 */
router.post("/register", async (req, res) => {
    let username = req.body.username;
    let data = await User.findOne({username});
    if (data) return res.json({message: "用户名已存在"});
    // bcrypt加密
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            new User({...req.body, password: hash}).save((err, info) => {
                res.json({...info, code: 0});
            });   
        });
    });
})

/** 登录 */
router.post("/login", async (req, res) => {
    let {username, password} = req.body;
    let info = await User.findOne({username});
    if (!info) return res.json({code: 1, msg: "用户不存在"});
    //对比密码
    bcrypt.compare(password, info.password, function(err, resp) {
        // res == true
        if (err) throw err;
        if (!resp) return res.json({code: 1, msg: "密码错误"});
        const rule = {...info}; //规则
        let token = jwt.sign(rule, keys.jwtsecret, {expiresIn: 3600});
        res.json({code: 0, token, info});
    });
});

// router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
//     res.json(req.user);
// })

router.get("/test",  (req, res) => {
    res.json("aaa")
})




module.exports = router;