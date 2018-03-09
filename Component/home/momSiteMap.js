
//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, InteractionManager, DeviceEventEmitter, AsyncStorage,
    Dimensions, ListView, Image, Alert, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'
const { width, height } = Dimensions.get("window")
import One from "./../page/one.js";
import PreDetail from "./../subPage/preDetailMom.js";
import Header from './../Common/Header.js';
import Chat from './../chat/chat2.js';
import tokenImage from './../Common/token.js';
import { CachedImage } from "react-native-img-cache";
const TOUMING = require('./../image/me/toum.png');
import { cal } from './../Common/Cal.js';
import Education from './../Common/education.js';
import { age } from './../Common/age.js';
import JMessage from 'jmessage-react-plugin';
import AppKey from './../Common/appKey.js';
const MOREN = require('./../image/chat/chatMo.png')
const BUXIHUAN = require('./../image/sitemap/buxihuan.png')
const XIHUAN = require('./../image/sitemap/xihuan.png')
import LinearGradient from 'react-native-linear-gradient';
import _ajax from '../Common/LoginAjax';
const MEIGANJUE = require('./../image/mom/meiganjue.png')
const BACKGROUNDMOM = require('./../image/public/backgroundMom.png');
const XIAOXI = require('./../image/mom/xiaoxi.png')
const { PublicColor } = require("./../Common/Color.js")
const NOSITEMAP = require('./../image/side/noSitemap.png')
import Time from './../Common/Time.js';
const _this = {}
export default class entry extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            username: "17512549332",
            a: true,
            user: [],
            user2: [],
            tabChoose: true,
            page: 1,
            myId: "",
            UserList: {},
            aaaa: 1
        }

        this.listener = (message) => {
            if (this.state.a) {
                let that = this;
                that.mutuallike_list(that)
                    .then(
                    function (data) {
                        console.log(data)
                        return that.ilikeonly_list(that)
                    }
                    ).then(function (res) {
                        that.setState({
                            a: !that.state.a
                        })
                    }).then(
                    function (data) {
                        AsyncStorage.getItem('UserList', (err, result) => {
                            console.log(result)
                            if (JSON.parse(result) != null) {
                                console.log(JSON.parse(result).UserList)
                                that.setState({
                                    myId: JSON.parse(result).UserList.id,
                                    UserList: JSON.parse(result).UserList
                                })
                            } else {
                                _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                    console.log(res)
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
        }

        JMessage.addReceiveMessageListener(this.listener) // 添加监听   消息监听
        let that = this;
        this.listenerWWWWWWW = DeviceEventEmitter.addListener('userNameDidChange', (e) => {
            that.mutuallike_list(that)
                .then(
                function (data) {
                    console.log(data)
                    return that.ilikeonly_list(that)
                }
                ).then(
                function (data) {
                    console.log(data)
                    AsyncStorage.getItem('UserList', (err, result) => {
                        console.log(result)
                        if (JSON.parse(result) != null) {
                            console.log(JSON.parse(result).UserList)
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                                UserList: JSON.parse(result).UserList
                            })
                        } else {
                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                console.log(res)
                                that.setState({
                                    myId: res.user.id,
                                    UserList: res.user
                                })
                            })
                        }
                    });
                }
                )
        })
    }
    // componentDidUpdate(){
    //     this.setState({
    //         aaaa:1
    //     })
    // }
    componentWillUnmount() {
        // this.subscription.remove();
        this.listenerWWWWWWW.remove();
        // this.sssssssss && clearTimeout(this.sssssssss);
        if (this.listener) {
            JMessage.removeReceiveMessageListener(this.listener) // 移除监听(一般在 componentWillUnmount 中调用)
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.state.page)
        if (this.state.page % 9 == 0) {
            let that = this;
            that.mutuallike_list(that)
                .then(
                function (data) {
                    console.log(data)
                    return that.ilikeonly_list(that)
                }
                ).then(
                function (data) {
                    console.log(data)
                    AsyncStorage.getItem('UserList', (err, result) => {
                        console.log(result)
                        if (JSON.parse(result) != null) {
                            console.log(JSON.parse(result).UserList)
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                                UserList: JSON.parse(result).UserList
                            })
                        } else {
                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                console.log(res)
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
        this.setState({
            page: ++this.state.page
        })
    }
    componentDidMount() {
        let that = this;
        InteractionManager.runAfterInteractions(() => {
            that.mutuallike_list(that)
                .then(
                function (data) {
                    console.log(data)
                    return that.ilikeonly_list(that)
                }
                )
                .then(
                function (data) {
                    console.log(data)
                    AsyncStorage.getItem('UserList', (err, result) => {
                        console.log(result)
                        if (JSON.parse(result) != null) {
                            console.log(JSON.parse(result).UserList)
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                                UserList: JSON.parse(result).UserList
                            })
                        } else {
                            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                                console.log(res)
                                that.setState({
                                    myId: res.user.id,
                                    UserList: res.user
                                })
                            })
                        }
                    });

                }
                )
        })
    }
    ilikeonly_list(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/ilikeonly_list", that.props.navigator, function (res) {
                if (res.userList.length > 0) {
                    res.userList.map((item) => {
                        if (item.portraitImageUuid == null) {
                            item.uri == null
                        } else {
                            tokenImage.tokenImg(item.portraitImageUuid, function (image) {
                                item.uri = image
                            })
                        }
                    })
                    that.setState({
                        user: res.userList.reverse(),
                        a: true
                    })
                    resolve(" ok2")
                } else {
                    resolve(" ok2")
                }
            })
        })
        return p;
    }
    mutuallike_list(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/mutuallike_list", that.props.navigator, function (res) {
                if (res.userList.length > 0) {
                    res.userList.map((item) => {
                        if (item.portraitImageUuid == null) {
                            item.uri == null
                        } else {
                            tokenImage.tokenImg(item.portraitImageUuid, function (image) {
                                item.uri = image
                            })
                        }
                    })
                    that.setState({
                        user2: res.userList.reverse(),
                        a: true
                    })
                    resolve(" ok1")
                } else {
                    resolve(" ok1")
                }
            })
        })
        return p;
    }




    _updataImage(type) {
        if (type == "1") {
            this.mutuallike_list(this)
        } else if (type == "2") {
            this.ilikeonly_list(this)
        }
    }
    _updataUsername(type) {
        if (type == "1") {
            this.mutuallike_list(this)
        } else if (type == "2") {
            this.ilikeonly_list(this)
        }
    }
    _Commend(item) {
        if (item.uri == null) {
            return (
                <View style={{
                    width: cal(69.5),
                    alignItems: "center",
                    height: cal(35),
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderBottomRightRadius: cal(35),
                    borderBottomLeftRadius: cal(35),
                    bottom: 0,
                    left: cal(2),
                    zIndex: 999,
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <Text style={{ fontSize: cal(13), color: "#f5f5f5", }}>
                        审核中
                    </Text>
                    {/* <Image
                        source={TOUMING}
                        style={{ width: cal(69.5), height: cal(20.5), justifyContent: "center", alignItems: "center" }}
                    >
                    </Image> */}
                </View>
            )
        }
    }
    _conArr(item) {
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
                            updataUsername: this._updataUsername.bind(this),
                            updataImage: this._updataImage.bind(this),
                            navigator: this.props.navigator
                        }
                    })
                }}
            >
                <View style={{ backgroundColor: "#fff", marginBottom: cal(10), borderRadius: cal(2) }}>
                    <View style={{
                        // height: cal(90), 
                        justifyContent: "center",
                        //  borderBottomColor: "#d1d1d1", borderBottomWidth: cal(0.5)
                        paddingTop: cal(10)
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", paddingLeft: cal(10) }}>
                                <View style={{ width: cal(73), height: cal(73), alignItems: "center", borderRadius: cal(73), }}>
                                    <CachedImage source={item.uri != null ? { uri: item.uri } : MOREN} style={{ borderRadius: cal(73), width: cal(73), height: cal(73) }} />
                                    {this._Commend(item)}
                                </View>
                                <View style={{ marginLeft: cal(10), paddingTop: cal(6) }}>
                                    <Text style={{ fontSize: cal(14), color: "#1f1f1f", fontSize: cal(14) }}>{item.nickname}</Text>
                                    <View style={{ marginTop: cal(2), marginBottom: cal(4), flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: cal(12), color: PublicColor.Public_Text1, }}>{age(item.birthday ? item.birthday : "1666-1-1")}</Text>
                                        <View style={{ width: cal(2), height: cal(10), backgroundColor: PublicColor.Public_MomClickBackground, marginLeft: cal(4), marginRight: cal(4) }}></View>
                                        <Text style={{ fontSize: cal(12), color: PublicColor.Public_Text1 }}>{item.addrCity}</Text>
                                        <View style={{ width: cal(2), height: cal(10), backgroundColor: PublicColor.Public_MomClickBackground, marginLeft: cal(4), marginRight: cal(4) }}></View>
                                        <Text style={{ fontSize: cal(12), color: PublicColor.Public_Text1 }}>{item.height}cm</Text>
                                    </View>
                                    <Text numberOfLines={1} style={{ maxWidth: cal(180), fontSize: cal(14), color: PublicColor.Public_Text1 }}>{item.selfDesc}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: cal(11), color: PublicColor.Public_Text1, right: cal(10), top: cal(7), position: "absolute" }}>{Time.time(parseInt(Date.parse(new Date(item.userAdoreDate)) / 1000))}</Text>
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
                <View style={{ height: cal(15) }}></View>
            )
        } else {
            return (
                <View style={{ height: cal(45), flexDirection: "row", justifyContent: "flex-end" }}>
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
                                    mobileNr: item.mobileNr,
                                    username: item.nickname,
                                    appKey: AppKey,
                                    guanliyuan: false,
                                    chong: this.chongxin.bind(that),
                                    otherId: item.id,
                                    myId: that.state.myId,
                                    sex:"female"
                                }
                            })

                        }}
                    >
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                            <Image source={XIAOXI} style={{ width: cal(21), height: cal(21) }} />
                            <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(11), marginLeft: cal(5) }}>发消息</Text>
                        </View>
                    </TouchableOpacity>

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
                                <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(13), textAlign: "center", marginTop: cal(20) }}>暂时还没有你喜欢的人哦！</Text>
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
                        contentContainerStyle={{ backgroundColor: PublicColor.Public_ViewBackground, paddingTop: cal(15), paddingRight: cal(15), paddingBottom: cal(170), paddingLeft: cal(15) }}
                        dataSource={conArr}
                        renderRow={this._conArr.bind(this)}
                        enableEmptySections={true}
                        removeClippedSubviews={false}
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
                                <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(13), textAlign: "center", marginTop: cal(20) }}>暂时还没有相互心仪的哦！</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            let conArr = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.user2);
            return (
                <View>
                    <ListView
                        contentContainerStyle={{ backgroundColor: PublicColor.Public_ViewBackground, paddingTop: cal(15), paddingRight: cal(15), paddingBottom: cal(170), paddingLeft: cal(15) }}
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
                <Image
                    source={BACKGROUNDMOM}
                    style={[{ width: width, height: cal(44) }]}
                >
                    <View style={{ flexDirection: "row", justifyContent: "center", height: cal(44), alignItems: "flex-end", paddingBottom: cal(5) }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!this.state.tabChoose) {
                                    this.setState({
                                        tabChoose: true
                                    })
                                }
                            }}
                        >

                            <View style={{ width: cal(100), alignItems: "center", }}>
                                <Text style={this.state.tabChoose ? SiteMap.tabQieText1 : SiteMap.tabQieText2}>我喜欢的</Text>
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
                            <View style={{ width: cal(100), alignItems: "center", }}>
                                <Text style={this.state.tabChoose ? SiteMap.tabQieText2 : SiteMap.tabQieText1}>相互喜欢</Text>
                                <View style={this.state.tabChoose ? SiteMap.tabQie2 : SiteMap.tabQie1}></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Image>
                {this._one()}

            </View>
        )
    }
}
let SiteMap = StyleSheet.create({
    tabQie1: {
        width: cal(63),
        height: cal(2),
        backgroundColor: "#fff",
        marginTop: cal(1),
        borderRadius: cal(1)
    },
    tabQie2: {
        width: cal(63),
        height: cal(2),
        marginTop: cal(1)
    },
    tabQieText2: {
        color: "#c1b8ff",
        fontSize: cal(16)
    },
    tabQieText1: {
        color: "#fff",
        fontSize: cal(17)
    }
})