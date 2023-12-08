// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Transaction from "views/admin/profile/components/Transaction";

export default function Tickets(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        All Transactions
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Here you can find all of your purchased tickets, for previous, as well as upcoming events.
      </Text>
      {props.allTransactions.map((tData, index) => {
        return (
          <Transaction key={index}
            boxShadow={cardShadow}
            mb='20px'
            transactionData={tData}
          />
        )
      })}
    </Card>
  );
}
