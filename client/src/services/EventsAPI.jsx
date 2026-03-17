const fetchEventById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    const data = await response.json()
    
    return data;
}

const fetchEventByLocation = async (id) => {
    const response = await fetch(`/api/events/location/${id}`)
    const data = await response.json()

    return data;
}

const fetchEvents = async () => {
    const response = await fetch(`/api/events`)
    const data = await response.json()

    return data;
}

export default { fetchEvents, fetchEventByLocation, fetchEventById}