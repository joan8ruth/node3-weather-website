const path = require('path')

const express = require('express')
const hbs  = require('hbs')
const { response } = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {

    res.render('index',{
        title: 'Weather App',
        name:'Joanna'
    })
})

app.get('/about',(req,res) => {

    res.render('about',{
        title:'About',
        name: 'Joanna Ruth'
    })
})

app.get('/help', (req,res) => {

    res.render('help', {
        title: 'Helpful text',
        name: 'Ruth'
    })

})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error:'You must enter an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitutde, place} ={} ) => {
    
        if(error){
           return res.send({
                error
            })
        }
        forecast(latitude,longitutde, (error, {temperature,feelsLikeTemp,tempDescription,forecast} ={}) => {

            if(error)
            {
               return res.send({
                    error:'You must enter an address'
                })
            }

            res.send({
                // forecast: 'Cloudy',
                // location:'Philadelphia',
                address: req.query.address,
                temperature,
                feelsLikeTemp,
                tempDescription,
                forecast
            })
        })
    })

})


app.get('/help/*', (req,res) => {

    res.render('404',{
        title:'404',
        name:'Joanna',
        errormessage:'Help article not found'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Joanna',
        errormessage:'Page not found'

    })

})

app.listen(port, () => {
    console.log('Server is up on port '+ port +'!')
})

// app.get('', (req, res ) => {

//     res.send('<h1>Weather</h1>')

// })

// app.get('/help', (req,res) => {

//     res.send([{
//         name: 'Joanna',
//         age:22
//     },{
//         name:'Andrew',
//         age:27
//     }])
// })

// app.get('/about', (req,res) => {

//     res.send('<h1>About</h1>')
// })

