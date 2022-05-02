// app.js
// require packages used in the project
const express = require('express')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static file
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const restaurantname = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  const restauranttype = restaurantList.results.filter((restaurant) => {
    return restaurant.category.includes(req.query.keyword)
  })
  let restaurants = restaurantname.length ? restaurantname : restauranttype
  res.render('index', {
    restaurants: restaurants, keyword: req.query.keyword
  })


})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})