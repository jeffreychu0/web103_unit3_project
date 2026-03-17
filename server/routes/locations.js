import express from 'express'
import locationsController from '../controllers/locations.js'

const locationsRouter = express.Router()

// GET /locations
locationsRouter.get('/', locationsController.getLocations)

// GET /locations/:id
locationsRouter.get('/:id', locationsController.getLocationByID)

export default locationsRouter