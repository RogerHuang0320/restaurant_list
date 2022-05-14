// app.js
// require packages used in the project
const express = require('express')
const restaurantList = require('./restaurant.json').results
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
  res.render('index', { restaurants: restaurantList })
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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})