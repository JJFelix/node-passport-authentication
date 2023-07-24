import LocalStrategy from "passport-local"
import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import passport from "passport"

passport.use(
    new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email:email})

            if (!user){
                return done(null, false, {message: "Email is not registered"})
            }

            //compare password
            const comparedPassword = await bcrypt.compare(password, user.password)

            if(!comparedPassword){
                console.error("Passwords do not match");
                return done(null, false, {message:"Passwords do not match"})
            }
            return done(null, user)                
        } catch (err) {
            console.error(err)   
            return done(err)             
        }            
    })
)

passport.serializeUser(function(user, done) {
    done(null, user.id);
    });

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)        
    }
});

export default passport

