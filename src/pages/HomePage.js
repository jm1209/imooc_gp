import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Popular from '../pages/barPages/Popular';
import Trending from '../pages/barPages/Trending';
import Favorite from '../pages/barPages/Favorite';
import My from '../pages/barPages/My';

export var FLAG_TAB = {
    flag_popularTab: 'flag_popularTab',
    flag_trendingTab: 'flag_trendingTab',
    flag_favoriteTab: 'flag_favoriteTab',
    flag_myTab: 'flag_myTab'
};

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        let selectedTab = this.params.selectedTab ? this.params.selectedTab : FLAG_TAB.flag_popularTab;
        this.state = {
            selectedTab: selectedTab
        }
    }

    renderTab(thisTab, thisTitle, thisImg, Component) {
        const {selectedTab} = this.state;

        return (
            <TabNavigator.Item
                selected={selectedTab === thisTab}
                title={thisTitle}
                selectedTitleStyle={{color:'#4caf50'}}
                renderIcon={() => <Image style={styles.tabBarIcon} source={thisImg}/>}
                renderSelectedIcon={() => <Image style={styles.tabBarSelectedIcon} source={thisImg}/>}
                onPress={() => this.setState({selectedTab: thisTab})}>
                <Component/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this.renderTab('flag_popularTab', '流行', require('../images/ic_polular.png'), Popular)}
                    {this.renderTab('flag_trendingTab', '趋势', require('../images/ic_trending.png'), Trending)}
                    {this.renderTab('flag_favoriteTab', '喜欢', require('../images/ic_favorite.png'), Favorite)}
                    {this.renderTab('flag_myTab', '我的', require('../images/ic_my.png'), My)}
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabBarIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
        tintColor: '#4caf50'
    }
});