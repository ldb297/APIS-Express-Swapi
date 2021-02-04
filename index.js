//gives us access to variables in our .env
require('dotenv').config()

// see variables using process.env
// console.log(process.env)
// console.log(process.env.API_KEY)

const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//middleware
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

//routes
app.get('/', (req,res) =>{
    res.send('Hi Buddy')
})

//hosting
const PORT = process.env.PORT || 8888
app.listen(PORT, console.log(`listening @ ${PORT}`))
