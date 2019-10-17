import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen }
    },
    {
        headerMode: 'none'
    }
)



export default createAppContainer(HomeStack);