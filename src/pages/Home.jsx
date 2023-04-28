// 게시글 목록을 보여줍니다.

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/firebase";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Link to="/login">로그인</Link>
      <Link to="/register">회원가입</Link>
      {posts?.map((item) => (
        <PostCard key={item.id} post={item} />
      ))}
    </div>
  );
}
