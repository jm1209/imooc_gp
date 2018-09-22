import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default class ViewUtil {
    static topBackBtn(callback) {
        return (
            <TouchableOpacity style={{padding: 8}} onPress={callback}>
                <Image style={{width: 26, height: 26}}
                       source={require('../images/ic_arrow_back_white_36pt.png')}></Image>
            </TouchableOpacity>
        )
    }
}