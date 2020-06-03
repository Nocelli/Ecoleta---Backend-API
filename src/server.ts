import express from 'express'
import routes from './routes'

const PORT : Number = 3001


const app = express()
app.use(express.json())
app.use(routes)

app.listen(PORT,() => {
    console.log('\x1b[32m','\n\n\n\t\t\tServer starting!\n',"\x1b[33m",'Port: ' + PORT)
})
