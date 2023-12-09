import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdChatBubble,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import EventDisplay from "views/admin/marketplace/event";
import OrganizerEvents from "views/admin/marketplace/organizerEvents";
import AdminEvents from "views/admin/marketplace/adminEvents";
import AdminAds from "views/admin/marketplace/AdminAds";
import OrganizerAds from "views/admin/marketplace/OrganizerAds"


// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUp from "views/auth/register";
var routes = [];

const UpdateRoutes = () => {
  const userLoggedData = JSON.parse(sessionStorage.getItem("userLoggedData"));
  // console.log("userLogged Data - Routes", userLoggedData);
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
    },
    {
      name: "Event Info",
      layout: "/admin",
      path: "/event-info",
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: EventDisplay,
    }
  ];
    if(userLoggedData.is_organizer == true) {
      routes = routes.concat([
        {
          name: 'Organize Events',
          layout: "/admin",
          path: "/all-events",
          icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
          component: OrganizerEvents,
        },
        {
          name: 'Organize Ads',
          layout: "/admin",
          path: "/all-ads",
          icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
          component: OrganizerEvents,
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
          name: 'Approve Events',
          layout: "/admin",
          path: "/review-events",
          icon: <Icon as={MdChatBubble} width='20px' height='20px' color='inherit' />,
          component: AdminEvents,
        },
        {
          name: 'Approve Ads',
          layout: "/admin",
          path: "/review-ads",
          icon: <Icon as={MdChatBubble} width='20px' height='20px' color='inherit' />,
          component: AdminAds,
        },
      ])
    }
  }
}

UpdateRoutes();

export { UpdateRoutes, routes };