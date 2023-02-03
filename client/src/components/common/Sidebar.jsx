import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import React from "react"
import assets from "../../assets"
import { useNavigate } from "react-router"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import memoApi from "../../api/memoApi"
import { setMemo } from "../../redux/features/memoSlice"
import { useState } from "react"

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { memoId } = useParams()
  const user = useSelector((state) => state.user.value)
  const memos = useSelector((state) => state.memo.value)

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll()
        dispatch(setMemo(res))
      } catch (err) {
        alert(err)
      }
    }
    getMemos()
  }, [dispatch])

  useEffect(() => {
    const activeMemoIndex = memos.findIndex((e) => e._id === memoId)
    setActiveIndex(activeMemoIndex)
  }, [navigate])

  const addMemo = async () => {
    try {
      const res = await memoApi.create()
      const newMemos = [...memos, res]
      dispatch(setMemo(newMemos))
      navigate(`/memo/${res._id}`)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant='body2' fontWeight='bold'>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItemButton>

        <Box sx={{ paddingTop: "10px" }}></Box>

        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant='body2' fontWeight='bold'>
              お気に入り
            </Typography>
            <IconButton></IconButton>
          </Box>
        </ListItemButton>

        <Box sx={{ paddingTop: "10px" }}></Box>

        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant='body2' fontWeight='bold'>
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItemButton>

        {/* メモをDBから呼び出す */}
        {memos.map((item, i) => (
          <ListItemButton
            key={i}
            sx={{ pl: "20px" }}
            component={Link}
            to={`memo/${item._id}`}
            selected={i === activeIndex}
          >
            <Typography
              fontSize='small'
              sx={{
                width: "100%",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                wordBreak: "break-all",
              }}
            >
              {item.icon}
              {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
