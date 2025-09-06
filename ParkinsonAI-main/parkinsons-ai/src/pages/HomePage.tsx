// src/pages/HomePage.tsx
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Flex,
} from "@chakra-ui/react";

import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { Button, type ButtonProps } from "@chakra-ui/react";

type RouterButtonProps = ButtonProps & LinkProps;

const RouterButton: React.FC<RouterButtonProps> = (props) => {
  return <Button as={RouterLink} {...props} />;
};

export default function HomePage() {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      flexDirection="column"
      maxWidth="100%"
    >
      {/* Header */}
      <Box bg="white" color="white" py={8} textAlign="center" shadow="md">
        <Flex align="center" justify="center" gap={4}>
          {/* Logo */}
          <Image
            src="/src/assets/logo.png" // replace with your logo path
            alt="Logo"
            boxSize="80px" // adjust size
          />

          {/* Heading */}
          <Heading
            size="xl"
            color={"Black"}
            maxWidth="1200px"
            textWrap={"wrap"}
            wordBreak="break-word"
          >
            A Multimodal AI Framework for Parkinson’s Disease Detection and
            Progression Tracking Using Integrated Analysis of Brain Connectomes,
            Voice and Gait Dynamics
          </Heading>
        </Flex>
        <Text mt={2} fontSize="lg" fontWeight="light">
          Brain connectomes • Handwriting • 2D Imaging • Voice Spectrograms
        </Text>
      </Box>

      <Container maxW="6xl" py={10} flex="1">
        {/* About Section */}
        <VStack textAlign="center" mb={10}>
          <Heading size="lg">About the Project</Heading>
          <Text maxW="3xl" color="gray.600">
            Parkinson’s disease affects millions worldwide. Our project combines
            multiple data modalities—brain connectomes, handwriting analysis,
            medical images, and speech signals—to improve early detection and
            progression tracking using AI.
          </Text>
        </VStack>

        {/* Modalities Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} mb={10}>
          {/* Card 1 */}
          <Box
            p={6}
            bg="white"
            shadow="md"
            rounded="lg"
            textAlign="center"
            _hover={{ shadow: "xl" }}
          >
            <Heading size="md" mb={2}>
              🧠 Brain Connectomes
            </Heading>
            <Text color="gray.600" mb={4}>
              Functional brain network analysis using AI models.
            </Text>
            <RouterButton
              as={RouterLink}
              to="/connectomes"
              colorScheme="purple"
            >
              Explore
            </RouterButton>
          </Box>

          {/* Card 2 */}
          <Box
            p={6}
            bg="white"
            shadow="md"
            rounded="lg"
            textAlign="center"
            _hover={{ shadow: "xl" }}
          >
            <Heading size="md" mb={2}>
              ✍️ Handwriting / Scribbles
            </Heading>
            <Text color="gray.600" mb={4}>
              Motor function tracking through stroke patterns.
            </Text>
            <RouterButton as={RouterLink} to="/Scribbles" colorScheme="purple">
              Explore
            </RouterButton>
          </Box>

          {/* Card 3 */}
          <Box
            p={6}
            bg="white"
            shadow="md"
            rounded="lg"
            textAlign="center"
            _hover={{ shadow: "xl" }}
          >
            <Heading size="md" mb={2}>
              🖼️ 2D Medical Images
            </Heading>
            <Text color="gray.600" mb={4}>
              MRI/CT-based imaging biomarkers for Parkinson’s.
            </Text>
            <RouterButton as={RouterLink} to="/images" colorScheme="purple">
              Explore
            </RouterButton>
          </Box>

          {/* Card 4 */}
          <Box
            p={6}
            bg="white"
            shadow="md"
            rounded="lg"
            textAlign="center"
            _hover={{ shadow: "xl" }}
          >
            <Heading size="md" mb={2}>
              🎵 Voice Spectrograms
            </Heading>
            <Text color="gray.600" mb={4}>
              Speech signal analysis for early PD detection.
            </Text>
            <RouterButton
              as={RouterLink}
              to="Spectrograms"
              colorScheme="purple"
            >
              Explore
            </RouterButton>
          </Box>
        </SimpleGrid>

        {/* Pipeline Overview */}
        <Box
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
          textAlign="center"
          mb={10}
        >
          <Heading size="md" mb={2}>
            Pipeline Overview
          </Heading>

          <Image
            src="/src/assets/architecture_diagram.png"
            alt="Pipeline Overview Diagram"
            mx="auto"
            my={4}
            maxW="100%"
            borderRadius="lg"
          />

          <Text fontSize="sm" color="gray.400" mt={2}>
            Architecture Diagram
          </Text>
        </Box>

        {/* Team Section */}
        <Box bg="gray.100" p={6} rounded="lg" textAlign="center">
          <Heading size="md" mb={4}>
            Meet the Team
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
            <Box bg="white" p={4} shadow="sm" rounded="md">
              <Text> Harini Rajam S </Text>
              <Text> (2022506098) </Text>
              <Text> Brain Connectomes </Text>
            </Box>
            <Box bg="white" p={4} shadow="sm" rounded="md">
              <Text> Nandhitha K </Text>
              <Text> (2022506126) </Text>
              <Text> Spectrograms </Text>
            </Box>
            <Box bg="white" p={4} shadow="sm" rounded="md">
              <Text> Shalini K </Text>
              <Text> (2022506066) </Text>
              <Text> Strokes </Text>
            </Box>
            <Box bg="white" p={4} shadow="sm" rounded="md">
              <Text> Mithun Karthikeyan </Text>
              <Text> (2022506086) </Text>
              <Text> 2D Images </Text>
            </Box>
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box bg="purple.600" color="white" p={4} textAlign="center">
        <Text>© 2025 Anna University | Research Demo | Not Medical Advice</Text>
      </Box>
    </Box>
  );
}
