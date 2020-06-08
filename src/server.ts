import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { errors } from 'celebrate'

dotenv.config({
    path: './.env'
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(errors())

app.listen(process.env.PORT, () => {
    console.log('\x1b[32m', '\n\n\n\t\t\tServer starting!\n', "\x1b[33m", 'Port: ' + process.env.PORT)
})
