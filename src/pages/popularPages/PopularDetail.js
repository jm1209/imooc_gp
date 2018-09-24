import React, {Component} from 'react';
import {WebView, View, StyleSheet} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../utils/ViewUtil";

export default class PopularDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.navigation.state.params.item.full_name,
            url: this.props.navigation.state.params.item.html_url,
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
                    startInLoadingState={true}
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