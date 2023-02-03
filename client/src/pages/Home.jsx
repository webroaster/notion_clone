import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import React, { useState } from "react"
import memoApi from "../api/memoApi"

const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const createMemo = async () => {
    try {
      setLoading(true)
      const res = await memoApi.create()
      console.log(res)
      navigate(`/memo/${res._id}`)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant='outlined'
        color='success'
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  )
}

export default Home
