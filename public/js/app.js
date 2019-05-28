console.log('Client side js loading, yo!')

const address = 'Gold Beach, OR'

function fetchForecast(address) {
    var forecast

    return forecast
}

const weatherForm = document.querySelector('form')
const addressInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    setText('', '')
    const address = addressInput.value
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                setText('Error: ' + data.error, '')
            } else {
                setText('Location: ' + data.location, 'Forecast: ' + data.forecast)
            }
        })
    })
})

function setText(one, two) {
    messageOne.textContent = one
    messageTwo.textContent = two
}