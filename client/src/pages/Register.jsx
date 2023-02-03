import { Link, useNavigate } from "react-router-dom"
import { Box, Button, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import React from "react"
import authApi from "../api/authApi"
import { useState } from "react"

const Register = () => {
  const navigate = useNavigate()

  const [usernameErrText, setUsernameErrText] = useState("")
  const [passwordErrText, setPasswordErrText] = useState("")
  const [confirmErrText, setConfirmErrText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameErrText("")
    setPasswordErrText("")
    setConfirmErrText("")

    const data = new FormData(e.target)
    const username = data.get("username").trim()
    const password = data.get("password").trim()
    const confirmPassword = data.get("confirmPassword").trim()
    console.log(username)
    console.log(password)
    console.log(confirmPassword)

    let error = false

    if (username === "") {
      error = true
      setUsernameErrText("名前を入力してください")
    }
    if (password === "") {
      error = true
      setPasswordErrText("パスワードを入力してください")
    }
    if (confirmPassword === "") {
      error = true
      setConfirmErrText("確認用パスワードを入力してください")
    }
    if (password !== confirmPassword) {
      error = true
      setConfirmErrText("パスワードと確認用パスワードが異なります。")
    }

    if (error) return

    setLoading(true)
    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      })
      setLoading(false)
      localStorage.setItem("token", res.token)
      console.log("新規登録に成功")
      navigate("/")
    } catch (err) {
      const errors = err.data.errors
      console.log(errors)
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg)
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg)
        }
        if (err.param === "confirmPassword") {
          setConfirmErrText(err.msg)
        }
      })
      setLoading(false)
    }
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id='username'
          label='お名前'
          name='username'
          type='text'
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
          margin='normal'
        />
        <TextField
          fullWidth
          id='password'
          label='パスワード'
          name='password'
          type='password'
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
          margin='normal'
        />
        <TextField
          fullWidth
          id='confirmPassword'
          label='確認用パスワード'
          name='confirmPassword'
          type='password'
          required
          helperText={confirmErrText}
          error={confirmErrText !== ""}
          disabled={loading}
          margin='normal'
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
          loading={loading}
          color='primary'
          variant='outlined'
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to='/login'>
        ログイン
      </Button>
    </>
  )
}

export default Register
