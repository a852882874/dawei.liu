import React, { Component } from 'react';
import {
    findNodeHandle,
    UIManager,
    View,
    NativeModules,
    Text,
    StyleSheet, Navigator, Keyboard, TouchableOpacity, ScrollView, CameraRoll
    , RefreshControl, ListView, Image, Dimensions, Platform, AsyncStorage, InteractionManager,
    Modal, PermissionsAndroid,
    TextInput,
    ActivityIndicator,
    LayoutAnimation,
    TouchableWithoutFeedback,
    Animated,
    DeviceEventEmitter, TouchableHighlight,
    KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Time from './../Common/Time';
import Header from './../Common/Header';
import { cal } from './../Common/Cal';
const MAN = require('./../image/quize/man.png')
const MOMVN = require('./../image/quize/mom.png')
const { PublicFontSize } = require("./../Common/FontSize.js")
import tokenImage from './../Common/token.js';
import { ChatStyle } from './chatStyle.js';
const UPDATE = require('./../image/updata.png');
const GUANLIYUAN = require('./../image/aguanliyuan.png')
const BACK = require('./../image/me/back.png');
const BACKBLOCK = require('./../image/me/back_block.png');
const CHATXMY = require('./../image/chat/my.png');
const CHATXOTHER = require('./../image/chat/other.png');
const ADDJIAHAO = require('./../image/chat/add.png');
const XIAOLIAN = require('./../image/chat/xiaolian.png');
const JIANPANKEP = require('./../image/chat/jianpan_kep.png');
const CHANGYONGYU = require('./../image/chat/changyongyu.png');
const PAIZHAO = require('./../image/chat/paizhao.png');
const XIANGCE = require('./../image/chat/xiangce.png');
const YUYIN = require('./../image/chat/yuyin.png');
const { PublicColor } = require("./../Common/Color.js")
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePickerCrop from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import PicMore from './../page/subFile/picMore.js';
var ImagePicker = require('react-native-image-picker');
const dismissKeyboard = require('dismissKeyboard');
import IMUI from 'aurora-imui-react-native';
const AuroraIMUIController = IMUI.AuroraIMUIController;
const IMUIMessageListDidLoad = "IMUIMessageListDidLoad";
import Gallery from 'react-native-image-gallery';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import JMessage from 'jmessage-react-plugin';
import Sound from 'react-native-sound';
import AppKey from './../Common/appKey.js';
const _this = {};
let options = {
    title: '请选择', cancelButtonTitle: '取消', width: 200, height: 200, takePhotoButtonTitle: '拍照', chooseFromLibraryButtonTitle: '选择相册', storageOptions: { skipBackup: true, path: 'images' }
};
import { Icon } from 'native-base';
import RNFetchBlob from "react-native-fetch-blob";
import Emoji from 'react-native-emoji'
import Swiper from 'react-native-swiper'
import { Images, Colors, Metrics } from './Themes'
import Styles from './Styles/MessageScreenStyle'
// var spliddit = require('spliddit');
var emoji = require("./emojiCom");
import PreDetail from './../subPage/preDetail.js';
import PreDetailmom from './../subPage/preDetailMom.js';
var { BorderBtn } = require('./emojiCom.js')
const MODE_TEXT = "mode_text";
const MODE_RECORD = "mode_record";
import SplashScreen from 'react-native-splash-screen';
import _ajax from '../Common/LoginAjax';
//输入框初始高度
const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 34,
    android: 41,
});
const MAX_COMPOSER_HEIGHT = 100;
export const MIN_INPUT_TOOLBAR_HEIGHT = Platform.select({
    ios: 44,
    android: 54,
});
const listener = {};
const ACTION_BUTTON_HEIGHT = 220;
const EMOJI_HEIGHT = 190;
export default class chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otherUsername: this.props.mobileNr,//他人的username
            myUsername: '',//自己的username
            nickname: '',//自己的昵称
            appKey: this.props.appKey,
            dataSource: [],
            dataSourceListView: [{}],
            avatarSource: "",
            otherId: typeof this.props.otherId == 'string' ? this.props.otherId : JSON.stringify(this.props.otherId),
            avatarSource2: "",
            showModal: false,
            modalImg: '',
            guanliyuan: this.props.guanliyuan,
            show: true,
            keyboardSpace: 0,
            page: 1,
            content: "",// 输入消息
            yuying: "按住按钮语音",//语音
            pageAudio: 1,
            currentTime: 0.0,
            recording: false,
            messageIDImage: {},
            stoppedRecording: false,
            myId: "",
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath,
            hasPermission: undefined,
            yuyinOrInput: true,   //语音和输入框 变化
            yuyinOrSent: true,   //语音和输入框 变化
            open: false, //常用语模态框
            mode: MODE_TEXT,
            opacity: "#fff",
            focused: false,
            value: '',
            componentPage: 1,
            actionVisible: false,
            actionAnim: new Animated.Value(0),
            sex: this.props.sex,
            changyongyu: [
                { "name": "我知道附近新开了一家网红店，我们去尝尝呗。" },
                { "name": "最近上映的几部电影豆瓣评分都挺高，有没有喜欢的？" },
                { "name": "这周末有空么，出来聚聚呗！" },
                { "name": "Hi，在忙些什么呢？" }
            ],
            changyongyu2: { "name": "新增常用语" },
            addShow: 4,//发送的增加功能
            text: '', height: 0,
            contentWWW: "",
            zhaohuTongyi: 1,
            huifu: true,
            shield: '屏蔽此人',
            byshield: '',
            shieldId: "1",
            visible: false,
            by: false,
            touxiangWei: false,
            scrollTabTrue: false,
            pingbi1: true
        }
        SplashScreen.hide()
        _this = this;
        this.lock = false;
        let that = this;
        listener = (message) => {
            if (message.from.username == that.state.otherUsername) {
                if (!that.lock) {
                    that.setState({
                        // dataSource: msgArr.reverse(),
                        scrollTabTrue: true,
                        dataSource: this.state.dataSource.concat(message),
                    })
                }
                // let that = this;

            }
        }
        JMessage.addReceiveMessageListener(listener) // 添加监听
        this.composerHeight = MIN_COMPOSER_HEIGHT;
        this.actionBarHeight = 0;
        // alert(this.props.guanliyuan)

    }
    // shouldComponentUpdate(){
    //     if(this.scrollTabs!=undefined){
    //         this.scrollTabs.scrollTo({ x: 0, y: 999999999999999999999999999999999999999 });        
    //     }
    // }
    guanxi(that) {
        _ajax.get_token('match/relation?others=' + that.props.otherId, that.props.navigator, function (res) {
            console.log(res.relations)
            if (res.relations.to.length == 0 || res.relations.by.length == 0) {
                that.setState({
                    pingbi1: false
                })
            }
            if (res.relations.by.length != 0) {
                that.setState({
                    by: res.relations.by[0][1] == 1 && res.relations.to.length == 0 ? true : false
                })
            }
            if (res.relations.by[0][2] == 1) {
                that.setState({
                    byshield: "被屏蔽"
                })
            } else {
                that.setState({
                    byshield: ""
                })

            }
            if (res.relations.to[0][2] == 1) {
                that.setState({
                    shield: "取消屏蔽",
                    shieldId: 0
                })
            } else {
                that.setState({
                    shield: "屏蔽此人",
                    shieldId: 1
                })

            }
            
        })
    }
    componentDidMount() {
        let that = this;
        that.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        JMessage.getHistoryMessages({
            type: 'single', username: that.state.otherUsername,
            appKey: AppKey, from: 0, limit: that.state.page * 4
        },
            (msgArr) => { // 以参数形式返回消息对象数组
                that.setState({
                    // dataSource: msgArr.reverse(),
                    dataSource: msgArr.reverse(),
                    page: ++that.state.page,
                    show: false
                })

            }, (error) => {
                var code = error.code
                var desc = error.description
            })
        InteractionManager.runAfterInteractions(() => {
            JMessage.getUserInfo({ username: that.state.otherUsername, appKey: AppKey },
                (userInfo) => {
                    if( userInfo.avatarThumbPath != "" && that.props.avatarThumbPathSide == true){
                        that.props.avatarThumbPath( userInfo.avatarThumbPath,that.props.key )
                    }
                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })
            if (that.state.guanliyuan) {
            } else {
                AsyncStorage.getItem('changyongyu', (err, result) => {
                    if (JSON.parse(result) != null) {
                        if (!that.lock) {
                            that.setState({
                                changyongyu: JSON.parse(result)
                            })
                        }
                    }
                });
            }
            if ( this.state.guanliyuan) {

            } else {
                that.guanxi(that)
            }
            _ajax.get_token('user/image/list?objectUid=' + that.props.otherId, that.props.navigator, function (res) {
                if (res.code == 0 && res.imageList.length > 0) {
                    let json = []
                    res.imageList.map((item) => {
                        if (item.usage == 1) {
                            if (item.confirmed == 5) {
                                that.setState({
                                    touxiangWei: true
                                })

                            } else {

                            }
                        }
                    })
                }
            })
            AsyncStorage.getItem('user_sex', (err, result) => {
                if (JSON.parse(result)) {
                    that.setState({
                        sex: JSON.parse(result).user_sex,
                    })
                }
            })
            AsyncStorage.getItem('UserList', (err, result) => {
                if (JSON.parse(result) != null) {
                    that.setState({
                        myId: JSON.parse(result).UserList.id,
                        myUsername: JSON.parse(result).UserList.mobileNr,
                        nickname: JSON.parse(result).UserList.nickname,
                    })
                } else {
                    _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                        that.setState({
                            myId: res.user.id,
                            myUsername: res.user.mobileNr,
                            nickname: res.user.nickname,
                        })
                    })
                }
            });
            if (!that.state.guanliyuan) {
                AsyncStorage.getItem('Image', (err, result) => {
                    if (JSON.parse(result) != null) {
                        that.setState({
                            avatarSource2: JSON.parse(result),
                        })
                    } else {
                        _ajax.get_token("user/image/list", that.props.navigator, function (res) {
                            if (res.code == 0 && res.imageList.length > 0) {
                                res.imageList.map((item) => {
                                    if (item.usage == 1) {
                                        tokenImage.tokenImg(item.uuid, function (res) {
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
            this._checkPermission().then((hasPermission) => {
                if (!this.lock) {
                    this.setState({ hasPermission });
                }
                if (!hasPermission) return;
                this.prepareRecordingPath(this.state.audioPath + '/' + Date.parse(new Date()) + '.aac');
                AudioRecorder.onProgress = (data) => {
                    this.setState({ currentTime: Math.floor(data.currentTime) });
                };
                AudioRecorder.onFinished = (data) => {
                    // Android callback comes in the form of a promise instead.
                    if (Platform.OS === 'ios') {
                        this._finishRecording(data.status === "OK", data.audioFileURL);
                    }
                };
            });
        })
    }

    //输入框自增长
    onContentSizeChange(event) {
        this.setState({
            text: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height
        });
    }
    componentWillUnmount() {
        JMessage.exitConversation({ type: 'single', username: this.state.otherUsername, appKey: AppKey },
            (conversation) => {
                // do something.
            }, (error) => {
                var code = error.code
                var desc = error.description
            }
        )
        if (this.sound != undefined) {
            this.sound.stop()
        }
        this.lock = true;
        AsyncStorage.setItem('changyongyu', JSON.stringify(this.state.changyongyu), () => { });
        this.props.chong(this.state.otherUsername, this.props.key)
        JMessage.removeReceiveMessageListener(listener) // 移除监听(一般在 componentWillUnmount 中调用)
    }
    //键盘抬起 高度（获取键盘高度）
    _keyboardDidShow(frames) {
        const keyboardSpace = frames.endCoordinates.height//获取键盘高度
    }
    componentWillMount() {
        _this = this

    }

    //render  渲染
    _more() {
        this.setState({
            visible: true
        })
    }
    render() {
        if (this.state.show) {
            return (
                <View>
                    <Header title={this.props.username} type={"zhuce"} more={this._more.bind(this)} side={this.props.guanliyuan ? "" : "side"} navigator={this.props.navigator} otherUsername={this.state.otherUsername} otherId={this.props.otherId} />
                </View>
            )
        } else {
            let dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.dataSource);
            return (
                <TouchableWithoutFeedback
                    onPress={() => {

                        this.setState({
                            addShow: 0
                        })
                    }}
                >
                    <View style={ChatStyle.wrap}>
                        <Header title={this.props.username} type={"zhuce"} more={this._more.bind(this)} side={this.props.guanliyuan ? "" : "side"} navigator={this.props.navigator} otherUsername={this.state.otherUsername} otherId={this.props.otherId} />
                        {/* <ScrollView ref={(node) => this.scrollTabs = node}> */}

                        {this._Modal()}
                        {this._ModalChangyongyu()}
                        <View style={[{ position: "absolute", top: cal(251), alignItems: "center", borderRadius: cal(30), left: cal(137.5), zIndex: 9999999, backgroundColor: "rgba(0,0,0,0.4)", width: cal(100), }, this.state.yuying == "开始录音" ? { height: cal(100) } : { height: 0 }]}>
                            <Text style={{ fontSize: cal(18), color: "#fff", marginTop: cal(20) }}>{this.state.currentTime}s</Text>
                            <Text style={{ fontSize: cal(12), color: "#fff", marginTop: cal(10) }}>松开手指发送</Text>
                        </View>
                        {/* <KeyboardAvoidingView style={{}} behavior="padding"> */}
                        <ListView
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={this.onPullRelease.bind(this)}
                                    colors={[PublicColor.Public_ClickBackground, PublicColor.Public_ClickBackground]}
                                />}
                            //topIndicatorRender={this.topIndicatorRender.bind(this)}
                            //topIndicatorHeight={cal(110)}
                            ref={(node) => this.scrollTabs = node}
                            contentContainerStyle={{}}
                            onPullRelease={this.onPullRelease.bind(this)}
                            onEndReached={this._endReached.bind(this)}
                            enableEmptySections={true}
                            dataSource={dataSource}
                            renderRow={this._content_detail.bind(this)}
                            showsVerticalScrollIndicator={false}
                            initialListSize={100}
                            removeClippedSubviews={false}
                        />
                        <View style={{ height: this.props.guanliyuan ? 0 : this.state.addShow == 0 ? cal(70) : (this.state.addShow == 1 || this.state.addShow == 2) ? cal(265) : cal(265) }}></View>
                        {/* </KeyboardAvoidingView> */}
                        {this.guanliyuan()}
                        {/*这里是一个图片查看器*/}
                        <Modal
                            animationType={"fade"}
                            transparent={true}
                            visible={this.state.showModal}
                            onRequestClose={() => this.setState({ showModal: false })}
                        >
                            <TouchableWithoutFeedback onPress={() => this.setState({ showModal: false })}>
                                <View style={{ alignItems: "center", height: height, width: width, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.9)" }}>
                                    <Image style={{ width: width, height: width, borderRadius: cal(2) }} source={{ uri: this.state.modalImg }} />
                                    <TouchableWithoutFeedback
                                        onPress={() => this.longPressEvent(this.state.modalImg)}
                                    >
                                        <View style={{ position: "absolute", bottom: 0, alignItems: "flex-end", paddingBottom: cal(55), right: cal(30), width: width / 5, height: cal(100), }}>
                                            <Image source={UPDATE} style={{ width: cal(19), height: cal(18) }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* <Gallery
                                style={{ flex: 1, backgroundColor: 'black' }}
                                images={[
                                    { source: { uri: this.state.modalImg } }

                                ]}
                                onSingleTapConfirmed={() => this.setState({ showModal: false })}
                            >
                                <TouchableOpacity
                                    onLongPress={() => {
                                        console.log(this.state.modalImg)
                                    }}
                                    style={{ position:"absolute",bottom:0,right:0 ,zIndex:99999999999999999999999999}}
                                >
                                    <Text style={{color:"red"}}>下载图片</Text>
                                </TouchableOpacity>
                            </Gallery> */}
                        </Modal>
                    </View >
                </TouchableWithoutFeedback >
            )
            if (this.scrollTabs != undefined) {
                // this.scrollTabs.scrollTo({ x: 0, y: 999999999999999999999999999999999999999 });
            }
        }
    }
    longPressEvent(uri) {
        if (Platform.OS === "ios") {
            let promise = CameraRoll.saveToCameraRoll(img);
            promise.then(function (result) {
                // alert('保存成功！地址如下：\n' + result);
                NativeModules.MyNativeModule.rnCallNative('保存相册成功！')
            }).catch(function (error) {
                // alert('保存失败！\n' + error);
                NativeModules.MyNativeModule.rnCallNative('保存相册失败！')
            });
        } else {
            JMessage.downloadOriginalImage({
                type: 'single', username: this.state.otherUsername,
                appKey: AppKey,
                messageId: this.state.messageIDImage.id
            },
                (result) => {
                    console.log(result)
                    let promise = CameraRoll.saveToCameraRoll("file://" + result.filePath, 'photo');
                    promise.then(function (result) {
                        console.log(result)
                        NativeModules.MyNativeModule.rnCallNative('保存成功！地址如下：\n' + result)
                    }).catch(function (error) {
                        alert('保存失败！\n' + error);
                    });
                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })
            // })
        }
    }
    guanliyuan() {
        if (this.props.guanliyuan == false) {
            return (
                <View style={ChatStyle.sentMess}>
                    <View style={[ChatStyle.sentMess_One, { borderBottomColor: "#eee", borderBottomWidth: cal(1) }]}>
                        <TouchableOpacity
                            onPress={() => {
                                dismissKeyboard();
                                if (this.state.addShow == 0 || this.state.addShow == 2 || this.state.addShow == 4) {
                                    this.setState({
                                        addShow: 1,
                                        emoji: false
                                    })
                                } else {
                                    this.setState({
                                        addShow: 0,
                                        emoji: false
                                    })
                                }
                                Animated.timing(          // Uses easing functions
                                    this.state.actionAnim,    // The value to drive
                                    { toValue: 1 }           // Configuration
                                ).start();
                            }}
                        >
                            <View style={ChatStyle.sentMess_one_add}>
                                <Image source={ADDJIAHAO} style={{ width: cal(29.5), height: cal(30) }} />
                            </View>
                        </TouchableOpacity>
                        {/* 表情 */}
                        {this._renderEmojiButton()}
                        {/* 输入框 和 语音 切换 */}
                        <View style={[ChatStyle.sentMess_two, { marginLeft: cal(4) }]}>
                            {this._yuyinOrInputView()}
                        </View>
                        {/* 语音按钮 和 发送按钮*/}
                        {this._yunSent()}
                    </View>
                    {this._addGongNeng()}
                </View>
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }

    _ModalChangyongyu() {
        if (this.state.open) {
            return (
                <View style={{ justifyContent: "center", width: width, position: "absolute", zIndex: 9999999999999999999999999999, left: 0, top: 0, alignItems: "center", height: height, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <ScrollView>
                        <KeyboardAwareScrollView
                            scrollEnabled={true}
                            keyboardOpeningTime={2000}
                            enableOnAndroid={true}
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            contentContainerStyle={{ width: width, height: height, justifyContent: "center", alignItems: "center" }}
                            sonKeyboardWillShow={(frames) => {
                                console.log('Keyboard event', frames)
                            }}>
                            <View style={{ width: cal(300), height: cal(195), backgroundColor: "#fff", overflow: 'hidden', borderRadius: cal(6) }}>
                                <View style={{ height: cal(40), backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(15), color: "#fff" }}>添加常用语</Text>
                                </View>
                                <View style={{ alignItems: "center", marginTop: cal(10) }}>
                                    <View style={ChatStyle.View_Input}>
                                        <TextInput {...this.props}
                                            //将组件定义的属性交给TextInput 
                                            multiline={true}
                                            placeholder={"请输入你的常用回复..."}
                                            underlineColorAndroid="rgba(0,0,0,0)"
                                            onChange={this.onChange.bind(this)}
                                            onContentSizeChange={this.onContentSizeChange.bind(this)}
                                            style={[ChatStyle.textInputStyle, { height: cal(Math.max(cal(30), this.state.height)) }]}
                                            value={this.state.text}
                                            onChangeText={(contentWWW) => this.setState({ contentWWW: contentWWW })}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", width: cal(300), justifyContent: "flex-end", marginTop: cal(6) }}>
                                        <Text style={{ fontSize: cal(11), color: "#fff" }}>{this.state.contentWWW.length}</Text>
                                        {/* <Text style={{ fontSize: cal(11), color: "#b1b1b1" }}>/</Text> */}
                                        {/* <Text style={{ fontSize: cal(11), color: "#b1b1b1", marginRight: cal(10) }}>50</Text> */}
                                    </View>
                                </View>
                                <View style={{ width: cal(300), height: cal(0.5), backgroundColor: "#b1b1b1", marginTop: cal(6) }}>

                                </View>
                                <View style={{ height: cal(45), justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                open: false
                                            })
                                        }}
                                        style={{ flex: 1, borderRightWidth: cal(0.5), borderRightColor: "#b1b1b1", height: cal(45) }}
                                    >
                                        <View style={{ alignItems: "center", height: cal(45), justifyContent: "center" }}>
                                            <Text style={{ fontSize: cal(15), color: "#5f5f5f" }}>取消</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => {
                                            this.setState({
                                                changyongyu: this.state.changyongyu.concat({ "name": this.state.contentWWW }),
                                                open: false
                                            })
                                        }}
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: cal(15), color: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>保存</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </View>

            )
        }
    }
    _yunSent() {
        if (this.state.yuyinOrSent) {
            return (
                <TouchableOpacity
                    //disabled={this.state.content != "" ? false : true}
                    onPress={() => {
                        dismissKeyboard();
                        this.setState({
                            yuyinOrInput: !this.state.yuyinOrInput,
                            addShow: 0
                        })
                    }}
                    style={{ marginLeft: cal(12) }}
                >
                    <View style={{ width: cal(30), height: cal(30), justifyContent: "center", alignItems: "center" }}>
                        <Image source={!this.state.yuyinOrInput ? JIANPANKEP : YUYIN} style={{ width: cal(30), height: cal(29.5) }} />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    disabled={this.state.content != "" ? false : true}
                    onPress={() => this.onSendText()}
                    style={{ marginLeft: cal(10) }}
                >
                    <View style={{ width: cal(45), height: cal(35), borderRadius: cal(2), backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: cal(12), color: "#fff" }}>发送</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    _yuyinOrInputView() {
        if (this.state.yuyinOrInput) {
            return (
                <TextInput
                    style={[ChatStyle.sentMess_two_textInput, { paddingLeft: cal(10) }]}
                    clearButtonMode='always'
                    multiline={true}
                    value={this.state.content}
                    placeholder="说点什么吧..."
                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                    onChangeText={this.handleChangeText.bind(this)}
                    // onChangeText={(content) => this.setState({ content })}
                    ref={(search) => { this.search = search }}
                    editable={true}
                    returnKeyType='send'
                    onChange={this.onChange.bind(this)}
                    onFocus={this.handleFocusSearch.bind(this)}
                    onBlur={this.handleBlurSearch.bind(this)}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.onSendText()}
                />
            )
        } else {
            return (
                <TouchableOpacity
                    onPressIn={() => {
                        this.onStartRecordVoice(1)
                    }}
                    onPressOut={() => {
                        this.onStartRecordVoice(2)
                    }}
                >
                    <View style={ChatStyle.sentMess_two_textInputQieYuYin}>
                        <Text>{this.state.yuying}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }










    onChange() {

    }
    handleChangeText(v) {
        if (v.length > 0 && v[v.length - 1] == '\n') {
            this.setState({ content: '' });
        } else {
            this.setState({
                content: v,
            });
        }
        if (v.length != 0) {
            this.setState({
                yuyinOrSent: false,
                yuyinOrInput: true
            })
        } else {
            this.setState({
                yuyinOrSent: true
            })
        }

    }
    handleBlurSearch() {

    }
    handleFocusSearch() {
        this.setState({
            addShow: 0,
        })
        // this.scrollTabs.scrollTo({ x: 0, y: 10099999999999999999999999999999900 + 60 })
    }

    //点击加号出现的消息框
    _addGongNeng() {
        if (this.props.guanliyuan) return false
        if (this.state.addShow == 1) {
            return (
                <Animated.View style={[Styles.emojiRow, {
                    opacity: this.state.actionAnim, height: cal(200), width: width, flexDirection: "row", transform: [{
                        translateY: this.state.actionAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                        })
                    }],
                    backgroundColor: "#fff"
                }]}>
                    <View style={{ height: cal(200), width: width, marginTop: cal(20), flexDirection: "row", justifyContent: "flex-start" }}>
                        <View style={{ flex: 1 / 5 }}>
                            <TouchableOpacity
                                onPress={() => this.xiangce()}
                            >
                                <View style={{}}>
                                    <Image source={XIANGCE} style={{ width: cal(45), marginLeft: cal(20), height: cal(45) }} />
                                    <Text style={{ color: "#5f5f5f", marginTop: cal(5), fontSize: cal(12), marginLeft: cal(10), textAlign: "center" }}>相册</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5 }}>
                            <TouchableOpacity
                                onPress={() => this.paizhao()}
                            >
                                <View style={{}}>
                                    <Image source={PAIZHAO} style={{ width: cal(45), marginLeft: cal(20), height: cal(45.5) }} />
                                    <Text style={{ color: "#5f5f5f", marginTop: cal(5), fontSize: cal(12), marginLeft: cal(10), textAlign: "center" }}>拍照</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5 }}>
                            <TouchableOpacity
                                onPress={() => this._changyongyu()}
                            >
                                <View style={{}}>
                                    <Image source={CHANGYONGYU} style={{ width: cal(45), marginLeft: cal(20), height: cal(45.5) }} />
                                    <Text style={{ color: "#5f5f5f", marginTop: cal(5), fontSize: cal(12), marginLeft: cal(10), textAlign: "center" }}>常用语</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View >
                </Animated.View>
            )
        } else if (this.state.addShow == 2) {
            if (this.props.guanliyuan) return false
            return (

                <View >
                    {this._renderEmoji()}
                </View>

            )
        } else if (this.state.addShow == 4) {
            if (this.props.guanliyuan) return false
            let _changyongyuArr = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.changyongyu.concat(this.state.changyongyu2))
            return (
                // <Animated.View style={[Styles.emojiRow, {
                //     opacity: this.state.actionAnim, height: cal(200),backgroundColor:"blue", transform: [{
                //         translateY: this.state.actionAnim.interpolate({
                //             inputRange: [0, 1],
                //             outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                //         })
                //     }]
                // }]}>
                <View style={{ backgroundColor: "#fff", height: cal(200), }}>
                    <TouchableWithoutFeedback>
                        <View style={{ height: cal(200), flexDirection: "row", flexWrap: "wrap" }}>
                            <ListView
                                contentContainerStyle={{ backgroundColor: "#fff" }}
                                dataSource={_changyongyuArr}
                                renderRow={this.changyongyu.bind(this)}
                                enableEmptySections={true}
                            />
                        </View >
                    </TouchableWithoutFeedback>
                </View>
                // </Animated.View>
            )
        }
    }
    changyongyu(item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item.name != "新增常用语") {
                        this.onSendTextChang(item.name)
                    } else {
                        this.setState({
                            open: true
                        })
                    }
                }}
            >
                <View style={{ height: cal(45), alignItems: "center", justifyContent: "center", borderBottomColor: "#d1d1d1", borderBottomWidth: cal(0.5) }}>
                    <Text style={{ fontSize: cal(13), color: item.name == "新增常用语" ? (this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground) : "#5f5f5f" }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //常用语
    _changyongyu() {
        this.setState({
            addShow: 4
        })
    }
    //  列表渲染的 数据
    _content_detail(item) {
        if (item.from.username == this.state.otherUsername) {
            //对方 图片消息
            if (item.type == "image") {
                return (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                addShow: 0
                            })
                        }}
                    >
                        <View style={{}}>
                            <View style={ChatStyle.chatImage}>
                                <Text style={ChatStyle.timeText}>{Time.time(parseInt(item.createTime / 1000))}</Text>
                            </View>
                            <View style={ChatStyle.otherWrapImage}>
                                <View style={[ChatStyle.otherWrapImageMO, this.state.guanliyuan ? { backgroundColor: "#fff" } : {}]}>
                                    <Image source={this.state.guanliyuan ? GUANLIYUAN : (item.target.avatarThumbPath ? { uri: "file://" + item.from.avatarThumbPath } : MOMVN)} style={{ width: cal(50), height: cal(50), borderRadius: cal(50) }} />
                                </View>
                                <View style={ChatStyle.otherWrapImage_two}>
                                    <Image source={CHATXOTHER} style={{ width: cal(5), height: cal(7) }} />
                                    <View style={ChatStyle.otherWrapImage_two_sub}>
                                        {this._ifImage_Text(item)}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
            // 对方消息
            return (
                <TouchableWithoutFeedback
                    onPress={() => {

                        this.setState({
                            addShow: 0
                        })
                    }}
                >
                    <View style={{}}>
                        <View style={ChatStyle.chatImage}>
                            <Text style={ChatStyle.timeText}>{Time.time(parseInt(item.createTime / 1000))}</Text>
                        </View>
                        <View style={ChatStyle.otherWrap}>
                            <View style={ChatStyle.otherWrapImageMO}>
                                <Image source={this.state.guanliyuan ? GUANLIYUAN : (item.target.avatarThumbPath ? { uri: "file://" + item.from.avatarThumbPath } : MOMVN)} style={{ width: cal(46), height: cal(46), borderRadius: cal(46) }} />
                                <Text style={{ height: this.state.touxiangWei ? cal(28) : 0, position: "absolute", fontSize: cal(10), color: "#fff", textAlign: "center" }}>
                                    {this.state.touxiangWei ? "头像未通过审核" : ""}
                                </Text>
                            </View>
                            <View style={[ChatStyle.otherWrap_two, { maxWidth: cal(290) }]}>
                                <Image source={CHATXOTHER} style={{ width: cal(5), height: cal(7), marginRight: cal(-1) }} />
                                <View style={ChatStyle.otherWrap_two_sub}>
                                    {this._ifImage_Text(item)}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            //我方消息
            if (item.type == "image") {
                return (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                addShow: 0
                            })
                        }}
                    >
                        <View style={{ alignItems: "flex-end", marginTop: cal(10) }}>
                            {this._Time_Show(item)}
                            <View style={[ChatStyle.otherWrapImage, { justifyContent: "flex-end", marginRight: cal(10) }]}>
                                <View style={[ChatStyle.otherWrapImage_two, { marginRight: cal(10) }]}>
                                    <View style={[ChatStyle.otherWrapImage_two_sub, { backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }]}>
                                        {this._ifImage_Text(item, 1)}
                                    </View>
                                    <View style={{ width: 0, height: 0, borderBottomWidth: 5, borderTopWidth: 5, borderLeftWidth: 5, borderColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, borderBottomColor: "transparent", borderTopColor: "transparent" }}></View>
                                    {/* <Image source={CHATXMY} style={{ width: cal(5), height: cal(7) }} /> */}
                                </View>
                                <View style={{ backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, width: cal(46), height: cal(46), justifyContent: "center", alignItems: "center", borderRadius: cal(46) }}>
                                    <Image source={this.state.avatarSource2 ? { uri: this.state.avatarSource2 } : MOMVN} style={{ width: cal(46), height: cal(46), borderRadius: cal(46) }} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
            return (
                <TouchableWithoutFeedback
                    onPress={() => {

                        this.setState({
                            addShow: 0
                        })
                    }}
                >
                    <View style={{ alignItems: "flex-end", marginTop: cal(10), }}>
                        {this._Time_Show(item)}
                        <View style={[ChatStyle.otherWrap, { justifyContent: "flex-end" }]}>
                            <View style={[ChatStyle.otherWrap_two, { marginRight: cal(10) }]}>
                                <View style={[ChatStyle.otherWrap_two_sub, { backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }]}>
                                    {this._ifImage_Text(item, 2)}
                                </View>
                                <View style={{ width: 0, height: 0, borderBottomWidth: 5, borderTopWidth: 5, borderLeftWidth: 5, borderColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, borderBottomColor: "transparent", borderTopColor: "transparent" }}></View>
                                {/* <Image source={CHATXMY} style={{ width: cal(5), height: cal(7) }} /> */}
                            </View>
                            <View style={{ paddingRight: cal(13) }}>
                                <View style={{ backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, width: cal(46), height: cal(46), justifyContent: "center", alignItems: "center", borderRadius: cal(46) }}>
                                    <Image source={this.state.avatarSource2 ? { uri: this.state.avatarSource2 } : MOMVN} style={{ width: cal(46), height: cal(46), borderRadius: cal(46) }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    _Time_Show(item) {
        return (
            <View style={[{ width: width, alignItems: "center", marginBottom: cal(5) }]}>
                <Text>{Time.time(parseInt(item.createTime / 1000))}</Text>
            </View>
        )
    }
    _text_emith(item, id) {
        let a = item.text.split(":")
        let pushs = []
        for (let i = 0; i < a.length; i++) {
            if (/^\[[\u4e00-\u9fa5]{1,4}\]$/.test(a[i])) {
                for (let j = 0; j < BorderBtn.length; j++) {
                    if (BorderBtn[j].num <= 24) {
                        if (BorderBtn[j].name == ":" + a[i] + ":") {
                            pushs.push(
                                <Image key={(j + 1) * (Math.random() * 999999999999999999999999999999999)} source={BorderBtn[j].source} style={{ width: cal(22), height: cal(22) }} />
                            )
                        }
                    } else {
                        if (BorderBtn[j].name == ":" + a[i] + ":") {
                            pushs.push(
                                <Image key={(j + 1) * (Math.random() * 999999999999999999999999999999999)} source={BorderBtn[j].source} style={{ width: cal(62), height: cal(62) }} />
                            )
                        }
                    }
                }

            } else {
                pushs.push(
                    <Text key={(i + 1) * (Math.random() * 999999999999999999999999999999999)} style={id == 2 ? { color: "#fff" } : ""}>{a[i]}</Text>
                )
            }
        }
        return pushs
    }
    //判断是文字还是图片
    _ifImage_Text(item, id) {
        if (item.type == "text") {
            if (this.props.guanliyuan) {
                return (
                    <Text><Text style={{ color: PublicColor.Public_MomClickBackground }}>{item.extras.sourceNickname ? item.extras.sourceNickname : "爱特缘小助手"}</Text>：{item.text}</Text>
                )
            }
            return (
                <View style={{ flexDirection: "row", maxWidth: cal(250), flexWrap: "wrap", }}>
                    {this._text_emith(item, id)}
                </View>
            )
        } else if (item.type == "image") {
            console.log( item.thumbPath )
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            showModal: true,
                            modalImg: "file://" + item.thumbPath,
                            messageIDImage: item
                        })
                    }}
                >
                    <View>
                        <Image source={item.thumbPath.slice(0, 1) == "/" ? { uri: "file://" + item.thumbPath } : { uri: item.thumbPath }} style={{ width: cal(50), height: cal(200) }} />
                    </View>
                </TouchableOpacity>
            )
        } else if (item.type == "voice") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this._play(item.path)
                    }}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", width: cal(200) }}>
                        <Text style={{ color: "red" }}>{item.extras.key1}s语音</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }






    //下拉刷新
    onPullRelease(resolve) {
        let that = this;
        JMessage.getHistoryMessages({
            type: 'single', username: that.state.otherUsername,
            appKey: AppKey, from: 0, limit: that.state.page * 3
        },

            (msgArr) => { // 以参数形式返回消息对象数组
                if (msgArr.length != that.state.dataSource.length) {
                    that.setState({
                        // dataSource: msgArr.reverse(),
                        dataSource: msgArr.reverse(),
                        page: ++that.state.page,
                        show: false
                    })
                } else {
                    return false;
                }
                // that.scrollTabs.scrollTo({x: 0, y: cal(150000000000000000000000000000000000000000000000000000000000000000) })
            }, (error) => {
                var code = error.code
                var desc = error.description
            })

        if (resolve) resolve();
    }
    //上啦加载
    _endReached() {

    }

    //发送文本消息
    onSendText() {
        let that = this;
        that.guanxi(that)
        if (that.props.MaleZhaoHu) {
            NativeModules.MyNativeModule.rnCallNative("请等待女生同意哦~");
            return false;
        }
        else if (that.state.shield == "取消屏蔽" && that.state.byshield == "") {
            NativeModules.MyNativeModule.rnCallNative("您已屏蔽了对方");
            return false
        } else if (that.state.byshield == "被屏蔽") {
            dismissKeyboard();
            let msg = {
                "text": that.state.content,
                "type": "text",
                "createTime": Date.parse(new Date()),
                "from": {
                    "username": that.state.myUsername, "appKey": "d97d63f088fb5f3bafd670f5",
                    "nickname": that.state.nickname,
                }
            }
            that.setState({
                // dataSource: msgArr.reverse(),
                dataSource: that.state.dataSource.concat(msg),
                content: "",
                scrollTabTrue: true,
            })
            that.setState({
                yuyinOrSent: true
            })
            return false
        }
        let myId = typeof this.state.myId == "string" ? this.state.myId : JSON.stringify(this.state.myId);
        let otherId = typeof this.state.otherId == "string" ? this.state.otherId : JSON.stringify(this.state.otherId);
        JMessage.sendTextMessage({
            type: 'single', username: that.state.otherUsername, appKey: AppKey,
            text: that.state.content, extras: { sysMsgType: 'side', myId: this.state.sex == "male" ? myId : otherId, otherId: this.state.sex == "male" ? otherId : myId }, messageSendingOptions: JMessage.messageSendingOptions
        },
            (msg) => {
                dismissKeyboard();
                that.setState({
                    // dataSource: msgArr.reverse(),
                    dataSource: that.state.dataSource.concat(msg),
                    content: "",
                    scrollTabTrue: true,
                })
                that.setState({
                    yuyinOrSent: true
                })
                // that.scrollTabs.scrollTo({x: 0, y: 9999999999999999333333333333333339999999999999999999999999999999999999999999999999999999999999999999999960 })
            }, (error) => {
                console.log(error)
                var code = error.code
                var desc = error.description
            })
    }
    //发送文本消息(常用语)
    onSendTextChang(content) {
        let that = this;
        that.guanxi(that)
        if (that.props.MaleZhaoHu) {
            NativeModules.MyNativeModule.rnCallNative("请等待女生同意哦~");
            return false;
        }
        else if (that.state.shield == "取消屏蔽" && that.state.byshield == "") {
            NativeModules.MyNativeModule.rnCallNative("您已屏蔽了对方");
            return false
        } else if (that.state.byshield == "被屏蔽") {
            dismissKeyboard();
            let msg = {
                "text": content,
                "type": "text",
                "createTime": Date.parse(new Date()),
                "from": {
                    "username": that.state.myUsername, "appKey": "d97d63f088fb5f3bafd670f5",
                    "nickname": that.state.nickname,
                }
            }
            that.setState({
                // dataSource: msgArr.reverse(),
                dataSource: that.state.dataSource.concat(msg),
                content: ""
            })
            that.setState({
                yuyinOrSent: true
            })

            return false
        }
        that.setState({
            yuyinOrSent: true
        })
        JMessage.sendTextMessage({
            type: 'single', username: that.state.otherUsername, appKey: AppKey,
            text: content, extras: { sysMsgType: 'side', myId: this.state.sex == "male" ? JSON.stringify(this.state.myId) : this.state.otherId, otherId: this.state.sex == "male" ? this.state.otherId : JSON.stringify(this.state.myId) }, messageSendingOptions: JMessage.messageSendingOptions
        },
            (msg) => {
                dismissKeyboard();
                that.setState({
                    dataSource: that.state.dataSource.concat(msg),
                    content: "",
                    scrollTabTrue: true,
                })
                // that.scrollTabs.scrollTo({x: 0, y: 9999999999999999333333333333333339999999999999999999999999999999999999999999999999999999999999999999999960 })
            }, (error) => {
                var code = error.code
                var desc = error.description
            })

    }

    //相册
    xiangce() {
        let that = this;
        if (that.props.MaleZhaoHu) {
            NativeModules.MyNativeModule.rnCallNative("请等待女生同意哦~");
            return false;
        }
        else if (that.state.shield == "取消屏蔽" && that.state.byshield == "") {
            NativeModules.MyNativeModule.rnCallNative("您已屏蔽了对方");
            return false
        } else if (that.state.byshield == "被屏蔽") {
            dismissKeyboard();
            NativeModules.MyNativeModule.rnCallNative("发送失败");
            return false
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                let msg = {
                    thumbPath: response.uri,
                    "type": "image",
                    "createTime": Date.parse(new Date()),
                    "from": {
                        "username": that.state.myUsername, "appKey": "d97d63f088fb5f3bafd670f5",
                        "nickname": that.state.nickname,
                    }
                }
                that.setState({
                    // dataSource: msgArr.reverse(),
                    dataSource: that.state.dataSource.concat(msg),
                    addShow: 0,
                    scrollTabTrue: true,
                })
                console.log(response);
                JMessage.sendImageMessage({
                    type: 'single', username: this.state.otherUsername, appKey: AppKey,
                    path: response.path, extras: { sysMsgType: 'side', myId: this.state.sex == "male" ? JSON.stringify(this.state.myId) : this.state.otherId, otherId: this.state.sex == "male" ? this.state.otherId : JSON.stringify(this.state.myId) }, messageSendingOptions: JMessage.messageSendingOptions
                },
                    (msg) => {
                        that.state.dataSource.pop();
                        that.setState({
                            // dataSource: msgArr.reverse(),
                            dataSource: that.state.dataSource.concat(msg),
                            addShow: 0,
                            scrollTabTrue: true,
                        })
                        // that.scrollTabs.scrollTo({x: 0, y: 9099999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 })
                    }, (error) => {
                        var code = error.code
                        var desc = error.description
                    })
            }
        });
        // ImagePickerCrop.openPicker({
        //     width: 300,
        //     height: 300,
        //     includeBase64: true,
        //     cropping: true,
        // }).then(image => {

        // });
    }

    //拍照
    paizhao() {
        let that = this;
        if (that.props.MaleZhaoHu) {
            NativeModules.MyNativeModule.rnCallNative("请等待女生同意哦~");
            return false;
        }
        else if (that.state.shield == "取消屏蔽") {
            NativeModules.MyNativeModule.rnCallNative("您已屏蔽了对方");
            return false
        } else if (that.state.shield == "被屏蔽") {
            NativeModules.MyNativeModule.rnCallNative("您对方屏蔽会话");
            return false
        }
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.path };
                let msg = {
                    thumbPath: response.uri,
                    "type": "image",
                    "createTime": Date.parse(new Date()),
                    "from": {
                        "username": that.state.myUsername, "appKey": "d97d63f088fb5f3bafd670f5",
                        "nickname": that.state.nickname,
                    }
                }
                that.setState({
                    // dataSource: msgArr.reverse(),
                    dataSource: that.state.dataSource.concat(msg),
                    addShow: 0,
                    scrollTabTrue: true,
                })
                // You can also display the image using data:
                // let source = {uri: 'data:image/jpeg;base64,' + response.data };
                console.log(response);
                JMessage.sendImageMessage({
                    type: 'single', username: this.state.otherUsername, appKey: AppKey,
                    path: source.uri, extras: { sysMsgType: 'side', myId: this.state.sex == "male" ? JSON.stringify(this.state.myId) : this.state.otherId, otherId: this.state.sex == "male" ? this.state.otherId : JSON.stringify(this.state.myId) }, messageSendingOptions: JMessage.messageSendingOptions
                },
                    (msg) => {
                        that.state.dataSource.pop()
                        that.setState({
                            // dataSource: msgArr.reverse(),
                            dataSource: that.state.dataSource.concat(msg),
                            addShow: 0,
                            scrollTabTrue: true,
                        })
                        // that.scrollTabs.scrollTo({x: 0, y: 9099999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 })
                    }, (error) => {
                        var code = error.code
                        var desc = error.description
                    })

            }
        });
    }



    //语音
    onStartRecordVoice(id) {
        if (id == 1) {
            this.setState({
                yuying: "开始录音"
            })
            this._record();

        } else {
            this.setState({
                yuying: "按住按钮语音"
            })
            let that = this;
            that.timerProessww = setTimeout(function (res) {
                that._stop();
                that.timerProessww && clearTimeout(that.timerProessww)
            }, 100)
        }
    }










    //  录音功能

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }



    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }


    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }
        console.log(new Date())
        if (this.state.stoppedRecording) {
            this.setState({
                pageAudio: ++this.state.pageAudio
            })
            this.prepareRecordingPath(this.state.audioPath + '/' + Date.parse(new Date()) + '.aac');
        }

        this.setState({ recording: true });

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }
    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }
        this.setState({ stoppedRecording: true, recording: false });

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }
    //播放语音
    async _play(audioPath) {
        // if (this.state.recording) {
        //     await this._stop();
        // }
        let that = this;
        setTimeout(() => {
            that.sound = new Sound(audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });
            setTimeout(() => {
                that.sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }
    _finishRecording(didSucceed, filePath) {
        let that = this;
        if (that.props.MaleZhaoHu) {
            NativeModules.MyNativeModule.rnCallNative("请等待女生同意哦~");
            return false;
        }
        else if (that.state.shield == "取消屏蔽" && that.state.byshield == "") {
            NativeModules.MyNativeModule.rnCallNative("您已屏蔽了对方");
            return false
        } else if (that.state.byshield == "被屏蔽") {
            dismissKeyboard();
            NativeModules.MyNativeModule.rnCallNative("发送失败");
            return false
        }
        this.setState({ finished: didSucceed });
        JMessage.sendVoiceMessage({
            type: 'single', username: that.state.otherUsername, appKey: AppKey,
            path: filePath, extras: { key1: JSON.stringify(this.state.currentTime), sysMsgType: 'side', myId: this.state.sex == "male" ? JSON.stringify(this.state.myId) : this.state.otherId, otherId: this.state.sex == "male" ? this.state.otherId : JSON.stringify(this.state.myId) }, messageSendingOptions: JMessage.messageSendingOptions
        },
            (msg) => {
                that.setState({
                    dataSource: that.state.dataSource.concat(msg),
                    scrollTabTrue: true,
                })
                // that.scrollTabs.scrollTo({x: 0, y: 100000000000000000000000000000000000000000000 })

            }, (error) => {
                var code = error.code
                var desc = error.description
            })
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }





    //表情
    _renderEmojiButton() {
        return (
            <TouchableOpacity style={{
                paddingLeft: 5,
                paddingRight: 5,
                alignSelf: "stretch",
                justifyContent: "center"
            }}
                onPress={() => { this.handleEmojiOpen() }}>
                {
                    this.state.addShow == 2 ?
                        // <Icon name="ios-happy-outline" /> */}
                        <Image source={JIANPANKEP} style={{ width: cal(30), height: cal(29.5) }} />
                        : <Image source={XIAOLIAN} style={{ width: cal(30), height: cal(29.5) }} />
                }
            </TouchableOpacity>
        )
    }
    aa(item) {
        return (
            <Image source={item.source} style={{ width: cal(25), height: cal(25) }} />
        )
    }
    handleEmojiClick(item, type) {
        // if (/^\[(pic)\d+\]$/.test(a[i])) {
        if (type == "xuanran") {
            let newValue = (this.state.content || '') + item.name;
            // console.log(newValue)
            this.setState({
                content: newValue
            });
            if (newValue.length != 0) {
                this.setState({
                    yuyinOrSent: false,
                    yuyinOrInput: true
                })
            }
        }
        else if (type == "delay") {
            let newValue = this.state.content.split(":")
            console.log(newValue)
            // this.setState({
            //     content: newValue
            // });
        } else {
            let newValue = item.name;
            this.setState({
                content: newValue
            });
            if (newValue.length != 0) {
                this.setState({
                    yuyinOrSent: false,
                    yuyinOrInput: true
                })
            }
        }
    }
    handleEmojiOpen() {
        dismissKeyboard();
        setTimeout(() => {
            if (this.state.addShow != 2) {
                this.setState({
                    addShow: 2,
                })
            } else {
                this.setState({
                    addShow: 0,
                })
            }
            Animated.timing(          // Uses easing functions
                this.state.actionAnim,    // The value to drive
                { toValue: 1 }           // Configuration
            ).start();
        }, 100);
    }
    _xunBorderBtn(start, end, type) {
        let arr = [];
        for (let i = start; i < end; i++) {
            if (type == "large") {
                arr.push(
                    <TouchableOpacity
                        key={(i + 2) * Math.random() * 99999999999999999999999999999999999999999999999 + ((i + 2) * Math.random() + 10) * 99999999999999999999999999999999999999999999999}
                        onPress={() => {
                            this.handleEmojiClick(BorderBtn[i], "big")
                        }}
                        style={{ marginRight: cal(10), width: cal(62), height: cal(62) }}
                    >
                        <Image source={BorderBtn[i].source} style={{ width: cal(62), height: cal(62) }} />
                    </TouchableOpacity>
                )
            } else {
                arr.push(
                    <TouchableOpacity
                        key={(i + 2) * Math.random() * 99999999999999999999999999999999999999999999999 + ((i + 2) * Math.random() + 10) * 99999999999999999999999999999999999999999999999}
                        onPress={() => {
                            this.handleEmojiClick(BorderBtn[i], "xuanran")
                        }}
                        style={{}}
                    >
                        <Image source={BorderBtn[i].source} style={{ width: cal(28), height: cal(28) }} />
                    </TouchableOpacity>
                )
            }
        }
        return arr
    }
    _renderEmoji() {
        return (
            <Animated.View style={[Styles.emojiRow, {
                opacity: this.state.actionAnim, height: cal(200), transform: [{
                    translateY: this.state.actionAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                    })
                }],
                backgroundColor: "#fff"
            }]}>
                <TouchableWithoutFeedback onPress={() => console.log(1)}>
                    <Swiper
                        loop={false}
                        height={cal(200)}
                        dot={
                            <View style={{ backgroundColor: "#e5e5e5", width: cal(7), height: cal(7), marginLeft: cal(4), marginRight: cal(4), borderRadius: cal(7) }}></View>}
                        activeDot={<View style={{ backgroundColor: "#989898", marginLeft: cal(4), marginRight: cal(4), width: cal(7), height: cal(7), borderRadius: cal(7) }}></View>}
                    // dotStyle={{ bottom: cal(25), backgroundColor: "red" }}
                    // activeDotStyle={{ bottom: (25), backgroundColor: "red" }}
                    >
                        <View style={Styles.slide}>
                            <View style={[Styles.slideRow]}>
                                {this._xunBorderBtn(0, 8, 'small')}
                            </View>
                            <View style={Styles.slideRow}>
                                {this._xunBorderBtn(8, 16, 'small')}
                            </View>
                            <View style={Styles.slideRow}>
                                {this._xunBorderBtn(16, 24, 'small')}
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        this.handleEmojiClick('', "delay")
                                    }}
                                    style={{ width: cal(80), height: cal(40),backgroundColor:"red" }}>
                                    <Text style={{  fontSize: cal(25) }} >删除</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={Styles.slide}>
                            <View style={Styles.slideRow}>
                                {this._xunBorderBtn(24, 29, 'large')}
                            </View>
                            <View style={Styles.slideRow}>
                                {this._xunBorderBtn(29, 34, 'large')}
                            </View>
                            {/* <View style={Styles.slideRow}>
                        {this._xunBorderBtn(50, 59)}
                    </View> */}
                        </View>
                        <View style={Styles.slide}>
                            <View style={Styles.slideRow}>
                                {this._xunBorderBtn(34, 39, 'large')}
                            </View>
                            <View style={Styles.slideRow}>
                                {this._xunBorderBtn(39, 40, 'large')}
                            </View>
                            {/* <View style={Styles.slideRow}>
                                {this._xunBorderBtn(80, 88)}
                            </View> */}
                        </View>
                    </Swiper>
                </TouchableWithoutFeedback>
            </Animated.View>
        )
    }


    _pingbi1() {
        if (this.state.pingbi1) {
            return (
                <View>
                    <TouchableWithoutFeedback
                        onPress={() => this.shield()}
                    >
                        <View style={{ height: cal(55), paddingLeft: cal(10), paddingRight: cal(10) }}>
                            <View style={{ height: cal(55), backgroundColor: "#fff", borderRadius: cal(4), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>{this.state.shield}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ height: cal(0.5), paddingLeft: cal(15), paddingRight: cal(15) }}>
                        <View style={{ height: cal(0.5), backgroundColor: "#d1d1d1" }}>
                        </View>
                    </View>
                </View>
            )
        }
    }


    //更多  举报
    _Modal() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => console.log('onRequestClose...')} >
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <View style={{}}>
                        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: height }}>
                            <View style={{ position: "absolute", bottom: 0, width: width, }}>
                                {this._pingbi1()}
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.setState({
                                            visible: false
                                        })
                                        this.props.navigator.push({
                                            component: this.state.sex == 'male' ? PreDetail : PreDetailmom,
                                            params: {
                                                navigator: this.props.navigator,
                                                type: this.state.sex == 'male' ? "1" : this.state.by == true ? "3" : "2",
                                                id: this.state.otherId,
                                                mobileNr: this.state.otherUsername,
                                                pop: true,
                                            }
                                        })
                                    }}
                                >
                                    <View style={{ height: cal(55), paddingLeft: cal(10), paddingRight: cal(10) }}>
                                        <View style={{ height: cal(55), backgroundColor: "#fff", borderRadius: cal(4), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                            <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>查看资料</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ height: cal(10) }}></View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.setState({
                                            visible: false
                                        })
                                    }}
                                >
                                    <View style={{ height: cal(55), paddingLeft: cal(10), paddingRight: cal(10) }}>
                                        <View style={{ height: cal(55), backgroundColor: "#fff", borderRadius: cal(4), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                            <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>取消</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ height: cal(40) }}></View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    shield() {
        let that = this;
        that.setState({
            visible: false
        })
        let json = {
            "targetUserId": that.state.otherId,
            "block": that.state.shieldId
        }
        if (that.state.shieldId == "1") {
            that.setState({
                shield: "取消屏蔽",
                shieldId: "0"
            })
        } else {
            that.setState({
                shield: "屏蔽此人",
                shieldId: "1"
            })
        }
        _ajax.post_token("match/block", json, function (res) {
            console.log(that.state.shieldId)
            if (that.state.shieldId == "1") {
                NativeModules.MyNativeModule.rnCallNative("取消屏蔽~");
            } else {
                NativeModules.MyNativeModule.rnCallNative("屏蔽成功~");
                that.setState({
                    shield: "取消屏蔽"
                })
            }
            // _ajax.get_token('match/relation?others=' + that.state.otherId, that.props.navigator, function (res) {
            //     console.log(res.relations)
            //     if (res.relations.by[0][2] == 1) {
            //         that.setState({
            //             byshield: "被屏蔽"
            //         })
            //     }
            //     else if (res.relations.to[0][2] == 1) {
            //         console.log(1)
            //         NativeModules.MyNativeModule.rnCallNative("屏蔽成功~");
            //         that.setState({
            //             shield: "取消屏蔽"
            //         })
            //     }
            //     else if (res.relations.to[0][2] == 0) {
            //         NativeModules.MyNativeModule.rnCallNative("取消屏蔽~");
            //     }
            // })
        })
    }
}
let Chat = StyleSheet.create({

})
