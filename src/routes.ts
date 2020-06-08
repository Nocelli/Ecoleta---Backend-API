import express from 'express'
import { celebrate, Joi } from 'celebrate'

import multer from 'multer'
import multerConfig from './config/multer'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.Index)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            whatsapp: Joi.number().required(),
            lat: Joi.number().required(),
            lon: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().max(2).required(),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
)



export default routes