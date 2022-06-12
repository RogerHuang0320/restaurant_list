const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

// 上面的時間標示屬性，是程式語言都有內建的時間處理函式庫
// 如果直接呼叫 Date.now()，會回傳一組時間戳記 (timestamp)
// 如果要轉換成人類看得懂的格式，則可以使用 Date()。

module.exports = mongoose.model('User', userSchema)
