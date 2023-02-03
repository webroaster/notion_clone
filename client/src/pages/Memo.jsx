import { IconButton, TextField } from "@mui/material"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Box } from "@mui/system"
import React from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import memoApi from "../api/memoApi"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMemo } from "../redux/features/memoSlice"
import EmojiPicker from "../components/common/EmojiPicker"

const Memo = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const { memoId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const memos = useSelector((state) => state.memo.value)

  // 1件のメモを取得
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId)
        setTitle(res.title)
        setDescription(res.description)
        setIcon(res.icon)
      } catch (err) {
        alert(err)
      }
    }
    getMemo()
  }, [memoId])

  let timer
  const timeout = 500

  // メモのタイトルを更新
  const updateTitle = async (e) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout)
  }

  // メモの説明を更新
  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription })
      } catch (err) {
        alert(err)
      }
    }, timeout)
  }

  // メモの削除
  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId)
      console.log(deletedMemo)

      const newMemos = memos.filter((e) => e._id !== memoId)
      dispatch(setMemo(newMemos))

      if (newMemos.length === 0) {
        navigate("/memo")
      } else {
        navigate(`/memo/${newMemos[0]._id}`)
      }
    } catch (err) {
      alert(err)
    }
  }

  // メモのアイコンを更新
  const onIconChange = async (newIcon) => {
    let temp = [...memos]
    const index = temp.findIndex((e) => e._id === memoId)
    temp[index] = { ...temp[index], icon: newIcon }
    setIcon(newIcon)
    dispatch(setMemo(temp))
    try {
      await memoApi.update(memoId, { icon: newIcon })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton onClick={deleteMemo}>
          <DeleteOutlineIcon variant='outlined' color='error' />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            value={title}
            placeholder='無題'
            variant='outlined'
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": {
                fontSize: "1.6rem",
                fontWeight: "bold",
              },
              marginBottom: "10px",
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description}
            placeholder='追加'
            variant='outlined'
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Memo
