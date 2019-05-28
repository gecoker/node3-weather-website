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
            const humidity = (body.currently.humidity * 100) + '%'
            const tempHigh = weatherToday.temperatureHigh
            const tempLow = weatherToday.temperatureLow
            const tempHighTime = new Date(weatherToday.temperatureHighTime)
            const tempLowTime = new Date(weatherToday.temperatureLowTime)
            const msg1 = `${weatherToday.summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
            const msg2 = `The humidity is ${humidity}. Today's high, ${tempHigh} degrees, will be reached at ${tempHighTime}. Today's low, ${tempLow} degrees, will be reached at ${tempLowTime}.`;
            const msg = msg1 + ' ' + msg2
            callback(undefined, msg)
        }
    })
}

module.exports = forecast