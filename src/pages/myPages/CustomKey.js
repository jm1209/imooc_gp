import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';

import CheckBox from 'react-native-check-box';

import NavigationBar from '../../common/NavigationBar';
import LanguageDao, {FLAG_LANGUAGE} from '../../common/LanguageDao';
import ViewUtil from '../../utils/ViewUtil';
import ArrayUtil from '../../utils/ArrayUtil';

export default class CustomKey extends Component {
    constructor(props) {
        super(props);

        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeVal = [];
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
        if (this.changeVal.length === 0) {
            this.props.navigation.pop();
            return;
        }
        this.languageDao.save(this.state.tagArr);
        this.props.navigation.pop();
    }

    onBack() {
        Alert.alert(
            '提示',
            '要保存修改么？',
            [
                {text: '不保存', onPress: () => this.props.navigation.pop()},
                {text: '保存', onPress: () => this.isSave()}
            ]
        )
    }

    checkBoxChange = (data) => {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeVal, data);
    };

    renderView() {
        const {tagArr} = this.state;
        if (!tagArr || tagArr.length === 0) {
            return null;
        }
        let len = tagArr.length, views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(tagArr[i])}
                        {this.renderCheckBox(tagArr[i + 1])}
                    </View>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(tagArr[len - 2]) : null}
                    {this.renderCheckBox(tagArr[len - 1])}
                </View>
            </View>
        );
        return views;
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = data.checked;

        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this.checkBoxChange(data)}
                isChecked={isChecked}
                leftText={leftText}
                checkedImage={<Image source={require('../../images/ic_check_box.png')} style={{tintColor: '#6495ed'}}/>}
                unCheckedImage={<Image source={require('../../images/ic_check_box_outline_blank.png')}
                                       style={{tintColor: '#6495ed'}}/>}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='自定义标签'
                    leftButton={ViewUtil.topBackBtn(() => this.onBack())}
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
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgray'
    }
});