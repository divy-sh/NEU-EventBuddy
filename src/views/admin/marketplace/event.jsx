import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import routes from '../../../routes';

export default function EventDisplay() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const history = useHistory();
  // const navigate = useNavigate();

  useEffect(() => {

  }, [])

  // useEffect(() => {
  //   sessionStorage.setItem("registeredEvents",registeredEvents)
  // }, [registeredEvents])

  // Function to add an event to the array
  const addEvent = () => {
    // You can customize the event data as needed
    const newEvent = {
      id: registeredEvents.length + 1,
      name: `Event ${registeredEvents.length + 1}`,
      date: new Date().toLocaleDateString(),
    };

    // Update the state with the new event
    setRegisteredEvents([...registeredEvents, newEvent]);
  };

  // const callEventPage = (event) => {
  //   // Your event registration logic...

  //   // Redirect to the new page with data
  //   history.push({
  //     pathname: '/',
  //     state: { eventData: event },
  //   });
  // };

  const removeEvent = (id) => {
    // Filter out the event with the specified id
    const updatedEvents = registeredEvents.filter((event) => event.id !== id);
    // Update the state with the new array of events
    setRegisteredEvents(updatedEvents);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Trending Events
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Cultural
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Career Fairs
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Sports
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              {registeredEvents.map((event) => (
                <HistoryItem
                  key={event.id} 
                  name={event.name}
                  author='By Mark Benjamin'
                  date={event.date}
                  image={Nft5}
                  price='0.91 ETH'
                  onRemove={() => removeEvent(event.id)}
                />
              ))}
              <NFT
                name='Abstract Colors'
                author='By Esthera Jackson'
                bidders={[
                ]}
                image={Nft1}
                currentbid='0.91 ETH'
                download=''
                eventInfo = {routes[0]}
              />
              <button onClick={addEvent}>Add Event</button>
              <NFT
                name='ETH AI Brain'
                author='By Nick Wilson'
                bidders={[
                
                ]}
                image={Nft2}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='Mesh Gradients '
                author='By Will Smith'
                bidders={[
                  
                ]}
                image={Nft3}
                currentbid='0.91 ETH'
                download='auth/sign-in'
              />
            </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Recently Added
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>
              <NFT
                name='Swipe Circles'
                author='By Peter Will'
                bidders={[
                  
                ]}
                image={Nft4}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='Colorful Heaven'
                author='By Mark Benjamin'
                bidders={[
                
                ]}
                image={Nft5}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='3D Cubes Art'
                author='By Manny Gates'
                bidders={[
                
                ]}
                image={Nft6}
                currentbid='0.91 ETH'
                download='#'
              />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
