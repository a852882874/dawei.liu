//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, NativeModules,
    Text, ScrollView, Platform, Image, Dimensions,
    TextInput, TouchableOpacity, AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizOne from "./../quiz/quizOne.js";
import HraderLogin from './../Common/Header.js'
import NewPassword from './newPassword.js'
const { cal } = require("./../Common/Cal.js");
const HIDESHOWED = require("./../image/login/hide2.png");
const HIDESHOW = require("./../image/login/hideEd2.png");
const { PublicColor } = require("./../Common/Color.js")
const QQLOGIN = require("./../image/login/qq.png");
const WEIBOLOGIN = require("./../image/login/weibo.png");
const IPHONE = require("./../image/login/iphone.png");
const YANGZHENGMA = require("./../image/login/yanzhenma.png");
const WEIXINLOGIN = require("./../image/login/weixin.png");
const PASSWORD = require("./../image/login/password.png");

import _ajax from "./../Common/LoginAjax.js";
const PASSWORDMOM = require("./../image/mom/password.png");
const IPHONEMOM = require("./../image/mom/iphone.png");
const YANGZHENGMAMOM = require("./../image/mom/yanzhenma.png");
export default class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            passWord: '',
            yanzhengma: "",
            show_passwords: true,
            show_passwords_image: false,
            user_sex: "",
            yan: true,
            page: 60,
            disableds: false,
        }
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result) != null) {
                that.setState({
                    user_sex: JSON.parse(result).user_sex,
                })
            }
        })
    }
    _content() {
        return (
            <View style={WangjiStyle.inputWrap}>
                <View style={[WangjiStyle.zhanghao]}>
                    <View style={{ flexDirection: "row", alignItems: "center" ,marginRight:cal(10)}}>
                        <Image source={this.state.user_sex == "male" ? IPHONE : IPHONEMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                        {/* <Text style={LoginStyle.zhanghao_text}>手机号</Text> */}
                    </View>
                    <TextInput
                        style={WangjiStyle.phoneStyle}
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
                <View style={{ alignItems: "center", paddingLeft: cal(15), paddingRight: cal(15) }}>
                    <View style={{ backgroundColor: "#e6e6e6", height: cal(0.5), width: width - cal(30), }}></View>
                </View>
                <View style={[WangjiStyle._content2,WangjiStyle.zhanghao]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" ,marginRight:cal(10)}}>
                            <Image source={this.state.user_sex == "male" ? YANGZHENGMA : YANGZHENGMAMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                            {/* <Text style={LoginStyle.zhanghao_text}>验证码</Text> */}
                        </View>
                        <TextInput
                            style={[WangjiStyle.phoneStyle, { width: cal(140) }]}
                            clearTextOnFocus={true}
                            enablesReturnKeyAutomatically={true}
                            keyboardType="numeric"
                            placeholder="请输入手机验证码"
                            maxLength={6}
                            value={this.state.yanzhengma}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholderTextColor={PublicColor.Public_NoClockBackground}
                            blurOnSubmit={true}
                            onChangeText={(yanzhengma) => this._yanzhengmahuoqu(yanzhengma)}
                        // secureTextEntry={this.state.show_passwords}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={this.state.phone.length == 11 && this.state.yan ? false : true}
                        onPress={() => {
                            let that = this;
                            if (!(/^1[34578]\d{9}$/.test(this.state.phone))) {
                                NativeModules.MyNativeModule.rnCallNative("手机号码有误，请重填");
                                return false;
                            } else {
                                that.setState({
                                    yan: false
                                })
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
                                let mobileNrw = {
                                    mobileNr: this.state.phone,
                                    usage: "2"
                                }
                                _ajax.post("sms_code", mobileNrw, function (res) {
                                    if (res.code == 0) {
                                        console.log(res)
                                    } else {
                                        that.time && clearInterval(that.time);
                                        NativeModules.MyNativeModule.rnCallNative(res.info)
                                        that.setState({
                                            yan: true,
                                            page: 60
                                        })
                                    }
                                })
                            }
                        }}
                    >
                        <View style={this.state.phone.length == 11 ? {
                            width: cal(80), height: cal(30), borderRadius: cal(2), backgroundColor:
                                this.state.yan ? (this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground) : PublicColor.Public_NoClockBackground,
                            justifyContent: "center", alignItems: "center"
                        } :
                            { width: cal(80), height: cal(30), borderRadius: cal(2), backgroundColor: PublicColor.Public_NoClockBackground, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontSize: cal(13) }}>{this.state.yan ? "获取验证码" : this.state.page + "s"}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ alignItems: "center", paddingLeft: cal(15), marginBottom: cal(0.5), paddingRight: cal(15) }}>
                    <View style={{ backgroundColor: "#e6e6e6", height: cal(0.5), width: width - cal(30), }}></View>
                </View>
                <View style={WangjiStyle.zhanghao}>
                    <View style={{ flexDirection: "row", alignItems: "center",marginRight:cal(10) }}>
                        <Image source={this.state.user_sex == "male" ? PASSWORD : PASSWORDMOM} style={{ marginRight: cal(8), width: cal(16), height: cal(16) }} />
                        {/* <Text style={LoginStyle.zhanghao_text}>密码</Text> */}
                    </View>
                    <TextInput
                        style={[WangjiStyle.phoneStyle, { width: cal(260),}]}
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
                    <View style={{ paddingLeft: cal(8) }}>
                        <TouchableOpacity

                            onPress={() => this.qieHuan()}>
                            <View>
                                <Image source={this.state.show_passwords_image ? HIDESHOWED : HIDESHOW} style={{ width: cal(18), height: cal(8) }} />
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>

            </View>
        )
    }
    logining() {
    }
    _yanzhengmahuoqu(yanzhengma) {
        var num = yanzhengma.replace(/[^0-9]/ig, "");
        this.setState({
            yanzhengma: num
        })

    }

    _btn() {
        return (
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    disabled={
                        !this.state.disableds &&
                            this.state.phone.length == 11 &&
                            this.state.yanzhengma != '' &&
                            this.state.passWord != '' ?
                            false : true
                    }
                    onPress={() => this._btnSent()}
                >
                    <View style={
                        !this.state.disableds &&
                            this.state.phone.length == 11 &&
                            this.state.yanzhengma != ''&&
                            this.state.passWord != ''
                             ?
                            (this.state.user_sex == "male" ? WangjiStyle.btnBackNo : WangjiStyle.btnBackNo2) : WangjiStyle.btnBackNo3}>
                        <Text style={WangjiStyle.btnColorNo}>下一步</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    qieHuan() {
        this.setState({
            show_passwords_image: !this.state.show_passwords_image,
            show_passwords: !this.state.show_passwords

        })
    }
    _btnSent() {
        let that = this;
        let json = {
            mobileNr: this.state.phone,
            newPassword: this.state.passWord,
            confirmCode: that.state.yanzhengma
        }
        that.setState({
            disableds: true,
        })
        that.timer = setTimeout(function (res) {
            that.setState({
                disableds: false,
            })
        }, 5000)
        if (!(/^[\w]{6,16}$/.test(this.state.passWord))) {
            NativeModules.MyNativeModule.rnCallNative("密码格式不正确");
            // that.setState({
            //     Loadding: false
            // })
            return false;
        }
        console.log(json)
        _ajax.post("user/reset_password", json, function (res) {
            that.timer && clearTimeout(that.timer);
            if (res.code == 0) {
                that.setState({
                    disableds: false,
                })
                that.props.navigator.pop()
            } else {
                NativeModules.MyNativeModule.rnCallNative(res.info);
                that.setState({
                    disableds: false,
                })
            }
        })
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.time && clearInterval(this.time);
    }
    render() {
        return (
            <View style={WangjiStyle.wrap_wrap}>
                <HraderLogin type={"zhuce"} title={"找回密码"} navigator={this.props.navigator} />
                {this._content()}
                <View style={WangjiStyle.wrap}>
                    <View style={{ marginTop: cal(13), marginBottom: cal(15) }}>
                        <Text style={{ fontSize: cal(12), color: "#828282" }}>注：如果你已更改手机号，请发送邮件到<Text style={{ color: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>support@aityuan.com</Text>进行修改</Text>
                    </View>
                    {this._btn()}
                </View>
            </View>
        )
    }
    componentWillUnmount() {
        this.time && clearInterval(this.time);
    }
}

let WangjiStyle = StyleSheet.create({
    wrap_wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground,
    },
    wrap: {
        flex: 1,
        paddingLeft: cal(10),
        paddingRight: cal(10),

    },
    inputWrap: {
        marginTop: cal(30),
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
   
    phoneStyle: {
        width: cal(260),
        height: cal(55),
    },
    _content2: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: cal(10)
    },
    btnBackNo: {
        width: cal(330),
        height: cal(50),
        marginTop: cal(30),
        borderRadius: cal(4),
        backgroundColor: PublicColor.Public_ClickBackground,
        justifyContent: "center",
        alignItems: "center"
    },
    btnBackNo2: {
        width: cal(330),
        height: cal(50),
        marginTop: cal(30),
        borderRadius: cal(4),
        backgroundColor: PublicColor.Public_MomClickBackground,
        justifyContent: "center",
        alignItems: "center"
    },
    btnBackNo3: {
        width: cal(330),
        height: cal(50),
        marginTop: cal(30),
        borderRadius: cal(4),
        backgroundColor: PublicColor.Public_NoClockBackground,
        justifyContent: "center",
        alignItems: "center"
    },
    btnColorNo: {
        color: "#fff",
    },
    zhanghao_text: {
        color: PublicColor.Public_Text10,
        fontSize: cal(15),
    }
})
