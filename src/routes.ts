import express from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.Index)
routes.post('/points',pointsController.create)
routes.get('/point/:id',pointsController.show)


export default routes