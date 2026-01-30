import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EditTodo() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        toast.error("Failed to load todo");
      }
    };

    fetchTodo();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${BASE_URL}/todos/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Todo updated");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div style={container}>
      <h2>Edit Todo</h2>

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
          Update Todo
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
