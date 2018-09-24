import React from 'react';
import {AsyncStorage} from 'react-native';

import GitHubTrending from 'GitHubTrending';

export default class TrendingData {
    constructor(props) {
        this.gitHubTrending = new GitHubTrending();
    }

    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then(result => {
                    if (result) {
                        resolve(result)
                    } else {
                        this.fetchInterfaceData(url).then(result => {
                            resolve(result);
                        })

                    }
                })
                .catch(e => {
                    this.fetchInterfaceData(url).then(result => {
                        resolve(result);
                    })
                })
        });
    }

    /*
    * 获取本地数据
    * */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(error);
                    }
                }
            })
        })
    }

    /*
    * 通过接口获取数据
    * */
    fetchInterfaceData(url) {
        return new Promise((resolve, reject) => {
            this.gitHubTrending.fetchTrending(url).then(result => {
                this.saveData(url, result);
                resolve(result);
            })
        });

    }

    /*
    * 如果本地没有数据或数据已经过期，将数据保存本地
    * */
    saveData(url, items, callback) {
        if (!url || !items) {
            return;
        }
        let wrapData = {
            items: items,
            update_data: new Date().getTime()
        };
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback)
    }

    /*
    * 判断数据是否过时
    * */
    checkData(longTime) {
        let cDate = new Date(), tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;
    }
}