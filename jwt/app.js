const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
// const passport = require("passport");
const app = express();


/** 连接数据库 */
mongoose.connect(keys.url, { useNewUrlParser: true }, err => {
    if (err) throw err;
    console.log("数据库连接成功");
})

/** cors跨域配置 */
app.use(cors({
    origin:['http://localhost:8080'],
    methods: '*',
    alloweHeaders: '*'
}))

/** post请求配置 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** 路由配置*/
app.use("/user", require("./routers/user"));
app.use("/get", require("./routers/get"));

/** 配置passport */
// app.use(passport.initialize());
// require("./config/passport")(passport);

/** 端口设置 */
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
})
