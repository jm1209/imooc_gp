import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,AsyncStorage} from 'react-native';

import NavigationBar from '../../common/NavigationBar';

const navigation = null;

export default class My extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title='我的'/>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('CustomKey');
                }}>
                    <Text>自定义标签页</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('SortKey');
                }}>
                    <Text>标签排序</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});