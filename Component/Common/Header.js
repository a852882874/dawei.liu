import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions, Alert,
    Platform, AsyncStorage
} from 'react-native';
import Register from './../login/register.js';
import Me from './../page/Me.js'
const { width, height } = Dimensions.get('window');
import { cal } from './Cal';
const { PublicColor } = require("./Color.js")
import JMessage from 'jmessage-react-plugin';
const BACK = require('./../image/me/back.png');
const BACKBLOCK = require('./../image/me/back_block.png');
const SIDEMORE = require('./../image/chat/sideMore.png');
const SIDEMOREMOM = require('./../image/mom/more.png');
const BACKGROUND = require('./../image/public/background.png');
const BACKGROUNDMOM = require('./../image/public/backgroundMom.png');
import LinearGradient from 'react-native-linear-gradient';
import PreDetail from './../subPage/preDetail.js';
import PreDetailmom from './../subPage/preDetailMom.js';
export default class header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type ? this.props.type : "suiji",
            sex: "male",
            a: true
        }
        this.lock = false;
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                if (that.props.sex == JSON.parse(result).user_sex) {

                } else {
                    if (!that.lock) {
                        that.setState({
                            sex: JSON.parse(result).user_sex,
                            a: false
                        })
                    }
                }
            }
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
        if (this.state.a) return false;
        if (this.state.sex == 'male') {
            switch (this.state.type) {
                case 'denglu':   //登录页面
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUND}
                                style={[{ height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
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
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        if (this.props.alert == "alert") {
                                            Alert.alert(
                                                '',
                                                '是否放弃已输入的内容 ?',
                                                [
                                                    { text: '取消', onPress: () => console.log(), style: 'cancel' },
                                                    {
                                                        text: '确定', onPress: () => {
                                                            this.props.navigator.pop()
                                                        }
                                                    },
                                                ],
                                                { cancelable: false }
                                            )
                                        } else {

                                            this.props.navigator.pop()
                                        }
                                    }}
                                >

                                    <View style={{ position: "absolute", top: 0, left: cal(15), width: cal(60), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                                {this._SideShow()}
                            </Image>
                        </View>
                    )
                case 'noback': //没有返回键
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                            </Image>
                        </View>
                    )
                case 'index': //首页 头部
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <View style={[styles.public, { height: cal(44), }]}>
                                <View style={{ height: cal(44), backgroundColor: "#fff", width: width, position: "absolute", left: 0, top: 0, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                                </View>
                            </View>
                        </View>

                    )
                case 'side': //消息 头部
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <View style={{ justifyContent: "center", width: width, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>{this.props.title}</Text>
                                </View>
                                <TouchableWithoutFeedback

                                    onPress={() => {
                                        this.props.chongzhi(this.props._conArr)
                                    }}
                                >
                                    <View style={{ position: "absolute", right: cal(14), top: cal(10) }}>
                                        <Text style={{ color: PublicColor.Public_Text6, fontSize: cal(15) }}>忽略未读</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Image>
                        </View>

                    )
                case 'index1': //白蓝条  没有返回键
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
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
                        </View>

                    )
                case 'setting': //设置页面
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <View style={[{ height: cal(44), backgroundColor: "#fff", paddingLeft: cal(15), paddingRight: cal(15), borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigator.pop();
                                    }}
                                >
                                    <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                        <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: cal(17), color: "#1f1f1f" }}>{this.props.title}</Text>
                                {this._SideShow()}
                            </View>
                        </View>
                    )
                default:
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUND}
                                style={[styles.public, { height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        if (this.props.alert == "alert") {
                                            Alert.alert(
                                                '',
                                                '是否放弃已输入的内容 ?',
                                                [
                                                    { text: '取消', onPress: () => console.log(), style: 'cancel' },
                                                    {
                                                        text: '确定', onPress: () => {
                                                            this.props.navigator.pop()
                                                        }
                                                    },
                                                ],
                                                { cancelable: false }
                                            )
                                        } else {

                                            this.props.navigator.pop()
                                        }
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
            }
        } else {
            switch (this.state.type) {
                case 'denglu':   //   女生页面
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
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
                        </View>
                    )
                case 'mom':   //   女生页面
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
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
                        </View>
                    )
                case 'noback':   //   女生页面
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUNDMOM}
                                style={[styles.linearGradient, { width: width }]}
                            >
                                <View style={{ height: cal(44), position: "relative", borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                                </View>
                            </Image>
                        </View>
                    )
                case 'side': //消息 头部
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUNDMOM}
                                style={[styles.linearGradient, { width: width, justifyContent: "center", alignItems: "center" }]}
                            >
                                <View style={{ justifyContent: "center", width: width, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.chongzhi(this.props._conArr)
                                    }}
                                >
                                    <View style={{ position: "absolute", right: cal(14), top: cal(10) }}>
                                        <Text style={{ color: "#fff", fontSize: cal(15) }}>忽略未读</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Image>
                        </View>
                    )
                default:
                    return (
                        <View style={{ paddingTop: Platform.OS === 'ios' ? cal(15) : 0, }}>
                            <Image
                                source={BACKGROUNDMOM}
                                style={[styles.linearGradient, { justifyContent: "center", alignItems: "center", width: width }]}
                            >
                                <View style={{ height: cal(44), position: "relative", borderBottomColor: "#c0c0c0", borderBottomWidth: cal(0.5), width: width, justifyContent: "center", alignItems: "center" }}>

                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            if (this.props.alert == undefined) {
                                                this.props.navigator.pop();
                                                return false;
                                            }
                                            if (this.props.alert != "") {
                                                if (this.props.title == "举报内容") {
                                                    Alert.alert(
                                                        '',
                                                        '是否放弃已输入的举报内容 ?',
                                                        [
                                                            { text: '取消', onPress: () => console.log(), style: 'cancel' },
                                                            {
                                                                text: '确定', onPress: () => {
                                                                    this.props.navigator.pop()
                                                                }
                                                            },
                                                        ],
                                                        { cancelable: false }
                                                    )
                                                } else {
                                                    Alert.alert(
                                                        '',
                                                        '是否放弃已输入的内容 ?',
                                                        [
                                                            { text: '取消', onPress: () => console.log(), style: 'cancel' },
                                                            {
                                                                text: '确定', onPress: () => {
                                                                    this.props.navigator.pop()
                                                                }
                                                            },
                                                        ],
                                                        { cancelable: false }
                                                    )
                                                }
                                            } else {
                                                this.props.navigator.pop()
                                            }
                                        }}
                                    >
                                        <View style={{ position: "absolute", top: 0, left: cal(15), width: cal(60), height: cal(44), justifyContent: "center" }}>
                                            <Image source={BACK} style={{ width: cal(10), height: cal(18) }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.title}</Text>
                                    {this._SideShow()}
                                </View>
                            </Image>
                        </View>
                    )
            }
        }
    }
    _SideShow() {
        if (this.props.side == 'side') {
            return (
                <View style={{ position: "absolute", top: 0, width: cal(50), alignItems: "flex-end", right: cal(15), height: cal(44), justifyContent: "center" }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.more(1)
                            // this.props.navigator.push({
                            //     component: this.state.sex == 'male'?PreDetail:PreDetailmom,
                            //     params: {
                            //         navigator: this.props.navigator,
                            //         type: this.state.sex == 'male'?"1":"2",
                            //         id: JSON.parse(this.props.otherId),
                            //         mobileNr: this.props.otherUsername,
                            //         pop:true,
                            //     }
                            // })
                        }}
                    >
                        <View style={{ width: cal(30), height: cal(30), alignItems: "flex-end", justifyContent: "center" }}>
                            <Image source={this.state.sex == "male" ? SIDEMORE : SIDEMOREMOM} style={this.state.sex == "male" ? { width: cal(21), height: cal(21) } : { width: cal(20), height: cal(5) }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
}
let styles = StyleSheet.create({
    linearGradient: {
        height: cal(44),
        width: width
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
