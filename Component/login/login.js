//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView, Platform, Image, Modal, WebView, TouchableWithoutFeedback,
    NetInfo,
    Dimensions, TextInput, TouchableOpacity, AsyncStorage, Alert, NativeModules
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
// import HraderLogin from './../Common/HraderLogin.js'
// import QuizOne from "./../quiz/quizOne.js"
import QuizOne from "./../home/Firest.js"
const BACKGROUNDMOM = require('./../image/public/backgroundMom.png');
import Wangji from "./wangji.js";
import otherLoginSuccess from "./otherSuccess.js";
const BACKGROUND = require('./../image/public/background.png');
import LoginSuccess from "./loginSuccess.js";
const { PublicColor } = require("./../Common/Color.js");
import Loadding from './../Common/Loadding.js'
const { width, height } = Dimensions.get("window");
const { cal } = require("./../Common/Cal.js");
import Register from './../login/register.js';
const HIDESHOWED = require("./../image/login/hide2.png");
const HIDESHOW = require("./../image/login/hideEd2.png");
const PASSWORD = require("./../image/login/password.png");
const IPHONE = require("./../image/login/iphone.png");
const IPHONEMOM = require("./../image/mom/iphone.png");
const PASSWORDMOM = require("./../image/mom/password.png");
import _ajax from "./../Common/LoginAjax.js";
import OtherLogin from "./otherLogin.js";
import * as WeChat from 'react-native-wechat';
import * as WeiboAPI from 'react-native-weibo';
import * as QQAPI from 'react-native-qq';
import SHA256 from 'crypto-js/md5';
const QQLOGIN = require("./../image/login/qqTwo.png");
const WEIBOLOGIN = require("./../image/login/weiboTwo.png");
const WEIXINLOGIN = require("./../image/login/weixinTwo3.png");
import JMessage from 'jmessage-react-plugin';
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            passWord: '',
            show_passwords: true,
            show_passwords_image: false,
            user_sex: "",
            yan: false,
            visible: false,
            isLeft: 0,
            page: 1,
            Loadding: true,
            open: false,
            token: "",
            type: "",
            wecheatCode: "",
            newUserName: false,
            disableds: false,
        }
        WeChat.registerApp("wx812a409daf24c1eb");//从微信开放平台申请
        let that = this;
        AsyncStorage.getItem('newUserName', (err, result) => {
            if (JSON.parse(result) != null) {

            } else {
                that.setState({
                    newUserName: true
                })
            }
        })
    }
    componentWillMount() {
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                if (!that.lock) {
                    that.setState({
                        user_sex: JSON.parse(result).user_sex,
                        Loadding: false
                    })
                }
            }
            return false;
        })
       that.time_SplashScreen = setTimeout(function(){
            SplashScreen.hide();
        },2000)
    }
    componentWillUnmount() {
        this.refs.inputWR.blur();
        this.refs.inputWR1.blur();
        this.timer && clearTimeout(this.timer);
        this.time_SplashScreen && clearTimeout(this.time_SplashScreen);
        this.lock = true;
    }
    toUpGuidePager() {
        this.props.navigator.push({
            component: GuidePager,
            reset: true,
            params: {
                navigator: this.props.navigator
            }
        })
    }
    qieHuan() {
        if (!this.lock) {
            this.setState({
                show_passwords_image: !this.state.show_passwords_image,
                show_passwords: !this.state.show_passwords
            })
        }
    }

    logining() {
        this.refs.inputWR.blur();
        this.refs.inputWR1.blur();
        this.loginEndEdit();
    }
    endEdit() {
    }
    loginEndEdit() {
        let that = this;
        if (!that.lock) {
            that.setState({
                disableds: true,
            })
        }
        that.timer = setTimeout(function (res) {
            if (!that.lock) {
                that.setState({
                    disableds: false
                })
            }
        }, 5000)
        if (!(/^1[2345789]\d{9}$/.test(that.state.phone))) {
            NativeModules.MyNativeModule.rnCallNative("手机号码有误，请重填");
            that.timer && clearTimeout(that.timer);
            if (!that.lock) {
                that.setState({
                    disableds: false,
                })
            }
            return false;
        } else {
            let formData = {}
            if (that.state.newUserName) {
                formData = {
                    mobileNr: this.state.phone,
                    password: this.state.passWord,
                    login_type: "mobile",
                    reinstall: "true"
                }
            } else {
                formData = {
                    mobileNr: this.state.phone,
                    password: this.state.passWord,
                    login_type: "mobile",
                }
            }
            console.log(formData)
            _ajax.post("login", formData, function (res) {
                console.log(res)
                if (res.code == 0) {
                    JMessage.login({
                        username: that.state.phone,
                        password: '111111'
                    }, (data) => {
                        // SplashScreen.show();
                        AsyncStorage.setItem('user_sex', JSON.stringify({ 'user_sex': res.user.sex == 1 ? "male" : "female" }), () => { });
                        AsyncStorage.setItem('newUserName', JSON.stringify('newUserName'), () => { })
                        AsyncStorage.setItem('tokenId', JSON.stringify(res.token), () => {
                            AsyncStorage.setItem('user_token', JSON.stringify({ username: that.state.phone, password: '111111' }), () => {
                                that.props.navigator.push({
                                    component: LoginSuccess,
                                    params: {
                                        navigator: that.props.navigator
                                    }
                                })
                            });
                        })
                    }, (error) => {
                        if (error.code == 801003) {
                        }
                        that.timer && clearTimeout(that.timer);
                        if (!that.lock) {
                            that.setState({
                                disableds: false,
                            })
                        }
                    })
                }
                else if (res.code == 1016) {
                    that.timer && clearTimeout(that.timer);
                    if (!that.lock) {
                        that.setState({
                            open: true,
                            token: res.token,
                            disableds: false,
                            type: "IPHONE"
                        })
                    }
                }
                else if (res.code == 1010) {
                    NativeModules.MyNativeModule.rnCallNative("您的手机号是第三方登录的，微信登陆后修改密码~")
                    that.timer && clearTimeout(that.timer);
                    if (!that.lock) {
                        that.setState({
                            disableds: false,
                        })
                    }
                }
                else {
                    NativeModules.MyNativeModule.rnCallNative(res.info)
                    that.timer && clearTimeout(that.timer);
                    if (!that.lock) {
                        that.setState({
                            disableds: false,
                        })
                    }
                }
            })
        }
    }
    phones(phone) {
        if (/1[234578]\d+/.test(phone) || phone.length < 3) {
            if (!this.lock) {
                this.setState({
                    yan: false
                })
            }
        } else {
            if (!this.lock) {
                this.setState({
                    yan: true
                })
            }
        }
        if (!this.lock) {
            this.setState({ phone })
        }
    }
    ToRegister() {
        this.props.navigator.push({
            component: Register,
            params: {
                navigator: this.props.navigator
            }
        })
    }
    _header() {
        if (this.state.user_sex == "male") {
            return (
                <View>
                    <Image
                        source={BACKGROUND}
                        style={[{ height: cal(44), paddingLeft: cal(15), paddingRight: cal(8), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
                    >
                        <View>
                            <Text style={{ fontSize: cal(15), color: '#fff' }}>注册</Text>
                        </View>
                        <Text style={{ fontSize: cal(17), paddingLeft: cal(20), color: PublicColor.Public_Text5 }}>用户登录</Text>
                        <View style={{}}>
                            <TouchableWithoutFeedback
                                onPress={() => this.ToRegister()}
                            >
                                <View style={{ padding: cal(10), }}>
                                    <Text style={{ fontSize: cal(15), color: PublicColor.Public_Text5 }}>注册</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Image>
                </View>
            )
        } else {
            return (
                <Image
                    source={BACKGROUNDMOM}
                    style={{ width: width, height: cal(44) }}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: cal(44) }}>
                        <View style={{ width: cal(80) }}>
                            <Text style={{ fontSize: cal(15), color: '#fff' }}></Text>
                        </View>
                        <Text style={{ fontSize: cal(17), color: "#fff" }}>用户登录</Text>
                        <View style={{ width: cal(80), alignItems: "flex-end", paddingRight: cal(15), }}>
                            <TouchableWithoutFeedback
                                onPress={() => this.ToRegister()}
                            >
                                <View>
                                    <Text style={{ fontSize: cal(15), color: "#f5f4fe" }}>注册</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Image>
            )
        }
    }
    render() {
        if (this.state.page != 1) return false
        // if (this.state.Loadding) return false
        return (
            <View style={{ flex: 1, position: "relative", backgroundColor: PublicColor.Public_ViewBackground }}>
                <TouchableWithoutFeedback onPress={() => {
                    this.refs.inputWR.blur();
                    this.refs.inputWR1.blur();
                }}>
                    <View>
                        {this._header()}
                        {/* <HraderLogin type={"denglu"} title={"用户登录"} navigator={this.props.navigator} /> */}
                        <View style={{ height: cal(30), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                        <View>
                            <View style={LoginStyle.inputWrap}>
                                <View style={LoginStyle.zhanghao}>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: cal(12) }}>
                                        <Image source={this.state.user_sex == "male" ? IPHONE : IPHONEMOM} style={{ width: cal(16), height: cal(16) }} />
                                        {/* <Text style={LoginStyle.zhanghao_text}>账号</Text> */}
                                    </View>
                                    <TextInput
                                        style={[LoginStyle.phoneStyle]}
                                        clearTextOnFocus={true}
                                        maxLength={11}
                                        underlineColorAndroid="rgba(0,0,0,0)"
                                        enablesReturnKeyAutomatically={true}
                                        keyboardType="numeric"
                                        blurOnSubmit={true}
                                        clearButtonMode='always'
                                        placeholder="请输入手机号"
                                        placeholderTextColor={PublicColor.Public_NoClockBackground}
                                        onChangeText={(phone) => this.phones(phone)}
                                        ref="inputWR"
                                    />
                                </View>
                                <View style={{ alignItems: "center", paddingLeft: cal(15), paddingRight: cal(15) }}>
                                    <View style={{ backgroundColor: "#e6e6e6", height: cal(0.5), width: width - cal(30), }}></View>
                                </View>
                                <View style={LoginStyle.zhanghao}>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: cal(12) }}>
                                        <Image source={this.state.user_sex == "male" ? PASSWORD : PASSWORDMOM} style={{ width: cal(16), height: cal(16) }} />
                                        {/* <Text style={LoginStyle.zhanghao_text}>密码</Text> */}
                                    </View>
                                    <TextInput
                                        ref="inputWR1"
                                        style={[LoginStyle.phoneStyle, { width: cal(260) }]}
                                        clearTextOnFocus={true}
                                        enablesReturnKeyAutomatically={true}
                                        returnKeyType="search"
                                        placeholder="请输入密码"
                                        underlineColorAndroid="rgba(0,0,0,0)"
                                        placeholderTextColor={PublicColor.Public_NoClockBackground}
                                        blurOnSubmit={true}
                                        maxLength={16}
                                        onChangeText={(passWord) => this.setState({ passWord })}
                                        secureTextEntry={this.state.show_passwords}
                                        onSubmitEditing={() => this.loginEndEdit()}
                                        onEndEditing={() => { this.endEdit() }}
                                    />
                                    <TouchableOpacity onPress={() => this.qieHuan()} style={{ marginLeft: cal(12) }}>
                                        <View style={{ height: cal(40), width: cal(40), alignItems: "center", justifyContent: "center" }}>
                                            <Image source={this.state.show_passwords_image ? HIDESHOWED : HIDESHOW} style={{ width: cal(17), height: cal(8) }} />
                                        </View>
                                    </TouchableOpacity >
                                </View>
                            </View>
                        </View>

                        <View style={[LoginStyle.btn]}>
                            <TouchableOpacity
                                disabled={this.state.phone.length == 11 && this.state.passWord != "" && this.state.yan == false && this.state.disableds == false ? false : true}
                                onPress={() => this.logining()}
                            >
                                <View style={[LoginStyle.btnLoggin, this.state.phone.length == 11 && this.state.yan == false && this.state.passWord != "" ? { backgroundColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, } : { backgroundColor: "#d6d6d6" }]}>
                                    <Text style={LoginStyle.btn_text}>登录</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: cal(15), alignItems: "flex-end", paddingRight: cal(22) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigator.push({
                                        component: Wangji,
                                        params: {
                                            navigator: this.props.navigator
                                        }
                                    })
                                }}
                                style={{ width: cal(70),alignItems: "flex-end", }}>
                                <Text
                                    style={{ fontSize: cal(12), color: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackgroundQuan, }}>
                                    忘记密码？
                            </Text>
                                {/* <View style={{ backgroundColor: this.state.user_sex == "male" ? "#7293c9" : PublicColor.Public_MomClickBackground, position: "absolute", top: cal(14), right: cal(22), height: cal(0.5), width: cal(50) }}></View> */}
                            </TouchableOpacity>
                        </View>
                        <View style={LoginStyle.other}>
                            <View style={LoginStyle.other_top}>
                                <View style={{ width: cal(60), height: cal(0.5), marginRight: cal(8), backgroundColor: "#dcdcdc" }}></View>
                                <Text style={LoginStyle.other_top_text}>
                                    其他账号登录
                            </Text>
                                <View style={{ width: cal(60), height: cal(0.5), marginLeft: cal(8), backgroundColor: "#dcdcdc" }}></View>
                            </View>
                            <View style={LoginStyle.other_bottom}>
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        let config = {
                                            scope: 'all', // 默认 'all'
                                            redirectURI: 'http://open.weibo.com/apps/1604828620/privilege/oauth'
                                        }
                                        WeiboAPI.login(config).then(responseCode => {
                                            this._weiboLogin(responseCode)
                                        })
                                            .catch(err => {
                                                console.log(err)
                                                Alert.alert('登录授权发生错误：', err.message, [
                                                    { text: '确定' }
                                                ]);
                                            })
                                    }}
                                >
                                    <View>
                                        <Image source={WEIBOLOGIN} style={{ width: cal(61), height: cal(61) }} />
                                    </View>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        let scopes = "get_user_info";
                                        QQAPI.login(scopes).then(responseCode => {
                                            this.loginQQ(responseCode)
                                        })
                                            .catch(err => {
                                                Alert.alert('登录授权发生错误：', err.message, [
                                                    { text: '确定' }
                                                ]);
                                            })
                                    }}
                                >
                                    <View>
                                        <Image source={QQLOGIN} style={{ width: cal(61), height: cal(61) }} />
                                    </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => {
                                        let scope = 'snsapi_userinfo';
                                        let state = 'wechat_sdk_demo';
                                        let that = this;
                                        //判断微信是否安装
                                        WeChat.isWXAppInstalled()
                                            .then((isInstalled) => {
                                                if (isInstalled) {
                                                    //发送授权请求
                                                    WeChat.sendAuthRequest(scope, state)
                                                        .then(responseCode => {
                                                            //返回code码，通过code获取access_token
                                                            console.log(responseCode)
                                                            that.getAccessToken(responseCode)
                                                        })
                                                        .catch(err => {
                                                            console.log(err)
                                                            // Alert.alert('登录授权发生错误：', err.message, [
                                                            //     { text: '确定' }
                                                            // ]);
                                                        })
                                                } else {
                                                    Platform.OS == 'ios' ?
                                                        Alert.alert('没有安装微信', '是否安装微信？', [
                                                            { text: '取消' },
                                                            { text: '确定', onPress: () => this.installWechat() }
                                                        ]) :
                                                        Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                                                            { text: '确定' }
                                                        ])
                                                }
                                            })
                                    }}
                                >
                                    <View style={{ alignItems: "center" }}>
                                        <Image source={WEIXINLOGIN} style={{ width: cal(52.5), height: cal(45) }} />
                                        <Text style={{ fontSize: cal(11), color: "#b1b1b1" }}>
                                            微信
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Modal
                    visible={this.state.open}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={() => { alert("Modal has been closed.") }}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({ open: false })}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", height: height, backgroundColor: "rgba(0,0,0,0.4)" }}>
                        <View style={{ width: cal(280), height: cal(140), backgroundColor: "#fff", borderRadius: cal(5) }}>
                            <View style={{ justifyContent: "center", alignItems: "center", height: cal(144 - 0.5 - 20 - 50 - 18), marginTop: cal(16) }}>
                                <Text style={{ fontSize: cal(16), color: "#1f1f1f" }}>该账号已失效</Text>
                                <Text style={{ fontSize: cal(14), color: "#5f5f5f" }}>是否重新激活该账号？</Text>
                            </View>
                            <View style={{ width: cal(280), height: cal(0.5), backgroundColor: "#b1b1b1", marginTop: cal(20) }}>

                            </View>
                            <View style={{ height: cal(50), justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            open: false
                                        })
                                    }}
                                    style={{ flex: 1, borderRightWidth: cal(0.5), borderRightColor: "#b1b1b1", height: cal(50) }}
                                >
                                    <View style={{ alignItems: "center", height: cal(50), justifyContent: "center" }}>
                                        <Text style={{ fontSize: cal(14), color: "#5f5f5f" }}>否</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        this.setState({
                                            open: false,
                                        })
                                        let that = this;
                                        if (that.state.type == "WECHAT") {
                                            let formData = {}
                                            if (that.state.newUserName) {
                                                formData = {
                                                    login_type: "wechat",
                                                    wechat_code: that.state.wecheatCode,
                                                    "action": "activate",
                                                    reinstall: "true"
                                                }
                                            } else {
                                                formData = {
                                                    login_type: "wechat",
                                                    wechat_code: that.state.wecheatCode,
                                                    "action": "activate"
                                                }
                                            }
                                            _ajax.post("login", formData, function (res) {
                                                console.log(res)
                                                if (res.code == 0) {
                                                    JMessage.login({
                                                        username: res.user.mobileNr,
                                                        password: '111111'
                                                    }, (data) => {
                                                        AsyncStorage.setItem('newUserName', JSON.stringify('newUserName'), () => { })
                                                        AsyncStorage.setItem('tokenId', JSON.stringify(res.token), () => {
                                                            AsyncStorage.setItem('user_token', JSON.stringify({ username: res.user.mobileNr, password: '111111' }), () => {
                                                                that.props.navigator.push({
                                                                    component: LoginSuccess,
                                                                    params: {
                                                                        navigator: that.props.navigator
                                                                    }
                                                                })
                                                            });
                                                        })
                                                    }, (error) => {
                                                    })
                                                }
                                                else if (res.code == 1010) {
                                                    NativeModules.MyNativeModule.rnCallNative("您的手机号是第三方登录的，微信登陆后修改密码~")
                                                }

                                                else {
                                                    NativeModules.MyNativeModule.rnCallNative(res.info)
                                                }
                                            })
                                        } else {
                                            let formData = {}
                                            if (that.state.newUserName) {
                                                formData = {
                                                    "login_type": "mobile",
                                                    "mobileNr": that.state.phone,
                                                    "password": that.state.passWord,
                                                    "action": "activate",
                                                    "reinstall": "true"
                                                }
                                            } else {
                                                formData = {
                                                    "login_type": "mobile",
                                                    "mobileNr": that.state.phone,
                                                    "password": that.state.passWord,
                                                    "action": "activate",
                                                }
                                            }
                                            _ajax.post("login", formData, function (res) {
                                                console.log(res)
                                                if (res.code == 0) {
                                                    JMessage.login({
                                                        username: that.state.phone,
                                                        password: '111111'
                                                    }, (data) => {
                                                        // SplashScreen.show();
                                                        AsyncStorage.setItem('newUserName', JSON.stringify('newUserName'), () => { })
                                                        AsyncStorage.setItem('tokenId', JSON.stringify(res.token), () => {
                                                            AsyncStorage.setItem('user_token', JSON.stringify({ username: that.state.phone, password: '111111' }), () => {
                                                                that.props.navigator.push({
                                                                    component: LoginSuccess,
                                                                    params: {
                                                                        navigator: that.props.navigator
                                                                    }
                                                                })
                                                            });
                                                        })
                                                    }, (error) => {
                                                    })
                                                }
                                                else if (res.code == 1010) {
                                                    NativeModules.MyNativeModule.rnCallNative("您的手机号是第三方登录的，微信登陆后修改密码~")
                                                }

                                                else {
                                                    NativeModules.MyNativeModule.rnCallNative(res.info)
                                                }
                                            })
                                        }


                                    }}
                                >
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontSize: cal(14), color: this.state.user_sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>是</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }

    //微博登录、
    _weiboLogin(responseCode) {
        let that = this;
        console.log('https://api.weibo.com/2/eps/user/info.json?access_token=' + responseCode.accessToken + '&uid=' + responseCode.userID)
        fetch(
            'https://api.weibo.com/2/users/show.json?access_token=' + responseCode.accessToken + '&uid=' + responseCode.userID
            , {
                method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                that.props.navigator.push({
                    component: OtherLogin,
                    // reset: true,
                    navigator: that.props.navigator,
                    responseJson: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    // shouldComponentUpdate() {
    //     //完全静态的组件,无需更新 
    //     return false;
    // }
    loginQQ(data) {
        // console.log(data.access_token);
        console.log(data);
        fetch(
            'https://graph.qq.com/user/get_user_info?access_token=' + data.access_token + '&openid=' + data.openid + '&oauth_consumer_key=12345&oauth_consumer_key' + data.oauth_consumer_key + '&format=json'
            , {
                method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // that.props.navigator.push({
                //     component: OtherLogin,
                //     reset: true,
                //     navigator: that.props.navigator
                // })
            })
            .catch((error) => {
                // console.log(error)
            });

    }
    getAccessToken(responseCode) {
        let that = this;
        let formData = {}
        if (that.state.newUserName) {
            formData = {
                login_type: "wechat",
                wechat_code: responseCode.code,
                "reinstall": "true"
            }
        } else {
            formData = {
                login_type: "wechat",
                wechat_code: responseCode.code,
            }
        }
        _ajax.post("login", formData, function (res) {
            console.log(res)
            if (res.code == 0) {
                that.weixinLogin(res)
            }
            else if (res.code == 1016) {
                that.setState({
                    open: true,
                    token: res.token,
                    type: "WECHAT",
                    wecheatCode: responseCode.code
                })
            }
            else {
                that.props.navigator.push({
                    component: OtherLogin,
                    // reset: true,
                    type: "image",
                    params: {
                        navigator: that.props.navigator,
                        wechat_code: responseCode.code,
                        signup_type: "wechat"
                    }
                })
            }
        })
    }
    weixinLogin(res) {
        let that = this;
        console.log(res.user.mobileNr)
        JMessage.login({
            username: res.user.mobileNr,
            password: '111111'
        })
        AsyncStorage.setItem('tokenId', JSON.stringify(res.token), () => {
            AsyncStorage.setItem('user_token', JSON.stringify({ username: res.user.mobileNr, password: '111111' }), () => {
                that.props.navigator.push({
                    component: LoginSuccess,
                    reset: true,
                    type: "image",
                    params: {
                        navigator: that.props.navigator,
                        other: true
                    }
                })
            });
        })
        // SplashScreen.show();
    }
}
let LoginStyle = StyleSheet.create({
    wrap: {
        height: height,
        backgroundColor: '#fff',
        alignItems: 'center'
    },

    top_text: {
        color: '#000',
        fontWeight: "600"
    },
    sunTop: {
        alignItems: "center"
    },
    subTop_text: {
        fontWeight: "500",
        color: "#00ffff",
        fontSize: cal(30)
    },
    phoneStyle: {
        width: cal(280),
        fontSize: cal(15)
    },
    inputWrap: {
        backgroundColor: "#fff",
        // borderWidth: cal(0.5),
        // borderColor: "#dcdcdc"
    },
    zhanghao_text: {
        fontSize: cal(15),
        color: PublicColor.Public_Text10,
    },
    zhanghao: {
        flexDirection: "row",
        paddingLeft: cal(23),
        height: cal(50),
        alignItems: 'center'
    },
    btn: {
        marginTop: cal(62),
        width: width,
        height: cal(50),
        alignItems: "center",
        borderRadius: cal(3.5)
    },
    btnLoggin: {
        width: cal(330),
        height: cal(50),
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn_text: {
        color: '#fff',
        fontSize: cal(15)
    },
    text: {
        color: '#fff',
        fontWeight: '800'
    },
    swipt: {
        flex: 9
    },
    kong: {
        flex: 1
    },
    other: {
        marginTop: cal(160),
    },
    other_top: {
        marginBottom: cal(20),
        height: cal(20),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    other_top_text: {
        fontSize: cal(12),
        color: "#b3b3b3"
    },
    other_bottom: {
        flexDirection: "row",
        // justifyContent: 'space-between',
        justifyContent: 'center',
        paddingLeft: cal(50),
        paddingRight: cal(50)
    }
})