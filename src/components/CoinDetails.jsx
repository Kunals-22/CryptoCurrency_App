import {
  Container,
  Box,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
  Stack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setchartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        break;

      case "7d":
        setDays("7d");
        break;

      case "14d":
        setDays("14d");
        break;

      case "30d":
        setDays("30d");
        break;

      case "60d":
        setDays("60d");
        break;

      case "200d":
        setDays("200d");
        break;

      case "365d":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        break;

      default:
        setDays("24h");
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setchartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Coin Details"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text
            fontSize={"small"}
            textAlign={"center"}
            // alignSelf={"center"}
            opacity={0.7}
            mt={"4"}
          >
            Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
          </Text>

          <Box mt={"4"} w={"full"} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          {/* Button */}
          <Stack
            direction={["column", "row"]}
            alignItems={"baseline"}
            justifyContent={"space-between"}
          >
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={4} justifyContent={["center", "flex-start"]}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"eur"}>EUR</Radio>
                <Radio value={"usd"}>USD</Radio>
              </HStack>
            </RadioGroup>

            <HStack
              mt={"4"}
              wrap={"wrap"}
              justifyContent={["center", "flex-start"]}
            >
              {btns.map((btn, index) => (
                <Button key={index} onClick={() => switchChartStats(btn)}>
                  {btn}
                </Button>
              ))}
            </HStack>
          </Stack>

          <VStack
            spacing={"4"}
            p={["4", "16"]}
            alignItems={["center", "flex-start"]}
            mt={["10", "-6"]}
          >
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat alignItems={"center"}>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"}>{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={4}>
              <Item
                title={"Max Supply"}
                value={coin.market_data.max_supply}
              ></Item>

              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              ></Item>

              <Item
                title={"Market Capital"}
                value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
              ></Item>

              <Item
                title={"All Time Low "}
                value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
              ></Item>

              <Item
                title={"All Time High "}
                value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
              ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Rubik"} fontWeight={"600"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={30} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails;
