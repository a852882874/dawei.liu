import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Image, InteractionManager, NativeModules, Modal,
    TouchableWithoutFeedback, Dimensions, ListView, TouchableOpacity, ScrollView, BackAndroid, AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window");
import One from './../page/one.js';
import Me from './../page/Me.js';
import { cal } from './../Common/Cal.js';
import Header from './../Common/Header.js';
import IndexDeatil from './../subPage/indexDatail.js';
import PreDetail from './../subPage/preDetail.js';
import WendaDetail from './../subPage/wendaDetail.js';
import SplashScreen from 'react-native-splash-screen';
import tokenImage from './../Common/token.js';
import _ajax from './../Common/LoginAjax'
import Education from './../Common/education.js';
import { age } from './../Common/age.js';
const ZUO = require('./../image/me/zou.png');
const BANNER = require('./../image/index/banner.png');
const PICONE = require('./../image/index/pic1.png');
const MOREN = require('./../image/chat/chatMo.png')
const PICTWO = require('./../image/index/pic2.png');
const WENTIQUAN = require('./../image/index/wentiquan.png');
const PICTHREE = require('./../image/index/pic3.png');
const TUIJIANPIC = require('./../image/index/tuijian.png');
const IDCORD = require('./../image/id/shim.png');
const QUAN = require('./../image/index/quan.png');
import Loadding from './../Common/Loadding.js'
const { PublicColor } = require("./../Common/Color.js")
import { CachedImage } from "react-native-img-cache";

const LOGOACTIVITY = require('./../image/activity/winnersBackground.png');
import ValentinesDay from '../activity/ValentinesDay';
const ENTRANCE = require('./../image/activity/winnersClose.png');
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loadding: true,
            info: [
            ],
            hotHua: [],
            a: true,
            banner: {},
            wenda: [],
            topics_mtime: [],
            bannar_mtime: {},
            freq_asked_questions_mtime: [],
            time: {},
            page: 1,
            sex: "",
        }
        this.lock = false;
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.info.length < 5) {
            let that = this;
            that.daily_recommended_ladies(that).then(
                function (data) {
                    AsyncStorage.getItem('user_sex', (err, result) => {
                        if (JSON.parse(result)) {
                            that.setState({
                                sex: JSON.parse(result).user_sex,
                                Loadding: false
                            })
                        }
                    })
                }
            )
        }
    }
    componentDidMount() {
        let that = this;
    }
    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this._fetchData();
        });
    }
    _fetchData() {
        let that = this;
        this.timeData(that)
            .then(
            function (data) {
                return that.timetis(that);
            }
            )
            .then(
            function (data) {
                return that.bannar(that);
            }
            )
            .then(
            function (data) {
                return that.questions(that);
            }
            )
            .then(
            function (data) {
                SplashScreen.hide();
                if (!that.lock) {
                    that.setState({
                        Loadding: false,
                        activetyFristUserSub: true
                    })
                }
            }
            )

    }
    timetis(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('topics_mtime', (err, result1) => {
                if (JSON.parse(result1) != null && JSON.parse(result1).topics_mtime[0].time) {
                    if (!that.lock) {
                        that.setState({
                            hotHua: JSON.parse(result1).topics_mtime
                        })
                    }
                } else {
                    that.readingTopics(that)
                }
                resolve('timetis成功');
            })
        })
        return p;
    }
    bannar(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('bannar_mtime', (err, result1) => {
                if (JSON.parse(result1) != null && JSON.parse(result1).bannar_mtime.time) {
                    if (!that.lock) {
                        that.setState({
                            banner: JSON.parse(result1).bannar_mtime
                        })
                    }
                } else {
                    that.readingBannar(that)
                }
                resolve('bannar成功');
            })
        })
        return p;
    }
    questions(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('freq_asked_questions_mtime', (err, result1) => {

                if (JSON.parse(result1) != null && JSON.parse(result1).freq_asked_questions_mtime[0].time) {
                    if (!that.lock) {
                        that.setState({
                            wenda: JSON.parse(result1).freq_asked_questions_mtime
                        })
                    }
                } else {
                    that.freq_asked_questions(that)
                }
                resolve('questions成功');
            })
        })
        return p;
    }
    timeData(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("reading/modifytime", that.props.navigator, function (res) {
                if (res.code == 0) {
                    if (!that.lock) {
                        that.setState({
                            time: res.readings
                        })
                    }
                    resolve('获取成功');
                } else {
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        })
        return p;
    }
    daily_recommended_ladies(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/daily_recommended_ladies", that.props.navigator, function (res) {
                console.log(res)
                if (res.code == 0) {
                    if (res.userList.length != that.state.info.length) {
                        res.userList.map((item, key) => {
                            if (item.portraitImageUuid == null) {
                                item.uri = null;
                            } else {
                                tokenImage.tokenImg(item.portraitImageUuid, function (res) {
                                    item.uri = res
                                })
                            }
                            _ajax.get_token('match/relation?others=' + item.id, that.props.navigator, function (res) {
                                if (res.relations.by.length == 0 && res.relations.to.length == 0) {
                                    item.dazhaohu = false;
                                } else {
                                    item.dazhaohu = true;
                                }
                            })
                            item.array = [item.height, item.income, item.occupation]
                        })
                        if (!that.lock) {
                            that.setState({
                                info: res.userList,

                            })
                        }
                        resolve('questions成功');
                    } else {
                    }
                }
                else if (res.code == 915) {
                    resolve('questions成功');
                }
                else {
                    if (!that.lock) {
                        that.setState({
                            Loadding: false
                        })
                    }
                    resolve('questions成功');
                }
            })
        })
        return p;
    }
    daily_recommended_ladies2(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/daily_recommended_ladies", that.props.navigator, function (res) {
                if (res.code == 0) {
                    res.userList.map((item, key) => {
                        if (item.portraitImageUuid == null) {
                            item.uri = null;
                        } else {
                            tokenImage.tokenImg(item.portraitImageUuid, function (res) {
                                item.uri = res
                            })
                        }
                        _ajax.get_token('match/relation?others=' + item.id, that.props.navigator, function (res) {
                            if (res.relations.by.length == 0 && res.relations.to.length == 0) {
                                item.dazhaohu = false;
                            } else {
                                item.dazhaohu = true;
                            }
                        })
                        item.array = [item.height, item.income, item.occupation]
                        resolve('daily_recommended_ladies');
                    })
                    if (!that.lock) {
                        that.setState({
                            info: res.userList
                        })
                    }
                    resolve('daily_recommended_ladies');
                } else {
                    resolve('daily_recommended_ladies');
                }
            })
        })
        return p;
    }
    readingTopics(that) {
        // let p = new Promise(function (resolve, reject) {
        //做一些异步操作
        _ajax.get_token("reading/topics", that.props.navigator, function (res) {
            // res.bannar.uri = tokenImage.ImgNoToken(res.bannar.image)
            res.topics.map((item) => {
                item.uri = tokenImage.ImgNoToken(item.column.image);
                item.time = that.state.time.topics_mtime;
            })
            if (!that.lock) {
                that.setState({
                    hotHua: res.topics
                })
            }
            AsyncStorage.setItem('topics_mtime', JSON.stringify({ topics_mtime: res.topics }), () => { });
            // resolve('readingTopics');
        })
        // });
        // return p;
    }
    readingBannar(that) {
        // let p = new Promise(function (resolve, reject) {
        //做一些异步操作
        _ajax.get_token("reading/bannar", that.props.navigator, function (res) {
            res.bannar.uri = tokenImage.ImgNoToken(res.bannar.image)
            res.bannar.time = that.state.time.bannar_mtime;
            if (!that.lock) {
                that.setState({
                    banner: res.bannar
                })
            }
            AsyncStorage.setItem('bannar_mtime', JSON.stringify({ bannar_mtime: res.bannar }), () => { });
            // resolve('readingBannar');
        })
    }
    freq_asked_questions(that) {
        // let p = new Promise(function (resolve, reject) {
        //做一些异步操作
        _ajax.get_token("reading/freq_asked_questions", that.props.navigator, function (res) {
            res.freq_asked_questions.map((item) => {
                item.time = that.state.time.freq_asked_questions_mtime;
            })
            if (!that.lock) {
                that.setState({
                    wenda: res.freq_asked_questions
                })
            }
            AsyncStorage.setItem('freq_asked_questions_mtime', JSON.stringify({ freq_asked_questions_mtime: res.freq_asked_questions }), () => { });
        })
    }
    componentWillUnmount() {
        this.times && clearInterval(this.times);
        this.lock = true;
    }
    _updataUsername() {
        let that = this;
        this.daily_recommended_ladies2(this)
            .then(
            function (data) {
                AsyncStorage.getItem('UserList', (err, result) => {
                    if (JSON.parse(result) != null) {
                        if (!that.lock) {
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                            })
                        }
                    } else {
                        _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                            if (!that.lock) {
                                that.setState({
                                    myId: res.user.id,
                                })
                            }
                        })
                    }
                });
            }
            )
    }
    _updataImage() {
        let that = this;
        this.daily_recommended_ladies2(this)
            .then(
            function (data) {
                AsyncStorage.getItem('UserList', (err, result) => {
                    if (JSON.parse(result) != null) {
                        if (!that.lock) {
                            that.setState({
                                myId: JSON.parse(result).UserList.id,
                            })
                        }
                    } else {
                        _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                            if (!that.lock) {
                                that.setState({
                                    myId: res.user.id,
                                })
                            }
                        })
                    }
                });
            }
            )
    }
    _updetadazhaohu(item, q) {
        item.dazhaohu = true;
        this.setState({
            info: this.state.info
        })
    }
    //女生  推荐
    //跳转到女生详情页面
    PreDetailProps(item) {
        this.props.navigator.push({
            component: PreDetail,
            params: {
                navigator: this.props.navigator,
                type: "3",
                id: item.id,
                dazhaohu: item.dazhaohu,
                mobileNr: item.mobileNr,
                uri: item.uri,
                username: item.nickname,
                huidiao: true,
                item: item,
                updetadazhaohu: this._updetadazhaohu.bind(this, item),
                updataUsername: this._updataUsername.bind(this),
                updataImage: this._updataImage.bind(this),
            }
        })
    }
    _momArr_ziliao(items, i, key) {
        if (items != null) {
            return (
                <View style={indexStyle.ziliaoWrap}>
                    {this._momArr_ziliao_item(items, key)}
                </View>
            )
        } else {
            return (
                <Text>
                </Text >
            )
        }
    }
    _momArr_ziliao_item(item, key) {
        if (key == 0) {
            return (
                <Text style={indexStyle.ziliaoWrap_text}>{item}cm</Text>
            )
        }
        if (key == 1) {
            return (
                <Text style={indexStyle.ziliaoWrap_text}>{Education._incomeGet(item, false)}</Text>
            )
        }

        if (key == 2) {
            return (
                <Text style={indexStyle.ziliaoWrap_text}>{item}</Text>
            )
        }
    }
    _idCode(item) {
        if (item.idConfirmed == 4) {
            return (
                <Image source={IDCORD} style={{ width: cal(16), height: cal(16) }} />
            )
        }
    }
    _momArr(item, id, key) {
        let info_array = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(item.array)
        return (
            <TouchableWithoutFeedback
                onPress={() => this.PreDetailProps(item)}
            >
                <View style={{ paddingLeft: cal(10), paddingRight: cal(10) }}>
                    <View style={[indexStyle._momArrView, key == this.state.info.length - 1 ? { borderBottomWidth: 0 } : {}, key == 0 ? { paddingTop: 0 } : {}]}>
                        <View style={indexStyle._momArrView_top}>
                            <View style={{ width: cal(90), height: cal(90), borderRadius: cal(5), backgroundColor: "#dcdcdc" }}>
                                <CachedImage source={item.uri == null ? MOREN : { uri: item.uri }} style={{ width: cal(90), height: cal(90), borderRadius: cal(5), }} />
                            </View>
                            <View style={indexStyle._momArrView_top_right}>
                                <View style={indexStyle._momArrView_top_right_top}>
                                    <View style={[indexStyle._momArrView_top_right_top_left, { flex: 1 }]} >
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: cal(6) }}>
                                                <Text style={indexStyle._momArrView_top_right_top_left_name}>{item.nickname ? item.nickname : ""}</Text>
                                                {this._idCode(item)}
                                            </View>
                                            <View style={indexStyle._momArrView_top_right_top_right}>
                                                <Image source={TUIJIANPIC} style={{ width: cal(14), marginTop: cal(2), height: cal(12), marginRight: cal(4) }} />
                                                <Text style={{ color: "#5f5f5f" }}>{item.normalImageNum}</Text>
                                            </View>
                                        </View>
                                        <View style={indexStyle._momArrView_top_right_top_left_ageAreXueli}>
                                            <Text style={indexStyle._momArrView_top_right_top_left_age}>{item.birthday ? age(item.birthday ? item.birthday : "1666-1-1") : "30岁"}</Text>
                                            <Text style={indexStyle._momArrView_top_right_top_left_age}>，</Text>
                                            {/* <View style={indexStyle._momArrView_top_right_top_left_ageAreXueli_line}></View> */}
                                            <Text style={indexStyle._momArrView_top_right_top_left_age}>{item.addrCity ? item.addrCity : "南京"}</Text>
                                            <Text style={indexStyle._momArrView_top_right_top_left_age}>，</Text>
                                            {/* <View style={indexStyle._momArrView_top_right_top_left_ageAreXueli_line}></View> */}
                                            <Text style={indexStyle._momArrView_top_right_top_left_age}>{item.education ? Education._educationGet(item.education, true) : "本科"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={indexStyle._momArrView_top_right_bottom}>
                                    <ListView
                                        contentContainerStyle={indexStyle.info_array_Listview}
                                        dataSource={info_array}
                                        renderRow={this._momArr_ziliao.bind(this)}
                                        enableEmptySections={true}
                                        removeClippedSubviews={false}
                                        initialListSize={100}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={indexStyle._momArrView_bottom}>
                            <Text style={{ fontSize: cal(12), color: "#828282" }}>{item.selfDesc ? item.selfDesc : ""}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _momTuijian() {
        let info = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.info)
        return (
            <View style={[indexStyle.MomWrap, {}]}>
                <View style={{ paddingLeft: cal(15) }}>
                    <View style={[indexStyle.HotGatiWrap_HT, {}]}>
                        <View style={{ width: cal(3), height: cal(14), backgroundColor: "#5875d4", marginRight: cal(5) }}></View>
                        <Text style={indexStyle.HotGatiWrap_HTtext}>今日推荐</Text>
                    </View>
                </View>
                <ListView
                    contentContainerStyle={indexStyle.ListViewStyle}
                    dataSource={info}
                    renderRow={this._momArr.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    initialListSize={100}
                    pageSize={100}

                />
            </View>
        )
    }
    // 热门话题
    _HotHuatiArr(item, key) {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigator.push({
                            component: IndexDeatil,
                            params: {
                                navigator: this.props.navigator,
                                item: item.detail,
                                type: 'huati'
                            }
                        })
                    }}
                >
                    <View style={indexStyle.HotGatiSub}>
                        <View>
                            <Image source={item.uri ? { uri: item.uri } : PICTWO} style={{ width: width - cal(30), borderRadius: cal(3), height: cal(90) }} />
                            <View style={indexStyle.HotGatiSub_View}>
                                <View>
                                    <Text style={indexStyle.HotGatiSub_View_Text}>{item.column.title}</Text>
                                    <Text style={indexStyle.HotGatiSub_View_Text2}>{item.column.subtitle}</Text>
                                </View>
                            </View>
                            {/* <View style={indexStyle.HotGatiSub_View2Quan}>
                                <Image source={QUAN} style={{ width: cal(22), height: cal(22) }} />
                            </View> */}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: cal(13) }}></View>
            </View>
        )
    }
    _HotHuati() {
        if (this.state.hotHua.length > 0) {
            let HotHuati = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.hotHua)
            return (
                <View style={[indexStyle.HotGatiWrap, { paddingLeft: cal(15), paddingRight: cal(15), alignItems: "center" }]}>
                    <View style={[indexStyle.HotGatiWrap_HT, { width: width, paddingLeft: cal(15), alignItems: "center" }]}>
                        <View style={{ width: cal(3), height: cal(14), backgroundColor: PublicColor.Public_ClickBackground, marginRight: cal(5) }}></View>
                        <Text style={indexStyle.HotGatiWrap_HTtext}>热门话题</Text>
                    </View>
                    <ListView
                        dataSource={HotHuati}
                        renderRow={this._HotHuatiArr.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            )
        }
    }
    //常见问题
    _wenda(item, id, key) {
        return (
            <TouchableWithoutFeedback onPress={() => this.WendaDetail(item)}>
                <View style={{ paddingLeft: cal(15), paddingRight: cal(15), marginTop: key == 0 ? cal(0) : cal(30) }}>
                    <View style={{}}>
                        <View style={{}}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: cal(5), borderRadius: cal(5), backgroundColor: PublicColor.Public_ClickBackground, height: cal(5) }}></View>
                                <Text style={{ marginLeft: cal(10), fontSize: cal(14), color: "#5f5f5f", fontWeight: "800" }}>{item.question}</Text>
                            </View>
                            <Text numberOfLines={1} style={{ fontSize: cal(13), color: PublicColor.Public_Text3, lineHeight: cal(27) }}>{item.answer[0].p[0]}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _Changjian() {
        if (this.state.wenda) {
            let wendaD = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.wenda)
            return (
                <View style={{ backgroundColor: "#fff", marginTop: cal(10), paddingBottom: cal(10), }}>
                    <View style={{}}>
                        <View style={{ height: cal(47), flexDirection: "row", alignItems: "center", paddingLeft: cal(15), paddingRight: cal(15), }}>
                            <View style={{ width: cal(3), height: cal(14), backgroundColor: PublicColor.Public_ClickBackground, marginRight: cal(5) }}></View>
                            <Text style={indexStyle.HotGatiWrap_HTtext}>常见问答</Text>
                        </View>
                    </View>
                    <ListView
                        dataSource={wendaD}
                        renderRow={this._wenda.bind(this)}
                        enableEmptySections={true}
                    />


                </View>
            )
        }
    }
    //跳转到问答详情页面
    WendaDetail(item) {
        this.props.navigator.push({
            component: WendaDetail,
            params: {
                navigator: this.props.navigator,
                item: item
            }
        })
    }
   
    _winners(item) {
        return (
            <Text style={{ fontSize: cal(15), color: "#4b4b4b", marginTop: cal(3) }}>
                {item}
            </Text>
        )
    }
    render() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} title={"正在加载中..."} />
            )
        }
        return (
            <View style={{ height: height, backgroundColor: PublicColor.Public_ViewBackground }}>
                <Header type={"index"} title={"推荐"} navigator={this.props.navigator} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={indexStyle.wrap}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigator.push({
                                    component: IndexDeatil,
                                    params: {
                                        navigator: this.props.navigator,
                                        item: this.state.banner.detail,
                                        type: "banner"
                                    }
                                })
                            }}
                        >
                            <View style={{ backgroundColor: PublicColor.Public_ViewBackground, height: cal(150), }}>
                                <Image source={this.state.banner.uri ? { uri: this.state.banner.uri } : BANNER} style={{ width: width, height: cal(150), resizeMode: 'stretch' }} />
                            </View>
                        </TouchableOpacity>
                        {this._momTuijian()}
                        {this._HotHuati()}
                        {this._Changjian()}
                        <View style={{ paddingLeft: cal(15), paddingRight: cal(15) }}>
                        </View>
                    </View>
                    <View style={{ height: cal(80) }}>
                    </View>
                </ScrollView>
            </View>
        )
    }

}
let indexStyle = StyleSheet.create({
    wrap: {
        backgroundColor: PublicColor.Public_ViewBackground,
        flex: 1,
        paddingTop: cal(10)
    },
    side_view: {
        height: cal(50),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: cal(15)
    },
    side_view_text: {
        marginRight: cal(15),
        fontSize: cal(15)
    },
    HotGatiWrap: {
        backgroundColor: "#fff",
        paddingLeft: cal(10),
        paddingRight: cal(5),
        // paddingBottom: cal(10),
        marginTop: cal(10)
    },
    HotGatiWrap_HT: {
        height: cal(47),
        flexDirection: 'row',
        alignItems: "center",
    },
    HotGatiWrap_HTtext: {
        fontSize: cal(14),
        // color: PublicColor.Public_Text3
        color: "#4d4d4d"
    },
    HotGatiSub: {
        height: cal(90),
        borderRadius: cal(8),
        position: "relative",
    },
    HotGatiSub_View: {
        position: "absolute",
        top: 0,
        left: cal(16),
        height: cal(90),
        justifyContent: "center"
    },
    HotGatiSub_View_Text: {
        color: "#fff",
        fontSize: cal(14),
        marginBottom: cal(3)
    },
    HotGatiSub_View_Text2: {
        color: "#fff",
        fontSize: cal(10),
    },
    HotGatiSub_View2Quan: {
        position: "absolute",
        top: cal(34),
        right: cal(17),

    },

    MomWrap: {
        marginTop: cal(10),
        backgroundColor: "#fff",

    },
    ListViewStyle: {

    },

    _momArrView: {
        paddingTop: cal(17),
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#eee",
        paddingBottom: cal(6),
        paddingLeft: cal(5),
        paddingRight: cal(5)
    },
    _momArrView_top: {
        flexDirection: "row"
    },
    _momArrView_top_right: {
        marginLeft: cal(10),
        flex: 1
    },
    _momArrView_top_right_top: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    _momArrView_top_right_top_left: {

    },
    _momArrView_top_right_top_left_name: {
        color: "#5f5f5f",
        fontSize: cal(15),
        marginRight: cal(7)
    },
    _momArrView_top_right_top_left_ageAreXueli: {
        flexDirection: "row",
        marginTop: cal(5),
        marginBottom: cal(13),
        alignItems: "center"
    },
    _momArrView_top_right_top_left_age: {
        color: "#808080",
        fontSize: cal(12)
    },
    _momArrView_top_right_top_left_ageAreXueli_line: {
        width: cal(2),
        height: cal(10),
        backgroundColor: "#f99406",
        marginLeft: cal(3),
        marginRight: cal(3)
    },
    info_array_Listview: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        width: cal(230),
    },
    ziliaoWrap: {
        paddingLeft: cal(6),
        borderRadius: cal(2),
        height: cal(22),
        justifyContent: "center",
        paddingRight: cal(6),
        marginBottom: cal(5),
        backgroundColor: "#eaeaea",
        marginRight: cal(4),

    },
    ziliaoWrap_text: {
        color: "#5f5f5f",
        fontSize: cal(12)
    },
    _momArrView_bottom: {
        marginTop: cal(9),
        paddingBottom: cal(7)
    },
    _momArrView_bottom_text: {
        fontSize: cal(12),
        color: "#828282",
    },
    _momArrView_top_right_top_right: {
        paddingRight: cal(15),
        flexDirection: "row",
        alignItems: "center",
        marginTop: cal(2)
    }
})