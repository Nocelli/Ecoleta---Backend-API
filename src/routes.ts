import express from 'express'
import knex from './database/connection'

const routes = express.Router()

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*')
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${item.image}`
        }
    })


    return response.json(serializedItems)
})

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        lat,
        lon,
        city,
        uf,
        items
    } = request.body

    const transaction = await knex.transaction()

    const insertedPointId = (await transaction('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        lat,
        lon,
        city,
        uf
    }))[0]

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id: insertedPointId
        }
    })

    await transaction('point_items').insert(pointItems)

    return response.status(201).json({ sucess: true })
})



routes.get('/', (request, response) => {
    return response.json('Hello World!')
})




export default routes