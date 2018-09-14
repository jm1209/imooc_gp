import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import LanguageDao, {FLAG_LANGUAGE} from '../../common/LanguageDao';

export default class SortKey extends Component {
    constructor(props) {
        super(props);

        this.dataArr = [];//数据库读取所有数据的数组
        this.sortResultArr = [];//排序完以后的数据
        this.originalcheckArr = [];//上一次标签排序的顺序

        this.state = {
            checkArr: [],//所有筛选标签
        }
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {

            });
    }

    getCheckedItems(result){

    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    render() {
        return (
            <View>
                <Text>lanjcka</Text>
            </View>
        )
    }
}