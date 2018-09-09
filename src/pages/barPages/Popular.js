import React, {Component} from 'react';
import {View, Text} from 'react-native';

import NavigationBar from '../../common/NavigationBar'


export default class Popular extends Component {
    render() {
        return (
            <View>
                <NavigationBar title='流行' leftButton={
                    <View>
                        <Text>daclkm</Text>
                    </View>
                }></NavigationBar>
                <Text>我是Popular Bar页面</Text>
            </View>
        )
    }
}