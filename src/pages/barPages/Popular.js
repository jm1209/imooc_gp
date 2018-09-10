import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import NavigationBar from '../../common/NavigationBar';
import FetchUtil from '../../utils/FetchUtil';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Popular extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title='流行'/>

                <ScrollableTabView>
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
            loading: false
        }
    }

    componentWillMount() {
        let url = this.getFetchUrl(this.props.tabLabel);
        FetchUtil.get(url)
            .then(result => {
                this.setState({
                    projectModels: result.items
                })
            })
    }

    getFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    _renderItem(item) {
        return (
            <View>
                <Text>{item.full_name}</Text>
                <Text>{item.description}</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <FlatList data={this.state.projectModels}
                          renderItem={({item}) => this._renderItem(item)}
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


