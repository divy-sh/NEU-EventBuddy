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
  const ticketData = props.ticketData;
  console.log(ticketData);
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} ticketData p='14px'>
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Image h='80px' w='80px' src={ticketData} borderRadius='8px' me='20px' />
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight='500'
            fontSize='md'
            mb='4px'>
            {ticketData}
          </Text>
          <Text
            fontWeight='500'
            color={textColorSecondary}
            fontSize='sm'
            me='4px'>
            {ticketData}
            <Link fontWeight='500' color={brandColor} href={ticketData} fontSize='sm'>
              {ticketData}
            </Link>
          </Text>
        </Box>
        <Link
          href={ticketData}
          variant='no-hover'
          me='16px'
          ms='auto'
          p='0px !important'>
          <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
        </Link>
      </Flex>
    </Card>
  );
}
