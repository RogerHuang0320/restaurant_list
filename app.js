require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
const routes = require('./routes')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})