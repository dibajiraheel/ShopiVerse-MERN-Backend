import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../../config.js";

passport.use(new GoogleStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: "https://shopiverse-by-raheel.onrender.com/auth/google/redirect"
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('PROFILE RECEIVED', profile)
    const userInfo = {
        'userName': profile.displayName,
        'email': profile.emails[0].value,
        'profilePicUrl': profile.photos[0].value,
        'signupVia': 'google',
        }
    done(null, userInfo)
}))

export default passport

