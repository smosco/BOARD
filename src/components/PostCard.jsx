// 게시물 목록 페이지에서 미리보기 목록 컴포넌트입니다.
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const { id, name, email, img, timestamp } = post;
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={img}
        alt="img"
        onClick={() => navigate(`/${id}`, { state: { post } })}
      />
      <div>{name}</div>
      <div>{email}</div>
      <div>{timestamp.seconds}</div>
      <button onClick={() => navigate(`/update/${id}`)}>수정</button>
      <button>삭제</button>
    </div>
  );
}
