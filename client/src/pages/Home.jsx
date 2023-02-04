import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import memoApi from "../api/memoApi";
import { useSelector } from "react-redux";

const Home = () => {
  const memos = useSelector((state) => state.memo.value);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(memos);

  useEffect(() => {
    if (memos) {
      navigate(`/memo/${memos[0]._id}`);
    }
  }, []);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      console.log(res);
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

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
        variant="outlined"
        color="success"
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;
