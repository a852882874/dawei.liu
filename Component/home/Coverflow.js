//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    AsyncStorage,
    InteractionManager,
    NativeModules,
    Animated,
    ListView,
    Modal,
    LayoutAnimation,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import Coverflow from 'react-native-coverflow';
const JsonData = require('./text.json');
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const { height, width } = Dimensions.get('window');
const boxWidth = ScreenWidth / 3;
import Education from './../Common/education.js';
import JMessage from 'jmessage-react-plugin';
import Header from './../Common/Header.js';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import PreDetail from "./../subPage/preDetailMom.js";
import Loadding from './../Common/Loadding.js';
const { PublicColor } = require("./../Common/Color.js");
const { PublicFontSize } = require("./../Common/FontSize.js");
const NOXIHUAN = require('./../image/mom/noxihuan.png');
const XIHUAN = require('./../image/mom/xihuan.png');
const MOREN = require('./../image/chat/chatMo.png')
const SWIPERONE = require('./../image/mom/background1.png');
import { CachedImage } from "react-native-img-cache";
const SWIPERTWO = require('./../image/mom/background2.png');
import tokenImage from './../Common/token.js';
const SWIPERTHREE = require('./../image/mom/background3.png');
const SWIPERBackgroundClose = require('./../image/mom/cha.png');
const SEARCHBANNER = require('./../image/gif/search.gif');
import { cal } from './../Common/Cal.js';
import { age } from './../Common/age.js';
import SplashScreen from 'react-native-splash-screen';
import _ajax from '../Common/LoginAjax';
const LOGOACTIVITY = require('./../image/activity/winnersBackground.png');
import ValentinesDay from '../activity/ValentinesDay';
const ENTRANCE = require('./../image/activity/winnersClose.png');
export default class Coverflows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleScrollBegin: 0,
            currentPage: 0,
            visible: false,
            page: 1,
            tishi: false,
            Loadding: true,
            visibleShow: 1,
            open: false,
            username: "",
            appKey: "d97d63f088fb5f3bafd670f5",
            openText: "",
            sssss: '0deg',
            myId: "",
            ssss: 0,
            conpomEnt: true,
            visibleShowLeft: "",
            data: [],
            dataSub: [],
            dataSubNum: 5,
            fadeInOpacity: new Animated.Value('0deg'), // 初始值
            zuihou: false,
            visibleShowRight: "",
            visibleShowScrollViewLeft: false,
            visibleShowScrollViewRight: false,
            a: true,
            b: false,
            pages: 1,
            fasong: 1,
            chaoguo: true,
            index: 0,
            LikeTheNumberOfTimesToday: 0,
            locked: true,
            to_like_sum: 0,
            huawei: false,
        };
        this.lock = false;
        SplashScreen.hide()
        let that = this;
        this.listener = DeviceEventEmitter.addListener('updetaMomIndex', (e) => {
            if (!that.lock) {
                that.zhixing(that)
                    .then(
                    function (data) {
                        console.log('datawwwwwwwwwwwwwwwwww')
                        return that.UserList(that);
                    }
                    )
            }
        })
        AsyncStorage.getItem('huawei', (err, result) => {
            if (JSON.parse(result) != null && !that.lock) {
                that.setState({
                    huawei: JSON.parse(result),
                })
            } else {

            }
        })
    }
    componentWillUnmount() {
        this.listener.remove();
        this.lock = true;

    }
    componentDidMount() {
        let that = this;
        // AsyncStorage.removeItem("activeWinners",function(errs) {})
    }
    componentWillMount() {
        let that = this;
        if (!that.lock) {
            that.zhixing(that)
                .then(
                function (res) {
                    return that.relation(that)
                }
                )
                .then(
                function (res) {
                    return that.user_mom_old(that)
                }
                )
                .then(
                function (res) {
                    return that.visibleShowScrollViewLeft(that)
                }
                )
                .then(
                function (res) {
                    return that.UserList(that)
                }
                )
                .then(
                function (res) {
                    return that.visibleShowScrollViewRight(that)
                }
                )
                .then(
                function (data) {
                    if (!that.lock) {
                        that.timesC = setTimeout(function () {
                            that.setState({
                                Loadding: false
                            })
                        }, 2000)
                    }
                }
                )
        }
    }
    UserList(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('UserList', (err, result) => {
                if (JSON.parse(result) != null) {
                    if (!that.lock) {
                        that.setState({
                            myId: JSON.parse(result).UserList.id,
                        })
                        resolve(" ok2")
                    }
                } else {
                    resolve(" ok2")
                }
            });
        })
        return p;
    }
    visibleShowScrollViewRight(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('visibleShowScrollViewRight', (err, result) => {
                if (result == "visibleShowScrollViewRight") {
                    resolve(" ok2")
                } else {
                    if (!that.lock) {
                        that.setState({
                            visibleShowScrollViewRight: true,
                            fasong: 0
                        })
                        resolve(" ok2")
                    }
                }
            })
        })
        return p;
    }
    user_mom_old(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('user_mom_old', (err, result) => {
                if (result == "user_mom_old") {
                    resolve(" ok2")
                } else {
                    NativeModules.MyNativeModule.rnCallNative("每天可以翻5个牌子哦~");
                    AsyncStorage.setItem('user_mom_old', "user_mom_old", () => {
                        resolve(" ok2")
                    });
                }
            });
        })
        return p;
    }
    visibleShowScrollViewLeft(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('visibleShowScrollViewLeft', (err, result) => {
                if (result == "visibleShowScrollViewLeft") {
                    resolve(" ok3 ")
                } else {
                    if (!that.lock) {
                        that.setState({
                            visibleShowScrollViewLeft: true,
                            fasong: 0
                        })
                        resolve(" ok3 ")
                    }
                }
            })
        })
        return p;
    }
    relation(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token('match/relation?date=today', that.props.navigator, function (res) {
                console.log(res)
                that.setState({
                    to_like_sum: res.relations.to_like_sum
                })
                resolve(" 关系数量 ")
            })
        })
        return p;
    }
    zhixing(that) {
        if (this.state.a) {
            if (!that.lock) {
                that.setState({
                    a: false
                })
            }
            let p = new Promise(function (resolve, reject) {
                _ajax.get_token("match/sys_recommended_men", that.props.navigator, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        if (res.userList.length != 0) {
                            res.userList.map((item, key) => {
                                if (item.portraitImageUuid == null) {
                                    item.uri = null;
                                } else {
                                    tokenImage.tokenImg(item.portraitImageUuid, function (ress) {
                                        item.uri = ress
                                    })
                                }
                                item.array = [item.addrCity, item.height, item.income, item.occupation, item.education, item.birthday]
                            })
                            if (!that.lock) {
                                that.setState({
                                    data: res.userList,
                                })
                                if (res.userList.length > 5) {
                                    that.setState({
                                        dataSub: res.userList.slice(0, that.state.dataSubNum),
                                    })
                                } else {
                                    that.setState({
                                        dataSub: res.userList
                                    })
                                }
                                resolve(" ok1")
                            }
                        } else {
                            resolve(" ok1")
                        }
                    } else {
                        resolve(" ok1")
                    }
                })
            })
            return p;
        }
    }
    _momArr_ziliao_item(item, key) {
        // {Education._educationGet(item.education, true)}
        // item.array = [ item.addrCity, item.height, item.income, item.occupation, item.education, item.birthday]
        if (key == 0) {
            return (
                <Text style={MomIndexstyles.ListViewStyle_View_text}>{item}</Text>
            )
        }
        if (key == 1) {
            return (

                <Text style={MomIndexstyles.ListViewStyle_View_text}>{item}cm</Text>
            )
        }
        if (key == 2) {
            return (
                <Text style={MomIndexstyles.ListViewStyle_View_text}>{Education._incomeGet(item, true)}</Text>
            )
        }

        if (key == 3) {
            return (
                <Text style={MomIndexstyles.ListViewStyle_View_text}>{item}</Text>
            )
        }
        if (key == 4) {
            return (
                <Text style={MomIndexstyles.ListViewStyle_View_text}>{Education._educationGet(item, true)}</Text>
            )
        }
        if (key == 5) {
            return (
                <Text style={MomIndexstyles.ListViewStyle_View_text}>{age(item ? item : "1992-1-1")}</Text>
            )
        }
    }
    _momArr_ziliao_sub(items, i, key) {
        if (items != null) {
            return (
                <View style={MomIndexstyles.ListViewStyle_View}>
                    {this._momArr_ziliao_item(items, key)}
                </View>
            )
        } else {
            return (
                <Text>
                </Text>
            )
        }
    }

    _renderItem ({ item, i }) {
        let info_array = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(item.array)
        return (
            <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                    this.props.navigator.push({
                        component: PreDetail,
                        params: {
                            type: "4",
                            id: item.id,
                            nickname: item.nickname,
                            navigator: this.props.navigator,
                            yichuKey: i,
                            yichu: this.yichu.bind(this),
                        }
                    })
                }}
            >
                <View style={[this.state.huawei ? MomIndexstyles.View_wrap1 : MomIndexstyles.View_wrap2, { marginTop: cal(15) }]}>
                    <Image source={item.uri == null ? { MOREN } : { uri: item.uri }} style={this.state.huawei ? MomIndexstyles.imageStyle1 : MomIndexstyles.imageStyle2}></Image>
                    {/* <Image source={{ uri: 'http://ww2.sinaimg.cn/large/7a8aed7bjw1exfffnlf2gj20hq0qoju9.jpg' }} style={MomIndexstyles.imageStyle2}></Image> */}
                    <View style={MomIndexstyles.ViewSub_ziliao}>
                        {/* <Text style={MomIndexstyles.ViewSub_ziliao_title}>帅哥</Text> */}
                        <Text style={MomIndexstyles.ViewSub_ziliao_title}>{item.nickname}</Text>
                        <View style={MomIndexstyles.ViewSub_ziliao_View}>
                            <View style={MomIndexstyles.ViewSub_ziliao_View_xian}></View>
                            <Text style={MomIndexstyles.ViewSub_ziliao_View_text}>基本资料</Text>
                        </View>
                        <View style={MomIndexstyles.ViewSub_ziliao_Content}>
                            <ListView
                                contentContainerStyle={MomIndexstyles.ListViewStyle}
                                dataSource={info_array}
                                renderRow={this._momArr_ziliao_sub.bind(this)}
                                enableEmptySections={true}
                                removeClippedSubviews={false}
                                initialListSize={100}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    // _activetyFristUser() {
    //     if (this.state.activetyFristUser) {
    //         return (
    //             <Modal
    //                 animationType='fade'
    //                 transparent={true}
    //                 visible={this.state.activetyFristUser}
    //                 onRequestClose={() => console.log('onRequestClose...')} >
    //                 <View style={{ width: width, height: height, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" }}>
    //                     <View style={{ width: cal(331), height: cal(445),paddingLeft:cal(30),paddingRight:cal(10) }}>
    //                         <Image source={LOGOACTIVITY} style={{ width: cal(331), height: cal(445), position: "absolute", top: 0, left: 0 }} />
    //                         <TouchableOpacity onPress={() => {
    //                             AsyncStorage.setItem('activeWinners', JSON.stringify({ active: "wwwww"}), () => { });
    //                             this.setState({
    //                                 activetyFristUser: false
    //                             })
    //                         }}

    //                             style={{ width: cal(150), height: cal(40), borderRadius: 100, position: "absolute", alignItems: "flex-end", right: 0, top: cal(-30) }}
    //                         >
    //                             <Image source={ENTRANCE} style={{ width: cal(28), height: cal(28), position: "absolute", }} />
    //                         </TouchableOpacity>
    //                         <View style={{ flexDirection:"row", marginTop:cal(50),justifyContent:"space-between"}}>
    //                             <View>
    //                                 <Text style={{ color:"#3a3a3a",fontSize:cal(15),fontWeight:"700",marginBottom:cal(3) }}>昵称</Text>
    //                                 <ListView
    //                                     contentContainerStyle={{  }}
    //                                     dataSource={this.state.activetyFristUserNickname}
    //                                     renderRow={this._winners.bind(this)}
    //                                     enableEmptySections={true}
    //                                     removeClippedSubviews={false}
    //                                     initialListSize={100}
    //                                 />
    //                             </View>
    //                             <View>
    //                                 <Text style={{ color:"#3a3a3a",fontSize:cal(15),fontWeight:"700" ,marginBottom:cal(3) }}>手机号码</Text>
    //                                 <ListView
    //                                     contentContainerStyle={{  }}
    //                                     dataSource={this.state.activetyFristUserIphone}
    //                                     renderRow={this._winners.bind(this)}
    //                                     enableEmptySections={true}
    //                                     removeClippedSubviews={false}
    //                                     initialListSize={100}
    //                                 />
    //                             </View>
    //                             <View>
    //                                 <Text style={{ color:"#3a3a3a",fontSize:cal(15),fontWeight:"700" ,marginBottom:cal(3) }}>中奖礼品</Text>
    //                                 <ListView
    //                                     contentContainerStyle={{  }}
    //                                     dataSource={this.state.activetyFristUserPrize}
    //                                     renderRow={this._winners.bind(this)}
    //                                     enableEmptySections={true}
    //                                     removeClippedSubviews={false}
    //                                     initialListSize={100}
    //                                 />
    //                             </View>
    //                         </View>
    //                     </View>
    //                 </View>
    //             </Modal>
    //         )
    //     }
    // }
    _winners(item){
        return(
            <Text style={{ fontSize:cal( 15 ),color:"#4b4b4b",marginTop:cal(3) }}>
            {item}
            </Text>
        )
    }
    render() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} />
            )
        }
        if (this.state.data.length == 0) {
            return (
                <View style={{ width: width, height: height, alignItems: "center" }}>
                    <Header type={"noback"} title={"寻觅"} {...this.props} />
                    {/* {this._activetyFristUser()} */}
                    {/* <View style={{ position: "absolute", right: 0, zIndex: 9999, top: cal(300) }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigator.push({
                                component: ValentinesDay,
                                params: {
                                    navigator: this.props.navigator,
                                    new: false
                                }
                            })
                        }}>
                            <Image source={ENTRANCE} style={{ width: cal(56), height: cal(56), }} />
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ marginTop: cal(100), position: "relative" }}>
                        <Image source={SEARCHBANNER} style={{ width: cal(315), height: cal(265) }} />
                    </View>
                    <Text style={{ marginTop: cal(85), color: PublicColor.Public_Text3, fontSize: cal(14) }}>对不起，暂时没有匹配合适的人...</Text>
                </View>
            );
        }
        return (
            <View style={{ height: height }}>
                <Header type={"noback"} title={"寻觅"} {...this.props} />
                {/* {this._activetyFristUser()} */}
                {/* <View style={{ position: "absolute", right: 0, zIndex: 9999, top: cal(300) }}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigator.push({
                            component: ValentinesDay,
                            params: {
                                navigator: this.props.navigator,
                                new: false
                            }
                        })
                    }}>
                        <Image source={ENTRANCE} style={{ width: cal(56), height: cal(56), }} />
                    </TouchableOpacity>
                </View> */}
                {this._Background()}
                <Carousel
                    ref={'carousel'}
                    data={this.state.data}
                    renderItem={this._renderItem.bind(this)}
                    sliderWidth={width}
                    itemWidth={cal(300)}
                    inactiveSlideOpacity={0.2}
                    sliderHeight={this.state.huawei ? cal(300) : cal(400)}
                    onLayout={this._onLayout.bind(this)}
                    onSnapToItem={this._onSnapToItem.bind(this)}
                    currentIndex={3}
                />
                {this._btn()}
            </View>
        );
    }
    _onSnapToItem(e) {
        this.setState({
            index: e
        })
    }

    _onLayout(e) {
        console.log(e)
    }
    _Background() {
        if (this.state.visible) {
            return (
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.visible}
                    onIndexChanged={this._onIndexChanged.bind(this)}
                    onRequestClose={() => console.log('onRequestClose...')} >
                    {this._backTishi()}

                </Modal>

            )
        }
    }
    _onIndexChanged(pages) {
        // console.log(pages)
    }
    _backTishi() {
        if (this.state.visibleShow == 1) {
        } else if (this.state.visibleShow == 2 || this.state.visibleShowLeft == 'left' || this.state.visibleShowRight == 'right') {
            return (
                <View style={{ width: ScreenWidth, zIndex: 9999999999999999999999999999, justifyContent: "center", alignItems: "center", height: ScreenHeight, backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left: 0 }}>
                    <View style={{ width: cal(240), height: cal(130), backgroundColor: "#fff", borderRadius: cal(2) }}>
                        {this._view()}
                        <View style={{ width: cal(240), height: cal(0.5), backgroundColor: "#b1b1b1", marginTop: cal(20) }}>

                        </View>
                        <View style={{ height: cal(45), justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    let that = this;
                                    if (this.state.visibleShowLeft == "left") {
                                        AsyncStorage.setItem('visibleShowScrollViewLeft', "visibleShowScrollViewLeft", () => {
                                            if (!that.lock) {
                                                that.setState({
                                                    visibleShowLeft: "",
                                                    visible: false,
                                                    visibleShowScrollViewLeft: false
                                                })
                                            }
                                        });
                                    } else if (this.state.visibleShowRight == "right") {
                                        AsyncStorage.setItem('visibleShowScrollViewRight', "visibleShowScrollViewRight", () => {
                                            if (!that.lock) {
                                                that.setState({
                                                    visible: false,
                                                    visibleShowRight: "",
                                                    visibleShowScrollViewRight: false
                                                })
                                            }
                                        });
                                    }
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
                                    let that = this;
                                    if (this.state.visibleShowLeft == "left") {
                                        AsyncStorage.setItem('visibleShowScrollViewLeft', "visibleShowScrollViewLeft", () => {
                                            if (!that.lock) {
                                                that.setState({
                                                    visibleShowLeft: "",
                                                    visible: false,
                                                    visibleShowScrollViewLeft: false
                                                })
                                            }
                                        });
                                    } else if (this.state.visibleShowRight == "right") {
                                        AsyncStorage.setItem('visibleShowScrollViewRight', "visibleShowScrollViewRight", () => {
                                            if (!that.lock) {
                                                that.setState({
                                                    visible: false,
                                                    visibleShowRight: "",
                                                    visibleShowScrollViewRight: false
                                                })
                                            }
                                        });
                                    }
                                }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: cal(15), color: PublicColor.Public_MomClickBackground }}>确定</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
    _view() {
        if (this.state.visibleShowLeft == "left") {
            return (
                <View>
                    <View style={{ marginTop: cal(15), alignItems: "center" }}>
                        <Text style={{ fontSize: cal(15), color: "#2e2e2e" }}>不感兴趣？</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: cal(8) }}>
                        <Text style={{ fontSize: cal(12), color: "#5f5f5f" }}>拒绝后该用户不会再出现~</Text>
                    </View>
                </View>
            )
        } else if (this.state.visibleShowRight == "right") {
            return (
                <View>
                    <View style={{ marginTop: cal(15), alignItems: "center" }}>
                        <Text style={{ fontSize: cal(15), color: "#2e2e2e" }}>感兴趣？</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: cal(8) }}>
                        <Text style={{ fontSize: cal(12), color: "#5f5f5f" }}>对方会收到你的资料哦~</Text>
                    </View>
                </View>
            )
        }
    }
    yichu(i) {
        if (!this.lock) {
            this.state.data.splice(i, 1);
            if (i >= this.state.data.length) {
                this.setState({
                    index: --this.state.index,
                })
            }
            if (!this.lock) {
                this.setState({
                    data: this.state.data,
                })
            }
        }
    }
    _btn() {
        if (this.state.data.length == 0) {
            return false
        }
        return (
            <View style={[MomIndexstyles.btn, { position: "absolute", bottom: this.state.huawei ? cal(125) : cal(90), alignItems: "center", width: width, zIndex: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 }]}>
                <TouchableOpacity
                    onPress={() => {
                        let that = this;
                        if (that.state.visibleShowScrollViewLeft) {
                            if (!that.lock) {
                                that.setState({
                                    visibleShowLeft: "left",
                                    visible: true,
                                    visibleShow: 2
                                })
                            }
                        } else {
                            if (!that.lock) {
                                console.log(this.state.index, this.state.data.length)
                                if (that.state.index == that.state.data.length) {
                                    that.setState({
                                        index: --that.state.index,

                                    })
                                }
                                if (that.state.index == that.state.data.length - 1) {
                                    this.refs.carousel.snapToPrev()
                                }
                                let json = {
                                    targetUserId: that.state.data[that.state.index].id
                                }
                                that.state.data.splice(that.state.index, 1)
                                that.setState({
                                    data: that.state.data,
                                })
                                if (that.state.index == that.state.data.length) {
                                    this.refs.carousel.snapToPrev()
                                }
                                _ajax.post_token("match/skip", json, function (res) {
                                    if (that.state.fasong == 0) {
                                        NativeModules.MyNativeModule.rnCallNative("已屏蔽该男士");
                                        if (!that.lock) {
                                            that.setState({
                                                fasong: ++that.state.fasong,
                                                index: that.state.index,
                                                data: that.state.data,
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    }}
                >
                    <View style={MomIndexstyles.btn_image}>
                        <Image source={NOXIHUAN} style={{ width: cal(80), height: cal(80) }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    // disabled={this.state.chaoguo == true ? false : true}
                    onPress={() => {
                        let that = this;
                        if (that.state.visibleShowScrollViewRight) {
                            if (!that.lock) {
                                that.setState({
                                    visibleShowRight: "right",
                                    visible: true,
                                    visibleShow: 2
                                })
                            }
                        } else {
                            if (that.state.to_like_sum >= 5) {
                                // Alert.alert(
                                //     '',
                                //     '你今天已经喜欢五个人了，明天继续哦~',
                                //     [
                                //         { text: '好的', onPress: () => console.log(), style: 'cancel' },
                                //     ],
                                //     { cancelable: false }
                                // )
                                NativeModules.MyNativeModule.rnCallNative("每日最多可喜欢5人，明天继续哦");
                                return false
                            }
                            if (!that.lock) {
                                if (that.state.index == that.state.data.length) {
                                    that.setState({
                                        index: --that.state.index,
                                    })
                                    this.refs.carousel.snapToPrev()
                                }
                            }
                            let json = {
                                "myId": that.state.myId,
                                "targetUserId": that.state.data[that.state.index].id
                            }
                            let mobileNr = that.state.data[that.state.index].mobileNr;
                            let otherId = that.state.data[that.state.index].id;
                            let a = that.state.data[that.state.index]
                            that.state.data.splice(that.state.index, 1)
                            if (!that.lock) {
                                that.setState({
                                    data: that.state.data,
                                })
                                that.setState({
                                    to_like_sum: ++that.state.to_like_sum
                                })
                            }
                            _ajax.post_token("match/like", json, function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    JMessage.sendTextMessage({
                                        type: 'single', username: mobileNr, appKey: that.state.appKey,
                                        text: "你好，希望没有打扰到你，不知能否认识一下?", extras: { sysMsgType: "link", myId: typeof that.state.myId == "string" ? that.state.myId : JSON.stringify(that.state.myId), otherId: typeof otherId == "string" ? otherId : JSON.stringify(otherId) }, messageSendingOptions: JMessage.messageSendingOptions
                                    },
                                        (msg) => {
                                            that.times = setTimeout(function () {
                                                DeviceEventEmitter.emit('userNameDidChange', '通知来了');
                                                if (that.state.fasong == 0) {
                                                    NativeModules.MyNativeModule.rnCallNative("发送成功");
                                                    if (!that.lock) {
                                                        that.setState({
                                                            fasong: ++that.state.fasong
                                                        })
                                                    }
                                                }
                                            }, 1000)
                                        }, (error) => {
                                            var code = error.code
                                            var desc = error.description
                                        })
                                }
                                else if (res.code == 1093) {
                                    NativeModules.MyNativeModule.rnCallNative("每日最多可喜欢5人，明天继续哦");
                                    that.state.data.splice(that.state.index, 0, a) ;
                                    if (that.state.data.length - 1 == parseInt(that.state.index) && that.state.data.length > 1) {
                                        if (!that.lock) {
                                            that.setState({
                                                chaoguo: false,
                                                data: that.state.data,
                                            })
                                        }
                                    } else {
                                        if (!that.lock) {
                                            that.setState({
                                                chaoguo: false,
                                                data: that.state.data,
                                            })
                                        }
                                    }
                                }
                                else {
                                    if (that.state.fasong == 0) {
                                        NativeModules.MyNativeModule.rnCallNative("发送失败");
                                        if (!that.lock) {
                                            that.setState({
                                                fasong: ++that.state.fasong
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }}
                >
                    <View>
                        <Image source={XIHUAN} style={{ width: cal(80), height: cal(80) }} />
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}
var MomIndexstyles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    imageStyle: {
        width: cal(290),
        height: cal(190),
        borderRadius: cal(2)
    },
    imageStyle2: {
        width: cal(290),
        height: cal(235),
        borderRadius: cal(2)
    },
    imageStyle1: {
        width: cal(290),
        height: cal(190),
        borderRadius: cal(2)
    },
    circleWrapperStyle: {
        flexDirection: 'row',
        //absolute“绝对”定位，参照标准父容器
        //relative “相对”对位，相对于原来的位置
        position: 'absolute',
        bottom: 0,
        left: 10
    },
    circleStyle: {
        fontSize: 25,
        color: '#FFF'
    },
    View_wrap1: {
        width: cal(300),
        height: cal(350),
        paddingTop: cal(4),
        borderWidth: cal(0.5),
        borderColor: "#eee",
        alignItems: "center",
        borderRadius: cal(8),
        // marginRight: cal(10),
        elevation: 3,
    },
    View_wrap2: {
        width: cal(300),
        height: cal(400),
        paddingTop: cal(4),
        borderWidth: cal(0.5),
        borderColor: "#eee",
        alignItems: "center",
        borderRadius: cal(8),
        // marginRight: cal(10),
        elevation: 3,
    },



    ViewSub_ziliao: {
        paddingLeft: cal(10)
    },
    ViewSub_ziliao_title: {
        marginTop: cal(8),
        color: PublicColor.Public_Text5,
        fontSize: PublicFontSize.PublicFontSize_34,
        marginBottom: cal(6),
    },
    ViewSub_ziliao_View: {
        flexDirection: "row",
        alignItems: "center"
    },
    ViewSub_ziliao_View_xian: {
        width: cal(3),
        height: cal(15),
        backgroundColor: "#958cf4",
        marginRight: cal(6)
    },
    ViewSub_ziliao_View_text: {
        color: PublicColor.Public_Text3,
        fontSize: PublicFontSize.PublicFontSize_28
    },
    ViewSub_ziliao_Content: {
        marginTop: cal(5),
    },
    ListViewStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: cal(240),
        paddingLeft: cal(8),
        paddingBottom: cal(10)
    },
    ListViewStyle_View: {
        padding: cal(6),
        paddingLeft: cal(10),
        paddingRight: cal(10),
        backgroundColor: PublicColor.Public_Text8,
        borderRadius: cal(2),
        marginRight: cal(5),
        marginBottom: cal(5),
    },
    ListViewStyle_View_text: {
        fontSize: PublicFontSize.PublicFontSize_24,
        color: PublicColor.Public_Text3
    },
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: cal(22.5),
    },
    btn_image: {
        marginRight: cal(57.5),
    },

});