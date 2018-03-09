//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView,
    Platform, Image, Dimensions, TextInput,
    TouchableOpacity, AsyncStorage, Alert, NativeModules
} from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizOne from "./../quiz/quizOne.js";
import RegisterZi from "./registerZi.js";
import HraderLogin from './../Common/Header.js'
import * as WeChat from 'react-native-wechat';
import LoginSuccess from "./registerZi.js";
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
export default class registerZis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
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
        console.log(this.props)
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    user_sex: JSON.parse(result).user_sex,
                })
            }
        })
    }
    toUpGuidePager() {
        this.props.navigator.push({
            component: GuidePager,
            reset: true,
            params: {
                navigator: this.props.navigator,
            }
        })
    }
    qieHuan() {
        this.setState({
            show_passwords_image: !this.state.show_passwords_image,
            show_passwords: !this.state.show_passwords

        })
    }
    componentWillUnmount() {
        this.time && clearInterval(this.time);
    }
    yanzhengmaQ() {
        let that = this;
        that.time = setInterval(function (res) {
            that.setState({
                page: --that.state.page,
                yan: false
            })
            if (that.state.page == 0) {
                that.time && clearInterval(that.time);
                that.setState({
                    yan: true,
                    page: 60
                })
            }

        }, 1000)
        if (!(/^1[34578]\d{9}$/.test(this.state.phone))) {
            NativeModules.MyNativeModule.rnCallNative("手机号码有误，请重填");
            return false;
        } else {
            let formData = new FormData();
            // 请求参数 ('key',value)
            // formData.append('mobileNr', this.state.phone);
            let mobileNr = {
                mobileNr: this.state.phone
            }
            console.log(mobileNr)
            _ajax.post("sms_code", mobileNr, function (res) {
                console.log(res)
            })
        }
    }
    ToText() {
        let that = this;
        that.setState({
            disableds: true,
            Loadding: true
        })
        that.timer = setTimeout(function (res) {
            that.setState({
                disableds: false,
                Loadding: false
            })
        }, 5000)
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_demo';
        
        WeChat.sendAuthRequest(scope, state)
            .then(responseCode => {
                let formDataSmg = {
                    signup_type: that.props.signup_type,
                    wechat_code: responseCode.code,
                    mobileNr: that.state.phone,
                    confirmCode: this.props.yanzhengma,
                    sex: that.state.user_sex == "male" ? 1 : (that.state.user_sex == "female" ? 2 : 0)
                }
                console.log(formDataSmg)
                _ajax.post("signup", formDataSmg, function (res) {
                    console.log(res);
                    if (res.code == 0) {
                        AsyncStorage.setItem('tokenId', JSON.stringify(res.token), () => {
                            AsyncStorage.setItem('user_token', JSON.stringify({ username: that.state.phone, }), () => {
                                JMessage.register({
                                    username: that.state.phone,
                                    password: '111111'
                                })
                                that.props.navigator.push({
                                        component: RegisterZi,
                                        reset: true,
                                        params: {
                                            type:1,
                                            navigator: that.props.navigator,
                                            phone: that.state.phone,
                                            passWord: '111111',
                                        }
                                    })
                                })
                            });
                    }else{
                        NativeModules.MyNativeModule.rnCallNative(res.info);
                    }
                })
            })
    }
    _yanzhengmahuoqu(yanzhengma) {
        var num = yanzhengma.replace(/[^0-9]/ig, "");
        this.setState({
            yanzhengma: num
        })

    }
    _loaading() {
        if (this.state.Loadding) {
            <Loadding from={"transent"} />
        }
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: PublicColor.Public_ViewBackground }}>
                <HraderLogin type={"zhuce"} title={"注册手机号"} navigator={this.props.navigator} />
                {this._loaading()}
                <View style={{ height: cal(30), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                <View style={{ paddingLeft: cal(7), paddingRight: cal(7), marginTop: cal(30) }}>
                    <View style={[LoginStyle.inputWrap]}>
                    <View style={LoginStyle.zhanghao}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={this.state.user_sex == "male" ? IPHONE : IPHONEMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                                <Text style={LoginStyle.zhanghao_text}>手机号</Text>
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
                            />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ backgroundColor: "#fff", height: cal(0.5), width: cal(350), }}></View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ backgroundColor: "#dcdcdc", height: cal(0.5), width: cal(350), }}></View>
                        </View>
                    </View>
                </View>
                <View style={LoginStyle.btn}>
                    <TouchableOpacity
                        disabled={
                            !this.state.disableds &&
                                (this.state.phone != '') ? false : true
                        }
                        onPress={() => this.ToText()}
                    >
                        <View style={[LoginStyle.btnLoggin,
                        !this.state.disableds &&
                            (this.state.phone != '') ?
                            { backgroundColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }
                            : { backgroundColor: PublicColor.Public_NoClockBackground, }
                        ]}>
                            <Text style={LoginStyle.btn_text}>完成</Text>
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
                    {/* <Text style={LoginStyle.bottom_OneText}>注册即表示同意爱特缘<Text style={this.state.user_sex == "male" ? LoginStyle.bottom_TwoText : LoginStyle.bottom_TwoText2}>注册服务条约</Text></Text> */}
                </View>

            </ScrollView>

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
        borderWidth: cal(0.5),
        borderColor: "#dcdcdc"
    },
    zhanghao_text: {
        fontSize: cal(15),
        color: PublicColor.Public_Text5
    },
    zhanghao: {
        flexDirection: "row",
        paddingLeft: cal(10),
        height: cal(50),
        alignItems: 'center'
    },
    btn: {
        marginTop: cal(80),
        width: width,
        height: cal(50),
        alignItems: "center",
        borderRadius: cal(4),
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
