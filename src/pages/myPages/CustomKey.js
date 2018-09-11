import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../utils/ViewUtil';

export default class CustomKey extends Component {
    isSave() {
        this.props.navigation.pop();
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
                <TouchableOpacity>
                    <Text>自定义标签页</Text>
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