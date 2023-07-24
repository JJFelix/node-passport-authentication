import passport from 'passport'
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

export const register = async (req,res, next)=>{
    const { name, email, password, password2 } = req.body

    let errors = []

    // check required fields
    if(!name || !email || !password || !password2){
        errors.push({ message: "Please fill in all fields" })
    }

    // check passwords
    if(password !== password2){
        errors.push({ message: "Passwords do not match" })
    }

    // password length
    if(password.length < 6){
        errors.push({ message: "Password should be atleast 6 characters" })
    }

    if(errors.length > 0){
        res.render('register', {
            errors, name, email, password, password2
        })
    }else{
        //validation pass
        try {
            const existingUser = await User.findOne({ email:email })

            if (!existingUser){
                const hashedPassword = await bcrypt.hash(password, 10)
                
                const newUser = new User({
                    name:name,
                    email:email,
                    password:hashedPassword
                })
                await newUser.save()
                console.log(newUser)
                req.flash('success_message', "You are now registered and can log in")
                res.redirect('login')
                
            }else{
                errors.push({ message: "Email is already registered" })
                res.render('register',{
                    errors, name, email, password, password2
                })                
            }
        } catch (err) {
            console.error(err)  
            return res.status(500).json({ message: "Unexpected error occurred"})
        }       
    }
}

export const login = async (req, res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next)
}