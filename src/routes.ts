import express from 'express'
import knex from './database/connection'

const routes = express.Router()

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*')
    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${item.image}`
        }
    })


    return response.json(serializedItems)
})

routes.get('/', (request, response) => {
    return response.json('Hello World!')
})




export default routes