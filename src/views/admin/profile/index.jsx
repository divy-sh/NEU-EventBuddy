// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,FormLabel,
  Input,
  Table,
  Tbody,
  Menu,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
  Grid,
  useDisclosure,
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import Banner from "views/admin/profile/components/Banner";
import Tickets from "views/admin/profile/components/Tickets";
import Transactions from "views/admin/profile/components/Transactions";
import { UpdateRoutes } from 'routes';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";

// Assets
import banner from "assets/img/auth/banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
const API_ENDPOINT = 'http://localhost:8080';

export default function Overview() {
  const userData = JSON.parse(sessionStorage.getItem('userLoggedData'));
  // console.log(userData)
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const history = useHistory();

  const [allTransactions, setAllTransactions] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [updateProfileData, setUpdateProfileData] = useState({
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const DeleteAccount = async () => {
    try {
      Swal.fire({
        title: "Are you sure you want to Delete your account?",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Cancel`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const response = axios.delete(`${API_ENDPOINT}/user/delete?email_id=${userData.email_id}`);
          console.log(response)
          if (response.status == 200) {  
            sessionStorage.removeItem('userLoggedData');
            UpdateRoutes();
            history.push('/auth/sign-in');
          }
        }
      });
      
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleChange = (e) => {
    // Update the form data as the user types
    // console.log(editEvent)
    // setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const {firstName, lastName, password} = e.target;

      console.log(`Form submitted, ${firstName.value}, ${lastName.value}, ${password.value}`)
      
      // Pass to API
      await axios.post(`${API_ENDPOINT}/user/update`,
       {
        "user_password" : password.value,
        "first_name" : firstName.value,
        "last_name" : lastName.value
      })
      .then(function (response) {
        // console.log(response);
        if(response.status == 200) {
          Swal.fire({
            title: "Profile Updated Successfully!",
            icon: "success",
            confirmButtonText: "Back to Work!"
          });
          history.push('/admin/sign-in')
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

  const handleCardSubmit = async (e) => {
    e.preventDefault();

      const {cc_number, expiry_date} = e.target;

      console.log(`Form submitted, ${cc_number}, ${expiry_date}`)
      
      // Pass to API
      await axios.post(`${API_ENDPOINT}/user/add/card?email=${userData.email_id}`,
       {
        "email_id" : userData.email_id,
        "credit_card_num" : cc_number.value,
        "name" : userData.first_name + userData.last_name,
        "expiry_date" : expiry_date.value
      })
      .then(function (response) {
        // console.log(response);
        if(response.status == 200) {
          Swal.fire({
            title: "Created Card Added Successfully!",
            icon: "success",
          });
          history.push('/admin/profile')
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
        history.push('/admin/profile')
      });
  }


  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  useEffect(async () => {
    await axios.get(`${API_ENDPOINT}/transaction/get?email_id=${userData.email_id}`)
        .then(function (response) {
          if(response.status == 200) {
            setAllTransactions(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    await axios.get(`${API_ENDPOINT}/user/get/ticket?email_id=${userData.email_id}`)
      .then(function (response) {
        if(response.status == 200) {
          setAllTickets(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    await axios.get(`${API_ENDPOINT}/user/get/card?email=${userData.email_id}`)
      .then(function (response) {
        console.log("card", response.data)
        if(response.status == 200) {
          setUserCards(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []
  )

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 1 / 1'
          banner={banner}
          userData={userData}
        />
      </Grid>
      <Grid
        mb='20px'
        templateRows={{
          base: "1fr",
          lg: "repeat(1, 1fr)",
          "2xl": "1fr",
        }}
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Tickets
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          allTickets={allTickets}
        />
        <Transactions
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          allTransactions={allTransactions}
        />
      </Grid>
      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
        <Button
            onClick={()=> {onOpen()}}
            variant='darkBrand'
            color='white'
            fontSize='l'
            fontWeight='500'
            borderRadius='10px'
            px='24px'
            py='5px'>
            Update Password
          </Button> 
          <Button
            onClick={DeleteAccount}
            variant='darkBrand'
            color='white'
            fontSize='l'
            fontWeight='500'
            borderRadius='10px'
            px='24px'
            py='5px'>
            Delete Account
          </Button> 
        </Flex>
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Event Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <form onSubmit={handleSubmit} style={{'padding':'20px'}}>
                <FormControl>
                  {/* First Name  */}
                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                    First Name
                  </FormLabel>
                  <Input variant='auth' name="firstName" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
                  mb='24px' value={userData.first_name || ""} fontWeight='500' size='lg'
                  />
                  <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                    Last Name
                  </FormLabel>
                  <Input variant='auth' name="lastName" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
                  value={userData.last_name || ""} mb='24px' fontWeight='500' size='lg'
                  />
                  <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                    Password
                  </FormLabel>
                  <Input variant='auth' name="password" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='password' 
                  mb='24px' fontWeight='500' size='lg'
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
                      Update Profile
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
        <Card
          mt="20px"
          direction='row'
          w='100%'
          px='2px'
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Text
            color={"navy"}
            fontWeight='bold'
            fontSize='2xl'
            mt='2px'
            mb='4px'
            ml="25px">
            Add New Credit Card
          </Text>
          <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
        {/* Credit Card */}
        <form onSubmit={handleCardSubmit} style={{'padding':'20px'}}>
          <FormControl>
            {/* First Name  */}
          <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              Credit Card Number
            </FormLabel>
            <Input variant='auth' name="cc_number" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
            mb='24px' fontWeight='500' size='lg'
            />
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              Cvv
            </FormLabel>
            <Input variant='auth' name="cvv" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='number' 
            mb='24px' fontWeight='500' size='lg'
            />
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              Expiry Date
            </FormLabel>
            <Input variant='auth' name="expiry_date" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='date' 
            mb='24px' fontWeight='500' size='lg'
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
                Add Credit Card
              </Button>
            </Flex>
          </FormControl>
        </form>
        <>
        {userCards.map((card, index) => {
        return (
          <Text
            color={"navy"}
            fontWeight='bold'
            fontSize='xl'
            mt='10px'
            mb='4px'
            ml="25px">
            Credit Card: {card.credit_card_num}
          </Text>
          )})}
          </>
        </SimpleGrid>
        </Card>
    </Box>
  );
}
