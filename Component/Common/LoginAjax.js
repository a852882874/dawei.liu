import React, { Component } from 'react';
import { AsyncStorage, Navigator, NativeModules, NetInfo } from 'react-native';
const ajax_http = 'http';
const ajax_IP = 'api.aityuan.com/api/';
// const ajax_IP = '172.19.12.248/api';
// const ajax_IP = '118.89.196.120:10601/api/';
import Login from './../login/login.js';
import Error from './../subPage/error.js';
const uri_ajax = ajax_http + '://' + ajax_IP;
const token = ''
export default class _ajax extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentWillMount() {

    }
    static getImage(api, callback) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                return false;
            } else {
                let url = "http://" + api;
                console.log(url)
                fetch('http://p1kadpoax.bkt.clouddn.com/e28b9b00-df05-11e7-92b3-d188f16931e2', {
                    method: 'GET',
                    headers: {
                    }
                }).then((response) => response.json())
                    .then((responseJson) => {
                        callback(responseJson);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        });

    }
    static get(api, callback) {
        let that = this;
        let url = uri_ajax + api;
        console.log(url)
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                return false;
            } else {
                fetch(url, {
                    method: 'GET',
                }).then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.code === 0) {
                            callback(responseJson);
                        } else {
                            console.log(responseJson);
                        }
                        //                    
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        });

    }
    static post(api, json_xin, callback) {
        let that = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                return false;
            } else {
                let url = uri_ajax + api;
                console.log(url)
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(json_xin)
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        callback(responseJson);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }
    static post_token(api, json_xin, callback) {
        let that = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                return false;
            } else {
                AsyncStorage.getItem('tokenId', (err, results) => {
                    // token = results
                    let url = uri_ajax + api;
                    let tokens = JSON.parse(results);
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + tokens,
                        },
                        body: JSON.stringify(json_xin)
                        // body:'phoneN=17512549332' 
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            callback(responseJson);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            }
        });
    }
    static post_image_token(api, json_xin, callback) {
        let that = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                return false;
            } else {
                AsyncStorage.getItem('tokenId', (err, results) => {
                    let url = uri_ajax + api;
                    let tokens = JSON.parse(results);
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + tokens,
                        },
                        body: json_xin
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            callback(responseJson);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            }
        });
    }
    static get_token(api, navigator, callback) {
        let that = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                return false;
            } else {
                AsyncStorage.getItem('tokenId', (err, results) => {
                    let url = uri_ajax + api;
                    let tokens = JSON.parse(results)
                    console.log(url)
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + tokens,
                        }
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            // console.log(responseJson)
                            if (responseJson.code == 1002) {
                                NativeModules.MyNativeModule.rnCallNative("你的账号在其他地方登录哦~");
                                navigator.push({
                                    component: Login,
                                    reset: true,
                                    type: "image",//注意这个赋值，
                                    params: {
                                        navigator: navigator
                                    }
                                })
                                return false;
                            } else {
                                callback(responseJson);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            }
        });

    }
}
