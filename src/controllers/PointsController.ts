import knex from '../database/connection'
import { Request, Response } from 'express'

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', { 'point_items.point_id': 'points.id' })
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .select('points.*')
            .groupBy('points.id')

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${point.image}`
            }
        })


        return response.status(200).json(serializedPoints)
    }

    async create(request: Request, response: Response) {
        try {
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
                image: request.file.filename,
                name,
                email,
                whatsapp,
                lat,
                lon,
                city,
                uf
            }
            const insertedPointId = await transaction('points').insert(point)
            const pointItems = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((item_id: number) => {
                    return {
                        item_id,
                        point_id: insertedPointId[0]
                    }
                })

            await transaction('point_items').insert(pointItems)
            await transaction.commit()

            return response.status(201).json({
                id: insertedPointId[0],
                ...point
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params
        const point = await knex('points').select('*').where({ id }).first()
        if (!point)
            return response.status(404).json({ message: 'Point not found' })

        const items = await knex('items').select('items.title')
            .join('point_items', { 'point_items.item_id': 'items.id' })
            .where('point_items.point_id', id)

        const serializedPoint = {
            ...point,
            image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${point.image}`
        }

        return response.status(200).json({ point: serializedPoint, items })
    }
}

export default PointsController