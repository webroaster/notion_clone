const User = require("../models/user")
const CryptoJS = require("crypto-js")
const jsonwebtoken = require("jsonwebtoken")

// 新規登録
exports.register = async (req, res) => {
  // パスワードの受け取り
  const password = req.body.password

  try {
    // 暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY)

    // ユーザーの新規作成
    const user = await User.create(req.body)

    // JWTの発行
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    )

    return res.status(200).json({ user, token })
  } catch (err) {
    return res.status(500).json(err)
  }
}

// ログイン
exports.login = async (req, res) => {
  // const { username, password } = req.body;
  const username = req.body.username
  const password = req.body.password

  const user = await User.findOne({ username: username })
  try {
    // DBからユーザーが存在するか検索
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "ユーザーが無効です。",
          },
        ],
      })
    }

    // パスワードの復号
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)

    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です",
          },
        ],
      })
    }

    // JWTの発行
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    )

    return res.status(201).json({ user, token })
  } catch (err) {
    return res.status(500).json(err)
  }
}
