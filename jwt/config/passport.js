
// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require("mongoose").model("user");
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// module.exports = passport => {
//     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//         User.findOne({id: jwt_payload.id}, (err, user) => {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         });
//     }));
// }