import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../utils/ViewUtil';
import LanguageDao, {FLAG_LANGUAGE} from '../../common/LanguageDao';

export default class CustomKey extends Component {
    constructor(props) {
        super(props);

        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            tagArr: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    tagArr: result
                });
            });
    }

    isSave() {
        this.props.navigation.pop();
    }

    renderView() {
        const {tagArr} = this.state;

        if (tagArr || tagArr.length == 0) {
            return null;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='自定义标签'
                    leftButton={ViewUtil.topBackBtn(() => this.isSave())}
                    rightButton={
                        <TouchableOpacity onPress={() => this.isSave()}>
                            <View style={{margin: 10}}>
                                <Text style={{fontSize: 16, color: '#fff'}}>保存</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});