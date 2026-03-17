const fetchLocations = async () => {
    const response = await fetch(`/api/Locations`)
    const data = await response.json()

    return data;
}

const fetchLocationsByID = async (id) => {
    const response = await fetch(`/api/Locations/${id}`)
    const data = await response.json()

    return data;
}

export default {fetchLocations, fetchLocationsByID};