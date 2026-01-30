import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Dashboard({ toggleTheme, dark }) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/todos?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setTodos(res.data.todos || res.data.data || []);
    } catch (err) {
      setTodos([]);
      toast.error("Failed to load todos");
    }
  };



  useEffect(() => {
    fetchTodos();
  }, [page, search, token]);



  useEffect(() => {
    setPage(1);
  }, [search]);


  const deleteTodo = async (id) => {
    await axios.delete(`${BASE_URL}/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };


  const toggleTodo = async (todo) => {
    await axios.put(
      `${BASE_URL}/todos/${todo._id}`,
      { isCompleted: !todo.isCompleted },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTodos();
  };


  const markAllCompleted = async () => {
    await Promise.all(
      todos.map((todo) =>
        axios.put(
          `${BASE_URL}/todos/${todo._id}`,
          { isCompleted: true },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      )
    );
    fetchTodos();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={container}>
      <div style={topBar}>
        <h2>Dashboard</h2>
        <button
          style={{
            padding: "8px 12px",
            backgroundColor: dark ? "#374151" : "#e5e7eb",
            color: dark ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={toggleTheme}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <div style={actionBar}>
        <button style={btn} onClick={() => navigate("/add")}>
          Add Todo
        </button>

        <button style={btn} onClick={markAllCompleted}>
          Mark All Completed
        </button>

        <input
          style={searchInput}
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {todos.length === 0 && <p>No todos found</p>}

      {todos.map((todo) => (
        <div key={todo._id} style={todoCard}>
          <h4
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </h4>

          <p>{todo.description}</p>

          <div>
            <button
              style={{ ...smallBtn, backgroundColor: "#2563eb", color: "#fff" }}
              onClick={() => navigate(`/edit/${todo._id}`)}
            >
              Edit
            </button>

            <button
              style={smallBtn}
              onClick={() => toggleTodo(todo)}
            >
              Toggle
            </button>

            <button
              style={{ ...smallBtn, backgroundColor: "#dc2626", color: "#fff" }}
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}

      <div style={pagination}>
        <button
          style={btn}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>

        <span> Page {page} </span>

        <button style={btn} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}



const container = {
  width: "700px",
  margin: "40px auto",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const actionBar = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const btn = {
  padding: "8px 12px",
  cursor: "pointer",
};

const logoutBtn = {
  padding: "8px 12px",
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const searchInput = {
  flex: 1,
  padding: "8px",
};

const todoCard = {
  border: "1px solid #ccc",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "5px",
};

const smallBtn = {
  marginRight: "10px",
  padding: "6px 12px",
  cursor: "pointer",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  transition: "0.2s",
};


const pagination = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};
