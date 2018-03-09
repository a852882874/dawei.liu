//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, NativeModules,
    Dimensions, BackAndroid,
    InteractionManager,
    TouchableWithoutFeedback,
    AsyncStorage, Alert, NetInfo
} from 'react-native'
const { width, height } = Dimensions.get("window");
import StartUp from './guidePager';
import SearchAndm from './searchAndm.js';
import _ajax from "./../Common/LoginAjax.js";
import Login from './../login/login.js';
import ProfessionalCertification from './../page/ProfessionalCertification.js';
import Error from './../subPage/error.js';
import RegisterZi from './../login/registerZi.js';
import RegisterSetImage from './../login/setImage.js';
import Firest from './../home/Firest.js';
import QuizOne from './../quiz/quizOne.js';
import NetWorkTool from './../Common/NetworkInfo.js';
import JPushModule from 'jpush-react-native';
import SplashScreen from 'react-native-splash-screen'
// import Firest from './../viewpager/StartUp.js';
export default class pageYin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOld: false,
            isLogin: false,
            page: 1,
            denglu: '',
            user_sex: "",
            sex: '',
            ceshiti: false,
            ziliao: false,
            emailConfirmed: "",
            isConnected: null,
            connectInfo: '',
        }
        let that = this;
        InteractionManager.runAfterInteractions(() => {
            that._sex(that)
                .then(
                function (data) {
                    // console.log(data)
                    return that._token(that);
                }
                )
                .then(
                function (data) {
                    // console.log(data)
                    return that._NetInfo(that);
                }
                )
                .then(
                function (data) {
                    // console.log(data)
                    return that._ziliao(that);
                }
                )
                .then(
                function (data) {
                    return that._ceshiti(that);
                }
                )
                .then(
                function (data) {
                    // console.log(data)
                    if (that.state.user_sex == "male") {
                        if (that.state.emailConfirmed == 0) {
                            that.props.navigator.push({
                                component: ProfessionalCertification,
                                reset: true,
                                type: "image",//注意这个赋值，
                                params: {
                                    navigator: that.props.navigator,
                                    frists: false
                                }
                            })
                            return false;
                        } else {
                            that.props.navigator.push({
                                component: Firest,
                                reset: true,
                                type: "image",//注意这个赋值，
                                params: {
                                    navigator: that.props.navigator,
                                }
                            })
                            return false;
                        }
                    } else {
                        console.log('SearchAndm')
                        that.props.navigator.replace({
                            component: SearchAndm,
                            reset: true,
                            params: {
                                navigator: that.props.navigator,
                            }
                        })
                        return false;
                    }

                }
                )
        })
    }
    componentWillUnmount() {
        clearInterval(this.times)
        this.times && clearInterval(this.times)
    }

    _handleNetChange() {

    }
    //用户登录  token
    _token(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            AsyncStorage.getItem('tokenId', (err, results) => {
                if (JSON.parse(results) != null) {
                    resolve("有token")
                } else {
                    that.props.navigator.replace({
                        component: Login,
                        reset: true,
                        type: "image",//注意这个赋值，
                        params: {
                            navigator: that.props.navigator,
                            sex: that.state.user_sex
                        }
                    })
                    return false;
                }
            })
        });
        return p;
    }
    // 网络
    _NetInfo(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            NetInfo.isConnected.fetch().then(isConnected => {
                if (!isConnected) {
                    that.props.navigator.replace({
                        component: Login,
                        reset: true,
                        type: "image",//注意这个赋值，
                        params: {
                            navigator: that.props.navigator,
                            sex: that.state.user_sex
                        }
                    })
                    NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                    reject("网络没连接")
                    return false;
                } else {
                    resolve("网络连接")
                }
            });
        });
        return p;
    }
    //性别  缓存
    _sex(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            AsyncStorage.getItem('user_sex', (err, result) => {
                if (JSON.parse(result) != null) {
                    resolve("性别" + JSON.parse(result).user_sex)
                    that.setState({
                        user_sex: JSON.parse(result).user_sex
                    })
                } else {
                    that.props.navigator.replace({
                        component: StartUp,
                        reset: true,
                        params: {
                            navigator: that.props.navigator
                        }
                    })
                    reject("性别无")
                    return false;
                }
            });
        });
        return p;
    }
 
    //填写资料  缓存
    _ziliao(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                AsyncStorage.setItem('UserList', JSON.stringify({ UserList: res.user }), () => { });
                console.log(res)
                if (res.user.birthday != null || res.user.birthday != undefined) {
                    that.setState({
                        ziliao: true,
                        emailConfirmed: res.user.emailConfirmed
                    })
                    resolve("填写资料")
                } else {
                    that.props.navigator.replace({
                        component: RegisterZi,
                        reset: true,
                        type: "image",//注意这个赋值，
                        params: {
                            navigator: that.props.navigator,
                        }
                    })
                    return false;

                }
            })
            
            // AsyncStorage.getItem('ziliao', (err, result) => {
            //     if (JSON.parse(result) != null) {
            //     } else {
            //     }
            // })
        });
        return p;
    }
    //测试题  缓存
    _ceshiti(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            _ajax.get_token("match/questions/user/answer_stat", that.props.navigator, function (res) {
                if (res.answered_questions_num > 0) {
                    resolve("测试题")
                } else {
                    that.props.navigator.replace({
                        component: QuizOne,
                        reset: true,
                        type: "image",//注意这个赋值，
                        params: {
                            navigator: that.props.navigator,
                        }
                    })
                    return false;
                }
                resolve("测试题")
            })
        });
        return p;
    }
    render() {
        return (
            <View>
            </View>
        )
    }
}