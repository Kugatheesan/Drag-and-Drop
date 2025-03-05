import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/api/users/admin", 
       { username, password },
       {withCredentials:true}
      );

      const { token } = response.data;

      localStorage.setItem("token", token);
      setIsAuthenticated(true); // Set the user as authenticated
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="signin-shape">
      <div className="signin-box">
        <h3>Admin Sign in</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <br /><br />
          <button type="submit" className="signin-btn">Sign in</button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default Login;
