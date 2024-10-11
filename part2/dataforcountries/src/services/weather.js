import axios from 'axios'

const getWeather = (lat, long) => {
    const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
    console.log(baseUrl)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {getWeather}