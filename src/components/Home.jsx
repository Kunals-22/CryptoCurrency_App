import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import btc from "../assets/btc2.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box
      bgColor={"blackAlpha.100"}
      w={"full"}
      h={["110vh", "85vh"]}
      overflowX={"hidden"}
      overflowY={"hidden"}
    >
      <Stack alignItems={"center"} direction={["column", "row"]} h={"75vh"}>
        <VStack
          w={["full", "60%"]}
          h={["100vh", "70vh"]}
          justifyContent={"center"}
          mt={["6", "0"]}
          pt={["2", "10"]}
        >
          <Text
            fontWeight={"600"}
            wrap={"wrap"}
            fontSize={"5xl"}
            textAlign={["center"]}
          >
            "Welcome to CryptoCompass,
          </Text>

          <Text
            px={"10"}
            my={"2"}
            fontSize={"lg"}
            textAlign={["center"]}
            wrap={"wrap"}
          >
            Your ultimate destination for navigating the dynamic world of
            cryptocurrencies with real-time information in the fast-paced world
            of digital currencies.We provide live updates on exchanges, ensuring
            you stay ahead of the curve with instant insights into market
            trends, price movements, and trading volumes.
          </Text>
          <HStack spacing={"4"} mt={"4"}>
            <Link to="/coins">
              <Button colorScheme="green">Check Coins</Button>
            </Link>

            <Link to="/exchanges">
              <Button colorScheme="green" variant={"outline"}>
                Exchanges
              </Button>
            </Link>
          </HStack>
        </VStack>

        <motion.div
          animate={{
            translateX: "30px",
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            w={["full", "auto"]}
            src={btc}
            alignContent={"center"}
            mt={["-10px", "0"]}
          />
        </motion.div>
      </Stack>
    </Box>
  );
};

export default Home;
