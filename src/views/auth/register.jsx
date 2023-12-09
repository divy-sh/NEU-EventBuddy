import React, {useState} from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Checkbox,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Swal from 'sweetalert2'

function SignUp() {

  const API_ENDPOINT = 'http://localhost:8080'

  const history = useHistory();
  var reg_org = false;
    
  const handleSubmit = async (e) => {
  
      e.preventDefault();

      const {firstName, lastName, birthDate, email, password} = e.target;

      console.log(`Form submitted, ${firstName.value}, ${lastName.value},${birthDate.value} ,${email.value}, ${password.value}`)
      
      // Pass to API
      await axios.post(`${API_ENDPOINT}/user/register`,
       {
        "email_id" : email.value,
        "user_password" : password.value,
        "first_name" : firstName.value,
        "last_name" : lastName.value,
        "date_of_birth" : birthDate.value,
        "is_organizer" : reg_org
      })
        .then(function (response) {
          // console.log(response);
          if(response.status == 200) {
            Swal.fire({
              title: "Welcome User!",
              text: "You are Registered ",
              icon: "success",
              confirmButtonText: "Lets Sign In!"
            });
            history.push('/admin/sign-in')
          }
        })
        .catch(function (error) {
          // console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            confirmButtonText: "Try Again!"
          });
        });
  }


  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  // const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  // const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  // const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  // const googleText = useColorModeValue("navy.700", "white");
  // const googleHover = useColorModeValue(
  //   { bg: "gray.200" },
  //   { bg: "whiteAlpha.300" }
  // );
  // const googleActive = useColorModeValue(
  //   { bg: "secondaryGray.300" },
  //   { bg: "whiteAlpha.200" }
  // );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "8vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign Up
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign Up!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button> 
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
        </Flex> */}
        <form onSubmit={handleSubmit}>
          <FormControl>
            {/* First Name  */}
          <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              First Name
            </FormLabel>
            <Input variant='auth' name="firstName" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
             placeholder='Hi ! Please enter your First Name' mb='24px' fontWeight='500' size='lg'
            />
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              Last Name
            </FormLabel>
            <Input variant='auth' name="lastName" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
             placeholder='Please enter your Last Name' mb='24px' fontWeight='500' size='lg'
            />
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              Date of Birth
            </FormLabel>
            <Input variant='auth' name="birthDate" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='date' 
            mb='24px' fontWeight='500' size='lg'
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              name = 'email'
              placeholder='mail@northeastern.edu'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                name = 'password'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {/* <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex> */}
            <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  mb='5px'
                  onChange={() => reg_org = !reg_org}
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='5px'
                  ml='5px'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Register as an Organizer
                </FormLabel>
              </FormControl>
            <Button type="submit"
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Sign Up
            </Button>
          </FormControl>
          </form>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
