import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import NavigationBar from '../../common/NavigationBar';
import RepositoryCell from '../../common/RepositoryCell'
import FetchUtil from '../../utils/FetchUtil';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Popular extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title='流行'/>

                <ScrollableTabView
                    tabBarBackgroundColor='#6495ED'
                    tabBarInactiveTextColor='#fff'
                    tabBarActiveTextColor='mintcream'
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <PopularTab tabLabel='all'/>
                    <PopularTab tabLabel='Android'/>
                    <PopularTab tabLabel='IOS'/>
                    <PopularTab tabLabel='Java'/>
                </ScrollableTabView>
            </View>
        )
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectModels: [],
            isLoading: false
        }
    }

    componentWillMount() {
        this.loadData();
    }

    getFetchUrl = (key) => {
        return URL + key + QUERY_STR;
    };

    loadData(refreshing) {
        this.setState({
            isLoading: true
        });

        let url = this.getFetchUrl(this.props.tabLabel);

        FetchUtil.get(url)
            .then(result => {
                this.setState({
                    projectModels: result.items,
                    isLoading: false
                })
            })

    }

    genIndcator() {
        return (
            <View>
                <ActivityIndicator size='large' animating={true}/>
            </View>
        )
    }

    render() {
        const {projectModels, isLoading} = this.state;
        return (
            <View>
                <FlatList
                    data={projectModels}
                    renderItem={({item}) => <RepositoryCell item={item}/>}
                    refreshing={isLoading}
                    onRefresh={() => this.loadData()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


