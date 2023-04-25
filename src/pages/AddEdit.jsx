// 추가하고 수정하는 페이지입니다.

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../api/firebase";
import { uploadImage } from "../api/uploader";

const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};

export default function AddEdit() {
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "file"
      ? setFile(e.target.files[0])
      : setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewPost(data, url).then(() => {
          setSuccess("글이 등록되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        });
      })
      .finally(() => {
        setIsUploading(false);
        navigate("/");
      });
  };
  return (
    <div>
      {success && <p>✅{success}</p>}
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={data.email}
          placeholder="email"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="info"
          value={data.info}
          placeholder="info"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          value={data.contact}
          placeholder="contact"
          required
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          onChange={handleChange}
        />
        <button disabled={isUploading}>등록</button>
      </form>
    </div>
  );
}
