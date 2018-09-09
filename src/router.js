import {StyleSheet} from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation';

import Welcome from './pages/Welcome';
import HomePage from './pages/HomePage';


export default AppNavigator = StackNavigator({
    Welcome: {screen: Welcome},
    HomePage: {screen: HomePage}
}, {
    navigationOptions: {
        header: null
    }
});




