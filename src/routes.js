import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import EventDisplay from "views/admin/marketplace/event";
import OrganizerEvents from "views/admin/marketplace/organizerEvents";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUp from "views/auth/register";
var routes = [];

const UpdateRoutes = () => {
  const userLoggedData = JSON.parse(sessionStorage.getItem("userLoggedData"));
  if(userLoggedData === null) {
    routes = [
    {
      name: "Sign In",
      layout: "/auth",
      path: "/sign-in",
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: SignInCentered,
    },
    {
      name: "Sign Up",
      layout: "/auth",
      path: "/sign-up",
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: SignUp,
    },
    ]
  } else {
    routes = [
    {
      name: "Events",
      layout: "/admin",
      path: "/events",
      icon: (
        <Icon
          as={MdOutlineShoppingCart}
          width='20px'
          height='20px'
          color='inherit'
        />
      ),
      component: NFTMarketplace,
      secondary: true,
    }, 
    {
      name: "Profile",
      layout: "/admin",
      path: "/profile",
      icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
      component: Profile,
    },];
    if(userLoggedData.is_organizer == true) {
      routes = routes.concat([
        {
          name: "Data Tables",
          layout: "/admin",
          icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
          path: "/data-tables",
          component: DataTables,
        },
        
        {
          name: "Event Info",
          layout: "/admin",
          path: "/event-info",
          icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
          component: EventDisplay,
        }
      ])
    }
    if(userLoggedData.is_admin == true) {
      routes = routes.concat([
        {
          name: "Main Dashboard",
          layout: "/admin",
          path: "/default",
          icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
          component: MainDashboard,
        },
        {
          name: "NFT Marketplace",
          layout: "/admin",
          path: "/nft-marketplace",
          icon: (
            <Icon
              as={MdOutlineShoppingCart}
              width='20px'
              height='20px'
              color='inherit'
            />
          ),
          component: NFTMarketplace,
          secondary: true,
        },
        {
          name: 'All Events',
          layout: "/admin",
          path: "/all-events",
          icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
          component: OrganizerEvents,
        },
      ])
    }
  }
}

UpdateRoutes();

export { UpdateRoutes, routes };