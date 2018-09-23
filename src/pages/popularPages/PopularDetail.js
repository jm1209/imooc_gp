import React, {Component} from 'react';
import {WebView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../utils/ViewUtil";

export default class PopularDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'WebView',
            url: 'https://www.baidu.com',
            canGoBack: false
        }
    }

    goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigation.pop()
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        const {title, url} = this.state;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    leftButton={ViewUtil.topBackBtn(() => this.goBack())}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: url}}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
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