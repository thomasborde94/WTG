import { Box, Heading, Input, Button, Stack, useToast } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// stocke les valeurs des champs d'entrée
const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // permets de naviguer vers une autre page
  const navigate = useNavigate();
  // affichage popup
  const toast = useToast();

  // check si la verif password est bonne
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure the passwords match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Envoie une requête POST à l'endpoint /api/auth/signup pour créer un nouvel utilisateur avec l'email et le mot de passe fournis.
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Account created.",
          description: "You can now log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <Stack spacing={4} width="300px">
        <Heading textAlign="center">Create Account</Heading>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="blue" width="100%" onClick={handleSubmit}>
          Create Account
        </Button>
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="blue"
          variant="link"
          width="100%"
        >
          Already have an account? Login
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateAccountPage;
