const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoiam9hbm5hcnU5OCIsImEiOiJja2RrYTFlcnEwbW16MnBydnhwcmF1eHR6In0.Eshv0PTooUsutapp-269OQ&limit=1'

    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Not able to connect to the internet',undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to get weather for location',undefined)
        }

        else{

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitutde: body.features[0].center[0],
                place:body.features[0].place_name
            })
        }

    })

}

module.exports = geocode