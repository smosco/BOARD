import React from "react";

export default function BoardForm({ post, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="writer"
        value={post.writer}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleChange}
      />
      <button type="submit">제출</button>
    </form>
  );
}
