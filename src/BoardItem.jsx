import React from "react";

export default function BoardItem({ board, handleDelete }) {
  const { no, writer, title, date } = board;

  return (
    <tr>
      <td>{no}</td>
      <td>{writer}</td>
      <td>{title}</td>
      <td>{date.toLocaleDateString("ko-KR")}</td>
      <td>
        <button onClick={() => handleDelete(no)}>삭제</button>
      </td>
    </tr>
  );
}
