import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";

// Chakra imports
import {
  Box,Button,
  Flex,
  FormControl,FormLabel,
  Input,
  Text,
  Table,
  Tbody,
  Menu,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { MdModeEdit, MdClose, MdCheckCircle} from "react-icons/md";

import Card from "components/card/Card.js";
import Swal from 'sweetalert2'
import axios from 'axios'

export default function AdminEvents() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const API_ENDPOINT = 'http://localhost:8080';
  const [allEvents, setAllEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [editEvent, setEditEvent] = useState({
    event_id:0,
    event_name: '',
    event_description: '',
    start_time: '',
    end_time: '',
    entry_fees:0,
    capacity:0,
    last_registration_date: ''
  });
  const handleChange = (e) => {
    // Update the form data as the user types
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };
  const [capacity, setCapacity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerGroups = ["Name", "Description", "Start Time", "End Time", "Last Registration Time", "Capacity", "Entry Fees", "Actions"]

  useEffect(async () => {
    const userData = JSON.parse(sessionStorage.getItem("userLoggedData"));
    console.log("Admin Email", userData.email_id)
    setUserEmail(userData.email_id)
    await axios.get(`${API_ENDPOINT}/event/get/all?status=in-progress`)
        .then(function (response) {
          console.log(response);
          if(response.status == 200) {
            // sessionStorage.setItem("", JSON.stringify(response.data.user))
            setAllEvents(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    
    await axios.get(`${API_ENDPOINT}/event/get/all?status=approved`)
    .then(function (response) {
      console.log(response);
      if(response.status == 200) {
        // sessionStorage.setItem("", JSON.stringify(response.data.user))
        setApprovedEvents(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  const approveEvent = (async (event_id) => {
    await axios.get(`${API_ENDPOINT}/admin/approve/event?email=${userEmail}&event_id=${event_id}&status=APPROVED`)
        .then(function (response) {
          console.log(response);
          if(response.status == 200) {
            // sessionStorage.setItem("", JSON.stringify(response.data.user))
            console.log(response.data)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Event Approved!",
              showConfirmButton: false,
              timer: 1000
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  })

  const rejectEvent = (async (event_id) => {
    await axios.get(`${API_ENDPOINT}/admin/approve/event?email=${userEmail}&event_id=${event_id}&status=REJECTED`)
        .then(function (response) {
          console.log(response);
          if(response.status == 200) {
            // sessionStorage.setItem("", JSON.stringify(response.data.user))
            // Swal.fire({
            //   title: "Event Rejected!",
            //   icon: "success"
            // });
            console.log(response.data)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Event Rejected!",
              showConfirmButton: false,
              timer: 1000
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  })

  return (
    <Card
      mt="100px"
      direction='row'
      w='100%'
      px='2px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='4xl'
          mt='40px'
          mb='4px'>
          All Events
        </Text>
        <Button
          onClick={() => {setEditEvent({}); onOpen()}}
          variant='darkBrand'
          color='white'
          fontSize='xl'
          fontWeight='500'
          borderRadius='10px'
          px='24px'
          py='5px'>
          Add Event
        </Button> 
      </Flex>
        <Box p={{ base: "10px", md: "40px", xl: "40px" }}>
          <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
              <Text
                color={"red"}
                fontSize='15px'
                fontWeight='700'
                lineHeight='100%'>
                
              </Text>
              <Menu />
            </Flex>
            <Table variant='simple' color='gray.500' mb='24px'>
              <Thead>
                  <Tr key="headers">
                  {headerGroups.map((headerGroup) => (
                    <Th
                      pe='10px'
                      borderColor={borderColor}>
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color='gray.400'>
                        {headerGroup}
                      </Flex>
                    </Th>
                    ))}
                  </Tr>
              </Thead>
              <Tbody>
                {allEvents.map((tData, index) => {
                  return (
                    <Tr key={index}>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.event_name}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.event_description}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.start_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.end_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.last_registration_date}
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.capacity}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.entry_fees}
                          </Text>
                        </Flex>
                      </Td>  
                      <Td>
                      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                        <Button onClick={()=> { setEditEvent({
                          event_id: tData.event_id,
                          event_name: tData.event_name,
                          event_description: tData.event_description,
                          start_time: tData.start_time,
                          end_time: tData.end_time,
                          capacity: tData.capacity,
                          entry_fees: tData.entry_fees,
                          last_registration_date: tData.last_registration_date,
                          }); approveEvent(tData.event_id) }}>
                          <Icon color={"green.500"} as={MdCheckCircle} width='20px' height='20px'/> 
                        </Button>
                        <Button onClick={()=> { setEditEvent({
                          event_id: tData.event_id,
                          event_name: tData.event_name,
                          event_description: tData.event_description,
                          start_time: tData.start_time,
                          end_time: tData.end_time,
                          capacity: tData.capacity,
                          entry_fees: tData.entry_fees,
                          last_registration_date: tData.last_registration_date,
                          }); rejectEvent(tData.event_id)}}>
                          <Icon as={MdClose} width='20px' height='20px' color={"red.500"} /> 
                        </Button>
                      </Flex>
                      </Td>     
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Card>
          {/* <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='20px'
            mb='4px'>
            Update Event
          </Text> */}
        </SimpleGrid>
      </Box>

      {/* Approved Table */}
      <Box p={{ base: "10px", md: "40px", xl: "40px" }}>
          <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "10px", xl: "20px" }}>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='5px' align='center'>
              <Text
                color={"Orange"}
                fontSize='20px'
                fontWeight='700'
                lineHeight='100%'>
                Approved Events
              </Text>
              <Menu />
            </Flex>
            <Table variant='simple' color='gray.500' mb='24px'>
              <Thead>
                  <Tr key="headers">
                  {headerGroups.map((headerGroup) => (
                    <Th
                      pe='10px'
                      borderColor={borderColor}>
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color='gray.400'>
                        {headerGroup}
                      </Flex>
                    </Th>
                    ))}
                  </Tr>
              </Thead>
              <Tbody>
                {approvedEvents.map((tData, index) => {
                  return (
                    <Tr key={index}>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.event_name}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.event_description}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.start_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.end_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.last_registration_date}
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.capacity}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.entry_fees}
                          </Text>
                        </Flex>
                      </Td>  
                      <Td>
                      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                        <Button>
                        <Icon color={"green.500"} as={MdCheckCircle} width='20px' height='20px'/> 
                        </Button>
                      </Flex>
                      </Td>     
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Card>
        </SimpleGrid>
      </Box>
    </Card>
  );
}
