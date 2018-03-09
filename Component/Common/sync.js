
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, InteractionManager, ToastAndroid, Image, BackAndroid, AsyncStorage, Alert } from 'react-native'
// import Storage from 'react-native-storage';
import Storage from "./Storage";
let SYNC = {};
import _ajax from './LoginAjax.js';
import tokenImage from './token.js';
SYNC.user = (params) => {
    Storage.userList(function (storage) {
        Storage._getStorage();
        if (params == null) return;
        // // sync方法的名字必须和所存数据的key完全相同
        // // 方法接受的参数为一整个object，所有参数从object中解构取出
        // // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
        _ajax.get_token("user?targetUserId=" + id, '', function (res) {
            console.log(res.user)
            if (res.code == 0) {
                storage.save({
                    key: 'user',
                    id: id,
                    data: res.user,
                });
                resolve(res.user);
                // console.log(resolve)
            }
        })
    });
}
SYNC.preDetailImage = (params) => {
    Storage.ImageAv(function (storage) {
        Storage._getStorage();
        if (params == null) return;
        // // sync方法的名字必须和所存数据的key完全相同
        // // 方法接受的参数为一整个object，所有参数从object中解构取出
        // // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
        console.log(id)
        _ajax.get_token('user/image/list?objectUid=' + id, '', function (res) {
            if (res.code == 0 && res.imageList.length > 0) {
                let json = []
                res.imageList.map((item, key) => {
                    if (item.usage == 0) {
                        tokenImage.tokenImg(item.uuid, function (res) {
                            json = json.concat({ uri: res, confirmed: item.confirmed });
                            storage.save({
                                key: 'preDetailImage',
                                id: id,
                                data: json
                            });
                        })
                    }
                })
                setTimeout(function(){
                    console.log(json)
                    resolve(json);
                },1000)
            } else {
                resolve(res.user);
            }
        })
    })
}
SYNC.preDetailImageList = (params) => {
    Storage.ImageList(function (storage) {
        Storage._getStorage();
        if (params == null) return;
        // // sync方法的名字必须和所存数据的key完全相同
        // // 方法接受的参数为一整个object，所有参数从object中解构取出
        // // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
        console.log(id)
        _ajax.get_token('user/image/list?objectUid=' + id, "", function (res) {
            if (res.code == 0 && res.imageList.length > 0) {
                let json = []
                res.imageList.map((item) => {
                    if (item.usage == 1) {
                        if (item.confirmed == 4) {
                            tokenImage.tokenImg(item.uuid, function (res) {
                                storage.save({
                                    key: 'preDetailImageList',
                                    id: id,
                                    data: res,
                                });
                                resolve(res);
                            })
                        } else {
                            storage.save({
                                key: 'preDetailImageList',
                                id: id,
                                data: "",
                                avatarSourceShenhe: ""
                            });
                            resolve("avatarSource2panduan");
                        }
                    } else {
                    }
                })
            }
        })
    });
}
export default SYNC