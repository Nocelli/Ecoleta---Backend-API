import express, { response } from 'express'

const routes = express.Router()

routes.get('/users', (request, response) => {
    return response.json('Users')
})

routes.get('/', (request, response) => {
    return response.json('Hello World!')
})




export default routes