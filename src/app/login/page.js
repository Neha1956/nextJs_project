"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import {
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";

function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      login(response.data.token);

      localStorage.setItem("token", response.data.token);

      alert("Login successful");
      router.push("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        mt: "10em",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 5,
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        Login
      </Typography>

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={formData.username}
        onChange={(e) =>
          setFormData({
            ...formData,
            username: e.target.value,
          })
        }
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />

      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          mt: 3,
          p: 2,
          fontSize: 16,
          width: "50%",
          display: "block",
          mx: "auto",
        }}
      >
        Login
      </Button>
    </Container>
  );
}

export default Login;