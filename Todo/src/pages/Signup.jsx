import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      toast.success(res.data.message || "Signup successful");
      navigate("/login");

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed"
      );
    }
  };
console.log(BASE_URL);

  return (
    <div
      style={{
        width: "360px",
        margin: "90px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        backgroundColor: "#fff"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Signup
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={buttonStyle} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};
