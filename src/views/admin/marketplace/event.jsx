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
  FormControl,FormLabel,
  Input,
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import Information from "views/admin/profile/components/Information";
import Card from "components/card/Card.js";
import Swal from 'sweetalert2'
import axios from "axios";

export default function EventDisplay() {
  const API_ENDPOINT = 'http://localhost:8080';
  const userData = JSON.parse(sessionStorage.getItem('userLoggedData'));
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

      const {cc_number, cvv, holder_name} = e.target;

      console.log(`Form submitted, ${cc_number.value}, ${cvv.value}, ${holder_name.value}`)
      
      // Pass to API
      await axios.post(`${API_ENDPOINT}/transaction/buy/ticket`,
       {
        "credit_card_num" : cc_number.value,
        "email_id" : userData.email_id,
        "event_id" : selectedEvent.event_id,
        "total_tickets" : capacity
      })
      .then(function (response) {
        // console.log(response);
        if(response.status == 200) {
          Swal.fire({
            title: "Transaction Successful!",
            icon: "success",
            confirmButtonText: "See you there!"
          });
          history.push('/admin/event-info')
        }
      })
      .catch(function (error) {
        // console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong",
          text: error,
          confirmButtonText: "Try Again!"
        });
      });
  }

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
        onClick={onOpen}
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
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buy {capacity} Ticket's for {selectedEvent.event_name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={handleSubmit} style={{'padding':'20px'}}>
              <FormControl>
                {/* First Name  */}
              <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                  Credit Card Number
                </FormLabel>
                <Input variant='auth' name="cc_number" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
                mb='24px' value="" fontWeight='500' size='lg'
                />
                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                  Cvv
                </FormLabel>
                <Input variant='auth' name="cvv" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
                value="" mb='24px' fontWeight='500' size='lg'
                />
                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                  Card Holder Name
                </FormLabel>
                <Input variant='auth' name="holder_name" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='password' 
                mb='24px' value="" fontWeight='500' size='lg'
                />
                {/* <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                  Birth Date
                </FormLabel>
                <Input variant='auth' name="lastName" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='datetime-local' 
                value={userData.date_of_birth || ""} mb='24px' fontWeight='500' size='lg'
                /> */}
                <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                  <Button type="submit"
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'>
                    Make Payment
                  </Button>
                </Flex>
              </FormControl>
              </form>
            </ModalBody>
            {/* <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    </Card>
  );
}
