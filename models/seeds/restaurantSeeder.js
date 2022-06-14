if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const RestaurantData = require('../../restaurant.json').results

const SEED_USER = [{
  email: 'user1@example.com',
  password: '12345678',
  restaurants: [1, 2, 3]
}, {
  email: 'user2@example.com',
  password: '12345678',
  restaurants: [4, 5, 6]
}]

db.once('open', () => {
  return Promise.all(
    Array.from({ length: SEED_USER.length }, (_, i) => {
      return bcrypt //為了建立user用的
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({
          email: SEED_USER[i].email,
          password: hash
        }))
        .then(user => {
          const individualRes = RestaurantData.filter(data => {
            return SEED_USER[i].restaurants.includes(data.id)
          })
          const userId = user._id
          console.log('create each res.')
          return Promise.all(Array.from(
            individualRes,
            eachRes => {
              eachRes.userId = userId;
              return Restaurant.create(eachRes)
            }))
        })
    })
  )
    .then(() => {
      console.log("restaurantSeeder done!")
      process.exit()
    })
    .catch(err => console.log(err))
})

db.on('error', () => {
  console.log('mongodb error!')
})