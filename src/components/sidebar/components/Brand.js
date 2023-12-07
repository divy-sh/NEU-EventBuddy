import React from "react";

// Chakra imports
import { Flex, color, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <h2 style={{color: "blue", fontSize:"28px", padding:"10px"}}> Neu EventBuddy </h2>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
