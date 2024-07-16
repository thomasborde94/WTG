// src/components/Footer.js
import { Box, Flex, Heading, Link, Icon } from "@chakra-ui/react";
import { FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" py={10} bg="gray.800" color="white">
      <Flex direction="column" align="center" mb={4}>
        <Heading as="h3" size="lg" mb={4}>
          Contact
        </Heading>
        <Flex>
          <Link
            href="https://www.youtube.com/@bordethomas9253"
            isExternal
            mx={2}
          >
            <Icon as={FaYoutube} boxSize={6} />
          </Link>
          <Link href="https://github.com/thomasborde94" isExternal mx={2}>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/thomas-borde94/"
            isExternal
            mx={2}
          >
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
