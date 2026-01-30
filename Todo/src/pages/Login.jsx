import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const token = res.data.token || res.data.data?.token;
      const user = res.data.user || res.data.data?.user;

      if (!token) {
        toast.error("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");
      navigate("/dashboard", { replace: true });

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8"
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "24px",
            fontWeight: "600"
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Login
          </button>
        </form>

        
        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            fontSize: "14px",
            color: "#555"
          }}
        >
          New user?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
