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
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";

export default function Ticket(props) {
  const {tData} = props;
  console.log(JSON.stringify(tData));
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} p='14px'>
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            fontWeight='500'
            fontSize='sm'
            me='4px'>
            {'Ticked ID : ' + tData.ticket_id}
          </Text>
          <Text
            fontWeight='500'
            fontSize='sm'
            me='4px'>
            {'Name on Ticket : ' + tData.ticket_user_name}
          </Text>
          <Text
            fontWeight='500'
            fontSize='sm'
            me='4px'>
            {'ID Proof Provided : ' + tData.id_proof}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
