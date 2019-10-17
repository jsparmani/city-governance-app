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
import LoginScreen from '../Login/index';

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
const Drawer = createDrawerNavigator(
    {
        Home: { screen: HomeStack },
        Login: { screen: LoginScreen },
        Complaints: { screen: ComplaintScreen },
        Settings: { screen: SettingScreen },
        Chat: { screen: Chatscreen }

    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)



export default createAppContainer(Drawer);