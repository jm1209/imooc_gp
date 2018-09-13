import React from 'react';
import {AsyncStorage} from 'react-native';

import keys from '../data/keys.json';

export var FLAG_LANGUAGE = {
    flag_language: 'flag_language_language',
    flag_key: 'flag_language_key'
};

export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data))
    };

    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (result) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        result(e)
                    }
                } else {
                    var data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null;
                    this.save(data);
                    resolve(data);
                }

            })
        })
    }
}