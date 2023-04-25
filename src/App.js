import { useState } from "react";
import "./App.css";
import BoardItem from "./BoardItem";
import BoardForm from "./BoardForm";

function App() {
  const data = {
    num: 2,
    board: [
      {
        no: 1,
        writer: "Lee SunSin",
        title: "If you intend to live then you die",
        date: new Date(),
      },
      {
        no: 2,
        writer: "So SiNo",
        title: "Founder for two countries",
        date: new Date(),
      },
    ],
  };

  const [boards, setBoards] = useState(data.board);
  const [post, setPost] = useState({ no: "", writer: "", title: "", date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBoards([
      ...boards,
      { ...post, no: boards.length + 1, date: new Date() },
    ]);
    setPost({ no: "", writer: "", title: "", date: "" });
  };

  const handleDelete = (no) => {
    setBoards(boards.filter((item) => item.no !== no));
  };

  const handleSelect = () => {};

  return (
    <div>
      <BoardForm
        post={post}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <table>
        <thead>
          <tr>
            <th>no</th>
            <th>writer</th>
            <th>title</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <BoardItem
              key={board.no}
              board={board}
              handleDelete={handleDelete}
              handleSelect={handleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
