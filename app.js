import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'
import ejsMate from 'ejs-mate'
import mongoose from 'mongoose'
import { MongoURI } from './config/keys.js'
import flash from 'connect-flash'
import session from 'express-session'

import router from './routes/index.js';
import userRouter from './routes/users.js';
import passport from './config/passport.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// DB config
const db = MongoURI
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.error(err))

// EJS middleware
app.use(expressLayouts)
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Express session middleware
app.use(
    session({
      secret: process.env.SECRET || 'secret',
      resave: true,
      saveUninitialized: true
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())  

// GLOBAL VARS
app.use((req,res,next)=>{
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', router)
app.use('/users', userRouter)

// const PORT = process.env.PORT || 5000

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`))