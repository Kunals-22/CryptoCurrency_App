import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <Box h={"130vh"}>
      <Alert
        status="error"
        justifyContent={["center", "flex-start"]}
        // top={"50"}
        left={"50%"}
        transform={"translateX(-50%)"}
        w={"container.lg"}
        mb={"50%"}
      >
        <AlertIcon />
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorComponent;
