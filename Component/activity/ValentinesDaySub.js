/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, Modal,
    Text,
    TouchableOpacity, Image, Dimensions,
    View, ScrollView, TouchableWithoutFeedback, AsyncStorage, CameraRoll, Alert
} from 'react-native';
import Header from './../Common/Header.js';
import WebCanvas from './webCanvasss';
import RNFetchBlob from "react-native-fetch-blob";
import { base } from './../Common/base.js';
import SplashScreen from 'react-native-splash-screen';
const BACKGROUND = require('../image/activity/backgroundSub.jpg');
const CANVASIMAGE = require('../image/activity/canvasBackground.png');
const BTNSAVE = require('../image/activity/save.png');
const BTNSHARE = require('../image/activity/share.png');
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
const CANVASONE = require('../image/activity/growth.png');
const WECHATFRIEND = require('../image/activity/WeChatFriends.png');
const FRIENDSCIRCLE = require('../image/activity/friendsCircle.png');
import _ajax from '../Common/LoginAjax';
const BTN = require('../image/activity/btn.png');
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
const { width, height } = Dimensions.get("window");
import DisplayThePage from "./DisplayThePage";
import { cal } from './../Common/Cal.js';
// import asManager from './../asManager.js';
// import CONSTANTS from './../constant.js';
import Loadding from './../Common/Loadding.js';
// import RESTAPI from './../apiInterface.js';
export default class ValentinesDaysub extends Component {
    constructor(props) {
        super(props);
        SplashScreen.hide();
        this.state = {
            imageData: "",
            scrollEnabled: true,
            content: "用特写镜头看生活，生活是一个悲剧，但用长镜头看生活，就是一部喜剧。", // 话语
            contentImage: "",//关键字图片
            type: 0,//判断是点击保存还是分享  1===》保存    2===》分享
            num: 1,
            widthImage_big: 1, //判断是否是三个字
            visible: false,
            shareType: 1,
            Loadding: false
        }
        WeChat.registerApp("wx812a409daf24c1eb");//从微信开放平台申请
    }
    //  随机抽取一个  图片和  文案
    componentWillMount() {
        let array = [base.baseThree_1, base.baseThree_2, base.baseThree_3, base.baseThree_4,
        base.baseThree_5, base.baseThree_6, base.baseThree_7, base.baseThree_8, base.baseThree_9,
        base.baseThree_10, base.baseThree_11, base.baseThree_12, base.baseThree_13, base.baseThree_14, base.baseThree_15, base.baseThree_16, base.baseThree_17, base.baseThree_18, base.baseThree_19, base.baseThree_20, base.baseThree_21, base.baseThree_22, base.baseThree_23, base.baseThree_24, base.baseThree_25, base.baseThree_26, base.baseThree_27, base.baseThree_28, base.baseThree_29, base.baseThree_30];
        let arrayContent = [base.content_1, base.content_2, base.content_3, base.content_4,
        base.content_5, base.content_6, base.content_7, base.content_8, base.content_9,
        base.content_10, base.content_11, base.content_12, base.content_13, base.content_14, base.content_15, base.content_16, base.content_17, base.content_18, base.content_19, base.content_20, base.content_21, base.content_22, base.content_23, base.content_24, base.content_25, base.content_26, base.content_27, base.content_28, base.content_29, base.content_30];
        let random = Math.floor(Math.random() * 30 + 1);
        if (random == 8) {
            this.setState({
                widthImage_big: 2
            })
        } else if (random == 19 || random == 26) {
            this.setState({
                widthImage_big: 3
            })
        }
        this.setState({
            contentImage: array[random - 1],
            content: arrayContent[random - 1]
        })
    }
    //   保存按钮
    _pen() {
        this.setState({
            type: 1
        })
        let a = base.baseThree_ + this.state.num
        this.refs.canvas._pen(this.props.canvasUrl, base.erweima, this.state.content, base.baseOne, base.baseTwo, this.state.contentImage);
    }
    _penShare() {
        this.setState({
            type: 2
        })
        this.refs.canvas._pen(this.props.canvasUrl, base.erweima, this.state.content, base.baseOne, base.baseTwo, this.state.contentImage);
    }
    _clean() {
        this.setState({
            scrollEnabled: false
        })
        this.refs.canvas._clean();
    }

    // 以url的形式添加背景
    _addImageUrl() {
        this.refs.canvas._addImageUrl(url);
    }

    // 以base64的形式添加背景
    _addImageBase64() {
        this.refs.canvas._addImageBase64(base64);
    }

    // 得到图片的base64形式
    _getBase64() {
        this.refs.canvas._getBase64(base64);
    }

    // 保存base64
    _handleBase64(data) {
        let that = this;
        if (this.state.type == 1) {
            alert("")
        } else if (this.state.type == 2) {
            let that = this;
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        that.setState({
                            Loadding: false
                        })
                        if (that.state.shareType == 1) {
                            console.log(1)
                            WeChat.shareToSession({
                                type: 'imageUrl',
                                title: '我就在这里，等风也等你。',
                                description: '盼望着，盼望着，爱特缘来了，恋爱的脚步近了。',
                                imageUrl: data
                            }).then((success) => {
                                console.log(success)
                                let json = {
                                    "subject":"share_done_draw_luck"
                                }
                                _ajax.post('user/share', json, function (res) {
                                    console.log(res);
                                })
                            }).catch((error) => {
                                console.log(error)
                            })  ;
                        } else {
                            console.log(2)
                            WeChat.shareToTimeline({
                                type: 'imageUrl',
                                title: '我就在这里，等风也等你。',
                                description: '盼望着，盼望着，爱特缘来了，恋爱的脚步近了。',
                                imageUrl: data
                            }).then((success) => {
                                let json = {
                                    "subject":"share_done_draw_luck"
                                }
                                _ajax.post('user/share', json, function (res) {
                                    console.log(res);
                                })
                            }).catch((error) => {
                                console.log(error)
                            })  ;
                        }
                    } else {
                        that.setState({
                            Loadding: false
                        })
                        toastShort('没有安装微信软件，请您安装微信之后再试');
                    }
                });
        }
    }
    // 图片右转
    _rotateRight() {
        this.refs.canvas._rotateRight();
    }
    _loadding() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} title={"请稍候..."} />
            )
        }
    }
    _newUser() {
        if (this.props.new == true) {
            return (
                <TouchableOpacity onPress={() => {
                    let that = this;
                    Alert.alert(
                        '',
                        '新用户必须要先选择男女性别哦~',
                        [
                            {
                                text: '取消', onPress: () => {
                                    console.log("取消")
                                }, style: 'cancel'
                            },
                            {
                                text: '确定', onPress: () => {
                                    let headNav = that.props.navigator
                                    headNav.popToRoute(
                                        that.props.navigator.getCurrentRoutes()[0]
                                    )
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }}>
                    <Image source={BTNSHARE} style={{ justifyContent: "center", alignItems: "center", width: cal(145.5), resizeMode: 'cover', height: cal(50) }}>
                        <Text style={{ color: "#fed38e", fontSize: cal(16), marginBottom: cal(3) }}>去注册</Text>
                    </Image>
                </TouchableOpacity>
            )
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={BACKGROUND} style={styles.imagecontainer}>
                        {this._loadding()}
                        <View style={{ height: 0, opacity: 0 }}>
                            <DisplayThePage
                                handleBase64={this._handleBase64.bind(this)}
                                ref='canvas'
                            />
                        </View>
                        <View style={styles.canvasViewImage}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.props.navigator.pop();
                            }}>
                                <View style={styles.canvasViewImageOne}>
                                    <Text style={{ color: "#ec9987", fontSize: cal(17) }}>关闭</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Image source={CANVASIMAGE} style={{ justifyContent: "center", alignItems: "center", width: cal(289.5), height: cal(286.5) }} >
                                <Image source={{ uri: this.props.canvasUrl, scale: 3 }} style={{ width: cal(224), height: cal(264) }} />
                            </Image>
                            <Image source={{ uri: this.state.contentImage }} style={[styles.canvasText, { width: this.state.widthImage_big == 3 ? cal(59) : (this.state.widthImage_big == 2 ? cal(205) : cal(143)), height: this.state.widthImage_big == 3 ? cal(59) : cal(59) }]} />
                            <Text style={{ color: "#af8661", fontSize: cal(14), marginTop: cal(10), paddingLeft: cal(40), paddingRight: cal(40), textAlign: "center" }}>{this.state.content}</Text>
                        </View>
                        <View style={styles.btnView}>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    visible: true
                                })
                            }}>
                                <View style={{ marginRight: cal(10), }}>
                                    <Image source={BTNSAVE} style={{ justifyContent: "center", alignItems: "center", width: cal(148), resizeMode: 'cover', height: cal(50) }}>
                                        <Text style={{ color: "#fed38e", fontSize: cal(16), marginBottom: cal(3) }}>分享</Text>
                                    </Image>
                                </View>
                            </TouchableOpacity>
                            {this._newUser()}
                        </View>
                    </Image>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.visible}
                        onRequestClose={() => console.log('onRequestClose...')} >
                        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1 }}>
                            <View style={{ position: "absolute", top: 0, zIndex: 99999999999, width: width, flex: 1, }}>
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
                            <View style={{ position: "absolute", bottom: 0, width: width, zIndex:9999999999 }}>
                                <View style={{ height: cal(150), backgroundColor: "#fff" }}>
                                    <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                        <Text style={{ color: PublicColor.Public_Text3, fontSize: PublicFontSize.PublicFontSize_30 }}>分享至</Text>
                                    </View>
                                    <View style={{ height: cal(95), flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                this.setState({
                                                    visible: false,
                                                    shareType: 1,
                                                    Loadding: true
                                                })
                                                this._penShare()
                                            }}
                                        >
                                            <View style={{ marginRight: cal(65), alignItems: "center" }}>
                                                <Image source={WECHATFRIEND} style={{ width: cal(45), height: cal(45) }} />
                                                <Text style={{ marginTop: cal(7), fontSize: cal(12), color: PublicColor.Public_Text1 }}>微信好友</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback
                                            onPress={() => {

                                                this.setState({
                                                    visible: false,
                                                    shareType: 2,
                                                    Loadding: true
                                                })
                                                this._penShare()

                                            }}
                                        >
                                            <View style={{ alignItems: "center" }}>
                                                <Image source={FRIENDSCIRCLE} style={{ width: cal(45), height: cal(45) }} />
                                                <Text style={{ marginTop: cal(7), fontSize: cal(12), color: PublicColor.Public_Text1 }}>微信朋友圈</Text>
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    imagecontainer: {
        width: width,
        resizeMode: 'cover',
        height: cal(701.5)
    },
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    canvasViewImage: {
        alignItems: "center",
        marginTop: cal(45)
    },
    canvasViewImageOne: {
        width: cal(289.5),
        alignItems: "flex-end",
        marginBottom: cal(7)
    },
    canvasText: {
        marginTop: cal(20)
    },
    btnView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: cal(25)
    },
    btnViewSave: {

    },



    btnTouchableOpacity: {
        width: cal(150),
        height: cal(52)
    },
    activityRules: {
        marginTop: cal(30),
    },
    activityRulesView: {
        alignItems: "center"
    },
    activityRulesTextH1: {
        color: "#b40e12",
        fontSize: cal(16)
    }
});


