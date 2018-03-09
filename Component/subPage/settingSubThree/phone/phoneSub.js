
//更换手机号    
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, Dimensions, NativeModules,
    AsyncStorage, ScrollView, Image, TouchableOpacity, TextInput
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../../Common/Header.js';
import _ajax from "./../../../Common/LoginAjax.js";
import MyIndex from './../../../page/MyIndex.js';
import { cal } from './../../../Common/Cal.js';
import JMessage from 'jmessage-react-plugin';
const IPHONE = require("./../../../image/login/iphone.png");
const IPHONEMOM = require("./../../../image/mom/iphone.png");
const { PublicColor } = require("./../../../Common/Color.js")
// import LinearGradient from 'react-native-linear-gradient';
const YANGZHENGMA = require('./../../../image/login/yanzhenma.png');
const YANGZHENGMAMOM = require('./../../../image/mom/yanzhenma.png');
export default class phone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: "",
            yanzhen: "",
            sex: '',
            disableds: true,
            page: 60,
            yan: true,
        }
        console.log(this.props.PhoneN)
        let that = this;
        // AsyncStorage.getItem('user_token', (err, result) => {
        //     that.setState({
        //         phone: JSON.parse(result).username
        //     })
        // })
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
    }
    componentWillUnmount() {
        this.time && clearInterval(this.time);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_Text7 }}>
                <Header type={"zhuce"} title={"手机号码验证"} {... this.props} />
                <View style={Phone.inputWrap}>
                    <View style={{ marginTop: cal(30), elevation: 1 }}>
                        <View>
                            <View style={Phone.inputWrap_sub}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: cal(40), justifyContent: "center", alignItems: "center" }}>
                                        <Image source={this.state.sex == "male" ? IPHONE : IPHONEMOM} style={{ width: cal(16), height: cal(16) }} />
                                    </View>
                                    <Text style={Phone.zhanghao_text}>账号</Text>
                                </View>
                                <TextInput
                                    style={Phone.phoneStyle}
                                    clearTextOnFocus={true}
                                    maxLength={11}
                                    underlineColorAndroid="rgba(255,255,255,0)"
                                    enablesReturnKeyAutomatically={true}
                                    keyboardType="numeric"
                                    blurOnSubmit={true}
                                    clearButtonMode='always'
                                    placeholder="请输入手机号"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={(phone) => this.setState({ phone })}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: "center", backgroundColor: "#fff" }}>
                            <View style={{ backgroundColor: "#dcdcdc", height: cal(0.5), width: cal(340), }}></View>
                        </View>
                        <View >
                            <View style={Phone.inputWrap_sub}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: cal(40), justifyContent: "center", alignItems: "center" }}>
                                        <Image source={this.state.sex == 'male' ? YANGZHENGMA : YANGZHENGMAMOM} style={{ width: cal(16), height: cal(16) }} />
                                    </View>
                                    <Text style={{}}>验证码</Text>
                                    <TextInput
                                        style={[Phone.phoneStyle, { width: cal(120) }]}
                                        clearTextOnFocus={true}
                                        maxLength={11}
                                        underlineColorAndroid="rgba(0,0,0,0)"
                                        enablesReturnKeyAutomatically={true}
                                        keyboardType="numeric"
                                        blurOnSubmit={true}
                                        clearButtonMode='always'
                                        maxLength={6}
                                        placeholder="请输入验证码"
                                        placeholderTextColor={PublicColor.Public_NoClockBackground}
                                        onChangeText={(yanzhen) => this.setState({ yanzhen })}
                                    />
                                </View>
                                <TouchableOpacity
                                    disabled={this.state.phone != "" ? (this.state.disableds ? false : true) : true}
                                    onPress={() => {
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
                                            NativeModules.MyNativeModule.rnCallNative('手机号码有误，请重填');
                                            that.time && clearInterval(that.time);
                                            that.setState({
                                                yan: true,
                                                page: 60
                                            })
                                            return false;
                                        } else {
                                            let mobileNr = {
                                                mobileNr: this.state.phone,
                                                usage: "2"
                                            }
                                            // {"oldConfirmCode":that.props.oldCode,
                                            // "newMobileNr":"xxxx", "newConfirmCode":"xxxx"}
                                            _ajax.post("sms_code", mobileNr, function (res) {
                                                console.log(res)
                                                if (res.code == 0) {

                                                } else {
                                                    NativeModules.MyNativeModule.rnCallNative(res.info);
                                                    that.time && clearInterval(that.time);
                                                    that.setState({
                                                        yan: true,
                                                        page: 60
                                                    })
                                                }
                                            })
                                        }
                                    }}
                                >
                                    <View style={this.state.phone.length == 11 ? (this.state.sex == "male" ? this.state.yan ? Phone.yanzhengma2 : Phone.yanzhengma1 : this.state.yan ? Phone.yanzhengma3 : Phone.yanzhengma1) : Phone.yanzhengma1}>
                                        <Text style={Phone.yanzhengma_text1}>{this.state.yan ? "获取验证码" : this.state.page + "s"}</Text>
                                    </View>
                                </TouchableOpacity >
                            </View>
                        </View>
                    </View>
                </View>
                <View style={Phone.btn}>
                    <TouchableOpacity
                        onPress={() => {
                            let that = this;
                            let formDataSmg = {
                                "oldConfirmCode": that.props.oldCode,
                                "newMobileNr": that.state.phone,
                                "newConfirmCode": this.state.yanzhen
                            }
                            _ajax.post_token("mobile_change", formDataSmg, function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    NativeModules.MyNativeModule.rnCallNative('修改成功');
                                    AsyncStorage.setItem('user_token', JSON.stringify({ username: that.state.phone, password: '111111' }), () => { });
                                    // 注册
                                    JMessage.logout()
                                    JMessage.register({
                                        username: that.state.phone,
                                        password: "111111"
                                    }, () => {
                                        JMessage.login({
                                            username: that.state.phone,
                                            password: "111111"
                                        })
                                    }, (data) => { console.log(data) })
                                    let headNav = that.props.navigator
                                    headNav.popToRoute(
                                        that.props.navigator.getCurrentRoutes()[1]
                                    )
                                } else {
                                    NativeModules.MyNativeModule.rnCallNative(res.info);
                                }
                            })
                        }}
                    >
                        <View style={[Phone.btn_view1, this.state.yanzhen != "" && this.state.phone != "" ? { backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground } : { backgroundColor: PublicColor.Public_NoClockBackground }]}>
                            <Text style={Phone.btn_viewText1}>完成</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}
let Phone = StyleSheet.create({
    phoneStyle: {
        marginLeft: cal(15),
        width: cal(150)
    },
    inputWrap: {
        paddingLeft: cal(9),
        paddingRight: cal(9),
    },
    inputWrap_sub: {
        flexDirection: "row",
        alignItems: "center",
        height: cal(51),
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    _content_view: {
        // borderBottomWidth: cal(0.5),
        // borderBottomColor: "#e2e2e2",
        paddingLeft: cal(5),
        height: cal(60),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        width: cal(251)
    },
    btn: {
        marginTop: cal(80),
        alignItems: "center",
    },
    btn_view1: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "red",
        // borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn_viewText1: { color: "#fff" },
    zhanghao_text: {
        fontSize: cal(15),
        color: PublicColor.Public_Text3
    },
    zhanghao: {
        flexDirection: "row",
        paddingLeft: cal(10),
        height: cal(50),
        alignItems: 'center',
    },
    phoneStyle: {
        width: cal(280),
        paddingLeft: cal(20),
        fontSize: cal(15)

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
})