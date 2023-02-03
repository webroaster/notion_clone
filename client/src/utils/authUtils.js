import authApi from "../api/authApi"

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    const token = localStorage.getItem("token")
    if (!token) return false

    try {
      const res = await authApi.verifyToken()
      // APIの戻り値はJWTトークンを持ったユーザー
      return res.user
    } catch {
      return false
    }
  },
}

export default authUtils
