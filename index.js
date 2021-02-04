//gives us access to variables in our .env
require('dotenv').config()

// see variables using process.env
// console.log(process.env)
// console.log(process.env.API_KEY)

const express = require('express')
const app = express()
const axios = require('axios')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//middleware
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

//routes
// app.get('/', (req,res) =>{
//     res.send('Hi Buddy')
// })

// app.get('/omdb', (req,res)=>{
//     const qs={
//         params: {
//             s: 'star wars',
//             apikey: process.env.API_KEY
//         }
//     }
//     axios.get('http://www.omdbapi.com', qs)
//     .then(response =>{
//         console.log(response.data)
//     })
// })

//with swapi
app.get('/swapi/search', (req,res)=>{
    res.render('search')
})

app.get('/swapi/show', (req,res)=>{
    console.log(`ya made it :)`)
    console.log('query', req.query)
    //basic api call to get a person from the database
    axios.get(`https://swapi.dev/api/people/${req.query.personId}`)
    .then((response)=>{
        //response.data is where the data lives with axios
        console.log(response.data)
        //make a person object
        const person = {
            name: response.data.name,
            birth: response.data['birth_year'],
            home: response.data.homeworld
        }
        res.render('show', person)
    })
})

//hosting
const PORT = process.env.PORT || 8888
app.listen(PORT, console.log(`listening @ ${PORT}`))
