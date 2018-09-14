import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

import SortableListView from 'react-native-sortable-listview';
import NavigationBar from '../../common/NavigationBar';

import LanguageDao, {FLAG_LANGUAGE} from '../../common/LanguageDao';
import ArrayUtil from '../../utils/ArrayUtil';
import ViewUtil from "../../utils/ViewUtil";

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
                this.getCheckedItems(result);
            });
    }

    getCheckedItems(result) {
        this.dataArr = result;
        let checkArr = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].checked) {
                checkArr.push(result[i]);
            }
        }
        this.setState({
            checkArr: checkArr
        });
        this.originalcheckArr = ArrayUtil.clone(checkArr);
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    render() {
        const {checkArr} = this.state;
        console.log(checkArr)
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='标签排序'
                    leftButton={ViewUtil.topBackBtn(() => this.onBack())}
                    rightButton={
                        <TouchableOpacity onPress={() => this.isSave()}>
                            <View style={{margin: 10}}>
                                <Text style={{fontSize: 16, color: '#fff'}}>保存</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <SortableListView
                    style={{flex: 1}}
                    data={checkArr}
                    order={Object.keys(checkArr)}
                    onRowMoved={e => {
                        checkArr.splice(e.to, 0, checkArr.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row}/>}
                />
            </View>
        )
    }
}

class SortCell extends Component {
    render() {
        const {data} = this.props;
        return (
            <TouchableOpacity
                opacity={1}
                underlayColor='#eee'
                delayLongPress={500}
                style={styles.item}
            >
                <View style={styles.row}>
                    <Image style={styles.img} source={require('../../images/ic_sort.png')}></Image>
                    <Text>{data.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: 16,
        height: 16,
        tintColor:'#2196f3',
        marginRight:10
    }
});