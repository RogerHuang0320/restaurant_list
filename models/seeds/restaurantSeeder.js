if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const RestaurantData = require('../../restaurant.json').results

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt  //為了建立user用的
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })) //create完會回傳一個user，就是下面這個
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        RestaurantData,
        eachRes => {
          eachRes.userId = userId;
          return Restaurant.create(eachRes)
        }))
    })

    .then(() => {
      console.log("restaurantSeeder done!")
      process.exit()
    })
    .catch(err => console.log(err))
  // .finally(() => db.close())  //加上去是為了讓seeder自動關掉
})

db.on('error', () => {
  console.log('mongodb error!')
})