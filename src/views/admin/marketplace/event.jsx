import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import Information from "views/admin/profile/components/Information";
import Card from "components/card/Card.js";
import Swal from 'sweetalert2'

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
  const subtractCapacityCart = () => {
    setCapacity(Math.max(1, capacity - 1))
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
  
  let usernameInput;
  let passwordInput;
  
  const buyTickets = () => {
    Swal.fire({
      title: 'Card Payment',
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Pay for Tickets',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup() || null
        usernameInput = popup.querySelector('#username') 
        passwordInput = popup.querySelector('#password')
        // usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        // passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const username = usernameInput.value
        const password = passwordInput.value
        if (!username || !password) {
          Swal.showValidationMessage(`Please enter username and password`)
        }
        return { username, password }
      },
    })
  }

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
           {selectedEvent.event_description}
        </Text>
        <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Start Time'
          value={new Date(selectedEvent.start_time).toLocaleString('en-US', { timeZone: 'UTC' })}
        />
        <Information
          boxShadow={cardShadow}
          title='End Time'
          value={new Date(selectedEvent.end_time).toLocaleString('en-US', { timeZone: 'UTC' })}
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
          value={new Date(selectedEvent.last_registration_date).toLocaleString('en-US', { timeZone: 'UTC' })}
        />
        <Information
          boxShadow={cardShadow}
          title='Organization ID'
          value={selectedEvent.org_id}
        />
      </SimpleGrid>
      <br/>
      <Flex pl='25px' pr='25px' justify='flex-end' mb='10px' align='center'>
      <Button
        onClick={subtractCapacityCart}
        variant='darkBrand'
        color='white'
        fontSize=''
        fontWeight='300'
        borderRadius='10px'
        px='10px'
        py='5px'
        m='10px'>
        -
      </Button> 
      <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'
          m='10px'>
          {capacity}
      </Text>
      <Button
        onClick={addCapacityCart}
        variant='darkBrand'
        color='white'
        fontSize=''
        fontWeight='300'
        borderRadius='10px'
        px='20px'
        py='5px'
        m='10px'>
        +
      </Button>
      <Button
        onClick={buyTickets}
        variant='darkBrand'
        color='white'
        fontSize='xl'
        fontWeight='500'
        borderRadius='10px'
        px='24px'
        py='5px'
        m='10px'>
        Buy
      </Button> 
      </Flex>
      </Box>
    </Card>
  );
}
