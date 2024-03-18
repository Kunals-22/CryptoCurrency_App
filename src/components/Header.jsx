import react from "react";
import { HStack, Button, Heading, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.800"}>
      <HStack w={"60%"} justifyContent={"space-between"} alignItems={"center"}>
        {/* <HStack>
          <Text fontSize={"2xl"} color={"white"}>
            Logo
          </Text>
        </HStack> */}

        <HStack
          ml={["2", "8"]}
          spacing={["4", "12"]}
          justifyContent={"space-between"}
        >
          <Button fontSize={"18"} variant={"unstyled"} color={"white"}>
            <Link to={"/"}>Home</Link>
          </Button>

          <Button fontSize={"18"} variant={"unstyled"} color={"white"}>
            <Link to={"/exchanges"}>Exchanges</Link>
          </Button>

          <Button fontSize={"18"} variant={"unstyled"} color={"white"}>
            <Link to={"/coins"}>Coins</Link>
          </Button>
        </HStack>
      </HStack>
    </HStack>
  );
}

export default Header;
