import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import NavigationBar from '../../common/NavigationBar';
import RepositoryCell from '../../common/RepositoryCell'
import FetchUtil from '../../utils/FetchUtil';
import LanguageDao, {FLAG_LANGUAGE} from '../../common/LanguageDao';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            tabArr: []
        }
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    tabArr: result
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {tabArr} = this.state;

        let content = tabArr.length > 0 ? <ScrollableTabView
            tabBarBackgroundColor='#6495ED'
            tabBarInactiveTextColor='#fff'
            tabBarActiveTextColor='mintcream'
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {tabArr.map((res, index, arr) => {
                let lan = arr[index];
                return lan.checked ? <PopularTab tabLabel={lan.name} key={index}/> : null
            })}

        </ScrollableTabView> : null;
        return (
            <View style={styles.container}>
                <NavigationBar title='流行'/>

                {content}
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


