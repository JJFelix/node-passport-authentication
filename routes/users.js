import express from 'express'
import { login, register } from '../controllers/user-controller.js'
import flash from 'connect-flash'


const userRouter = express.Router()

userRouter.get('/login', (req,res)=>{
    res.render('login')
})

userRouter.get('/register', (req,res)=>{
    res.render('register')
})

userRouter.post('/register', register)
userRouter.post('/login', login)

userRouter.use(flash())
userRouter.get('/logout', (req,res,next)=>{
    req.logout(() =>{

    })
    req.flash('success_message', 'You have been logged out')
    res.redirect('/users/login')
})

export default userRouter