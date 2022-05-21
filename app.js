const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
require('dotenv').config()
const app = express()
const port = 3000
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }) // 設定連線到 mongoDB
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }
  const keyword = req.query.keywords
  const keywords = req.query.keywords.trim().toLowerCase()
  const filteredRestaurants = restaurantList.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(keywords) ||
      restaurant.category.includes(keywords)
  )
  console.log(filteredRestaurants)
  res.render('index', { restaurants: filteredRestaurants, keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})