const express = require('express')
const { acceptsCharsets } = require('express/lib/request')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
  const userId = req.user._id
  restaurantList.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/restaurants', (req, res) => {
  const userId = req.user._id
  const [property, sortBy] = req.query.sort.split('_')
  restaurantList.find({ userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ [property]: sortBy })
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router
