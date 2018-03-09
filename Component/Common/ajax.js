import React, { Component } from 'react';
import { AsyncStorage, Navigator } from 'react-native';
import SHA256 from 'crypto-js/sha256';
const ajax_http = 'http';
const ajax_IP = '1172.16.116.65';
const uri_ajax = ajax_http + '://' + ajax_IP + '/';
export default class _ajax extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', Taylor: '' };
    }
    static get(api, callback) {
        var that = this;
        AsyncStorage.getItem('user_token', (err, result) => {
            let obj = JSON.parse(result);
            let data = parseInt(new Date().getTime() / 1000);
            let url = uri_ajax + api + "/" + obj.app_key + "/" + data;
            console.log(url)
            fetch(url, {
                method: 'GET',
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.code === 0) {
                        AsyncStorage.removeItem('user_token');
                        console.log(responseJson.msg)
                        if (responseJson.msg == "用户不存在" || responseJson.msg == "ilopuFHJUW69-app_key不存在") {
                            AsyncStorage.removeItem('user_token');
                        } else {
                            let formData = new FormData();
                            formData.append("msg", api + '--' + responseJson.msg + '--' + url);
                            _ajax.POST('log', formData, function (res) {
                            })
                        }

                    } else if (responseJson.code === 1) {
                        callback(responseJson);
                    }
                    //                    
                })
                .catch((error) => {
                    console.log(error);
                    let formData = new FormData();
                    formData.append("msg", api + '--抛出异常--' + url);
                    _ajax.POST('log', formData, function (res) {
                    })
                });
        });
    }
    static POST(api, json_xin, callback) {
        var that = this;
        AsyncStorage.getItem('user_token', (err, result) => {
            let obj = JSON.parse(result);
            let data = parseInt(new Date().getTime() / 1000);
            let assign = SHA256("/" + ajax_version + "/" + api + "/" + obj.app_key + "/" + data + obj.app_value).toString();
            let url = uri_ajax + api + "/" + obj.app_key + "/" + data + "/" + assign;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: json_xin
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.code === '1') {
                        callback(responseJson)
                    } else {
                    }

                })
                .catch((error) => {
                });
        });

    }
}
