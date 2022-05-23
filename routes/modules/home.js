const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }
  const keyword = req.query.keywords
  const keywords = req.query.keywords.trim().toLowerCase()
  restaurantList.find({})
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keywords) ||
          restaurant.category.includes(keywords)
      )
      res.render('index', { restaurants: filteredRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

router.get('/restaurants', (req, res) => {
  const sort = req.query.sort
  let sortby = null
  switch (sort) {
    case '1':
      sortby = { name: 'asc' }
      break
    case '2':
      sortby = { name: 'desc' }
      break
    case '3':
      sortby = { category: 'asc' }
      break
    case '4':
      sortby = { location: 'asc' }
      break
  }
  restaurantList.find() // 取出 Model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort(sortby)
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router
