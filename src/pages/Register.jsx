import React, { useState } from "react";
import { register } from "../api/firebase";

export default function Register() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(user);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          value={user.displayName}
          placeholder="display name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button> 회원가입</button>
      </form>
    </div>
  );
}
