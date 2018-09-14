import {StackNavigator} from 'react-navigation';

import Welcome from './pages/Welcome';
import HomePage from './pages/HomePage';
import CustomKey from './pages/myPages/CustomKey';
import SortKey from './pages/myPages/SortKey';


export default AppNavigator = StackNavigator({
    Welcome: {screen: Welcome},
    HomePage: {screen: HomePage},
    CustomKey: {screen: CustomKey},
    SortKey: {screen: SortKey},
}, {
    navigationOptions: {
        header: null
    }
});




