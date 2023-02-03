import { Link, useNavigate } from "react-router-dom"
import { Box, Button, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import React from "react"
import authApi from "../api/authApi"
import { useState } from "react"

const Login = () => {
  const navigate = useNavigate()

  const [usernameErrText, setUsernameErrText] = useState("")
  const [passwordErrText, setPasswordErrText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameErrText("")
    setPasswordErrText("")

    const data = new FormData(e.target)
    const username = data.get("username").trim()
    const password = data.get("password").trim()
    console.log(username)
    console.log(password)

    let error = false

    if (username === "") {
      error = true
      setUsernameErrText("名前を入力してください")
    }
    if (password === "") {
      error = true
      setPasswordErrText("パスワードを入力してください")
    }

    if (error) return

    setLoading(true)
    // ログインAPIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      })
      setLoading(false)
      localStorage.setItem("token", res.token)
      console.log("ログインに成功")
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

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
          loading={loading}
          color='primary'
          variant='outlined'
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to='/register'>
        新規登録
      </Button>
    </>
  )
}

export default Login
