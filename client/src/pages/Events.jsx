import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'

const Events = ({ index }) => {
    const [events, setEvents] = useState([])


    useEffect(() => {
        (async () => {
            try {
                const events = await EventsAPI.fetchEvents()
                setEvents(events)
                console.log(events)
            }
            catch (error) {
                throw error
            }
        })()
    }, [])

    console.log(events)
    return (
        <div className='events'>
            {
            events.map((event, index) =>
            <div>
                <h2>{event.name}</h2>
            </div>)
            }
        </div>
    )
}
export default Events
