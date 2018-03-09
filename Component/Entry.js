//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, StatusBar,
    ToastAndroid, Platform, BackHandler, AsyncStorage, Alert, NativeModules
} from 'react-native'
// import {getValue,setValue} from './counter'
// import {on,remove} from './event'
import { Navigator } from 'react-native-deprecated-custom-components'
// import Firest from './home/Firest.js';
// import JPushModule from 'jpush-react-native '
// var { NativeAppEventEmitter } = require('react-native');
import StartUpPage from './viewpager/pageYin.js';
// import StartUpPage from './page/ProfessionalCertification.js';
// import StartUpPage from './page/momMyProfile.js';
// import StartUpPage from './login/setImage.js';
// import StartUpPage from './login/otherLogin.js';
// import StartUpPage from './login/registerZi.js';
import Login from './login/login.js';
// import StartUpPage from './home/aaa.js';
// import StartUpPage from './quiz/QuizSuccess.js';
// import StartUpPage from './quiz/identityCard.js';
// import StartUpPage from './quiz/quizTest.js';
// import StartUpPage from './page/myProfile.js'; //我的资料
// import StartUpPage from './subPage/setting.js'; //设置
import JMessage from 'jmessage-react-plugin';
// import StartUpPage2 from './home/Firest.js';
// import StartUpPage from './viewpager/guidePager.js';
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aaa: StartUpPage
        }
        if (!__DEV__) {
            global.console = {
                info: () => { },
                log: () => { },
                warn: () => { },
                debug: () => { },
                error: () => { },
            };
        } else {
            global.console = {
                info: () => {},
                log: () => {},
                warn: () => {},
                debug: () => {},
                error: () => {},
              };
        }
        // AsyncStorage.removeItem("user_token",function(errs) {})
        // AsyncStorage.removeItem("user_sex",function(errs) {})
        // AsyncStorage.removeItem("tokenId",function(errs) {})
        // AsyncStorage.removeItem("ceshiti",function(errs) {})
        // AsyncStorage.removeItem("visibleShowScrollViewLeft",function(errs) {})
        // AsyncStorage.removeItem("visibleShowScrollViewRight",function(errs) {})
        
        this.listener = (event) => {
            console.log(event)
            JMessage.logout()
        }

        JMessage.addLoginStateChangedListener(this.listener) // 添加监听
    }
    /**
     * 安卓返回键
     */
    componentWillMount() {
        if (Platform.OS === 'android') {
            NativeModules.MyNativeModule.checkDeviceHasNavigationBar(function (res) {
                AsyncStorage.setItem('huawei', JSON.stringify(res), () => { });
            });
            BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler)
        }
        if (this.listener != undefined) {
            JMessage.removeMessageRetractListener(this.listener) // 移除监听(一般在 componentWillUnmount 中调用)
        }
    }
    onBackHandler = () => {
        const nav = this.refs.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            const top = routers[routers.length - 1];
            if (top.ignoreBack || top.component.ignoreBack) {
                return true;
            }
            const handleBack = top.handleBack || top.component.handleBack;
            if (handleBack) {
                return handleBack();
            }
            nav.pop();
            return true;
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再次点击退出', ToastAndroid.LONG)
            return true;
        }
    }


    // 在这里控制路由
    render() {
        return (

            <Navigator
                initialRoute={{ component: this.state.aaa }}
                ref='navigator'
                onDidFocus={(route) => {
                    if (route.reset) {
                        this.refs.navigator.immediatelyResetRouteStack([{ component: route.component }])
                    }
                }}
                configureScene={(route) => {
                    //console.log('route.type is =' + route.type);
                    //console.log('route.name is =' + route.name);
                    if (route.type == 'image') {
                        //return Navigator.SceneConfigs.PushFromRight
                        //var conf = Navigator.SceneConfigs.VerticalDownSwipeJump;//从上往下
                        var conf = Navigator.SceneConfigs.FadeAndroid;//透明度
                        conf.gestures = null;
                        return conf;
                    }
                    //{/* return Navigator.SceneConfigs.FloatFromRight */}
                    //直接用同一个动画跳转 
                    //return Navigator.SceneConfigs.FloatFromRight 
                    else {
                        var conf = Navigator.SceneConfigs.HorizontalSwipeJump;
                        conf.gestures = null;
                        return conf;
                    }
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }} />
        )
    }
}

const entryStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
})