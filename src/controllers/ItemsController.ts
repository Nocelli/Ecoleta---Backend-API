import knex from '../database/connection'
import { Request, Response } from 'express'

class ItemsController {
    async Index(request: Request, response: Response) {
        const items = await knex('items').select('*')
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${item.image}`
            }
        })


        return response.json(serializedItems)
    }

}

export default ItemsController