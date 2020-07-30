const express = require('express')
const app = express()
const port = 5600
const route = require('./routes/route')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(route)

app.listen(port, ()=> console.log(`listening at http://localhost:${port}`))