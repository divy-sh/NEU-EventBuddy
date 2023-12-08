// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import Tickets from "views/admin/profile/components/Tickets";
import Transactions from "views/admin/profile/components/Transactions";

// Assets
import banner from "assets/img/auth/banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_ENDPOINT = 'http://localhost:8080';

export default function Overview() {
  const userData = JSON.parse(sessionStorage.getItem('userLoggedData'));

  const [allTransactions, setAllTransactions] = useState([]);
  const [allTickets, setAllTickets] = useState([]);


  useEffect(async () => {
    await axios.get(`${API_ENDPOINT}/transaction/get/?email=${userData.email_id}`)
        .then(function (response) {
          console.log(response);
          if(response.status == 200) {
            setAllTransactions(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  await axios.get(`${API_ENDPOINT}/user/get/ticket?email=${userData.email_id}`)
      .then(function (response) {
        console.log(response);
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
          gridArea='1 / 1 / 4 / 4'
          banner={banner}
          name={userData.first_name + " " + userData.last_name}
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
    </Box>
  );
}
