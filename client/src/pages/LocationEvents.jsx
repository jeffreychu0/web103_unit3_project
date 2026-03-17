import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import LocationsAPI from '../services/LocationsAPI'
import { useParams } from 'react-router-dom'
import Events from './Events'
import EventsAPI from '../services/EventsAPI'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
            (async () => {
                try {
                    const getLocation = await LocationsAPI.fetchLocationsByID(index)
                    setLocation(getLocation[0])
                    const getEvents = await EventsAPI.fetchEventByLocation(index)
                    setEvents(getEvents) 

                    console.log(location)
                    console.log("events" + events)
                }
                catch (error) {
                    throw error
                }
            })()
        }, [])
    return (
        <div className='location-events'>
            <header>
                {/* <div className='location-image'>
                    <img src={location.image} />
                </div> */}

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    {/* <p>{location.address}, {location.city}, {location.state} {location.zip}</p> */}
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={index}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents