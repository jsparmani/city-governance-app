import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import PWDScreen from '../Department/PWD';
import PoliceScreen from '../Department/Police';
import TourismScreen from '../Department/Tourism';
import SettingScreen from '../SettingScreen';
import ComplaintScreen from '../Complaint';
import Chatscreen from '../Chat';
import { createDrawerNavigator } from 'react-navigation-drawer';
import OfficialLoginScreen from '../Login/OfficialLoginScreen';
import CitizenLoginScreen from '../Login/CitizenLoginScreen';
import SideBar from '../Sidebar';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';



const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        pwd: { screen: PWDScreen },
        Police: { screen: PoliceScreen },
        Tourism: { screen: TourismScreen }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
)

const LoginStack = createMaterialTopTabNavigator(
    {
        Officials: { screen: OfficialLoginScreen },
        Citizens: { screen: CitizenLoginScreen }

    },
    {
        initialRouteName: 'Officials',
        swipeEnabled: true,
        tabBarPosition: 'bottom'
    })

const Drawer = createDrawerNavigator(
    {
        Home: { screen: HomeStack },
        Login: { screen: LoginStack },
        Complaints: { screen: ComplaintScreen },
        Settings: { screen: SettingScreen },
        Chat: { screen: Chatscreen }

    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: 180
    }
)



export default createAppContainer(Drawer);