import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Board</div>
      <button onClick={() => navigate("/add")}>write</button>
    </div>
  );
}
