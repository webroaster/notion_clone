const router = require("express").Router()
require("dotenv").config()
const { body } = require("express-validator")

const User = require("../models/user")
const validation = require("../handlers/validation")
const userController = require("../controllers/user")

const tokenHandler = require("../handlers/tokenHandler")

// ユーザー新規登録API
router.post(
  "/register",
  // バリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります。"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります。"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります。"),
  body("username").custom(async (value) => {
    const user = await User.findOne({ username: value })
    if (user) {
      return Promise.reject("このユーザーは既に使用されています。")
    }
  }),
  // 分割したバリデーションなどを呼び出す
  validation.validate,
  userController.register
)

// ログインAPI
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザーネームは8文字以上である必要があります。"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります。"),

  validation.validate,

  userController.login
)

// JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user })
})

module.exports = router
