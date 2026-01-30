import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("TOKEN =", token);


  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/todos`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Todo added successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message || "Unauthorized or server error"
      );
    }
  };

  return (
    <div style={container}>
      <h2>Add Todo</h2>

      <form onSubmit={handleSubmit}>
        <input
          style={input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          style={textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={btn} type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
}



const container = {
  width: "400px",
  margin: "80px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
};

const textarea = {
  width: "100%",
  padding: "10px",
  height: "80px",
  marginBottom: "15px",
};

const btn = {
  padding: "10px 15px",
  cursor: "pointer",
};
