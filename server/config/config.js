import passport from "passport";
import JwtPassport from "passport-jwt";

import { UserModel } from "../database/allModels";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "process.env.SECRET_KEY",
};

function config(passport) {
  passport.use(
    new JwtStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
}

module.exports = { config };
