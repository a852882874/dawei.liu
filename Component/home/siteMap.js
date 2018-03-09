
//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, Dimensions, AsyncStorage,NativeModules, InteractionManager, ListView, Image, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
const { width, height } = Dimensions.get("window")
import One from "./../page/one.js";
import PreDetail from "./../subPage/preDetail.js";
import Header from './../Common/Header.js';
import Chat from './../chat/chat2.js';
import { cal } from './../Common/Cal.js';
import JMessage from 'jmessage-react-plugin';
import Education from './../Common/education.js';
import { age } from './../Common/age.js';
const TOUMING = require('./../image/me/toum.png');
const MOREN = require('./../image/chat/chatMo.png')
const MEIGANJUE = require('./../image/sitemap/meiganjue.png')
const BUXIHUAN = require('./../image/sitemap/buxihuan.png')
const XIHUAN = require('./../image/sitemap/xihuan.png')
import _ajax from '../Common/LoginAjax';
import { personalData } from '../Common/personalData.js';
const XIAOXI = require('./../image/sitemap/xiaoxi.png')
const { PublicColor } = require("./../Common/Color.js")
const NOSITEMAP = require('./../image/side/noSitemap.png');
import Time from './../Common/Time.js';
import tokenImage from './../Common/token.js';
import AppKey from './../Common/appKey.js';
const _this = {}
export default class entry extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            username: "17512549332",
            appKey: "",
            myId: "",
            info: [],
            a: true,
            user: [],
            user2: [],
            tabChoose: true,
            page: 1,
            UserList: {}
        }
        this.listener = (message) => {
            let that = this;
            that.mutuallike_list(that)
                .then(
                function (data) {
                    console.log(data)
                    return that.likemeonly_list(that)
                }
                ).then(
                function (data) {
                    console.log(data)
                    AsyncStorage.getItem('UserList', (err, result) => {
                        if (JSON.parse(result) != null) {
                            console.log(JSON.parse(result).UserList)
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                                UserList: JSON.parse(result).UserList
                            })
                        } else {
                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                that.setState({
                                    myId: res.user.id,
                                    UserList: res.user
                                })
                            })
                        }
                    });
                }
                )
        }
        // console.log(personalData('170'))
        JMessage.addReceiveMessageListener(this.listener) // 添加监听   消息监听
        let that = this;
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.page % 5 == 0) {
            let that = this;
            that.mutuallike_list(that)
                .then(
                function (data) {
                    console.log(data)
                    return that.likemeonly_list(that)
                }
                ).then(
                function (data) {
                    console.log(data)
                    AsyncStorage.getItem('UserList', (err, result) => {
                        if (JSON.parse(result) != null) {
                            console.log(JSON.parse(result).UserList)
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                                UserList : JSON.parse(result).UserList
                            })
                        } else {
                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                that.setState({
                                    myId: res.user.id,
                                    UserList : res.user
                                })
                            })
                        }
                    });
                }
                )
        }
        this.setState({
            page: ++this.state.page
        })
    }
    componentWillUnmount() {
        if (this.listener) {
            JMessage.removeReceiveMessageListener(this.listener) // 移除监听(一般在 componentWillUnmount 中调用)
        }
    }
    componentDidMount() {
        let that = this;
        that.mutuallike_list(that)
            .then(
            function (data) {
                console.log(data)
                return that.likemeonly_list(that)
            }
            )
            .then(
            function (data) {
                console.log(data)
                AsyncStorage.getItem('UserList', (err, result) => {
                    if (JSON.parse(result) != null) {
                        console.log(JSON.parse(result).UserList)
                        that.setState({
                            myId: JSON.parse(result).UserList.id,
                            UserList: JSON.parse(result).UserList
                        })
                    } else {
                        _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                            that.setState({
                                myId: res.user.id,
                                UserList: res.user
                            })
                        })
                    }
                });
            }
            )
    }
    likemeonly_list(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/likemeonly_list", that.props.navigator, function (res) {
                res.userList.map((item) => {
                    item.updataImage = "";
                    if (item.portraitImageUuid == null) {
                        item.uri == null
                    } else {
                        tokenImage.tokenImg(item.portraitImageUuid, function (image) {
                            item.uri = image
                        })
                    }
                })
                that.setState({
                    user2: res.userList.reverse()
                })
                resolve(" ok2")
            })

        })
        return p;
    }
    mutuallike_list(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/mutuallike_list", that.props.navigator, function (res) {
                res.userList.map((item) => {
                    item.updataImage = "";
                    if (item.portraitImageUuid == null) {
                        item.uri == null
                    } else {
                        tokenImage.tokenImg(item.portraitImageUuid, function (image) {
                            item.uri = image
                        })
                    }
                })
                that.setState({
                    user: res.userList.reverse()
                })
                resolve(" ok1")
            })

        })
        return p;
    }
    _updataImage(type) {
        if (type == "1") {
            this.mutuallike_list(this);
        } else if (type == "2") {
            this.likemeonly_list(this);
        }
    }
    _updataUsername(type) {
        if (type == "1") {
            this.mutuallike_list(this)
        } else if (type == "2") {
            this.likemeonly_list(this)
        }
    }
    _xihuanShuaixin() {
        let that = this;
        that.mutuallike_list(that)
            .then(
            function (data) {
                console.log(data)
                return that.likemeonly_list(that)
            }
            )
    }
    _Commend(item){
        if(item.uri == null){
            return(
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
    _conArr(item, a, key) {
        console.log(item.uri)
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.navigator.push({
                        component: PreDetail,
                        params: {
                            type: this.state.tabChoose ? "1" : "2",
                            id: item.id,
                            username: item.nickname,
                            uri: item.uri,
                            huidiao: true,
                            item:item,
                            mobileNr: item.mobileNr,
                            updataUsername: this._updataUsername.bind(this),
                            updataImage: this._updataImage.bind(this),
                            xihuanShuaixin: this._xihuanShuaixin.bind(this),
                            navigator: this.props.navigator
                        }
                    })
                }}
            >
                <View style={{ backgroundColor: "#fff", marginBottom: cal(10), borderRadius: cal(2) }}>
                    <View style={{
                        height: cal(80), justifyContent: "center",
                        //  borderBottomColor: "#d1d1d1", borderBottomWidth: cal(0.5)
                        paddingTop: cal(15)
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: cal(10), }}>
                                <View style={{ width: cal(77.5), height: cal(77.5), justifyContent: "center", alignItems: "center", borderRadius: cal(77.5), backgroundColor: PublicColor.Public_ClickBackground }}>
                                    <Image source={item.uri != null  ? { uri: item.uri } : MOREN} style={{ width: cal(77), height: cal(77), borderRadius: cal(77) }} />
                                    {this._Commend(item)}
                                </View>
                                <View style={{ marginLeft: cal(10) }}>
                                    <Text style={{ fontSize: cal(14), color: PublicColor.Public_Text3, fontSize: cal(14) }}>{item.nickname}</Text>
                                    <View style={{ marginTop: cal(4), marginBottom: cal(4), flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: cal(12), color: PublicColor.Public_Text1, }}>{age(item.birthday ? item.birthday : "1666-1-1")}</Text>
                                        <View style={{ width: cal(2), height: cal(10), backgroundColor: PublicColor.Public_ClickBackground, marginLeft: cal(4), marginRight: cal(4) }}></View>
                                        <Text style={{ fontSize: cal(12), color: PublicColor.Public_Text1 }}>{item.addrCity}</Text>
                                        <View style={{ width: cal(2), height: cal(10), backgroundColor: PublicColor.Public_ClickBackground, marginLeft: cal(4), marginRight: cal(4) }}></View>
                                        <Text style={{ fontSize: cal(12), color: PublicColor.Public_Text1 }}>{item.height}cm</Text>
                                    </View>
                                    <Text style={{ maxWidth: cal(180), fontSize: cal(14), color: PublicColor.Public_Text1 }}>{item.selfDesc}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: cal(11), color: PublicColor.Public_Text1, right: cal(14), top: cal(5),position:"absolute" }}>{Time.time(parseInt(Date.parse(new Date(item.userAdoreDate)) / 1000))}</Text>
                        </View>
                    </View>
                    {this._noChoos(item)}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    chongxin() { }
    _noChoos(item) {
        if (this.state.tabChoose) {
            return (
                <View style={{ flexDirection: "row", paddingBottom: cal(10), paddingTop: cal(10), justifyContent: "flex-end" }}>
                    {/* <View style={{flex:1,justifyContent:"center",flexDirection:"row"}}>
                        <TouchableOpacity
                            style={{ alignItems: "center", width: cal(180), borderRadius: cal(4), flexDirection: "row", justifyContent: "center" }}
                        >
                            <View style={{ alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center" }}>
                                <Image source={MEIGANJUE} style={{ width: cal(30), height: cal(30), borderRadius: cal(32) }} />
                                <Text style={{ marginLeft: cal(5), color: PublicColor.Public_Text3, fontSize: cal(13) }}>没感觉</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: cal(0.5), height: cal(55), backgroundColor: "#d1d1d1" }}></View>
                    </View> */}
                    <TouchableOpacity
                        style={{ alignItems: "center", flexDirection: "row", paddingRight: cal(14), justifyContent: "center" }}
                        onPress={() => {
                            let that = this;
                            // if(that.state.UserList.portraitConfirmed == 5){
                            //     NativeModules.MyNativeModule.rnCallNative("你的头像审核不通过~请重新上传头像");
                            //     return false
                            // }
                            that.props.navigator.push({
                                component: Chat,
                                params: {
                                    navigator: that.props.navigator,
                                    username: item.nickname,
                                    mobileNr: item.mobileNr,
                                    appKey: AppKey,
                                    chong: this.chongxin.bind(that),
                                    guanliyuan: false,
                                    otherId: item.id,
                                    sex:"male",
                                }
                            })

                        }}
                    >
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                            <Image source={XIAOXI} style={{ width: cal(18), height: cal(18) }} />
                            <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(11), marginLeft: cal(5) }}>发消息</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: "row", paddingBottom: cal(10), paddingTop: cal(10), justifyContent: "flex-end", paddingRight: cal(14) }}>
                    <TouchableOpacity
                        style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                        onPress={() => {
                            let that = this;
                            // if(that.state.UserList.portraitConfirmed == 5){
                            //     NativeModules.MyNativeModule.rnCallNative("你的头像审核不通过~请重新上传头像");
                            //     return false
                            // }
                            // NativeModules.MyNativeModule.rnCallNative("发送招呼");
                            let json = {
                                "myId": that.state.myId,
                                "targetUserId": item.id
                            }
                            _ajax.post_token("match/like", json, function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    console.log(item.mobileNr)
                                    JMessage.sendTextMessage({
                                        type: 'single', username: item.mobileNr, appKey: AppKey,
                                        text: "我同意了~开始聊天吧", extras: { sysMsgType: "tongyi", myId: typeof that.state.myId == "string" ? that.state.myId : JSON.stringify(that.state.myId), otherId: typeof item.id == "string" ? item.id : JSON.stringify(item.id) }, messageSendingOptions: JMessage.messageSendingOptions
                                    },
                                        (msg) => {
                                            that.mutuallike_list(that)
                                                .then(
                                                function (data) {
                                                    console.log(data)
                                                    return that.likemeonly_list(that)
                                                }
                                                ).then(
                                                function (data) {
                                                    console.log(data)
                                                    AsyncStorage.getItem('UserList', (err, result) => {
                                                        if (JSON.parse(result) != null) {
                                                            console.log(JSON.parse(result).UserList)
                                                            that.setState({
                                                                myId: JSON.parse(result).UserList.id,
                                                                UserList: JSON.parse(result).UserList
                                                            })
                                                        } else {
                                                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                                                that.setState({
                                                                    myId: res.user.id,
                                                                    UserList: res.user
                                                                })
                                                            })
                                                        }
                                                    });
                                                }
                                                )
                                        }, (error) => {
                                            console.log(error)
                                            var code = error.code
                                            var desc = error.description
                                        })
                                } else {

                                }
                            })
                        }}
                    >
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                            <Image source={XIHUAN} style={{ width: cal(21), height: cal(21) }} />
                            <Text style={{ marginLeft: cal(5), color: PublicColor.Public_Text1, fontSize: cal(11) }}>喜欢</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={{ width: cal(0.5), height: cal(50), backgroundColor: "#d1d1d1" }}></View>
                    <TouchableOpacity
                        style={{ alignItems: "center", width: cal(180), flexDirection: "row", justifyContent: "center" }}
                        onPress={() => {
                            alert("不喜欢")
                        }}
                    >
                        <View style={{ alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center" }}>
                            <Image source={BUXIHUAN} style={{ width: cal(30), height: cal(30) }} />
                            <Text style={{ marginLeft: cal(5), color: PublicColor.Public_Text3, fontSize: cal(13) }}>不喜欢</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            )
        }
    }
    _one() {
        if (this.state.tabChoose) {
            if (this.state.user.length == 0) {
                return (
                    <View style={{}}>
                        <View style={{ height: height - cal(180), width: width, justifyContent: "center", alignItems: 'center' }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image source={NOSITEMAP} style={{ width: cal(126), height: cal(107) }} />
                                <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(13), textAlign: "center", marginTop: cal(20) }}>暂时还没有相互心仪的哦！</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            let conArr = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.user);
            return (
                <View>
                    <ListView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: PublicColor.Public_ViewBackground, paddingTop: cal(10), paddingRight: cal(15), paddingBottom: cal(170), paddingLeft: cal(15) }}
                        dataSource={conArr}
                        renderRow={this._conArr.bind(this)}
                        enableEmptySections={true}
                        // removeClippedSubviews={false}
                        initialListSize={100}
                        pageSize={100}
                    />
                </View>
            )
        } else {
            if (this.state.user2.length == 0) {
                return (
                    <View style={{}}>
                        <View style={{ height: height - cal(180), width: width, justifyContent: "center", alignItems: 'center' }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image source={NOSITEMAP} style={{ width: cal(126), height: cal(107) }} />
                                <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(13), textAlign: "center", marginTop: cal(20) }}>暂时还没有喜欢你的人哦！</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            let conArr = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.user2);
            return (
                <View>
                    <ListView
                        contentContainerStyle={{ backgroundColor: PublicColor.Public_ViewBackground, paddingTop: cal(10), paddingRight: cal(15), paddingBottom: cal(170), paddingLeft: cal(15) }}
                        dataSource={conArr}
                        renderRow={this._conArr.bind(this)}
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                        initialListSize={100}
                        pageSize={100}
                    />
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{ height: height, backgroundColor: PublicColor.Public_ViewBackground }}>
                <View style={{ backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", height: cal(44), paddingTop: cal(10) }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!this.state.tabChoose) {
                                this.setState({
                                    tabChoose: true
                                })
                            }
                        }}
                    >

                        <View style={{ width: cal(60), alignItems: "center", marginRight: cal(50) }}>
                            <Text style={this.state.tabChoose ? SiteMap.tabQieText1 : SiteMap.tabQieText2}>相互喜欢</Text>
                            <View style={this.state.tabChoose ? SiteMap.tabQie1 : SiteMap.tabQie2}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.tabChoose) {
                                this.setState({
                                    tabChoose: false
                                })
                            }
                        }}
                    >
                        <View style={{ width: cal(60), alignItems: "center", }}>
                            <Text style={this.state.tabChoose ? SiteMap.tabQieText2 : SiteMap.tabQieText1}>喜欢我的</Text>
                            <View style={this.state.tabChoose ? SiteMap.tabQie2 : SiteMap.tabQie1}></View>
                        </View>
                    </TouchableOpacity>
                </View>
                {this._one()}
            </View>
        )
    }
}
let SiteMap = StyleSheet.create({
    tabQie1: {
        width: cal(25),
        height: cal(2),
        backgroundColor: PublicColor.Public_ClickBackground,
        marginTop: cal(10)
    },
    tabQie2: {
        width: cal(25),
        height: cal(2),
        backgroundColor: "#fff",
        marginTop: cal(10)
    },
    tabQieText2: {
        color: PublicColor.Public_Text5,
        fontSize: cal(14)
    },
    tabQieText1: {
        color: PublicColor.Public_ClickBackground,
        fontSize: cal(14)
    }
})