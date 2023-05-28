import dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from 'express';
import fileUpload from 'express-fileupload'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

import swaggerDocument  from './swagger_output.json'
import connectDB from './utils/connect.db';
import AppRouter from './routes/routes';

const PORT = process.env.PORT
const app = express()
const router = new AppRouter(app)

// Express configuration
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    credentials: true,
    origin: true
}))
app.use(fileUpload({
    createParentPath: true
}))

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.init()

app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}...`)
    connectDB()
})
