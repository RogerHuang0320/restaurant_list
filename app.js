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
  const keywords = req.query.keywords.trim().toLowerCase()

  const filterRestaurantsData = restaurantList.filter(
    (data) => {
      data.name.toLowerCase().includes(keywords) ||
        data.category.includes(keywords)
    })
  res.render('index', {
    restaurants: filterRestaurantsData, keyword: req.query.keyword
  })


})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
  console.log(keywords)
})