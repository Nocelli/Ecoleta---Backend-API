import knex from '../database/connection'
import { Request, Response } from 'express'

class PointsController {
    async create(request: Request, response: Response) {
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

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            lat,
            lon,
            city,
            uf
        }
        const insertedPointId = (await transaction('points').insert(point))[0]
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: insertedPointId
            }
        })

        await transaction('point_items').insert(pointItems)

        return response.status(201).json({ 
            id: insertedPointId,
            ...point
         })
    }

    async show(request: Request, response: Response){
        const { id } = request.params
        const point = await knex('points').select('*').where({id}).first()

        if(!point)
            return response.status(404).json({message: 'Point not found'})

        return response.status(200).json(point)
    }
}

export default PointsController