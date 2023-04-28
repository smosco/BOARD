import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/add");
    } else {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  };
  return (
    <div>
      <div>Board</div>
      {user ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <Link to="/login">로그인</Link>
      )}
      {!user && <Link to="/register">회원가입</Link>}
      {user && <p>{user.displayName}님</p>}
      <button onClick={handleClick}>write</button>
      <Link to="/mypage">마이페이지</Link>
    </div>
  );
}
