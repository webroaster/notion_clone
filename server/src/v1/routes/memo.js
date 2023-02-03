const router = require("express").Router()
const memoController = require("../controllers/memo")
const tokenHandler = require("../handlers/tokenHandler")

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create)

// ログインユーザーのメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll)

// ログインユーザーのメモを1件取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne)

// メモを更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update)

// メモを削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete)

module.exports = router
