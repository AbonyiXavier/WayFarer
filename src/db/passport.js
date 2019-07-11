// import JwtStrategy from 'passport-jwt';
// import dotenv from 'dotenv';
// import Queries from '../helpers/queries';
// import db from '../helpers/db';

// const { Strategy, ExtractJwt } = JwtStrategy;
// dotenv.config();

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRETKEY;
// module.exports = (passport) => {
//   passport.use(
//     new Strategy(opts, async (jwtPayLoad, next) => {
//       const args = [jwtPayLoad.email, jwtPayLoad.password];
//       const { rows } = await db.Query(Queries., args);
//       const user = rows[0];
//       if (user) {
//         next(null, user);
//       } else {
//         next(null, false);
//       }
//     }),
//   );
// };
