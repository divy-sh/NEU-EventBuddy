// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_ENDPOINT = 'http://localhost:8080';

export default function Transaction(props) {

  const [event, setEvent] = useState([]);
  console.log(event)
  useEffect(async () => {
    await axios.get(`${API_ENDPOINT}/event/get?event_id=${tData.event_id}`)
        .then(function (response) {
          if(response.status == 200) {
            setEvent(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
  [])

  const { tData } = props;
  console.log(tData)
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} p='14px'>
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            fontWeight='500'
            color={textColorPrimary}
            fontSize='sm'
            me='4px'>
            {"Email ID : " + tData.email_id}
          </Text>
          <Text
            fontWeight='500'
            color={textColorPrimary}
            fontSize='sm'
            me='4px'>
            {"Transaction time : " + tData.trans_datetime}
          </Text>
          <Text
            fontWeight='500'
            color={textColorPrimary}
            fontSize='sm'
            me='4px'>
            {"Transaction Status : " + tData.trans_status}
          </Text>
          <Text
            fontWeight='500'
            color={textColorPrimary}
            fontSize='sm'
            me='4px'>
            {"Credit Card : " + tData.trans_datetime}
          </Text>
          <Text
            fontWeight='500'
            color={textColorPrimary}
            fontSize='sm'
            me='4px'>
            {"Event Name : " + event.event_name}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
