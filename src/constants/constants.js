// import { Icons } from "../components/Icons";
// import Home from "../screens/Home";
// import Profile from "../screens/Profile";

import Home from "../screens/Home";
import { MyColors } from "../style/MyColors";


// import Colors from "./Colors";

export const constant = {
  SPACING: 16,
  borderRadius: 10,
  titleFontSize: 24,
  textFontSize: 16,
  subTextFontSize: 14,
}


export const ScreensArray = [
  { route: 'Home', label: 'Home', icon: 'home', component:Home  },
  { route: 'Profile', label: 'Profile',  icon: "user", component: Home, },
];

export const drawerMenu = [
  // {
  //   title: "Home",
  //   bg:MyColors.secondary,
  //   // type: Icons.Feather, icon: 'check-square',
  //   route: 'Home',
  //   menuList: [
  //     // { title: 'Eat' },
  //     // { title: 'Code' },
  //     // { title: 'Sleep' },
  //   ]
  // },
  {
    title: "Booking",
    bg: MyColors.primary,
    // type: Icons.Feather, icon: 'settings',
    route: 'Booking',
    menuList: [
      { title: 'Bogathon', route: 'Bookings',screen:'Bookinglist',id:1, label: 'Home', icon: 'home', component:Home  },
      {title: 'Bogathon Warriors', route: 'Bookings',screen:'Bookinglist',id:7, label: 'Profile',  icon: "user", component: Home, },
      
    ]
  },
  {
    title: "Booking Calendar",
    bg:MyColors.secondary,
    // type: Icons.Feather, icon: 'check-square',
    route: 'BookingCalendar',
    menuList: [
      // { title: 'Eat' },
      // { title: 'Code' },
      // { title: 'Sleep' },
    ]
  },
  {
    title: "Logout",
    bg: MyColors.secondary,
    // type: Icons.Octicons, icon: 'project',
    route: 'Logout',
    menuList: [
      // { title: 'Portfolio' },
      // { title: 'Note-APP' },
      // { title: 'RN-Ui' },
    ]
  },
]