
//修改密码      
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, AsyncStorage, Navigator, NativeModules, Dimensions, ScrollView, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import MyIndex from './../../page/MyIndex.js';
import { cal } from './../../Common/Cal.js';
import SHA256 from 'crypto-js/md5';
const { PublicColor } = require("./../../Common/Color.js")
import JMessage from 'jmessage-react-plugin';
import _ajax from './../../Common/LoginAjax.js';
const PASSWORDMOM = require("./../../image/mom/password.png");
const IPHONEMOM = require("./../../image/mom/iphone.png");
const YANGZHENGMAMOM = require("./../../image/mom/yanzhenma.png");
// import LinearGradient from 'react-native-linear-gradient';
// const MORENAVI = require('./../../image/chat/chatMo.png');
// const ZUO = require('./../../image/me/zou.png');
export default class feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            oldPassword: "",
            newPassword: "",
            queNewPassword: "",
            disableds: false,
            sex: "",
            phone: '',
            UserList: this.props.UserList
        }
        let that = this;
        console.log()
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
        JMessage.getMyInfo((UserInf) => {
            if (typeof (UserInf.username) == "undefine") {
            } else {
                // 
                console.log("已登录")
                this.setState({
                    phone: UserInf.username
                })
            }
        })
    }

    _password_exists() {
        if (this.state.UserList.password_exists == 0) {
            return false
        }
        return (
            <View style={[ChangePassword._content]}>
                <View style={[ChangePassword._content_view, {
                    borderTopWidth: cal(0.5),
                    borderTopColor: "#eee",
                }]}>
                    <View>
                        <Text style={{ fontSize: cal(15), color: PublicColor.Public_Text10 }}>当前密码</Text>
                    </View>
                    <TextInput
                        style={ChangePassword.input}
                        clearTextOnFocus={true}
                        maxLength={16}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="search"
                        blurOnSubmit={true}
                        secureTextEntry={true}
                        clearButtonMode='always'
                        placeholder="请输入当前密码"
                        placeholderTextColor={PublicColor.Public_NoClockBackground}
                        onChangeText={(oldPassword) => this.setState({ oldPassword })}
                    />
                </View>
            </View>
        )
    }
    _tishi() {
        if ( this.state.UserList.password_exists == 0 ) {

            return (
                <View style={{ marginTop: cal(10),paddingRight:cal(10)  }}>
                    <Text style={ChangePassword._textViewText}>首次设置密码，密码设置成功后可以选择用“手机号码+密码”方式登录</Text>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                <Header type={"zhuce"} title={this.state.UserList.password_exists == 0 ? "设置密码" : "修改密码"} {... this.props} />
                {this._tishi()}
                <View style={ChangePassword._contentWrap}>
                    <View style={{ backgroundColor: "#fff", }}>
                        {this._password_exists()}
                        <View style={ChangePassword._content}>
                            <View style={ChangePassword._content_view}>
                                <View>
                                    <Text style={{ fontSize: cal(15), color: PublicColor.Public_Text10 }}>新密码</Text>
                                </View>
                                <TextInput
                                    style={ChangePassword.input}
                                    clearTextOnFocus={true}
                                    maxLength={16}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    enablesReturnKeyAutomatically={true}
                                    returnKeyType="search"
                                    secureTextEntry={true}
                                    blurOnSubmit={true}
                                    clearButtonMode='always'
                                    placeholder="6~16位字母/数字"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={(newPassword) => this.setState({ newPassword })}
                                />
                            </View>
                        </View>
                        <View style={ChangePassword._content}>
                            <View style={[ChangePassword._content_view,]}>
                                <View>
                                    <Text style={{ fontSize: cal(15), color: PublicColor.Public_Text10 }}>确认密码</Text>
                                </View>
                                <TextInput
                                    style={ChangePassword.input}
                                    clearTextOnFocus={true}
                                    maxLength={16}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    enablesReturnKeyAutomatically={true}
                                    returnKeyType="search"
                                    blurOnSubmit={true}
                                    secureTextEntry={true}
                                    clearButtonMode='always'
                                    placeholder="请再次输入密码"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={(queNewPassword) => this.setState({ queNewPassword })}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        // activeOpacity  ={0.7}
                        disabled={this.state.disableds ? true : (this.state.newPassword != "" && this.state.queNewPassword != "" ? false : true)}
                        onPress={() => this.Btn()}
                    >
                        <View style={ChangePassword.btn}>
                            <View style={[ChangePassword.btn_view, !this.state.disableds && this.state.newPassword != "" && this.state.queNewPassword != "" ? { backgroundColor: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground } : { backgroundColor: PublicColor.Public_NoClockBackground }]}>
                                <Text style={{ color: "#fff" }}>保存</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    //事件
    Btn() {
        let that = this;
        that.setState({
            disableds: true
        })
        that.timer = setTimeout(function (res) {
            that.setState({
                disableds: false
            })
        }, 5000)
        if (!(/^[\w]{6,16}$/.test(this.state.newPassword))) {
            NativeModules.MyNativeModule.rnCallNative("密码格式不正确");
            that.timer && clearTimeout(that.timer);
            if (!that.lock) {
                that.setState({
                    disableds: false,
                })
            }
            return false;
        }
        if (this.state.newPassword == this.state.queNewPassword) {
            // let Password =SHA256(this.state.oldPassword).toString();
            // let NewPassword =SHA256(this.state.newPassword).toString();
            // let formData = new FormData();
            // formData.append("Password",Password);
            // formData.append("NewPassword",NewPassword);
            // formData.append("PhoneN",this.state.phone);
            // console.log(formData);
            let formData = {
                newPassword: this.state.newPassword,
                oldPassword: this.state.oldPassword
            }
            console.log(formData)
            _ajax.post_token("user/change_password", formData, function (res) {
                console.log(res)
                if (res.code == 0) {
                    that.state.UserList.password_exists = 1;
                    AsyncStorage.setItem('UserList', JSON.stringify({ UserList: that.state.UserList }), () => { });
                    NativeModules.MyNativeModule.rnCallNative("修改成功");
                    that.timer && clearTimeout(that.timer);
                    let headNav = that.props.navigator
                    headNav.popToRoute(
                        that.props.navigator.getCurrentRoutes()[0]
                    )
                } else {
                    that.timer && clearTimeout(that.timer);
                    that.setState({
                        disableds: false
                    })
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        } else {
            that.timer && clearTimeout(that.timer);
            that.setState({
                disableds: false
            })
            NativeModules.MyNativeModule.rnCallNative("新密码和确认密码不一致哦~");
        }
    }
}
let ChangePassword = StyleSheet.create({
    _contentWrap: {
        flex: 1,
        // paddingLeft: cal(9),
        // paddingRight: cal(10),
        paddingTop: cal(30),
        backgroundColor: PublicColor.Public_ViewBackground
    },
    _content: {
        backgroundColor: "#fff",
        paddingLeft: cal(15),

        // paddingLeft: cal(5),
        // paddingRight: cal(5)
    },
    _content_view: {
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
        height: cal(60),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        width: cal(251)
    },
    btn: {
        marginTop: cal(60),
        alignItems: "center",
    },
    _textViewText: {
        // textAlign: "center",
        paddingLeft:cal(15),
        lineHeight: cal(22),
        fontSize: cal(12),
        color: PublicColor.Public_Text1
    },
    btn_view: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "red",
        borderRadius: cal(4),
        justifyContent: "center",
        alignItems: "center"
    }
})