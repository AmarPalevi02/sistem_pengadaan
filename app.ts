import express from "express"
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from "dotenv"

import errorHandlerMiddleware from './src/middlewares/error-handler'

import authRoutes from './src/routes/auth.routes'
import adminRoutes from './src/routes/admin.routes'
import employeRoutes from './src/routes/employe.route'
import managerRoutes from './src/routes/manager.routes'
import procurmementRoutes from "./src/routes/procurement.routes"

dotenv.config()

const prot = process.env.PORT
const app = express()

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/ReceivingDocument', express.static('public/ReceivingDocument'));

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/employe', employeRoutes)
app.use('/manager', managerRoutes)
app.use('/procurements', procurmementRoutes)

app.use(errorHandlerMiddleware)

app.listen(prot, () => console.log(`server runing in ${prot}`))