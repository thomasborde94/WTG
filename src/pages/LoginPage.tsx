// src/pages/LoginPage.tsx
import { Box, Heading, Input, Button, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importation du hook

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth(); // Utilisation du hook

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
        login(); // Met à jour le contexte pour indiquer que l'utilisateur est connecté
        navigate("/"); // Redirect to home page
        // window.location.reload(); // Plus besoin de recharger la page
      } else {
        toast({
          title: "Login failed",
          description: data.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error(data.message);
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
