
//更换手机号    
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, Dimensions, AsyncStorage, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import MyIndex from './../../page/MyIndex.js';
import PhoneSub from './phone/phoneSub.js';
import { cal } from './../../Common/Cal.js';
import _ajax from './../../Common/LoginAjax.js';
import JMessage from 'jmessage-react-plugin';
const { PublicColor } = require("./../../Common/Color.js")
// import LinearGradient from 'react-native-linear-gradient';
const YANGZHENGMA = require('./../../image/login/yanzhenma.png');
const YANGZHENGMAMOM = require('./../../image/mom/yanzhenma.png');
// const ZUO = require('./../../image/me/zou.png');
export default class phone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: "",
            yanzhen: "",
            sex: '',
            page: 60,
            yan: true,
        }
        let that = this;
        AsyncStorage.getItem('user_token', (err, result) => {
            that.setState({
                phone: JSON.parse(result).username
            })
        })
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
            that.time && clearInterval(that.time);
            that.setState({
                yan: true,
                page: 60
            })
            return false;
        } else {
            let formData = new FormData();
            let mobileNr = {
                mobileNr: this.state.phone,
                usage: "2"
            }
            console.log(mobileNr)
            _ajax.post("sms_code", mobileNr, function (res) {
                if (res.code == 0) {

                } else {
                    that.time && clearInterval(that.time);
                    that.setState({
                        yan: true,
                        page: 60
                    })
                }
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_Text7 }}>
                <Header type={"zhuce"} title={"更换手机号"} {... this.props} />
                <View style={{ marginTop: cal(15), paddingLeft: cal(15) }}>
                    <View>
                        <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(13) }}>请点击 “获取验证码” ，短信将发送至你绑定的手机：</Text>
                        <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(13) }}>{this.state.phone.slice(0, 3) + "****" + this.state.phone.slice(7, 11)}</Text>
                    </View>
                </View>
                <View style={Phone.inputWrap}>
                    <View style={Phone.inputWrap_sub}>
                        <View style={{ width: cal(40), justifyContent: "center", alignItems: "center" }}>
                            <Image source={this.state.sex == 'male' ? YANGZHENGMA : YANGZHENGMAMOM} style={{ width: cal(16), height: cal(16) }} />
                        </View>
                        <Text style={{ fontSize: cal(15), color: PublicColor.Public_Text10 }}>验证码</Text>
                        <TextInput
                            style={Phone.phoneStyle}
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
                        <TouchableOpacity
                            disabled={this.state.phone == "" ? true : this.state.yan ? false : true}
                            onPress={() => this.yanzhengmaQ()}>
                            <View style={this.state.phone.length == 11 ? (this.state.sex == "male" ? this.state.yan ? Phone.yanzhengma2 : Phone.yanzhengma1 : this.state.yan ? Phone.yanzhengma3 : Phone.yanzhengma1) : Phone.yanzhengma1}>
                                <Text style={Phone.yanzhengma_text1}>{this.state.yan ? "获取验证码" : this.state.page + "s"}</Text>
                            </View>
                        </TouchableOpacity >
                    </View>
                    <View style={{ marginTop: cal(13), marginBottom: cal(15) }}>
                        <Text style={{ fontSize: cal(12), color: "#828282" }}>注：如果你已更改手机号，请发送邮件到<Text style={{ color: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>support@aityuan.com</Text>进行修改</Text>
                    </View>
                </View>
                <View style={Phone.btn}>
                    <TouchableOpacity
                        disabled={this.state.yanzhen != "" ? false : true}
                        onPress={() => {
                            let that = this;
                            that.props.navigator.push({
                                component: PhoneSub,
                                params: {
                                    navigator: that.props.navigator,
                                    oldCode: that.state.yanzhen
                                }
                            })
                        }}
                    >
                        <View style={[Phone.btn_view1, this.state.yanzhen != "" ? { backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground } : { backgroundColor: PublicColor.Public_NoClockBackground }]}>
                            <Text style={Phone.btn_viewText1}>下一步</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginTop: cal(18),
    },
    inputWrap_sub: {
        flexDirection: "row",
        alignItems: "center",
        height: cal(51),
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: cal(4)
    },
    _content_view: {
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#e2e2e2",
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
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn_viewText1: { color: "#fff" },
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