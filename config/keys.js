import dotenv from 'dotenv'

dotenv.config()

export const MongoURI = `mongodb+srv://johnsmith96441:${process.env.DB_PASSWORD}@cluster0.m1ojzrb.mongodb.net/?retryWrites=true&w=majority`
