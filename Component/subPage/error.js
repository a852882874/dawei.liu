//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, NetInfo,TouchableWithoutFeedback,
    Dimensions, ToastAndroid, BackAndroid, AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window");
import My from './../page/myProfile.js';
import MyIndex from './../page/MyIndex.js';
import SplashScreen from 'react-native-splash-screen'
import StartUpPage from './../viewpager/pageYin.js';
export default class Error extends Component {
    constructor(props) {
        super(props);
        SplashScreen.hide()
    }
    _login() {
        let that = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
            } else {
                SplashScreen.show()
                that.props.navigator.push({
                    component: StartUpPage,
                    reset: true,
                    type: "image",//注意这个赋值，
                    params: {
                        navigator: that.props.navigator,
                    }
                })
            }
        });
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this._login()}>
                <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "#828282" }}> 网络连接失败！请连接后点击重试 </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
