import { pool } from './database.js'
import './dotenv.js'
import locationData from '../data/locationData.js'

const createTables = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS location CASCADE;
        DROP TABLE IF EXISTS event;

        CREATE TABLE IF NOT EXISTS location (
            location_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS event (
            event_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            date TIMESTAMP NOT NULL,
            location_id INTEGER REFERENCES location(location_id) ON DELETE CASCADE
        );
    `
    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedAllTables = async () => {
    await createTables()

    let id = 1

    for (const location of locationData) {
        const insertLocationQuery = {
            text: 'INSERT INTO location (name) VALUES ($1) RETURNING location_id'
        }

        const locationRes = await pool.query(insertLocationQuery, [location.name])
        const newLocationId = locationRes?.rows?.[0]?.location_id || id
        console.log(`✅ ${location.name} added successfully with id ${newLocationId}`)

        try {
            await addEventFromLocation(location.eventData, newLocationId)
        } catch (err) {
            console.error('⚠️ error adding events', err)
        }

        id += 1
    }
}

const addEventFromLocation = async (eventData, locationID) => {
    for (const event of eventData) {
        const insertQuery = {
            text: 'INSERT INTO event (name, description, date, location_id) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            event.name,
            event.description,
            event.date,
            locationID
        ]

        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${event.name} added successfully for location_id ${locationID}`)
        } catch (err) {
            console.error(`⚠️ error inserting event '${event.name}' for location_id ${locationID}:`, err)
        }
    }
}

seedAllTables()