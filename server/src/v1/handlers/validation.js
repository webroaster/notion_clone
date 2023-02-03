const { validationResult } = require("express-validator")

// バリデーションでエラーがあった場合エラーを返す記述をする必要があるvalidationResult等関数
exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // ミドルウェアを入れる時はnext()を入れる必要がある
  next()
}
