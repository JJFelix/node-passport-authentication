import express from 'express'
import { ensureAuthenticated } from '../config/auth.js'

const router = express.Router()

router.get('/', (req,res)=>{
    res.render('welcome')
})


router.get('/dashboard', ensureAuthenticated, (req,res)=>{
    res.render('dashboard', {
        name:req.user.name
    })
})

export default router