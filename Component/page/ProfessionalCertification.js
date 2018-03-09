import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, ScrollView, Modal, NativeModules, Navigator, TouchableOpacity, Linking, TextInput, Dimensions, Image, ToastAndroid, BackAndroid, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
import { cal } from './../Common/Cal';
import Header from './../Common/Header.js';
const { PublicColor } = require("./../Common/Color.js");
const LOGO1 = require('./../image/public/zhiye.png');
import JMessage from 'jmessage-react-plugin';
const LOGO2 = require('./../image/public/xingyong.png');
import SplashScreen from 'react-native-splash-screen'
const LOGO3 = require('./../image/public/tuijianed.png');
const LOGO5 = require('./../image/quize/zhiye.png');
import _ajax from '../Common/LoginAjax';
const LOGO4 = require('./../image/public/jiaoliu.png');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IdentityCard from './../quiz/identityCard.js';
export default class ProfessionalCertification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            zhiwei: "",
            email: '',
            open: false
        }

    }
    componentDidMount() {
        SplashScreen.hide()
    }
    _one() {
        return (
            <View style={{ marginTop: cal(16), alignItems: "center" }}>
                <Text style={{ fontSize: cal(17), color: "#5f5f5f" }}>爱特缘职业认证</Text>
            </View>
        )
    }
    _two() {
        return (
            <View style={{ alignItems: "center", marginTop: cal(23), paddingBottom: cal(55) }}>
                <View>
                    <View style={{ flexDirection: "row", marginBottom: cal(8), alignItems: "center" }}>
                        <Image source={LOGO1} style={{ width: cal(17), height: cal(17) }} />
                        <Text style={{ marginLeft: cal(5), fontSize: cal(13), color: "#828282" }}>点亮您的职业认证图标</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: cal(8), alignItems: "center" }}>
                        <Image source={LOGO2} style={{ width: cal(17), height: cal(17) }} />
                        <Text style={{ marginLeft: cal(5), fontSize: cal(13), color: "#828282" }}>提高个人信用度</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: cal(8), alignItems: "center" }}>
                        <Image source={LOGO3} style={{ width: cal(17), height: cal(17) }} />
                        <Text style={{ marginLeft: cal(5), fontSize: cal(13), color: "#828282" }}>获取更多推荐展示机会</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: cal(8), alignItems: "center" }}>
                        <Image source={LOGO4} style={{ width: cal(17), height: cal(17) }} />
                        <Text style={{ marginLeft: cal(5), fontSize: cal(13), color: "#828282" }}>异性更放心地与您交流交往</Text>
                    </View>
                </View>
            </View>
        )
    }
    _three() {
        console.log(this.props.user)
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <View style={{ paddingLeft: cal(13), height: cal(45), justifyContent: "center", borderBottomWidth: cal(0.5), borderBottomColor: "#d1d1d1" }}>
                    <Text style={{ fontSize: cal(13), color: "#5f5f5f" }}>以下信息仅供此次认证使用，将严格保密</Text>
                </View>
                <View style={{ height: cal(50), paddingLeft: cal(12), borderBottomWidth: cal(0.5), borderBottomColor: "#ddd" }}>
                    <TextInput
                        style={{ color: "#5f5f5f" }}
                        clearTextOnFocus={true}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="search"
                        blurOnSubmit={true}
                        value={this.state.name}
                        clearButtonMode='always'
                        placeholder={this.props.user ? this.props.user.employer : "请输入您的公司名称"}
                        placeholderTextColor={"#b1b1b1"}
                        onChangeText={(name) => this._name(name)}
                    />
                </View>

                <View style={{ height: cal(50), paddingLeft: cal(12), borderBottomWidth: cal(0.5), borderBottomColor: "#ddd" }}>
                    <TextInput
                        style={{ color: "#5f5f5f" }}
                        clearTextOnFocus={true}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="search"
                        blurOnSubmit={true}
                        value={this.state.zhiwei}
                        clearButtonMode='always'
                        placeholder={this.props.user ? this.props.user.title : "请输入您的职位名称"}
                        placeholderTextColor={"#b1b1b1"}
                        onChangeText={(zhiwei) => this._zhiwei(zhiwei)}
                    />
                </View>
                <View style={{ height: cal(50), paddingLeft: cal(12), borderBottomWidth: cal(0.5), borderBottomColor: "#ddd" }}>
                    <TextInput
                        style={{ color: '#5f5f5f' }}
                        clearTextOnFocus={true}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="search"
                        blurOnSubmit={true}
                        clearButtonMode='always'
                        placeholder={this.props.user ? this.props.user.companyEmail : "请输入您的公司邮箱"}
                        value={this.state.email}
                        placeholderTextColor={"#b1b1b1"}
                        onChangeText={(email) => this._email(email)}
                    />
                </View>
            </View>

        )
    }
    // 公司名称
    _name(name) {
        let names = name.replace(/[\@\#\$\%\^\&\*\{\}\:\"\<\>\?]/ig, "");
        this.setState({ name: names })
    }
    _zhiwei(zhiwei) {
        let zhiweis = zhiwei.replace(/[\@\#\$\%\^\&\*\{\}\:\"\<\>\?]/ig, "");
        let zhiweiss = zhiweis.replace(/\d+/g, '');
        this.setState({ zhiwei: zhiweiss })
    }
    _email(email) {
        let emails = email.replace(/[\u4e00-\u9fa5]/g, "");
        let emailss = emails.replace(/[\#\$\%\^\(\)\*\{\}\:\"\<\>\?]/ig, "");
        this.setState({ email: emailss })
    }

    //提交按钮

    _four() {
        return (
            <View style={{ marginTop: cal(65), alignItems: "center" }}>
                <TouchableOpacity
                    disabled={
                        this.state.name != "" &&
                            this.state.zhiwei != "" &&
                            this.state.email != "" ? false : true
                    }
                    onPress={() => {
                        if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.state.email)) {
                            let json = {
                                'employer': this.state.name,
                                "title": this.state.zhiwei,
                                "companyEmail": this.state.email
                            }
                            let that = this;
                            console.log(json);
                            this.setState({
                                open: true
                            })
                            _ajax.post_token("user/register_email", json, function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    if (that.props.user) {
                                        that.props.emailConfirmed(1, that.state.email, that.state.zhiwei, that.state.name)
                                    }
                                    that.setState({
                                        open: true
                                    })
                                }
                            })
                        } else {
                            NativeModules.MyNativeModule.rnCallNative("邮箱格式不正确！");
                        }
                    }}>
                    <View style={
                        this.state.name != "" &&
                            this.state.zhiwei != "" &&
                            this.state.email != "" ?
                            { width: cal(340), height: cal(50), borderRadius: cal(2), justifyContent: "center", alignItems: "center", backgroundColor: PublicColor.Public_ClickBackground } :
                            { width: cal(340), height: cal(50), borderRadius: cal(2), justifyContent: "center", alignItems: "center", backgroundColor: PublicColor.Public_NoClockBackground }
                    }>
                        <Text style={{ color: '#fff' }}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _frist() {
        if (this.props.frist) {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({
                            open: false
                        })
                    }}
                >
                    <View style={{ position: "absolute", right: 0, top: 0, zIndex: 99999999999999999 }}>
                        <Image source={LOGO5} style={{ width: cal(30), height: cal(30) }} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    _alert() {
        return (
            <Modal
                visible={this.state.open}
                transparent={true}
                animationType='fade'
                onRequestClose={() => { alert("Modal has been closed.") }}
                modalDidOpen={() => console.log('modal did open')}
                modalDidClose={() => this.setState({ open: false })}
            >
                <View style={{ justifyContent: "center", alignItems: "center", height: height, backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <View style={{ width: cal(315), height: cal(185), justifyContent: "flex-end" }}>
                        {/* {this._frist()} */}
                        <View style={{ width: cal(300), height: cal(170), borderRadius: cal(5), backgroundColor: "#fff", alignItems: "center" }}>

                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ fontSize: cal(15), color: "#2e2e2e" }}>验证邮箱</Text>
                            </View>
                            <View style={{ marginTop: cal(15), alignItems: "center" }}>
                                <Text style={{ fontSize: cal(13), color: "#5f5f5f", }}>我们已向您的邮箱发送了一封邮件，需要您前</Text>
                                <Text style={{ fontSize: cal(13), color: "#5f5f5f", marginTop: cal(3) }}>去激活认证，请您注意接收邮件。</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    open: false
                                })
                                if (this.props.user || this.props.frist) {
                                    this.props.navigator.pop()
                                } else {
                                    this.props.navigator.replace({
                                        component: IdentityCard,
                                        reset: true,
                                        params: {
                                            navigator: this.props.navigator,
                                            sex: "male"
                                        }
                                    })
                                }
                            }}>
                                <View style={{ width: cal(130), height: cal(35), justifyContent: "center", alignItems: "center", borderRadius: cal(30), marginTop: cal(19), backgroundColor: PublicColor.Public_ClickBackground }}>
                                    <Text style={{ color: "#fff", fontSize: cal(15) }}>知道了</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Header title={"职业认证"} type={this.props.frist ? "zhuce" : "noback"} navigator={this.props.navigator} />
                    {this._alert()}
                    <View>
                        {this._one()}
                        {this._two()}
                        {this._three()}
                        {this._four()}
                    </View>
                </View>
            </ScrollView>

        )
    }
}