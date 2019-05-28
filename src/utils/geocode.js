const request = require('request')

const mapboxAccessToken = 'pk.eyJ1IjoiZ3JhZHljb2tlciIsImEiOiJjancxMmM5MW0waGcwNDlxdmV6Ym9uZTRvIn0.ek7nlrhJyY_5nJ6iYYW-iA'
const mapboxGeocodingEndpoinUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapboxSearchLimit = 1
const geocode = (address, callback) => {
    const mapboxSearchTerm = encodeURIComponent(address)
    const url = `${mapboxGeocodingEndpoinUrl}${mapboxSearchTerm}.json?limit=${mapboxSearchLimit}&access_token=${mapboxAccessToken}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location service. :(', undefined)
        } else if (body.features.length === 0) {
            callback('No valid results for given search: ' + address + ' :(' , undefined)
        } else {
            const feature = body.features[0]
            callback(undefined, {
                lat: feature.center[1],
                long: feature.center[0],
                location: feature.place_name
            })            
        }
    })
}

module.exports = geocode