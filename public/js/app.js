console.log('Client side js is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data) => {

        console.log(data)
    })
})

fetch('http://api.weatherstack.com/current?access_key=92f2b65a0b6f52570ded367b580454c9&query=37.8267,-122.4233&units=f').then((response) =>{

    response.json().then((data) => {

        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.current)
        }

    })

})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecast = document.querySelector('.forecast')
const place = document.querySelector('.place')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = search.value
    console.log(location)
    forecast.textContent = 'Loading...'
    place.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{

    response.json().then((data) => {

        if(data.error){
           
            forecast.textContent = data.error
        }else{
           
            forecast.textContent = data.forecast
            place.textContent = data.place
        }

    })

})

})
