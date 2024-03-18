import { Box, Stack, VStack, Avatar, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.800"}
      color={"whiteAlpha.600"}
      minH={"48"}
      px={"14"}
      py={["16", "8"]}
    >
      <Stack
        color={"white"}
        direction={["column", "row"]}
        h={"full"}
        alignItems={"center"}
      >
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            About Us
          </Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
            w={"80%"}
          >
            This is a best crypto trading app in India, we provide our guidance
            at a very cheap price
          </Text>
        </VStack>

        <VStack textAlign={"center"}>
          <Avatar boxSize={"16"} mt={["4", "0"]} />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
      <Text mt={"4"} pt={"4"} fontSize={"sm"} textAlign={"center"}>
        @ All Copyrights Reserved
      </Text>
    </Box>
  );
};

export default Footer;
