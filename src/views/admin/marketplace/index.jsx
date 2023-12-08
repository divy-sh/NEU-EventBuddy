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
import axios from "axios";
// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import { routes } from '../../../routes';

export default function Marketplace() {
  // Chakra Color Mode

  const API_ENDPOINT = 'http://localhost:8080';

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [allEvents, setAllEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const history = useHistory();
  // const navigate = useNavigate();

  useEffect(async () => {
    await axios.get(`${API_ENDPOINT}/event/get/all?status=approved`)
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
  }, [])

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  // RazorPay
  // const displayRazorpay = async (amount) => {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("You are offline... Failed to load Razorpay SDK");
  //     return;
  //   }

  //   const options = {
  //     key: "rzp_test_VdGdvprTKB8u1w",
  //     currency: "USD",
  //     amount: amount,
  //     name: "NEU Event Buddy",
  //     description: "Thanks for purchasing",
  //     image:
  //       "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

  //     handler: function (response) {
  //       alert(response.razorpay_payment_id);
  //       alert("Payment Successfully");
  //     },
  //     prefill: {
  //       name: "Something",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  useEffect(() => {
    sessionStorage.setItem("registeredEvents",registeredEvents)
  }, [registeredEvents])

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

  const callEventPage = (event) => {
    // Your event registration logic...

    // Redirect to the new page with data
    history.push({
      pathname: '/',
      state: { eventData: event },
    });
  };

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
              {allEvents.map((event) => (
                <NFT
                key={event.event_id} 
                name={event.event_name}
                start_time = {event.start_time}
                end_time = {event.end_time}
                description = {event.event_description}
                author='By Esthera Jackson'
                raw_event = {event}
                image={Nft1}
                entry_fees={event.entry_fees}
                eventInfo = {routes[5]}
              />
              ))}
              <button onClick={addEvent}>Add Event</button>
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
