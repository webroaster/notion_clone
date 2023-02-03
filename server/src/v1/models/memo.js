const mongoose = require("mongoose")
const Schema = mongoose.Schema

const memoSchema = new Schema({
  // ユーザー情報と連携
  user: {
    // ObjectIdはMongoDBのプライマリーキーの名前
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "ここに自由に記入してください。",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
})

// どのファイルでもこのスキーマを使用できる
module.exports = mongoose.model("Memo", memoSchema)
