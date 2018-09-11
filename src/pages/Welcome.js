import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import NavigatorUtil from '../utils/NavigatorUtil';

export default class Welcome extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigatorUtil.resetToHomePage({
                theme: this.theme,
                navigation: this.props.navigation
            })
        }, 500)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../images/ic_app_120.png')}></Image>
                <Text style={styles.logoText}>imooc_gp</Text>
                <Text style={styles.text}>Copyright©金明个人技术中心2016 | devio.org</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    logo: {
        marginTop: 50
    },
    logoText: {
        marginTop: 25,
        color: '#6495ED',
        fontSize: 25
    },
    text: {
        position: 'absolute',
        bottom: 25
    }
});