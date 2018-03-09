
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Modal,
    ListView,
    Image,
    AsyncStorage,
    NativeModules,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
const { height, width } = Dimensions.get('window');
import Picker from 'react-native-picker';
import area from './../json/area.json';
import JMessage from 'jmessage-react-plugin';
import Header from './../Common/Header.js';
import Time from './../Common/Time.js';
import { cal } from './../Common/Cal.js';
// import One from "./../page/one.js";
import JPushModule from 'jpush-react-native';
import Chat from './../chat/chat2.js';
import Swipeout from 'react-native-swipeout';
const NOSIDE = require('./../image/side/noSide.png')
const GUANLIYUAN = require('./../image/aguanliyuan.png')
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
import AppKey from './../Common/appKey.js';
import loadding from '../Common/Loadding';
const _this = {}

export default class PickerTest extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            aaconArr: [],
            appKey: 'd97d63f088fb5f3bafd670f5',
            closes: false,
            sex: "",
            username: "",
            page: 1,
            open: false,
            type: 0,
            UserList: {}
        }
        this.lock = false;
        let that = this
        JPushModule.addReceiveOpenNotificationListener((map) => {
        });
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result) != null) {
                if (!that.lock) {
                    that.setState({
                        sex: JSON.parse(result).user_sex,
                    })
                }
            }
        })
        JMessage.getMyInfo((UserInf) => {
            if (typeof (UserInf.username) == "undefine") {
            } else {
                if (!that.lock) {
                    that.setState({
                        username: UserInf.username
                    })
                }
            }
        })
        this.listenerlixian = (result) => {
            console.log(result)
        }
        JMessage.addSyncOfflineMessageListener(this.listenerlixian) // 添加监听
        this.listener = (message) => {
            this.GetConversations()
        }
        JMessage.addReceiveMessageListener(this.listener) // 添加监听   消息监听
    }
    componentDidMount() {
        this.GetConversations();
    }
    componentWillUnmount() {
        if (!this.lock) {
            this.timeImage && clearTimeout(this.timeImage)
            if (this.listener != null || this.listenerlixian != null) {
                JMessage.removeSyncOfflineMessageListener(this.listenerlixian) // 移除监听(一般在 componentWillUnmount 中调用)
                JMessage.removeReceiveMessageListener(this.listener) // 移除监听(一般在 componentWillUnmount 中调用)
            }
            this.setState({
                page: 1
            })

        }
    }
    componentWillReceiveProps(nextProps) {
        _this = this;
        let that = this;
        AsyncStorage.getItem('oldJMessage', (err, result) => {
            if (JSON.parse(result) != null) {
            } else {
                this.timeImage = setTimeout(function () {
                    that.GetConversations();
                }, 4000)
                AsyncStorage.setItem('oldJMessage', JSON.stringify("dasdasdasda"), () => { });
            }
        })
        if (this.state.page % 1 == 0) {
            if (!that.lock) {
                JMessage.getConversations((conArr) => { // conArr: 会话数组。
                    // that.props.sides(1);
                    console.log(conArr)
                    if( conArr.length == this.state.aaconArr.length ){
                    }else{
                        if (!that.lock) {
                            that.setState({
                                aaconArr: conArr
                            })
                        }
                    }
                    return false
                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })
            }
        }
        this.setState({
            page: ++this.state.page
        })
    }
    avatarThumbPath(key, avatarThumbPath) {
        console.log(avatarThumbPath)
        _this.state.aaconArr[key].target.avatarThumbPath =  avatarThumbPath;
        _this.setState({
            aaconArr: _this.state.aaconArr
        })
    }
    chongxin(item, key) {
        JMessage.resetUnreadMessageCount({ type: 'single', username: key, appKey: _this.state.appKey },
            (conversation) => {
                console.log(_this.state.aaconArr)
                _this.state.aaconArr[item].unreadCount = 0;
                // _this.state.aaconArr[item].target.avatarThumbPath = 
                _this.setState({
                    aaconArr: _this.state.aaconArr
                })
                _this.props.show(_this.state.aaconArr)
                _this.forceUpdate()
            }, (error) => {
                var code = error.code
                var desc = error.description
            }
        )

    }
    componentDidUpdate() {
        _this = this;
        let that = this;
    }
    _chongzhi(conArr) {
        if (!_this.lock) {
            _this.setState({
                open: true,
                type: 1
            })
        }
    }

    GetConversations() {
        let that = this;
        JMessage.getConversations((conArr) => { // conArr: 会话数组。
            that.props.show(conArr)
            console.log(conArr)
            if (!that.lock) {
                that.setState({
                    aaconArr: conArr
                })
            }
        }, (error) => {
            var code = error.code
            var desc = error.description
        })
    }
    _UnreadCount(item) {
        if (item.unreadCount != 0) {
            return (
                <View style={{ position: "absolute", zIndex: 999999999, right: cal(3), bottom: 0, backgroundColor: "#ec3737", borderRadius: cal(19), justifyContent: "center", alignItems: "center", width: cal(19), height: cal(19) }}>
                    <Text style={{ color: "#fff", fontSize: cal(9) }}>{item.unreadCount > 99 ? "99+" : item.unreadCount}</Text>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    aaaaaa(itrm) {
        let that = this;
        JMessage.deleteConversation({ type: 'single', username: itrm.target.username, appKey: that.state.appKey },
            (conversation) => {
                that.GetConversations()
            }, (error) => {
                var code = error.code
                var desc = error.description
            })
    }
    _conArr(item, id, key) {
        if (item.type != undefined) {
            return (
                <View>
                    <Text>{item.fromUsername}</Text>
                </View>
            )
        } else {
            if (item.latestMessage != undefined) {
                if (item.latestMessage.extras.sysMsgType == "link" && this.state.sex != "male") {
                    return (
                        <View>
                        </View>
                    )
                } else {
                    return (
                        <View>
                            <Swipeout
                                right={[
                                    {
                                        backgroundColor: 'red',
                                        color: 'white',
                                        underlayColor: "#fff",
                                        text: '删除',
                                        onPress: () => { this.aaaaaa(item) }
                                    },
                                ]}
                                autoClose={true}
                                close={this.state.closes}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        let that = this;
                                        if (this.state.sex == "male") {
                                            if (item.latestMessage.extras.sysMsgType == "1" || item.latestMessage.extras.sysMsgType == "2") {
                                                // JMessage.enterConversation({ type: 'single', username: item.target.username, appKey: AppKey },
                                                //     (conversation) => {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        username: '爱特缘',
                                                        appKey: that.state.appKey,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        key: key,
                                                        sex: this.state.sex,
                                                        guanliyuan: true,
                                                        otherId: item.latestMessage.extras.otherId,
                                                    }
                                                })
                                                // }, (error) => {
                                                //     var code = error.code
                                                //     var desc = error.description
                                                // })
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "zhaohu") {
                                                // NativeModules.MyNativeModule.rnCallNative("请等待女生回复...");
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        username: item.target.nickname,
                                                        key: key,
                                                        appKey: that.state.appKey,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        guanliyuan: false,
                                                        MaleZhaoHu: true,
                                                        sex: this.state.sex,
                                                        otherId: item.latestMessage.extras.otherId,
                                                    }
                                                })
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "tongyi") {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        username: item.target.nickname,
                                                        key: key,
                                                        sex: this.state.sex,
                                                        appKey: that.state.appKey,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        guanliyuan: false,
                                                        otherId: item.latestMessage.extras.otherId,
                                                    }
                                                })
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "link") {
                                                NativeModules.MyNativeModule.rnCallNative("该女生喜欢你哦，到喜欢页面也喜欢她吧...");
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "side") {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        username: item.target.nickname,
                                                        key: key,
                                                        sex: this.state.sex,
                                                        appKey: that.state.appKey,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        guanliyuan: false,
                                                        otherId: item.latestMessage.extras.otherId,
                                                        // myId:item.latestMessage.extras.myId
                                                    }
                                                })
                                            }
                                        }
                                        //女生

                                        else {
                                            if (item.latestMessage.extras.sysMsgType == "zhaohu") {
                                                // JMessage.enterConversation({ type: 'single', username: item.target.username, appKey: AppKey },
                                                //     (conversation) => {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        username: item.target.nickname,
                                                        key: key,
                                                        sex: this.state.sex,
                                                        appKey: that.state.appKey,
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        chong: this.chongxin.bind(that, key),
                                                        guanliyuan: false,
                                                        // zhaohuTongyi: true,
                                                        otherId: item.latestMessage.extras.myId,
                                                        // myId:item.latestMessage.extras.myId
                                                    }
                                                })
                                                // }, (error) => {
                                                //     var code = error.code
                                                //     var desc = error.description
                                                // })
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "link") {
                                                NativeModules.MyNativeModule.rnCallNative("请等待男士回复...");
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "1" || item.latestMessage.extras.sysMsgType == "2") {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        key: key,
                                                        username: '爱特缘',
                                                        sex: this.state.sex,
                                                        appKey: that.state.appKey,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        guanliyuan: true,
                                                        otherId: item.latestMessage.extras.myId,
                                                    }
                                                })
                                            }
                                            else if (item.latestMessage.extras.sysMsgType == "tongyi") {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        username: item.target.nickname,
                                                        key: key,
                                                        appKey: that.state.appKey,
                                                        sex: this.state.sex,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        guanliyuan: false,
                                                        otherId: item.latestMessage.extras.myId,
                                                        // myId:item.latestMessage.extras.myId
                                                    }
                                                })
                                            }
                                            else {
                                                // JMessage.enterConversation({ type: 'single', username: item.target.username, appKey: AppKey },
                                                //     (conversation) => {
                                                that.props.navigator.push({
                                                    component: Chat,
                                                    params: {
                                                        navigator: that.props.navigator,
                                                        mobileNr: item.target.username,
                                                        key: key,
                                                        username: item.target.nickname,
                                                        sex: this.state.sex,
                                                        appKey: that.state.appKey,
                                                        chong: this.chongxin.bind(that, key),
                                                        avatarThumbPath: this.avatarThumbPath.bind(that, key),
                                                        avatarThumbPathSide:true,
                                                        guanliyuan: false,
                                                        otherId: item.latestMessage.extras.myId,
                                                        // myId:item.latestMessage.extras.myId
                                                    }
                                                })
                                                // }, (error) => {
                                                //     var code = error.code
                                                //     var desc = error.description
                                                // })
                                            }
                                        }
                                    }}
                                >
                                    <View style={{ backgroundColor: "#fff", borderRadius: cal(2), paddingLeft: cal(5), height: cal(75), justifyContent: 'center' }}>
                                        <View style={{ height: cal(75), flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row", height: cal(75), alignItems: "center" }}>
                                                <View style={{ position: "relative", height: cal(75), justifyContent: "center" }}>
                                                    <View style={{ backgroundColor: item.latestMessage.extras.sysMsgType == "1" || item.latestMessage.extras.sysMsgType == "2" ? "#fff" : this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, width: cal(50), height: cal(50), justifyContent: "center", alignItems: "center", borderRadius: cal(50) }}>
                                                        <Image source={item.latestMessage.extras.sysMsgType == "1" || item.latestMessage.extras.sysMsgType == "2" ? GUANLIYUAN : { uri: "file:///" + item.target.avatarThumbPath }} style={{ width: cal(50), height: cal(50), borderRadius: cal(50) }} />
                                                    </View>
                                                    {/* //显示消息数 */}
                                                </View>
                                                <View style={{ marginLeft: cal(12) }}>
                                                    <Text style={{ color: PublicColor.Public_Text3, fontSize: PublicFontSize.PublicFontSize_28 }}>{item.target.nickname != "" ? item.target.nickname : item.target.nickname}</Text>
                                                    <Text numberOfLines={1} style={{ maxWidth: cal(220), fontSize: PublicFontSize.PublicFontSize_24, color: PublicColor.Public_Text1, marginTop: cal(7) }}>{item.latestMessage != undefined ? (item.latestMessage.type == "text" ? item.latestMessage.text : (item.latestMessage.type == "image" ? "图片" : "语音")) : ""}</Text>
                                                </View>
                                            </View>
                                            <View style={{ position: "absolute", right: cal(10), top: cal(15), height: cal(44) }}>
                                                <Text style={{ color: PublicColor.Public_Text1, fontSize: PublicFontSize.PublicFontSize_20, }}>{Time.time(parseInt(item.latestMessage.createTime / 1000))}</Text>
                                                {this._UnreadCount(item)}
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Swipeout>
                            <View style={{ height: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                        </View>
                    )
                }
            } else {
                return (
                    <View>
                    </View>
                )
            }
        }
    }
    render() {
        if (this.state.aaconArr.length != 0) {
            let conArr = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.aaconArr);
            return (
                <View style={{ position: "relative", height: height, backgroundColor: PublicColor.Public_ViewBackground }}>
                    <Header type={"side"} title={"消息"} navigator={this.props.navigator} username={this.state.username} appKey={this.state.appKey} _conArr={this.state.aaconArr} chongzhi={this._chongzhi.bind(this)} />
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ backgroundColor: PublicColor.Public_ViewBackground }}>
                            <ListView
                                contentContainerStyle={{ backgroundColor: PublicColor.Public_ViewBackground, paddingTop: cal(10), paddingRight: cal(10), paddingLeft: cal(10) }}
                                dataSource={conArr}
                                renderRow={this._conArr.bind(this)}
                                enableEmptySections={true}
                                initialListSize={100}
                                removeClippedSubviews={false}
                            />

                            <Modal
                                visible={this.state.open}
                                transparent={true}
                                animationType='fade'
                                onRequestClose={() => { alert("Modal has been closed.") }}
                                modalDidOpen={() => console.log('modal did open')}
                                modalDidClose={() => this.setState({ open: false })}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center", height: height, backgroundColor: "rgba(0,0,0,0.4)" }}>
                                    <View style={{ width: cal(240), height: cal(125), backgroundColor: "#fff", borderRadius: cal(2) }}>
                                        <View style={{ marginTop: cal(15), alignItems: "center" }}>
                                            <Text style={{ fontSize: cal(15), color: "#2e2e2e" }}>忽略未读</Text>
                                        </View>

                                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: cal(8) }}>
                                            <Text style={{ fontSize: cal(12), color: "#5f5f5f" }}>未读数量气泡会消失，但消息不会丢失</Text>
                                        </View>
                                        <View style={{ width: cal(240), height: cal(0.5), backgroundColor: "#b1b1b1", marginTop: cal(20) }}>

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
                                                    <Text >取消</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ flex: 1 }}
                                                onPress={() => {
                                                    this.state.aaconArr.map((item, key) => {
                                                        JMessage.resetUnreadMessageCount({ type: 'single', username: item.target.username, appKey: this.state.appKey },
                                                            (conversation) => {

                                                            }, (error) => {
                                                                var code = error.code
                                                                var desc = error.description
                                                            }
                                                        )
                                                    })
                                                    this.GetConversations();
                                                    this.setState({
                                                        open: false
                                                    })
                                                }}
                                            >
                                                <View style={{ alignItems: "center" }}>
                                                    <Text style={{ color: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>确定</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ height: cal(77), width: width }}>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={{ height: height, width: width, position: "relative" }}>
                    <Header type={"side"} title={"消息"} navigator={this.props.navigator} username={this.state.username} appKey={this.state.appKey} _conArr={this.state.aaconArr} chongzhi={this._chongzhi.bind(this)} />
                    <View style={{ height: height - cal(180), width: width, justifyContent: "center", alignItems: 'center' }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image source={NOSIDE} style={{ width: cal(100), height: cal(100) }} />
                            <Text style={{ color: PublicColor.Public_Text1, fontSize: PublicFontSize.PublicFontSize_26, textAlign: "center", marginTop: cal(20) }}>还没有任何消息</Text>
                            <Text style={{ color: PublicColor.Public_Text1, fontSize: PublicFontSize.PublicFontSize_26, marginTop: cal(2) }}>快去和你喜欢的人打招呼吧! </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
};
