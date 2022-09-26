const passport = require("passport");
import env from '../../env/index.js';
import User from '../models/User.model.js';

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const LocalStrategy = require("passport-local").Strategy;

const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require('passport-facebook-token');

const { access_token_serret } = env.jwt
const { google, facebook } = env.auth


// Passport Jwt
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
            secretOrKey: access_token_serret,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.userId);

                if (!user) return done(null, false);

                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

// Passport Google
passport.use(
    new GooglePlusTokenStrategy(
        {
            clientID: google.CLIENT_ID,
            clientSecret: google.CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log({ accessToken })
                // console.log({ refreshToken })
                // console.log({ profile, email: profile.emails[0].value, photo: profile.photos[0].value })

                // kiểm tra xem người dùng hiện tại này có tồn tại trong cơ sở dữ liệu hay không
                const user = await User.findOne({
                    authGoogleID: profile.id,
                    authType: "google",
                });

                if (user) return done(null, user)

                // Nếu tài khoản mới
                const newUser = new User({
                    authType: 'google',
                    authGoogleID: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                })

                await newUser.save()

                done(null, newUser)
            } catch (error) {
                console.log('error ', error)
                done(error, false);
            }
        }
    )
);

// // Passport Facebook
passport.use(
    new FacebookTokenStrategy(
        {
            clientID: facebook.CLIENT_ID,
            clientSecret: facebook.CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log({ accessToken })
                // console.log({ refreshToken })
                console.log({ profile, email: profile.emails[0].value, photo: profile.photos[0].value })

                // kiểm tra xem người dùng hiện tại này có tồn tại trong cơ sở dữ liệu hay không
                const user = await User.findOne({
                    authFacebookID: profile.id,
                    authType: "facebook",
                });

                if (user) return done(null, user)

                // If new account
                const newUser = new User({
                    authType: 'facebook',
                    authFacebookID: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                })

                await newUser.save()

                done(null, newUser)
            } catch (error) {
                console.log('error ', error)
                done(error, false);
            }
        }
    )
);

// Passport local
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) return done(null, false);

                const isCorrectPassword = await user.isCheckPassword(password);

                if (!isCorrectPassword) return done(null, false);

                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
