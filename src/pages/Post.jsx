// 게시물 상세보기 페이지입니다.
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost } from "../api/firebase";

export default function Post() {
  const {
    state: { post },
  } = useLocation();
  const { id, name, img, email, info, timestamp } = post;
  const navigate = useNavigate();
  const handleDelete = () => {
    deletePost(id).then(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <img src={img} alt="img" />
      <div>{name}</div>
      <div>{email}</div>
      <div>{info}</div>
      <div>{timestamp.seconds}</div>
      <button onClick={() => navigate(`/update/${id}`)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}
