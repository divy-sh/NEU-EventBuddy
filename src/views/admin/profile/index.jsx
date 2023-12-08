// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Grid,
  useDisclosure,
  Modal, 
  ModalOverlay
} from "@chakra-ui/react";

// Custom components
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
  const history = useHistory();

  const [allTransactions, setAllTransactions] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

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
          if (response.status === 200) {  
            sessionStorage.removeItem('userLoggedData');
            UpdateRoutes();
            history.push('/auth/signin');
          }
        }
      });
      
    } catch (error) {
      console.error(error);
    }
  };
  


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
      },
  [])

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
            fontSize='xl'
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
            fontSize='xl'
            fontWeight='500'
            borderRadius='10px'
            px='24px'
            py='5px'>
            Delete Account
          </Button> 
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
          </Modal>
    </Box>
  );
}
