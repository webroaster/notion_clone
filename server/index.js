const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 5050
require("dotenv").config()
const cors = require("cors")
// http://localhost:5050/

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)
// JSONオブジェクトとして認識する宣言的な？
app.use(express.json())

// エンドポイントのデフォルト定義しておく
app.use("/api/v1", require("./src/v1/routes"))

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL)
  console.log("DBと接続中・・・")
} catch (error) {
  console.log(error)
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・")
})
