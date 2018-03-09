import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions, NativeModules, Platform, AsyncStorage } from 'react-native';
import Register from './../login/register.js';
import Me from './../page/Me.js'
const { width, height } = Dimensions.get('window');
import { cal } from './Cal';
const { PublicColor } = require("./Color.js")
import JMessage from 'jmessage-react-plugin';
import Loadding from './../Common/Loadding.js';
const BACK = require('./../image/me/back.png');
const BACKBLOCK = require('./../image/me/back_block.png');
const SIDEMORE = require('./../image/chat/sideMore.png');
const BACKGROUND = require('./../image/public/background.png');
const BACKGROUNDMOM = require('./../image/public/backgroundMom.png');
import LinearGradient from 'react-native-linear-gradient';
export default class headerLoggin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type ? this.props.type : "suiji",
            user_sex: "",
            a: true,
            Loadding: true
        }
        this.lock = false;
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            console.log(result)
            if (JSON.parse(result)) {
                if (!that.lock) {
                    that.setState({
                        user_sex: JSON.parse(result).user_sex,
                        a: false,
                        Loadding: false
                    })
                }
                return false
            }
            return false
        })
    }
    componentWillUnmount() {
        this.lock = true;
    }
    ToRegister() {
        this.props.navigator.push({
            component: Register,
            params: {
                navigator: this.props.navigator
            }
        })
    }
    render() {
        if (this.state.a) return (<View></View>)
        if (this.state.Loadding) {
            return (
                <Loadding />
            )
        }
        if (this.state.user_sex == 'male') {
            switch (this.state.type) {
                case 'denglu':   //登录页面
                    return (
                        <View>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
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
                case 'zhuce': //注册页面  找回密码页面
                    return (
                        <View>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigator.pop()
                                    }}
                                >

                                    <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                                {this._SideShow()}
                            </Image>
                        </View>
                    )
                case 'noback': //  没有返回键
                    return (
                        <View>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                            </Image>
                        </View>
                    )
                case 'Me':
                    return (
                        <Image
                            source={BACKGROUNDMOM}
                            style={[styles.linearGradient, { width: width }]}
                        >
                            <View style={{ height: cal(44), position: "relative", borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, justifyContent: "center", alignItems: "center" }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigator.pop()
                                    }}
                                >
                                    <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACK} style={{ width: cal(19), height: cal(19) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                                <TouchableWithoutFeedback

                                >
                                    <View style={{ position: "absolute", top: 0, right: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Text style={{ color: "#fff" }}>设置</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </Image>

                    )
                case 'index': //首页 头部
                    return (
                        <View style={[styles.public, { height: cal(44), }]}>
                            <View style={{ height: cal(44), backgroundColor: "#fff", width: width, position: "absolute", left: 0, top: 0, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                            </View>
                        </View>

                    )
                case 'side': //消息 头部
                    return (
                        <View>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <View style={{ justifyContent: "center", width: width, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.cleak();
                                        //JMessage.deleteConversation({ type: 'single', username: this.props.username, appKey: this.props.appKey },
                                        //     (conversation) => {
                                        // do something.
                                        //        console.log(this.props.username)
                                        //        console.log(conversation)
                                        //      }, (error) => {
                                        //         var code = error.code
                                        //        var desc = error.description
                                        //        }
                                        //   )
                                        NativeModules.MyNativeModule.rnCallNative("功能正在完善...");
                                    }}
                                >
                                    <View style={{ position: "absolute", right: cal(14), top: cal(10) }}>
                                        <Text style={{ color: PublicColor.Public_Text4, fontSize: cal(15) }}>忽略未读</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Image>
                        </View>

                    )
                case 'index1': //白蓝条  没有返回键
                    return (
                        <View style={[styles.public, { height: cal(44), }]}>
                            <Image
                                source={BACKGROUNDMOM}
                                style={[styles.linearGradient, { width: width }]}
                            >
                                <View style={{ height: cal(44), width: width, position: "absolute", left: 0, top: 0, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                                </View>
                            </Image>
                        </View>

                    )
                case 'preDetail': //喜欢她人详情页面
                    return (
                        <View style={[styles.public, { height: cal(44), }]}>
                            <View style={{ backgroundColor: "#fff", height: cal(44), width: width, position: "absolute", left: 0, top: 0, justifyContent: "center", alignItems: "center" }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigator.pop()
                                    }}
                                >
                                    <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: "#1f1f1f" }}>{this.props.title}</Text>
                            </View>
                        </View>
                    )
                case 'setting': //设置页面
                    return (

                        <View style={[{ height: cal(44), backgroundColor: "#fff", paddingLeft: cal(15), paddingRight: cal(15), borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.navigator.pop()
                                }}
                            >
                                <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                    <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={{ fontSize: cal(17), color: "#1f1f1f" }}>{this.props.title}</Text>
                            {this._SideShow()}
                        </View>
                    )
                default:
                    return (
                        <View style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                            {/* <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.navigator.pop()
                                }}
                            >
                                <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                    <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                                </View>
                            </TouchableWithoutFeedback> */}
                            <Text style={{ fontSize: cal(17), color: "#1f1f1f" }}>{this.props.title}</Text>
                        </View>

                    )
            }
        } else {
            switch (this.state.type) {
                case 'mom':   //   女生页面
                    return (
                        <Image
                            source={BACKGROUNDMOM}
                            style={[styles.linearGradient, { width: width }]}
                        >
                            <View style={{ height: cal(44), position: "relative", borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, justifyContent: "center", alignItems: "center" }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigator.pop()
                                    }}
                                >
                                    <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACK} style={{ width: cal(19), height: cal(19) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                            </View>
                        </Image>
                    )
                case 'noback':   //   女生页面
                    return (
                        <Image
                            source={BACKGROUNDMOM}
                            style={[styles.linearGradient, { width: width }]}
                        >
                            <View style={{ height: cal(44), position: "relative", borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                            </View>
                        </Image>
                    )
                case 'denglu':   //登录页面
                    return (
                        <Image
                            source={BACKGROUNDMOM}
                            style={[styles.linearGradient, { width: width }]}
                        >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: cal(44) }}>
                                <View style={{ width: cal(80) }}>
                                    <Text style={{ fontSize: cal(15), color: '#fff' }}></Text>
                                </View>
                                <Text style={{ fontSize: cal(17), color: "#fff" }}>用户登录</Text>
                                <View style={{ width: cal(80), alignItems: "flex-end", paddingRight: cal(10) }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.ToRegister()}
                                    >
                                        <View>
                                            <Text style={{ fontSize: cal(15), color: "#fff" }}>注册</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </Image>
                    )
                default:
                    return (
                        <Image
                            source={BACKGROUNDMOM}
                            style={[styles.linearGradient, { width: width }]}
                        >
                            <View style={{ height: cal(44), position: "relative", borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, justifyContent: "center", alignItems: "center" }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigator.pop()
                                    }}
                                >
                                    <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACK} style={{ width: cal(19), height: cal(19) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                            </View>
                        </Image>
                    )
            }
        }
    }
    _SideShow() {
        if (this.props.side == 'side') {
            return (
                <View style={{ position: "absolute", top: 0, right: cal(15), height: cal(44), justifyContent: "center" }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            alert('资料待完善')
                        }}
                    >
                        <Image source={SIDEMORE} style={{ width: cal(21), height: cal(21) }} />
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
}
let styles = StyleSheet.create({
    linearGradient: {
        height: cal(44)
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    public: {
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 1,
        // shadowColor: "#fff",
        // elevation: 10,
        // zIndex: 1
    }
})
