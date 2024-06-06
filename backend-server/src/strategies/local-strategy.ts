//@ts-nocheck
import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "../utils/helpers";
import { User } from "../../mongoose/schemas/User";

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    // console.log(findUser);
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username: string, password: string, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, String(findUser.password)))
        throw new Error("Invalid credentials");
      done(null, findUser);
    } catch (err) {
      done(err, false);
    }
  })
);
