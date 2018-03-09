//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback,
    Platform, Image, Dimensions, TextInput,
    TouchableOpacity, AsyncStorage, Alert, NativeModules, NetInfo
} from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizOne from "./../quiz/quizOne.js";
import RegisterZi from "./registerZi.js";
import RegistrationClause from "./RegistrationClause.js";
import Header from './../Common/Header.js'
import Loadding from './../Common/Loadding.js'
import JMessage from 'jmessage-react-plugin';
const { cal } = require("./../Common/Cal.js");
import _ajax from "./../Common/LoginAjax.js";
const HIDESHOWED = require("./../image/login/hide2.png");
const HIDESHOW = require("./../image/login/hideEd2.png");
const PASSWORD = require("./../image/login/password.png");
const IPHONE = require("./../image/login/iphone.png");
const YANGZHENGMA = require("./../image/login/yanzhenma.png");
// import SHA256 from 'crypto-js/sha256';
import SHA256 from 'crypto-js/md5';
const PASSWORDMOM = require("./../image/mom/password.png");
const IPHONEMOM = require("./../image/mom/iphone.png");
const YANGZHENGMAMOM = require("./../image/mom/yanzhenma.png");
const { PublicColor } = require("./../Common/Color.js")
export default class registerClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            passWord: '',
            yanzhengma: "",
            show_passwords: true,
            show_passwords_image: false,
            disableds: false,
            user_sex: "",
            page: 60,
            yan: true,
            yantext: false,
            Loadding: ""
        }
        let that = this;
        this.lock = false;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                if (!that.lock) {
                    that.setState({
                        user_sex: JSON.parse(result).user_sex,
                    })
                }
            }
        })
    }
    toUpGuidePager() {
        this.props.navigator.replace({
            component: GuidePager,
            reset: true,
            params: {
                navigator: this.props.navigator,
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
    componentWillUnmount() {
        this.time && clearInterval(this.time);
        this.lock = true
    }
    yanzhengmaQ() {
        let that = this;
        if (!(/^1[1345789]\d{9}$/.test(this.state.phone))) {
            NativeModules.MyNativeModule.rnCallNative("手机号码有误，请重填");
            return false;
        } else {
            if (!that.lock) {
                that.setState({
                    yan: false
                })
            }
            that.time = setInterval(function (res) {
                if (!that.lock) {
                    that.setState({
                        page: --that.state.page,
                        yan: false
                    })
                }
                if (that.state.page == 0) {
                    that.time && clearInterval(that.time);
                    if (!that.lock) {
                        that.setState({
                            yan: true,
                            page: 60
                        })
                    }
                }

            }, 1000)
            let mobileNrw = {
                mobileNr: this.state.phone,
                usage: "1"
            }
            NetInfo.isConnected.fetch().then(isConnected => {
                if (!isConnected) {
                    NativeModules.MyNativeModule.rnCallNative("网络没有连接哦~请检查下网络~");
                    that.time && clearInterval(that.time);
                    if (!that.lock) {
                        that.setState({
                            yan: true,
                            page: 60
                        })
                    }
                    return false;
                } else {
                    _ajax.post("sms_code", mobileNrw, function (res) {
                        if (res.code == 0) {

                        } else {
                            that.time && clearInterval(that.time);
                            NativeModules.MyNativeModule.rnCallNative(res.info)
                            if (!that.lock) {
                                that.setState({
                                    yan: true,
                                    page: 60
                                })
                            }
                        }
                    })
                }
            })
        }
    }
    ToText() {
        this.refs.input1.blur();
        this.refs.input2.blur();
        this.refs.input3.blur();
        let that = this;
        if (!that.lock) {
            that.setState({
                disableds: true,
                Loadding: true
            })
        }
        that.timer = setTimeout(function (res) {
            if (!that.lock) {
                that.setState({
                    disableds: false,
                    Loadding: false
                })
            }
        }, 5000)
        if (!(/^[\w]{6,16}$/.test(this.state.passWord))) {
            NativeModules.MyNativeModule.rnCallNative("密码格式不正确");
            that.timer && clearTimeout(that.timer);
            that.time && clearInterval(that.time);
            if (!that.lock) {
                that.setState({
                    disableds: false,
                    Loadding: false
                })
            }
            return false;
        }
        //请求接口   //判断验证码与手机号是不是对的
        // let formData = new FormData();
        // formData.append('phoneN', this.state.phone);
        // formData.append('Password', SHA256(this.state.passWord).toString());
        // let formDataSmg = new FormData();
        // formDataSmg.append('phoneN', this.state.phone);
        // formDataSmg.append('SMS_Code', this.state.yanzhengma);
        let formDataSmg = {
            signup_type: 'mobile',
            mobileNr: this.state.phone,
            password: this.state.passWord,
            confirmCode: this.state.yanzhengma
        }
        console.log(formDataSmg)
        _ajax.post("signup", formDataSmg, function (res) {
            console.log(res)
            if (res.code == 0) {
                AsyncStorage.setItem('tokenId', JSON.stringify(res.token), () => {
                    JMessage.register({
                        username: that.state.phone,
                        password: '111111'
                    }, (res) => {
                        AsyncStorage.setItem('user_token', JSON.stringify({ username: that.state.phone, password: that.state.passWord }), () => {
                            that.timer && clearTimeout(that.timer);
                            that.time && clearInterval(that.time);
                            if (!that.lock) {
                                that.setState({
                                    disableds: false,
                                    Loadding: false
                                })
                            }
                            that.props.navigator.replace({
                                component: RegisterZi,
                                reset: true,
                                params: {
                                    phone: that.state.phone,
                                    passWord: that.state.passWord,
                                    navigator: that.props.navigator,
                                }
                            })
                        });
                    }, (error) => {
                        console.log(error)
                        if (error.code == 898001) {
                            AsyncStorage.setItem('user_token', JSON.stringify({ username: that.state.phone, password: that.state.passWord }), () => {
                            AsyncStorage.setItem('newUserName', JSON.stringify('newUserName'), () => {})
                                that.timer && clearTimeout(that.timer);
                                that.time && clearInterval(that.time);
                                if (!that.lock) {
                                    that.setState({
                                        disableds: false,
                                        Loadding: false
                                    })
                                }
                                that.props.navigator.replace({
                                    component: RegisterZi,
                                    reset: true,
                                    params: {
                                        phone: that.state.phone,
                                        passWord: that.state.passWord,
                                        navigator: that.props.navigator,
                                    }
                                })
                            });
                        }
                    })
                })
            } else {
                that.timer && clearTimeout(that.timer);
                that.time && clearInterval(that.time);
                if (!that.lock) {
                    that.setState({
                        disableds: false,
                        Loadding: false
                    })
                }
                NativeModules.MyNativeModule.rnCallNative(res.info);
            }
        })
    }
    _yanzhengmahuoqu(yanzhengma) {
        var num = yanzhengma.replace(/[^0-9]/ig, "");
        if (!this.lock) {
            this.setState({
                yanzhengma: num
            })
        }

    }
    _loaading() {
        if (this.state.Loadding) {
            <Loadding from={"transent"} />
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.refs.input1.blur();
                    this.refs.input2.blur();
                    this.refs.input3.blur();
                }}
            >
                <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                    <Header type={"zhuce"} title={"注册"} navigator={this.props.navigator} />
                    {this._loaading()}
                    <View style={{ height: cal(30), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                    <View>
                        <View style={[LoginStyle.inputWrap]}>
                            <View style={LoginStyle.zhanghao}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={this.state.user_sex == "male" ? IPHONE : IPHONEMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                                    {/* <Text style={LoginStyle.zhanghao_text}>手机号</Text> */}
                                </View>
                                <TextInput
                                    style={LoginStyle.phoneStyle}
                                    clearTextOnFocus={true}
                                    maxLength={11}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    enablesReturnKeyAutomatically={true}
                                    keyboardType="numeric"
                                    blurOnSubmit={true}
                                    clearButtonMode='always'
                                    placeholder="请输入手机号"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={(phone) => this.setState({ phone })}
                                    ref="input1"
                                />
                            </View>
                            <View style={{ alignItems: "center", paddingLeft: cal(15), paddingRight: cal(15) }}>
                                <View style={{ backgroundColor: "#e6e6e6", height: cal(0.5), width: width - cal(30), }}></View>
                            </View>
                            <View style={[LoginStyle.zhanghao, { justifyContent: "space-between" }]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image source={this.state.user_sex == "male" ? YANGZHENGMA : YANGZHENGMAMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                                        {/* <Text style={LoginStyle.zhanghao_text}>验证码</Text> */}
                                    </View>
                                    <TextInput
                                        style={LoginStyle.phoneStyle}
                                        clearTextOnFocus={true}
                                        maxLength={6}
                                        underlineColorAndroid="rgba(0,0,0,0)"
                                        enablesReturnKeyAutomatically={true}
                                        keyboardType="numeric"
                                        blurOnSubmit={true}
                                        value={this.state.yanzhengma}
                                        clearButtonMode='always'
                                        placeholder="请输入验证码"
                                        placeholderTextColor={PublicColor.Public_NoClockBackground}
                                        ref="input2"
                                        onChangeText={(yanzhengma) => this._yanzhengmahuoqu(yanzhengma)}
                                    />
                                </View>
                                <View style={{ paddingRight: cal(20) }}>
                                    <TouchableOpacity
                                        disabled={this.state.phone == "" ? true : this.state.yan ? false : true}
                                        onPress={() => this.yanzhengmaQ()}>
                                        <View style={this.state.phone.length == 11 ? (this.state.user_sex == "male" ? this.state.yan ? LoginStyle.yanzhengma2 : LoginStyle.yanzhengma1 : this.state.yan ? LoginStyle.yanzhengma3 : LoginStyle.yanzhengma1) : LoginStyle.yanzhengma1}>
                                            <Text style={LoginStyle.yanzhengma_text1}>{this.state.yan ? "获取验证码" : this.state.page + "s"}</Text>
                                        </View>
                                    </TouchableOpacity >
                                </View>
                            </View>
                            <View style={{ alignItems: "center", paddingLeft: cal(15),marginBottom:cal(0.5), paddingRight: cal(15) }}>
                                <View style={{ backgroundColor: "#e6e6e6", height: cal(0.5), width: width - cal(30), }}></View>
                            </View>
                            <View style={LoginStyle.zhanghao}>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Image source={this.state.user_sex == "male" ? PASSWORD : PASSWORDMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                                    {/* <Text style={LoginStyle.zhanghao_text}>密码</Text> */}
                                </View>
                                <TextInput
                                    style={[LoginStyle.phoneStyle, { width: cal(260), }]}
                                    clearTextOnFocus={true}
                                    enablesReturnKeyAutomatically={true}
                                    returnKeyType="search"
                                    maxLength={16}
                                    placeholder="6~16位字母/数字"
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    ref="input3"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    blurOnSubmit={true}
                                    onChangeText={(passWord) => this.setState({ passWord })}
                                    secureTextEntry={this.state.show_passwords}
                                    onSubmitEditing={() => this.logining()}
                                />
                                <View style={{ }}>
                                    <TouchableOpacity style={{width:cal(40),justifyContent:"center",alignItems:"center",height:cal(40)}} onPress={() => this.qieHuan()}>
                                        <View>
                                            <Image source={this.state.show_passwords_image ? HIDESHOWED : HIDESHOW} style={{ width: cal(17), height: cal(8) }} />
                                        </View>
                                    </TouchableOpacity >
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={LoginStyle.btn}>
                        <TouchableOpacity
                            disabled={
                                !this.state.disableds &&
                                    (this.state.phone != '') &&
                                    (this.state.passWord != '') ? false : true
                            }
                            onPress={() => this.ToText()}
                        >
                            <View style={[LoginStyle.btnLoggin,
                            !this.state.disableds &&
                                (this.state.phone != '') &&
                                (this.state.passWord != '')
                                ?
                                { backgroundColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }
                                : { backgroundColor: PublicColor.Public_NoClockBackground, }
                            ]}>
                                <Text style={LoginStyle.btn_text}>注册</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigator.pop();
                        }}
                    >
                        <View style={LoginStyle.yihou}>
                            <Text style={this.state.user_sex == "male" ? LoginStyle.yihou_text : LoginStyle.yihou_text2}>已有账号登录</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={LoginStyle.bottom}>
                        <Text style={LoginStyle.bottom_OneText}>
                            注册即表示同意爱特缘
                        <Text style={this.state.user_sex == "male" ? LoginStyle.bottom_TwoText : LoginStyle.bottom_TwoText2} onPress={() => {
                                this.props.navigator.push({
                                    component: RegistrationClause,
                                    params: {
                                        navigator: this.props.navigator
                                    }
                                });
                            }}>
                                注册服务条约
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    logining() {

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
        width: cal(150),
        paddingLeft: cal(20),
        fontSize: cal(15)

    },
    inputWrap: {
        backgroundColor: "#fff",
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
        marginTop: cal(60),
        width: width,
        height: cal(50),
        alignItems: "center",
        borderRadius: cal(4)
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
    yanzhengma1: {
        width: cal(87),
        height: cal(33),
        backgroundColor: "#e0e0e0",
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    yanzhengma_text1: {
        color: "#fff",
        fontSize: cal(13)
    },
    yanzhengma2: {
        width: cal(87),
        height: cal(33),
        backgroundColor: PublicColor.Public_ClickBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    yanzhengma3: {
        width: cal(87),
        height: cal(33),
        backgroundColor: PublicColor.Public_MomClickBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },

    yihou: {
        marginTop: cal(9),
        alignItems: "center",
    },
    yihou_text: {
        fontSize: cal(12),
        color: PublicColor.Public_ClickBackground,
    },
    yihou_text2: {
        fontSize: cal(12),
        color: PublicColor.Public_MomClickBackground,
    },
    bottom: {
        marginTop: cal(170),
        alignItems: "center"
    },
    bottom_OneText: {
        color: PublicColor.Public_Text4,
        fontSize: cal(12)
    },

    bottom_TwoText: {
        color: PublicColor.Public_ClickBackground,
    },
    bottom_TwoText2: {
        color: PublicColor.Public_MomClickBackground,
    }
})
