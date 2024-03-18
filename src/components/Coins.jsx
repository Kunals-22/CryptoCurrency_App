import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Link } from "react-router-dom";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error while Fetching Coins"} />;

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
                Crypto Coins
              </Heading>
            </HStack>

            {/* Currency Options */}
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={4} justifyContent={["center", "flex-start"]}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"eur"}>EUR</Radio>
                <Radio value={"usd"}>USD</Radio>
              </HStack>
            </RadioGroup>

            {/* CoinCard */}
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((i, index) => (
                <CoinCard
                  key={index}
                  name={i.name}
                  img={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  id={i.id}
                  currencySymbol={currencySymbol}
                />
              ))}
            </HStack>

            {/* Pagination  */}
            <HStack w={"full"} overflowX={"auto"} p={8}>
              {btns.map((item, index) => (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

// ***************** CoinCard function ********************
const CoinCard = ({ id, name, img, symbol, price, currencySymbol }) => (
  <Link to={`/coin/${id}`}>
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
      <Image src={img} w={"16"} h={"16"} objectFit={"cover"} alt={"exchange"} />
      <Heading fontFamily={"Rubik"} textTransform={"uppercase"} size={"md"}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1} color={"green.500"}>
        Price: <strong>{price ? `${currencySymbol}${price}` : "NA"}</strong>
      </Text>
    </VStack>
  </Link>
);

export default Coins;
