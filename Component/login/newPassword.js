
//修改密码      
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator,AsyncStorage, Dimensions,NativeModules,
     ScrollView, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get("window");
import HraderLogin from './../Common/Header.js'
import MyIndex from './../page/MyIndex.js';
import { cal } from './../Common/Cal.js';
const { PublicColor } = require("./../Common/Color.js")
import JMessage from 'jmessage-react-plugin';
import SHA256 from 'crypto-js/md5';


import Login from './login';
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
            sex: ""
        }
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result).user_sex) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
      
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_Text7 }}>
                <HraderLogin type={"zhuce"} title={"设置新密码"} {... this.props} />
                <View style={ChangePassword._contentWrap}>
                    <View style={{ backgroundColor: "#fff", }}>
                        <View style={ChangePassword._content}>
                            <View style={ChangePassword._content_view}>
                                <View>
                                    <Text style={ChangePassword.zite}>新密码</Text>
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
                                    placeholder="请设置新的登录密码(6-16位)"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={(newPassword) => this.setState({ newPassword })}
                                />
                            </View>
                        </View>
                        <View style={ChangePassword._content}>
                            <View style={ChangePassword._content_view}>
                                <View>
                                    <Text style={ChangePassword.zite}>确认密码</Text>
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
                                    placeholder="请再次输入新密码"
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={(queNewPassword) => this.setState({ queNewPassword })}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        disabled={this.state.disableds ? true : (this.state.newPassword.length >= 6 && this.state.queNewPassword.length >= 6 ? false : true)}
                        onPress={() => this.Btn()}
                    >
                        <View style={ChangePassword.btn}>
                            <View style={[ChangePassword.btn_view, this.state.newPassword.length >= 6 && this.state.queNewPassword.length >= 6 ? { backgroundColor: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground } : { backgroundColor: PublicColor.Public_NoClockBackground }]}>
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
        if (this.state.newPassword == this.state.queNewPassword) {
            // console.log(this.state.oldPassword);
            // console.log(this.state.newPassword);
            // console.log(this.state.queNewPassword);
            let that = this;
            let formData = new FormData();
            formData.append('NewPassword', SHA256(this.state.newPassword).toString());
            _ajax.post("xgmm", formData, function (res) {
                console.log(res)
                if (res.code == "1") {
                    JMessage.updateMyPassword({
                        oldPwd: this.state.oldPassword,
                        newPwd: this.state.newPassword
                    },
                        () => {
                            NativeModules.MyNativeModule.rnCallNative("新密码设置成功");
                            that.timer && clearTimeout(that.timer);
                            that.props.navigator.push({
                                component : Login,
                                reset:true,
                                params:{
                                    navigator:that.props.navigator
                                }
                            });
                        }, (error) => {
                            var code = error.code
                            var desc = error.description
                        })
                }
            })
        }




    }
}
let ChangePassword = StyleSheet.create({
    _contentWrap: {
        flex: 1,
        // paddingLeft: cal(9),
        // paddingRight: cal(10),
        paddingTop: cal(30),
        backgroundColor: PublicColor.Public_Text7
    },
    _content: {

        paddingLeft: cal(15),
       
    },
    _content_view: {
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#e2e2e2",
        height: cal(60),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        width: cal(271)
    },
    btn: {
        marginTop: cal(60),
        alignItems: "center",
    },
    btn_view: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "red",
        borderRadius: cal(4),
        justifyContent: "center",
        alignItems: "center"
    },
    zite:{
        fontSize: cal(15),color: PublicColor.Public_Text10
    }
})