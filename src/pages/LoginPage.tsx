import { Box, Heading, Input, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token to localStorage
        navigate("/"); // Redirect to home page
        window.location.reload(); // Force reload to update the NavBar
      } else {
        console.error(data.message); // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <Stack spacing={4} width="300px">
        <Heading textAlign="center">Login</Heading>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" width="100%" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
