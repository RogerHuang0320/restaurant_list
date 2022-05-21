const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const RestaurantData = require('../../restaurant.json').results
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(RestaurantData)
  console.log('done')
})