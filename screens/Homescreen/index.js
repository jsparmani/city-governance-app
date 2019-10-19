import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import PWDScreen from "../Department/PWD";
import PoliceScreen from "../Department/Police";
import AddDeptScreen from "../Department/AddDepartment";
import AddSchemeScreen from "../Department/AddScheme";
import ConnectionScreen from "../Department/ConnectionScreen";
import DownloadScreen from "../Department/DownloadScreen";
import SchemesListScreen from "../Department/SchemesListScreen";
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
        HomeMain: { screen: HomeScreen, navigationOptions: { title: "Home" } },
        pwd: { screen: PWDScreen },
        Police: { screen: PoliceScreen },
        Tourism: { screen: TourismScreen },
        AddDepartment: {
            screen: AddDeptScreen,
            navigationOptions: { title: "Add Department" }
        },
        AddScheme: {
            screen: AddSchemeScreen,
            navigationOptions: { title: "Add Scheme" }
        },
        Settings: { screen: SettingScreen },
        Complaints: { screen: ComplaintScreen },
        Downloads: { screen: DownloadScreen },
        Schemes: { screen: SchemesListScreen },
        New_Connection: { screen: ConnectionScreen }
    },
    {
        initialRouteName: "HomeMain",
        defaultNavigationOptions: {
            headerTintColor: "#FFFFFF",
            headerStyle: {
                backgroundColor: "#0A79DF"
            },
            headerTitleStyle: {
                fontWeight: "bold",
                justifyContent: "space-between",
                alignSelf: "center",
                textAlign: "center",
                flex: 1,
                flexGrow: 1
            }
        },
        headerMode: "screen"
    }
);

const LoginStack = createMaterialTopTabNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                title: "Login"
            }
        },
        SignUpScreen: {
            screen: SignUpScreen,
            navigationOptions: {
                title: "Sign Up"
            }
        }
    },
    {
        initialRouteName: "LoginScreen",
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            tabStyle: {
                backgroundColor: "#2c3e50"
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
                drawerLockMode: "locked-closed"
            }
        },
        Complaints: { screen: ComplaintScreen },
        Downloads: { screen: DownloadScreen },
        Schemes: { screen: SchemesListScreen },
        Settings: { screen: SettingScreen },
        Chat: { screen: Chatscreen },
        New_Connection: { screen: ConnectionScreen }
    },
    {
        initialRouteName: "Login",
        drawerType: 'slide',
        headerMode: "none",
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: 220
    }
);

export default createAppContainer(Drawer);
