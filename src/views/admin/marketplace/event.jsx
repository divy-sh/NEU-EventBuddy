import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Input,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import Information from "views/admin/profile/components/Information";
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
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const history = useHistory();
  // const location = useLocation();
  // console.log(location.state)
  // const eventData = JSON.parse(location.state.eventData) || null;
  const [selectedEvent, setSelectedEvent] = useState({});
  const [capacity, setCapacity] = useState(1);
  const addCapacityCart = () => {
    setCapacity(capacity + 1);
  }

  useEffect(() => {
    var selectedE = JSON.parse(sessionStorage.getItem("selectedEvent")) || null;
    console.log("selected", selectedE)
    setSelectedEvent(selectedE)
  }, [])

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


  return (
    <Card
      mt="100px"
      direction='row'
      w='100%'
      px='2px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Banner/>
      <Flex pl='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='4xl'
          mt='40px'
          mb='4px'>
          {selectedEvent.event_name}
        </Text>
      </Flex>
        <Box p={{ base: "10px", md: "40px", xl: "40px" }}>
        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
          As we live, our hearts turn colder. Cause pain is what we go through as
          we become older. We get insulted by others, lose trust for those others.
          We get back stabbed by friends. It becomes harder for us to give others
          a hand. We get our heart broken by people we love, even that we give
          them all...
        </Text>
        <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Start Time'
          value={selectedEvent.start_time}
        />
        <Information
          boxShadow={cardShadow}
          title='End Time'
          value={selectedEvent.end_time}
        />
        <Information
          boxShadow={cardShadow}
          title='Entry Fees'
          value={selectedEvent.entry_fees}
        />
        <Information
          boxShadow={cardShadow}
          title='Capacity'
          value={selectedEvent.capacity}
        />
        <Information
          boxShadow={cardShadow}
          title='Last Registration Date'
          value={selectedEvent.last_registration_date}
        />
        <Information
          boxShadow={cardShadow}
          title='Organization ID'
          value={selectedEvent.org_id}
        />
      </SimpleGrid>
      <br/>
      <Flex pl='25px' justify='space-between' mb='10px' align='center'>
      <Button
        // onClick={() => {goToEven}}
        variant='darkBrand'
        color='white'
        fontSize='xl'
        fontWeight='500'
        borderRadius='10px'
        px='24px'
        py='5px'>
        Buy Tickets
      </Button> 
      <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'>
          Your Tickets Count : {capacity}
        </Text>
      <Button
        onClick={addCapacityCart}
        variant='darkBrand'
        color='white'
        fontSize=''
        fontWeight='300'
        borderRadius='10px'
        px='20px'
        py='5px'>
        Add Ticket Count
      </Button> 
      <Button
        onClick={() => {setCapacity(1)}}
        variant='darkBrand'
        color='white'
        fontSize=''
        fontWeight='300'
        borderRadius='10px'
        px='10px'
        py='5px'>
        Reset
      </Button> 
      </Flex>
      </Box>
    </Card>
  );
}
