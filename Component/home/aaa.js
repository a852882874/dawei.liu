//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, TouchableOpacity, Navigator, InteractionManager, ToastAndroid, Image, BackAndroid, AsyncStorage, Alert } from 'react-native'
import Storage from "./../Common/Storage";
import { cal } from './../Common/Cal.js';
import SplashScreen from 'react-native-splash-screen';
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                a: 1,
                b: 3
            },
            num:1
        }
        SplashScreen.hide()
    }
    _chu() {
        this.state.user.a = ++this.state.user.a
        this.state.num = ++this.state.num
        this.setState({
            user: this.state.user,
            num : ++this.state.num
        })
        Storage._getStorage();

        // global.storage = storage;
        console.log(this.state.num)
        Storage._sava('user', this.state.num , this.state.user);
    }
    _qun() {
        Storage._getStorage();
        // global.storage = storage;
        Storage._load("user",24,2,2, function (res) {
            console.log(res)
        });
    }
    _shpan(){
        Storage._getStorage();
        Storage.getAllDataForKey("user",function(res){
            console.log(res)
        })
    }
    _shan() {
        Storage._getStorage();
        // global.storage = storage;
        Storage._remove("user",24, function (res) {
            console.log(res)
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this._chu()}>
                    <View style={{ marginTop: cal(60), backgroundColor: "red", width: cal(100), height: cal(50) }}>
                        <Text >存数据</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._qun()}>
                    <View style={{ marginTop: cal(60), backgroundColor: "red", width: cal(100), height: cal(50) }}>
                        <Text >取数据</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._shpan()}>
                    <View style={{ marginTop: cal(60), backgroundColor: "red", width: cal(100), height: cal(50) }}>
                        <Text>查询所有</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._shan()}>
                    <View style={{ marginTop: cal(60), backgroundColor: "red", width: cal(100), height: cal(50) }}>
                        <Text>删除数据</Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
}
