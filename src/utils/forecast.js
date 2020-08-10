
const request = require('request')
const forecast = (lat,long,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=92f2b65a0b6f52570ded367b580454c9&query=' + lat + ',' + long;

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Could not connect to the internet',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }

        else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelsLikeTemp :body.current.feelslike,
                tempDescription:body.current.weather_descriptions[0],
                forecast:'The temp is '+body.current.temperature+' feels like '+body.current.feelslike+'. It is '+body.current.weather_descriptions[0]+'.'
            })
        }
    })

}

module.exports = forecast