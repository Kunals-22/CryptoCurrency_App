import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rank, setRank] = useState("10");

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/exchanges?per_page=${rank}`
        );
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [rank]);

  if (error)
    return <ErrorComponent message={"Error while Fetching Exchanges"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Header */}
            <HStack w={"full"} my={"8"} justifyContent={"center"}>
              <Heading fontFamily={"Rubik"} size={"2xl"}>
                Exchanges
              </Heading>
            </HStack>

            {/* Rank Options */}
            <RadioGroup value={rank} onChange={setRank} p={"8"}>
              <HStack
                spacing={["8", "4"]}
                justifyContent={["center", "flex-start"]}
              >
                <Radio value={"10"}>Top 10</Radio>
                <Radio value={"25"}>Top 25</Radio>
                <Radio value={"100"}>Top 100</Radio>
              </HStack>
            </RadioGroup>

            {/* Card */}
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {exchanges.map((i, index) => (
                <ExchangeCard
                  key={index}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      padding={8}
      borderRadius={"xl"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} w={"10"} h={"10"} objectFit={"cover"} alt={"exchange"} />
      <Heading size={"md"}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
