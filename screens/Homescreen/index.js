import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import PWDScreen from "../Department/PWD";
import PoliceScreen from "../Department/Police";
import AddDeptScreen from "../Department/AddDepartment";
import AddSchemeScreen from "../Department/AddScheme";
import TourismScreen from "../Department/Tourism";
import SettingScreen from "../SettingScreen";
import ComplaintScreen from "../Complaint";
import Chatscreen from "../Chat";
import { createDrawerNavigator } from "react-navigation-drawer";
import LoginScreen from "../Login/LoginScreen";
import SignUpScreen from "../Login/SignUpScreen";
import SideBar from "../Sidebar";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        pwd: { screen: PWDScreen },
        Police: { screen: PoliceScreen },
        Tourism: { screen: TourismScreen },
        AddDepartment: { screen: AddDeptScreen },
        AddSchemeScreen: { screen: AddSchemeScreen }
    },
    {
        initialRouteName: "AddSchemeScreen"
    }
);

const LoginStack = createMaterialTopTabNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                title: 'Login'
            }
        },
        SignUpScreen: {
            screen: SignUpScreen,
            navigationOptions: {
                title: 'Sign Up',
            }
        }
    },
    {
        initialRouteName: "LoginScreen",
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            tabStyle: {
                backgroundColor: "#2c3e50",
            },
            labelStyle: {
                fontSize: 20
            }
        }
    }
);

const Drawer = createDrawerNavigator(
    {
        Home: { screen: HomeStack },
        Login: {
            screen: LoginStack,
            navigationOptions: {
                drawerLockMode: 'locked-closed'
            }
        },
        Complaints: { screen: ComplaintScreen },
        Settings: { screen: SettingScreen },
        Chat: { screen: Chatscreen }
    },
    {
        initialRouteName: "Login",
        headerMode: "none",
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: 180
    }
);

export default createAppContainer(Drawer);
