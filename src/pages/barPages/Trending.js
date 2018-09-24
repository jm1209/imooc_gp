import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import NavigationBar from '../../common/NavigationBar';
import TrendingCell from '../../components/TrendingCell'
import TrendingData from '../../common/TrendingData';
import LanguageDao, {FLAG_LANGUAGE} from '../../common/LanguageDao';

const URL = 'https://github.com/trending/';

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
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
                return lan.checked ? <TrendingTab tabLabel={lan.name} key={index} {...this.props}/> : null
            })}

        </ScrollableTabView> : null;
        return (
            <View style={styles.container}>
                <NavigationBar title='趋势'/>

                {content}
            </View>
        )
    }
}

class TrendingTab extends Component {
    constructor(props) {
        super(props);

        this.trendingData = new TrendingData();
        this.state = {
            projectModels: [],
            isLoading: false
        }
    }

    componentWillMount() {
        this.loadData();
    }

    getFetchUrl = (timeSpan, category) => {
        return URL + category + timeSpan
    };

    goDetail(item) {
        const {navigate} = this.props.navigation;
        navigate({
            routeName: 'PopularDetail',
            params: {
                item: item,
                ...this.props
            }
        })

    }

    loadData() {
        this.setState({
            isLoading: true
        });
        let url = this.getFetchUrl('?since=daily', this.props.tabLabel);
        this.trendingData.fetchData(url)
            .then(result => {

                this.setState({
                    projectModels: result,
                    isLoading: false
                });
                if (result && result.update_data && !this.trendingData.checkData(result.update_data)) {
                    return this.trendingData.fetchData(url)
                }
            })
            .then(result => {
                if (!result.items || result.items.length === 0) {
                    return;
                }
                this.setState({
                    projectModels: result.items,
                    isLoading: false
                });
            })
    }

    render() {
        const {projectModels, isLoading} = this.state;
        return (
            <View>
                <FlatList
                    keyExtractor={(item) => item.TrendingRepoModel.fullName}
                    data={projectModels}
                    renderItem={({item}) => <TrendingCell item={item} goDetail={() => this.goDetail(item)}/>}
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


