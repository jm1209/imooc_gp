import {StackNavigator} from 'react-navigation';

import Welcome from './pages/Welcome';
import HomePage from './pages/HomePage';
import CustomKey from './pages/myPages/CustomKey';


export default AppNavigator = StackNavigator({
    Welcome: {screen: Welcome},
    HomePage: {screen: HomePage},
    CustomKey: {screen: CustomKey}
}, {
    navigationOptions: {
        header: null
    }
});




