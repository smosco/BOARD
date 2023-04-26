// 게시글 목록을 보여줍니다.

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/firebase";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      {posts?.map((item) => (
        <PostCard key={item.id} post={item} />
      ))}
    </div>
  );
}
