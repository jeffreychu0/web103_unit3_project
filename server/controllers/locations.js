// get locations from table

import { pool } from '../config/database.js'

const retrieveAllQuery = `
    SELECT * FROM location ORDER BY location_id ASC;
`

const retrieveLocationByID = `
    SELECT * FROM location WHERE location_id=$1;
`

const getLocations = async (req, res) => {
    try {
        const results = await pool.query(retrieveAllQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getLocationByID = async (req, res) => {

    const locationID = Number(req.params.id)
    try {
        if (Number.isNaN(locationID)) {
            return res.status(400).json({ error: 'Invalid location id' })
        }

        const results = await pool.query(retrieveLocationByID, [locationID])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getLocations,
    getLocationByID
}