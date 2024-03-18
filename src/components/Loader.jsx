import React from "react";
import { VStack, Box, Spinner, Text } from "@chakra-ui/react";

const Loader = () => {
  return (
    <VStack h="90vh" justifyContent={"center"} alignItems={"center"}>
      <Box transform={"scale(1.5)"}>
        <Spinner size={"xl"} thickness={"5px"} speed="0.55s" />
        <Text fontSize={"12"} fontWeight={"500"}>
          Loading...
        </Text>
      </Box>
    </VStack>
  );
};

export default Loader;
