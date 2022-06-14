const express = require('express')
const { acceptsCharsets } = require('express/lib/request')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

router.get('/', (req, res) => {
  if (!req.query.keywords) {
    console.log("this is keywords:" + req.query.keywords)
    return res.redirect('/')
  }
  const keyword = req.query.keywords
  const $regex = new RegExp(keyword.trim(), 'i')
  restaurantList.find({
    $or: [
      {
        name: { $regex },
      }, {
        category: { $regex },
      }
    ]
  })
    .lean() //.or({ category: keywords }
    .then(rows => {
      return res.render('index', { restaurants: rows, keyword })
    })
    .catch(error => console.log(error))
})

// router.get('/search', (req, res) => {
//   if (!req.query.keywords) {
//     return res.redirect('/')
//   }
//   const keyword = req.query.keywords
//   const keywords = req.query.keywords.trim().toLowerCase()
//   restaurantList.find({})
//     .lean()
//     .then(restaurants => {
//       const filteredRestaurants = restaurants.filter(
//         restaurant =>
//           restaurant.name.toLowerCase().includes(keywords) ||
//           restaurant.category.includes(keywords)
//       )
//       return res.render('index', { restaurants: filteredRestaurants, keyword })
//     })
//     .catch(error => console.log(error))
// })

module.exports = router