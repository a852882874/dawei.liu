import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Modal, Navigator, Dimensions, ScrollView, NativeModules, InteractionManager, TouchableWithoutFeedback, Image, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
import { cal } from './../Common/Cal.js';
import Header from './../Common/Header.js';
import MyProfile from './momMyProfile.js';
import Setting from './../subPage/setting.js';
import MomWenda from './../subPage/momWenda.js';
import { CachedImage } from "react-native-img-cache";
import IdentityCardTwo from './../quiz/identityCardTwo.js';
import QuizOne from './../quiz/quizIndex.js';
const MORENAVI = require('./../image/chat/chatMo.png');
import tokenImage from './../Common/token.js';
const RENGZHENG = require('./../image/public/rengzheng.png');
import ProfessionalCertification from './../page/ProfessionalCertification.js';
import JMessage from 'jmessage-react-plugin';
const ZILIAO = require('./../image/mom/bianjiziliao.png');
const SHIMING = require('./../image/mom/shiming.png');
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
const CISHI = require('./../image/mom/tiku.png');
const TOUMING = require('./../image/me/toum.png');
import _ajax from '../Common/LoginAjax';
const TUIJIAN = require('./../image/mom/tuijian.png');
const SHEZHI = require('./../image/mom/setmess.png');
const WENDA = require('./../image/mom/momWenda.png');
const ZUO = require('./../image/mom/zou.png');
const QQ = require('./../image/me/qq.png');
const WEIXING = require('./../image/me/weixin.png');
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
import LinearGradient from 'react-native-linear-gradient';
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idName: "24222222",
            name: "昵称",
            idName2: "24222222",
            avatarThumbPath: "file:////data/user/0/com.vloveapp/files/images/small-avatar/6A66998257193D6EEE8C138E5AD9A520",
            avatarThumbPath_huidiao: '',
            visible: false,
            user_sex: '',
            userStart: {},
            avatarSource2: "",
            huawei: false
        }
        WeChat.registerApp("wx812a409daf24c1eb");//从微信开放平台申请

    }
    componentWillUnmount() {
        if (this.listener) {
            this.lock = true;
            JMessage.removeReceiveMessageListener(this.listener) // 移除监听(一般在 componentWillUnmount 中调用)
        }
    }
    componentWillMount() {
        let that = this;
        AsyncStorage.getItem('Image', (err, result) => {
            console.log(JSON.parse(result))
            if (JSON.parse(result) != null) {
                that.setState({
                    avatarSource2: JSON.parse(result),
                })
            } else {
                _ajax.get_token("user/image/list", that.props.navigator, function (res) {
                    console.log(res)
                    if (res.code == 0 && res.imageList.length > 0) {
                        res.imageList.map((item) => {
                            if (item.usage == 1) {
                                tokenImage.tokenImg(item.uuid, function (res) {
                                    console.log(res)
                                    that.setState({
                                        avatarSource2: res,
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let that = this;
            if (!this.lock) {
                that.listener = (message) => {
                    console.log(message)
                    if (message.extras.sysMsgType == '2') {
                        if (message.extras.subType == '0' || message.extras.subType == '1' || message.extras.subType == '2' || message.extras.subType == '3') {
                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                AsyncStorage.setItem('UserList', JSON.stringify({ UserList: res.user }), () => {
                                    that.setState({
                                        userStart: res.user,
                                    })
                                });
                            })
                        }

                    }
                }
            }
            JMessage.addReceiveMessageListener(that.listener) // 添加监听   消息监听
            that._fetchData();
        });
    }
    _fetchData() {
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    user_sex: JSON.parse(result).user_sex,
                })
            }
        })
        AsyncStorage.getItem('huawei', (err, result) => {
            if (JSON.parse(result) != null) {
                console.log(JSON.parse(result))
                that.setState({
                    huawei: JSON.parse(result),
                })
            }
        })
        AsyncStorage.getItem('UserList', (err, result) => {
            if (JSON.parse(result) != null) {
                that.setState({
                    userStart: JSON.parse(result).UserList,
                })
            } else {
                _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                    that.setState({
                        userStart: res.user,
                    })
                })
            }
        });

    }
    _imageConfirmed() {
        if (this.state.userStart.portraitConfirmed == 4) {
            return (
                <View>
                </View>
            )
        }
        else if (this.state.userStart.portraitConfirmed == 5) {
            return (
                <View style={{ width: cal(69.5), marginLeft: cal(1.5), alignItems: "center", height: cal(20.5), position: "absolute", bottom: 0, left: cal(2), zIndex: 999 }}>
                    <Image
                        source={TOUMING}
                        style={{ width: cal(69.5), height: cal(20.5), justifyContent: "center", alignItems: "center" }}
                    >

                        <Text style={{ fontSize: cal(11), color: "#f5f5f5", }}>
                            审核失败
                    </Text>
                    </Image>
                </View>
            )
        } else {
            return (
                <View style={{ width: cal(69.5), marginLeft: cal(1.5), alignItems: "center", height: cal(20.5), position: "absolute", bottom: 0, left: cal(2), zIndex: 999 }}>
                    <Image
                        source={TOUMING}
                        style={{ width: cal(69.5), height: cal(20.5), justifyContent: "center", alignItems: "center" }}
                    >

                        <Text style={{ fontSize: cal(11), color: "#f5f5f5", }}>
                            审核中
                    </Text>
                    </Image>
                </View>
            )
        }
    }
    //内容
    _one() {
        console.log()
        return (
            <View style={{ height: cal(200), width: width }}>
                <Image
                    style={{ height: cal(200), width: width }}
                    source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : this.state.avatarThumbPath_huidiao != '' ? this.state.avatarThumbPath_huidiao : (this.state.avatarThumbPath != "file:///" ? { uri: this.state.avatarThumbPath } : MORENAVI)}
                >
                    <View style={[MyIndexStyle._oneWrap, { paddingTop: cal(18), alignItems: "center" }]}>
                        <View style={{ width: cal(78), height: cal(78), borderRadius: cal(78), backgroundColor: PublicColor.Public_ClickBackground, marginTop: cal(20), justifyContent: "center", alignItems: "center" }}>
                            <Image source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : this.state.avatarThumbPath_huidiao != '' ? this.state.avatarThumbPath_huidiao : (this.state.avatarThumbPath != "file:///" ? { uri: this.state.avatarThumbPath } : MORENAVI)} style={{ width: cal(77), borderRadius: cal(77), height: cal(77), }} />
                            {this._imageConfirmed()}
                        </View >
                        <Text style={{ color: "#fff", fontWeight: "800", marginTop: cal(12) }}>{this.state.userStart.nickname != null ? this.state.userStart.nickname : "昵称"}</Text>
                        {/* <Text style={{ color: "#fff", fontWeight: "800", marginTop: cal(7) }}>{this.state.user_sex == "male" ? "男士" : (this.state.user_sex == 'female' ? "女士" : "暂无")}</Text> */}
                    </View>
                </Image>
            </View>
        )
    }
    idConfirmeds(id) {
        this.state.userStart.idConfirmed = id
        this.setState({
            userStart: this.state.userStart
        })
    }
    _two() {
        return (
            <View style={MyIndexStyle._twoWrap}>
                <View style={MyIndexStyle._two} >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigator.push({
                                component: MyProfile,
                                params: {
                                    navigator: this.props.navigator,
                                    name: this.state.name,
                                    avatarThumbPath: this.avatarThumbPaths.bind(this),
                                    avatarThumbPathImage: this.state.avatarThumbPath_huidiao != "" ? this.state.avatarThumbPath_huidiao : this.state.avatarThumbPath,
                                    userStart: this.state.userStart
                                }
                            })
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <Image source={ZILIAO} style={{ width: cal(19), height: cal(19) }} />
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>我的资料</Text>
                                </View>
                                <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if (this.state.userStart.idConfirmed == 4) {
                                NativeModules.MyNativeModule.rnCallNative("认证完成，无需重复认证");
                            }
                            else if (this.state.userStart.idConfirmed == 5 || this.state.userStart.idConfirmed == 0) {
                                this.props.navigator.push({
                                    component: IdentityCardTwo,
                                    params: {
                                        navigator: this.props.navigator,
                                        idConfirmed: this.idConfirmeds.bind(this)
                                    }
                                })
                            }
                            else {
                                NativeModules.MyNativeModule.rnCallNative("实名认证审核中");
                            }
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <Image source={SHIMING} style={{ width: cal(19), height: cal(19) }} />
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>实名认证</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Text style={{ color: this.state.idName == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, fontSize: PublicFontSize.PublicFontSize_28 }}>{this.state.userStart.idConfirmed == 4 ? "已认证" : this.state.userStart.idConfirmed == 5 ? "未认证" : "未认证"}</Text>
                                    <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5), marginLeft: cal(8) }} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigator.push({
                                component: ProfessionalCertification,
                                params: {
                                    navigator: this.props.navigator
                                }
                            })
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <Image source={RENGZHENG} style={{ width: cal(17), height: cal(17) }} />
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>职业认证</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Text style={{ color: this.state.idName == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, fontSize: PublicFontSize.PublicFontSize_28 }}>未认证</Text>
                                    <Image source={ZUO} style={{ width: cal(12), height: cal(12), marginLeft: cal(4) }} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback> */}
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigator.push({
                                component: QuizOne,
                                params: {
                                    navigator: this.props.navigator
                                }
                            })
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <Image source={CISHI} style={{ width: cal(19), height: cal(19) }} />
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>测试题库</Text>
                                </View>
                                <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    _three() {
        return (
            <View style={[MyIndexStyle._twoWrap, { marginTop: cal(11) }]}>
                <View style={MyIndexStyle._two} >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                visible: true
                            })
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <View style={{ height: cal(57), justifyContent: "center" }}>
                                        <Image source={TUIJIAN} style={{ width: cal(19), height: cal(19) }} />
                                    </View>
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>推荐给好友</Text>
                                </View>
                                <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigator.push({
                                component: MomWenda,
                                params: {
                                    navigator: navigator
                                }
                            })
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <View style={{ height: cal(57), flexDirection: "row",alignItems:"center" }}>
                                        <Image source={WENDA} style={{ width: cal(19), height: cal(19), }}/>
                                    </View>
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>新手引导</Text>
                                </View>
                                <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigator.push({
                                component: Setting,
                                params: {
                                    navigator: this.props.navigator
                                }
                            })
                        }}
                    >
                        <View style={MyIndexStyle._twoView}>
                            <View style={MyIndexStyle._twoViewSub}>
                                <View style={MyIndexStyle._twoViewSub_View}>
                                    <Image source={SHEZHI} style={{ width: cal(19), height: cal(19) }} />
                                    <Text style={MyIndexStyle._twoViewSub_View_Text}>设置</Text>
                                </View>
                                <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    _four() {
        if (this.state.huawei) {
            return (
                <View style={{ height: 120 }}></View>
            )
        }
    }
    render() {
        return (
            <View style={MyIndexStyle.wrap}>
                {this._one()}
                <ScrollView style={!this.state.huawei ? { flex: 1 } : { width: width }} showsVerticalScrollIndicator={false}>
                    {this._two()}
                    {this._three()}
                    {this._four()}
                </ScrollView>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => console.log('onRequestClose...')} >
                    <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1 }}>
                        <View style={{ position: "absolute", top: 0, zIndex: 1, width: width, flex: 1, }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({
                                        visible: false
                                    })
                                }}
                            >
                                <View style={{ height: height }}></View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ position: "absolute", bottom: 0, width: width, zIndex: 2 }}>
                            <View style={{ height: cal(150), backgroundColor: "#fff" }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                    <Text style={{ color: PublicColor.Public_Text3, fontSize: PublicFontSize.PublicFontSize_30 }}>分享爱特缘</Text>
                                </View>
                                <View style={{ height: cal(95), flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.setState({
                                                visible: false
                                            })
                                            WeChat.isWXAppInstalled()
                                                .then((isInstalled) => {
                                                    if (isInstalled) {
                                                        WeChat.shareToSession({
                                                            type: 'news',
                                                            title: '我就在这里，等风也等你。',
                                                            description: '盼望着，盼望着，爱特缘来了，恋爱的脚步近了。',
                                                            webpageUrl: 'http://47.100.20.199/app-release.apk',
                                                            imageUrl: 'http://47.100.20.199/vloveapp.jpg'
                                                        });
                                                    } else {
                                                        toastShort('没有安装微信软件，请您安装微信之后再试');
                                                    }
                                                });
                                        }}
                                    >
                                        <View style={{ marginRight: cal(65), alignItems: "center" }}>
                                            <Image source={WEIXING} style={{ width: cal(45), height: cal(45) }} />
                                            <Text style={{ marginTop: cal(7), fontSize: PublicFontSize.PublicFontSize_20, color: PublicColor.Public_Text1 }}>微信好友</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.setState({
                                                visible: false
                                            })
                                            QQAPI.shareToQQ({
                                                type: 'news',
                                                title: '我就在这里，等风也等你。',
                                                description: '盼望着，盼望着，爱特缘来了，恋爱的脚步近了。',
                                                webpageUrl: 'http://47.100.20.199/app-release.apk',
                                                imageUrl: 'http://47.100.20.199/vloveapp.jpg'
                                            })
                                        }}
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Image source={QQ} style={{ width: cal(45), height: cal(45) }} />
                                            <Text style={{ marginTop: cal(7), fontSize: PublicFontSize.PublicFontSize_20, color: PublicColor.Public_Text1 }}>QQ好友</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: cal(10) }}></View>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({
                                        visible: false
                                    })
                                }}
                            >
                                <View style={{ height: cal(45), backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: PublicFontSize.PublicFontSize_28, color: PublicColor.Public_Text3 }}>取消</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }


    //选择头像 后回掉
    avatarThumbPaths(image) {
        let that = this
        _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
            that.setState({
                userStart: res.user,
            })
            AsyncStorage.setItem('UserList', JSON.stringify({ UserList: res.user }), () => { });
        })
        AsyncStorage.getItem('Image', (err, result) => {
            if (JSON.parse(result) != null) {
                that.setState({
                    avatarSource2: JSON.parse(result),
                })
            } else {
                _ajax.get_token("user/image/list", that.props.navigator, function (res) {
                    console.log(res)
                    if (res.code == 0 && res.imageList.length > 0) {
                        res.imageList.map((item) => {
                            if (item.usage == 1) {
                                tokenImage.tokenImg(item.uuid, function (res) {
                                    console.log(res)
                                    that.setState({
                                        avatarSource2: res,
                                    })
                                })
                            }
                        })

                    }
                })
            }
        })
    }
}

let MyIndexStyle = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground
    },
    _oneWrap: {
        height: cal(200),
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    _twoWrap: {
        backgroundColor: PublicColor.Public_ViewBackground,
        marginTop: cal(15)
    },
    _two: {

        backgroundColor: "#fff",
        // borderColor: "#e2e2e2",
        paddingLeft: cal(15),
        // borderWidth: cal(0.5)
    },
    _twoView: {
        height: cal(57),
        flexDirection: "row",
        alignItems: "center",
        // paddingLeft: cal(6),
        // paddingRight: cal(10)
    },
    _twoViewSub: {
        height: cal(57),
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#eee",
        flex: 1,
        paddingLeft: cal(6),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: cal(15),

    },
    _twoViewSub_View: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        height: cal(57),
    },
    _twoViewSub_View_Text: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14),
        marginLeft: cal(10)
    }
})
