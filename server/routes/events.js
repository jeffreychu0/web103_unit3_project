import express from 'express'
import eventsController from '../controllers/events.js'

const eventsRouter = express.Router()

// GET /events/
eventsRouter.get('/', eventsController.getEvents)

// GET /events/location?location_id=1 -> events filtered by location_id
eventsRouter.get('/location/:id', eventsController.getEventsByLocation)

// GET /events/:id -> single event by event_id
eventsRouter.get('/:id', eventsController.getEventById)

export default eventsRouter