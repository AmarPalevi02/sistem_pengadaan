import express from "express"
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from "dotenv"


import authRoutes from './src/routes/auth.routes'
import adminRoutes from './src/routes/user.routes'

dotenv.config()
const prot = process.env.PORT
const app = express()

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)



app.listen(prot, () => console.log(`server runing in ${prot}`))