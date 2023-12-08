// Chakra imports
import { Avatar, Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Information from "./Information";

export default function Banner(props) {
  const { banner, avatar, userData } = props;
  console.log(userData)
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {userData.first_name + " " + userData.last_name}
      </Text>
      <SimpleGrid columns='2' gap='10px'>
        <Information
          boxShadow={cardShadow}
          title='Email Id'
          value={userData.email_id}
        />
        <Information
          boxShadow={cardShadow}
          title='Date Of Birth'
          value={new Date(userData.date_of_birth).toLocaleDateString('en-US', { timeZone: 'UTC' })}
        />
        <Information
          boxShadow={cardShadow}
          title='Organizer'
          value={"" + userData.is_organizer}
        />
        <Information
          boxShadow={cardShadow}
          title='Admin'
          value={"" + userData.is_admin}
        />
      </SimpleGrid>
    </Card>
  );
}
