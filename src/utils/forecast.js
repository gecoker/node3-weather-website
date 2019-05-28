const request = require('request')

const darkskyForecastUrl = 'https://api.darksky.net/forecast/b36152e50e2222649dc22491fd198492/'

const forecast = (lat, long, callback) => {
    var url = `${darkskyForecastUrl}${lat},${long}`
    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to the weather sevice. :(', undefined)
        } else if (body.error){
            callback(body.error, undefined)
        } else {
            const weatherToday = body.daily.data[0]
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const msg = `${weatherToday.summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
            callback(undefined, msg)
        }
    })
}

module.exports = forecast