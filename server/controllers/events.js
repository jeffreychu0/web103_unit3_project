// get events from table

import { pool } from '../config/database.js'

const retrieveAllQuery = `
    SELECT * FROM event ORDER BY event_id ASC;
`

const retrieveEventsByLocation = `
    SELECT * FROM event WHERE location_id = $1 ORDER BY event_id ASC;
`

const retrieveEventById = `
    SELECT * FROM event WHERE event_id = $1;
`

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(retrieveAllQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const locationId = Number(req.params.id)
        if (Number.isNaN(locationId)) {
            return res.status(400).json({ error: 'Invalid location id' })
        }

        const results = await pool.query(retrieveEventsByLocation, [locationId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const eventId = Number(req.params.id)
        if (Number.isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event id' })
        }

        const results = await pool.query(retrieveEventById, [eventId])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventsByLocation,
    getEventById
}