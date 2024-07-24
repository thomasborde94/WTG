import { Box, Heading, Input, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// stocke les valeurs des champs d'entrée
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Envoie une requête POST à l'endpoint /api/auth/login pour authentifier l'utilisateur.
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // response.json traite la réponse du serveur
      const data = await response.json();
      // response.ok indique que la requête a réussi
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
