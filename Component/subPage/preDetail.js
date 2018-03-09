//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, Modal, InteractionManager, ListView, NetInfo, CameraRoll,
    NativeModules, Dimensions, ScrollView, Image, AsyncStorage, TouchableWithoutFeedback, Animated, PanResponder
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import AppKey from './../Common/appKey.js';
import _ajax from './../Common/LoginAjax.js';
import MyIndex from './../page/MyIndex.js';
import Chat from './../chat/chat2.js';
import { age } from './../Common/age.js';
import Jubao from './../subPage/settingSubThree/jubao.js';
// import One from "./../page/one.js";
const TOUMING = require('./../image/me/toum.png');
import RNFetchBlob from "react-native-fetch-blob";
const { PublicFontSize } = require("./../Common/FontSize.js")
const UPDATE = require('./../image/updata.png');
import Education from './../Common/education.js';
import { cal } from './../Common/Cal.js'
import LinearGradient from 'react-native-linear-gradient';
import tokenImage from './../Common/token.js';
const MORENAVI = require('./../image/chat/chatMo.png');
import JMessage from 'jmessage-react-plugin';
import header from '../Common/Picker';
const MEIGANJUE = require('./../image/sitemap/meiganjue.png')
const BUXIHUAN = require('./../image/sitemap/buxihuan.png')
const XIHUAN = require('./../image/sitemap/xihuan.png')
const SHIMING = require('./../image/sitemap/shiming.png')
import Loadding from './../Common/Loadding.js';
const XIAOXI = require('./../image/sitemap/xiaoxiDetail.png')
const DAZHAOHU = require('./../image/sitemap/dazhaohu.png')
import { CachedImage } from "react-native-img-cache";
const DAZHAOHUED = require('./../image/sitemap/dazhaohued.png')
const MOREDIAN = require('./../image/sitemap/more.png')
const ZUO = require('./../image/me/zou.png');
const BACK = require('./../image/me/back.png');
import Storage from "./../Common/Storage";
const BACKBLOCK = require('./../image/me/back_block.png');
const BACKIMGAE = require('./../image/public/backImage.png');
import Swiper from 'react-native-swiper';
import register from '../quiz/quizText';
const { PublicColor } = require("./../Common/Color.js")
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "昵称",
            idName: "sdaas",
            username: this.props.username,
            otherName: "",
            visible: false,
            Loadding: false,
            type: this.props.type ? this.props.type : "2",
            dazhaohu: this.props.dazhaohu,
            myId: '',
            shield: '屏蔽此人',
            shieldId: '1',
            otherId: this.props.id,
            otherIdIM: this.props.mobileNr,
            data: {},
            dataProps: this.props.item ? this.props.item : "",
            picmoreImage: [],
            picmoreImageDeatil: [],
            avatarSource2: "",
            avatarSourceShenhe: "asasa",
            imageSwipt: false,
            xihuans: true,
            UserList: {},
            imageInfo: 0,
            swiperNum: 0,
            trans: new Animated.ValueXY(),
            trans2: new Animated.ValueXY(),
            disableds:true
        }
        console.log(this.state.dataProps)
        _panResponder: PanResponder;
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, //响应手势
            onPanResponderMove:
                Animated.event(
                    [null, { dx: this.state.trans.x, dy: this.state.trans.y, }] // 绑定动画值
                ),
            onPanResponderRelease: (e) => {//手松开，回到原始位置
                console.log(e.locationX)
                Animated.spring(this.state.trans, { toValue: { x: 0, y: 0 } }
                ).start();
            },
            onPanResponderTerminate: () => {//手势中断，回到原始位置
                Animated.spring(this.state.trans, { toValue: { x: 0, y: 0 } }
                ).start();
            },
        });
    }
    componentWillMount() {

    }
    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this._fetchData();
        });
    }
    //获取数据
    _fetchData() {
        let that = this;
        that._JMessage(that);
        that.ajax(that);
    }
    ajax(that) {
        Storage._getStorage();
        _ajax.get_token('user/image/list?objectUid=' + that.state.otherId, that.props.navigator, function (res) {
            if (res.code == 0 && res.imageList.length > 0) {
                let json = []
                res.imageList.map((item) => {
                    if (item.usage == 0) {
                        tokenImage.tokenImg(item.uuid, function (res) {
                            that.setState({
                                picmoreImage: that.state.picmoreImage.concat(res),
                                picmoreImageDeatil: that.state.picmoreImageDeatil.concat({ uri: res, confirmed: item.confirmed }),
                            })
                        })
                        if (item.confirmed == 4) {
                            json.push(item)
                        }
                    }
                    else if (item.usage == 1) {
                        if (item.confirmed == 4) {
                            tokenImage.tokenImg(item.uuid, function (res) {
                                that.setState({
                                    avatarSource2: res,
                                    avatarSourceShenhe: "dasdasdasa"
                                })
                            })
                        } else {
                            that.setState({
                                avatarSourceShenhe: ""
                            })

                        }
                    }
                })
                that.setState({
                    imageInfo: json.length
                })
            }
        })
        // Storage._load("preDetailImage", that.state.otherId, "preDetailImage", "preDetailImage", function (resStrages) {
        //     if (resStrages == undefined || resStrages == null || resStrages == {} || resStrages.length == 0) {
        //         Storage._load("preDetailImage", that.state.otherId, "preDetailImage", "preDetailImage", function (resStragess) {
        //             that.setState({
        //                 picmoreImage: resStragess,
        //                 picmoreImageDeatil: resStragess
        //             })
        //         })
        //     } else {
        //         that.setState({
        //             picmoreImage: resStrages,
        //             picmoreImageDeatil: resStrages
        //         })
        //     }
        // })

        // Storage._load("preDetailImageList", that.state.otherId, "preDetailImageList", "preDetailImageList", function (resStrages) {
        //     console.log(resStrages)
        //     if (resStrages == "kong") {
        //         Storage._load("preDetailImageList", that.state.otherId, "preDetailImageList", "preDetailImageList", function (resStragess) {
        //             that.setState({
        //                 avatarSource2: resStrages,
        //                 avatarSourceShenhe: resStrages
        //             })
        //         })
        //     } else {
        //         that.setState({
        //             avatarSource2: resStrages,
        //             avatarSourceShenhe: resStrages
        //         })
        //     }
        // })
        _ajax.get_token('user/updatedAt?targetUserIds=' + that.state.otherId, that.props.navigator, function (res) {
            if (res.code == 0) {
                Storage._load("user", that.state.otherId, "other", "other", function (resStrage) {
                    console.log(resStrage)
                    if (resStrage == null) {
                        Storage._load("user", that.state.otherId, "other", "other", function (resStrages) {
                            console.log(resStrages)
                            that.setState({
                                data: resStrages,
                                dataProps: "",
                                disableds : false
                            })
                            if (that.props.huidiao) {
                                if (that.props.username != resStrage.nickname) {
                                    that.props.updataUsername(that.props.type);
                                }
                                if (that.props.uri != that.state.avatarSource2) {
                                    that.props.updataImage(that.props.type);
                                }
                            }

                        })
                    }
                    else if (res.user[0].updatedAt !== resStrage.updatedAt) {
                        Storage._remove("user", that.state.otherId);
                        Storage._load("user", that.state.otherId, "other", "other", function (resStrages) {
                            console.log(resStrages)
                            that.setState({
                                data: resStrages,
                                dataProps: "",
                                disableds : false
                            })
                            if (that.props.huidiao) {
                                if (that.props.username != resStrage.nickname) {
                                    that.props.updataUsername(that.props.type);
                                }
                                if (that.props.uri != that.state.avatarSource2) {
                                    that.props.updataImage(that.props.type);
                                }
                            }
                        })
                    } else {
                        if (that.props.huidiao) {
                            if (that.props.uri != that.state.avatarSource2) {
                                that.props.updataImage(that.props.type);
                            }
                        }
                        that.setState({
                            data: resStrage,
                            dataProps: "",
                            disableds : false
                        })

                    }
                });

            }
        })
        AsyncStorage.getItem('UserList', (err, result) => {
            if (JSON.parse(result) != null) {
                that.setState({
                    myId: JSON.parse(result).UserList.id,
                    UserList: JSON.parse(result).UserList,
                })
            } else {
                _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                    userStart = res.user;
                    that.setState({
                        myId: res.user.id,
                        UserList: JSON.parse(result).UserList,
                    })

                })
            }
        });
        // }
        // });
        _ajax.get_token('user/self_manage', that.props.navigator, function (res) {
            that.setState({
                myId: res.user.id,
            })
        })
    }
    _JMessage(that) {
        JMessage.getMyInfo((UserInf) => {
            if (UserInf.username != "") {
                that.setState({
                    otherName: UserInf.username
                })
            } else {
            }
        })
    }
    _one() {
        return (
            < Image
                source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : MORENAVI}
                style={{
                    // height: this.state.trans2.y,
                    // width: this.state.trans2.x,
                    height: cal(194),
                    width: width,
                }}
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.6)", width: width, height: cal(194) }}>
                    <View style={[{ height: cal(150), paddingTop: cal(44), alignItems: "center" }]}>
                        <View style={{ position: "absolute", top: 0, left: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width, height: cal(44) }}>
                            <TouchableWithoutFeedback
                                onPress={() => { this.props.navigator.pop() }}
                            >
                                <View style={{ paddingLeft: cal(15), height: cal(44), justifyContent: "center", paddingRight: cal(30), }}>
                                    <Image source={BACK} style={{ width: cal(10), height: cal(18) }} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback >
                                <View style={{ paddingRight: cal(20) }}>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* <View style={{ width: cal(77), borderRadius: cal(77), height: cal(77) }} ></View> */}
                        <Animated.View style={{
                            // width: cal(77),
                            // borderRadius: cal(77),
                            // height: cal(77),
                            // backgroundColor: 'red',
                            // position: "absolute",
                            // top: cal(40),
                            // // right: 0,
                            // // bottom: 0,
                            // left: width / 2 - cal(40),
                            // zIndex: 99999999999999999999999999999,
                            alignItems: "center",
                            transform: [
                                { translateY: this.state.trans.y },
                                { translateX: this.state.trans.x },
                            ],
                        }}
                            {...this._panResponder.panHandlers}
                        >
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: cal(77), borderRadius: cal(77), height: cal(77), backgroundColor: PublicColor.Public_ClickBackground }}>
                                    <Image source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : MORENAVI} style={{ width: cal(77), borderRadius: cal(77), height: cal(77) }} />
                                </View>
                                {this._Commend()}
                            </View>
                            <Text style={{ color: "#fff", fontWeight: "800", marginTop: cal(10) }}>{this.state.dataProps != "" ? this.state.dataProps.nickname :(this.state.data.nickname ? this.state.data.nickname : "")}</Text>
                            <Text style={{ color: "#fff", fontWeight: "800", marginTop: cal(3) }}>{this.state.dataProps != "" ? age(this.state.dataProps.birthday, true) :this.state.data.birthday ? age(this.state.data.birthday, true) : "30岁"}</Text>
                        </Animated.View>
                    </View>
                    {this._idConfirmed()}
                </View>
            </Image>

        )
    }
    _Commend() {
        if (this.state.avatarSourceShenhe == "") {
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
    _idConfirmed() {
        if (this.state.data.idConfirmed == 4) {
            return (
                <View style={{ position: "absolute", bottom: cal(10), flexDirection: "row", alignItems: "center", justifyContent: "center", right: cal(15), width: cal(68), borderRadius: cal(2), borderWidth: cal(0.5), borderColor: "#fff", height: cal(18) }}>
                    <Text style={{ fontSize: cal(10), color: "#fff", marginRight: cal(4) }}>实名认证</Text>
                    <View>
                        <Image source={SHIMING} style={{ width: cal(10), height: cal(10) }} />
                    </View>
                </View>
            )
        }
    }
    _two() {
        return (
            <View style={preDetail.centerWrap}>
                <View style={[preDetail._twoView, this.state.data.selfDesc == null ? { paddingBottom: cal(11) } : ""]}>
                    <Text style={preDetail.title_text}>内心独白</Text>
                </View>
                <View style={[preDetail._twoView2, { paddingTop: cal(2) }]}>
                    <Text style={[preDetail._twoView2_text]}>
                        {this.state.dataProps != "" ? this.state.dataProps.selfDesc : this.state.data.selfDesc}
                    </Text>
                </View>
            </View>
        )
    }
    _three() {
        let a = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.picmoreImageDeatil)
        return (
            <View style={[preDetail.centerWrap, { justifyContent: "flex-start", paddingBottom: cal(11) }]}>
                <View style={preDetail._twoView}>
                    <View>
                        <Text style={preDetail.title_text}>她的相册</Text>
                        {/* <Text style={preDetail.num}>{this.state.picmoreImageDeatil.length}</Text> */}
                        <Text style={preDetail.num}>{this.state.imageInfo}</Text>
                    </View>
                </View>
                <View style={preDetail._threeView2}>
                    {this._image(a)}
                </View>
            </View>
        )
    }
    _image(a) {
        if (this.state.picmoreImageDeatil.length == 0) {
            return (
                <View>
                    {/* <Text style={{fontSize:cal(12)}}>暂无照片</Text> */}
                </View>
            )
        } else {
            return (
                <ListView
                    contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
                    dataSource={a}
                    renderRow={this._conArr.bind(this)}
                    enableEmptySections={true}
                    initialListSize={100}
                />
            )
        }
    }
    _conArr(item, id, key) {
        if (item.confirmed != 4) {
            return (
                <View>
                </View>
            )
        } else {
            return (
                <View style={preDetail._threeView2_sub}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                imageSwipt: true,
                                swiperNum: key
                            })
                        }}
                    >
                        <CachedImage source={{ uri: item.uri }} style={{ width: cal(63), height: cal(63), borderRadius: cal(8), }} />
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
    //下载图片 + 保存图片

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
            RNFetchBlob
                .config({
                    fileCache: true,
                    appendExt : 'png'
                })
                .fetch('GET', uri, {
                })
                .then((res) => {
                    console.log(res.path())
                    let promise = CameraRoll.saveToCameraRoll("file://" + res.path());
                    promise.then(function (result) {
                        console.log(result)
                        NativeModules.MyNativeModule.rnCallNative('保存相册成功！')
                        // NativeModules.MyNativeModule.rnCallNative('保存成功！地址如下：\n' + result)
                    }).catch(function (error) {
                        // alert('保存失败！\n' + error);
                        NativeModules.MyNativeModule.rnCallNative('保存相册失败！')
                    });
                })
        }
    }
    _swipt() {
        if (this.state.picmoreImage.length != 0) {
            let imageInfo = []
            this.state.picmoreImageDeatil.map((item, key) => {
                console.log(item)
                if (item.confirmed == 4) {
                    imageInfo.push(
                        <TouchableWithoutFeedback key={key}>
                            <View style={{ alignItems: "center", height: height, width: width, justifyContent: "center" }}>
                                <TouchableWithoutFeedback>
                                    <Image style={{ width: width, height: width, borderRadius: cal(2) }} source={{ uri: item.uri }} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.setState({ imageSwipt: false }) }}>
                                    <View style={{ position: "absolute", top: 0, paddingTop: cal(55), left: cal(30), width: width / 2, height: cal(100), }}>
                                        <Image source={BACKIMGAE} style={{ width: cal(18), height: cal(18) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.longPressEvent(item.uri)}
                                >
                                    <View style={{ position: "absolute", top: 0, alignItems: "flex-end", paddingTop: cal(55), right: cal(30), width: width / 5, height: cal(100), }}>
                                        <Image source={UPDATE} style={{ width: cal(19), height: cal(18) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                } else {
                }
            })

            return imageInfo
        }
    }
    //点击照片弹出   浏览图片
    _imageSwipt() {
        if (!this.state.imageSwipt || this.state.picmoreImage.length == 0) return false;
        return (
            <View style={{ height: height + cal(1111), width: width, zIndex: 99999999999, backgroundColor: "rgba(0,0,0,1)", position: "absolute", left: 0, top: 0 }}>
                <Swiper
                    height={width}
                    showsButtons={false}
                    index={parseInt(this.state.swiperNum)}
                    dot={<View style={{           //未选中的圆点样式
                        backgroundColor: '#8e8d8b',
                        width: cal(7),
                        height: cal(7),
                        borderRadius: cal(7),
                        marginLeft: cal(9),
                        marginRight: cal(9),
                        marginTop: cal(50),
                        marginBottom: cal(60.5),
                    }} />}
                    activeDot={<View style={{    //选中的圆点样式
                        backgroundColor: '#fff',
                        width: cal(7),
                        height: cal(7),
                        borderRadius: cal(7),
                        marginLeft: cal(9),
                        marginRight: cal(9),
                        marginTop: cal(50),
                        marginBottom: cal(60.5),
                    }} />}
                >
                    {this._swipt()}
                </Swiper>
            </View>
        )
    }
    _four() {
        return (
            <View style={{}}>
                <View style={[preDetail.centerWrap, { justifyContent: "flex-start", paddingBottom: cal(16) }]}>
                    <View style={preDetail._twoView}>
                        <View>
                            <Text style={preDetail.title_text}>关于她</Text>
                            <Text style={preDetail.num}>
                                100%
                            </Text>
                        </View>
                    </View>
                    <View style={preDetail._fourView2}>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>婚姻状况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.dataProps != "" ?
                                    Education.maritalStatusGet(this.state.dataProps.maritalStatus, true) :
                                    this.state.data.maritalStatus == null ? "未填写" : Education.maritalStatusGet(this.state.data.maritalStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>身高</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.dataProps != "" ? this.state.dataProps.height : this.state.data.height}cm</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>工作地区</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>
                                    {this.state.dataProps != "" ? this.state.dataProps.addrCity : (this.state.data.addrCity == null ? "未填写" : this.state.data.addrCity)}
                                </Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>月收入</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>
                                    {this.state.dataProps != "" ? Education._incomeGet(this.state.dataProps.income, false) : Education._incomeGet(this.state.data.income, false)}
                                </Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>学历</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>
                                    {
                                        this.state.dataProps != "" ? Education._educationGet(this.state.dataProps.education, true) :
                                            Education._educationGet(this.state.data.education, true)
                                    }</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>职业</Text>
                            </View>
                            <View>
                                {/* (this.state.data.industy + "-" + this.state.data.occupation) */}
                                <Text style={preDetail._twoView2_text}>{this.state.dataProps != "" ? (this.state.dataProps.occupation == null ? "未填写" : this.state.dataProps.occupation) : this.state.data.industy == null ? "未填写" : (this.state.data.occupation)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>家乡</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>
                                    {this.state.dataProps != "" ? this.state.dataProps.hometownProvince : this.state.data.hometownProvince}
                                    {this.state.dataProps != "" ? this.state.dataProps.hometownCity : this.state.data.hometownCity}
                                    {(this.state.dataProps.hometownProvince == null && this.state.dataProps.hometownCity == null) ?
                                        (this.state.data.hometownProvince == null && this.state.data.hometownCity == null ? "未填写" : "")
                                        : ""}
                                </Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>有没有小孩</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{
                                    this.state.dataProps != "" ? Education.childrenStatusGet(this.state.dataProps.childrenStatus, true) :
                                        Education.childrenStatusGet(this.state.data.childrenStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>住房情况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{
                                    this.state.dataProps != "" ?
                                        Education.livingStatusGet(this.state.dataProps.livingStatus, true) :
                                        Education.livingStatusGet(this.state.data.livingStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>买车情况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education.carOwingStatusGet(this.state.data.carOwingStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>是否吸烟</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education.smokingStatusGet(this.state.data.smokingStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>是否喝酒</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education._yinjiuGet(this.state.data.alcoholStatus, true)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    //择偶条件
    _six() {
        return (
            <View style={{}}>
                <View style={[preDetail.centerWrap, { justifyContent: "flex-start", paddingBottom: cal(16) }]}>
                    <View style={preDetail._twoView}>
                        <View>
                            <Text style={preDetail.title_text}>择偶条件</Text>
                            <Text style={preDetail.num}>100%</Text>
                        </View>
                    </View>
                    <View style={preDetail._fourView2}>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>婚姻状况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseMaritalStatus == null ? "不限" : Education.maritalStatusGet(this.state.data.spouseMaritalStatus, false)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>身高</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseHeightMin == null || this.state.data.spouseHeightMin == 0 ? "不限" : (this.state.data.spouseHeightMax == null || this.state.data.spouseHeightMax == 0 ? (this.state.data.spouseHeightMin == null ? '' : this.state.data.spouseHeightMin + "cm" + "以上")
                                    : this.state.data.spouseHeightMin + "-" + this.state.data.spouseHeightMax + "cm")}
                                </Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>工作地区</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseAddrProvince == null || this.state.data.spouseAddrProvince == 0 ? "不限" : this.state.data.spouseAddrProvince}
                                    {this.state.data.spouseAddrCity}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>月收入</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseIncome == null ? "不限" : Education._incomeGetPer(this.state.data.spouseIncome, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>学历</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseEducation == null ? "不限" : Education._educationGet(this.state.data.spouseEducation, false)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>家乡</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>
                                    {this.state.data.spouseHometownProvince == 0 || this.state.data.spouseHometownProvince == null ? "不限" : this.state.data.spouseHometownProvince}
                                    {this.state.data.spouseHometownCity == 0 || this.state.data.spouseHometownCity == null ? "" : this.state.data.spouseHometownCity}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>有没有小孩</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseChildrenStatus == null ? "不限" : Education.childrenStatusGet(this.state.data.spouseChildrenStatus, false)}</Text>
                            </View>
                        </View>
                        {/* <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>住房情况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseLivingStatus == null ? "不限" : Education.livingStatusGet(this.state.data.spouseLivingStatus, false)}</Text>
                            </View>
                        </View> */}
                        {/* <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>买车情况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseCarOwingStatus == null ? "不限" : Education.carOwingStatusGet(this.state.data.spouseCarOwingStatus, false)}</Text>
                            </View>
                        </View> */}
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>是否吸烟</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseSmokingStatus == null ? "不限" : Education.smokingStatusGet(this.state.data.spouseSmokingStatus, false)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>是否喝酒</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.spouseAlcoholStatus == null ? "不限" : Education._yinjiuGet(this.state.data.spouseAlcoholStatus, false)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: cal(50), backgroundColor: PublicColor.Public_ViewBackground }}>
                </View>
            </View>
        )
    }
    chongxin() { }
    Loadding() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} />
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                {this.Loadding()}
                {this._imageSwipt()}
                {/* <Animated.View style={{
                    width: cal(77),
                    borderRadius: cal(77),
                    height: cal(77),
                    backgroundColor: 'red',
                    position: "absolute",
                    top: this.state.top,
                    left: this.state.left,
                    zIndex: 99999999999999999999999999999,
                }}
                    {...this._panResponder.panHandlers}
                >
                    <CachedImage source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : MORENAVI} style={{ width: cal(77), borderRadius: cal(77), height: cal(77) }} />
                </Animated.View> */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    {this._one()}
                    <View style={{ paddingLeft: cal(10), paddingRight: cal(10), marginTop: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}>
                        <View style={{ backgroundColor: "#fff" }}>
                            {this._two()}
                            <View style={{ height: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                            {this._three()}
                            <View style={{ height: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                            {this._four()}
                            <View style={{ height: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                            {this._six()}
                            <View style={{ height: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}></View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[this.props.type == 1 ? preDetail.bottom_love : preDetail.bottom_loveDan, { backgroundColor: "#fcfcfc", zIndex: 99, position: "absolute", bottom: 0 }]}>
                    <TouchableWithoutFeedback
                    disabled = {this.state.disableds}
                        onPress={() => {
                            let that = this;
                            // this.state.userStart.portraitConfirmed == 5
                            // if (that.state.UserList.portraitConfirmed == 5) {
                            //     NativeModules.MyNativeModule.rnCallNative("你的头像审核不通过~请重新上传头像");
                            //     return false
                            // }
                            switch (this.props.type) {
                                case "1":
                                    if (!this.props.pop) {
                                        that.props.navigator.push({
                                            component: Chat,
                                            params: {
                                                navigator: that.props.navigator,
                                                username: this.state.data.nickname,
                                                mobileNr: this.state.data.mobileNr,
                                                appKey: AppKey,
                                                guanliyuan: false,
                                                otherId: this.state.otherId,
                                                // myId:that.state.otherId ,
                                                chong: this.chongxin.bind(that),

                                            }
                                        })
                                    } else {
                                        this.props.navigator.pop();
                                    }
                                    break;
                                case "2":
                                    if (that.state.xihuans) {
                                        NativeModules.MyNativeModule.rnCallNative("添加到相互喜欢列表");
                                        let that = this;
                                        let json = {
                                            "myId": that.state.myId,
                                            "targetUserId": this.state.otherId
                                        }
                                        that.setState({
                                            xihuans: !that.state.xihuans
                                        })
                                        console.log(json)
                                        _ajax.post_token("match/like", json, function (res) {
                                            console.log(res)
                                            if (res.code == 0) {
                                                console.log(that.state.otherIdIM)
                                                JMessage.sendTextMessage({
                                                    type: 'single', username: that.state.otherIdIM, appKey: AppKey,
                                                    text: "我同意了~开始聊天吧", extras: { sysMsgType: "tongyi", myId: typeof that.state.myId == "string" ? that.state.myId : JSON.stringify(that.state.myId), otherId: typeof that.state.otherId == "string" ? that.state.otherId : JSON.stringify(that.state.otherId) }, messageSendingOptions: JMessage.messageSendingOptions
                                                },
                                                    (msg) => {
                                                        console.log(msg)
                                                        that.props.xihuanShuaixin(1)
                                                    }, (error) => {
                                                        console.log(error)
                                                        var code = error.code
                                                        var desc = error.description
                                                    })
                                            } else {

                                            }
                                        })
                                    }
                                    break;
                                case "3":
                                    if (!this.state.dazhaohu) {
                                        let json = {
                                            "myId": that.state.myId,
                                            "targetUserId": this.state.otherId
                                        }
                                        // 
                                        NativeModules.MyNativeModule.rnCallNative("你的资料已经发送给对方...");
                                        this.setState({
                                            dazhaohu: true
                                        })
                                        console.log(json)
                                        // if (res.code == 0) {
                                        console.log(that.state.otherIdIM)
                                        let array = ["你好，希望没有打扰到你，不知能否认识一下？", "看完你的资料觉得特别优秀，情不自禁打个招呼。", "我想认识你，第一句是假的，第二句也是假的。"]
                                        that.props.updetadazhaohu(that.state.dazhaohu, that.props.item)
                                        JMessage.sendTextMessage({
                                            type: 'single', username: that.state.otherIdIM, appKey: AppKey,
                                            text: array[Math.floor(Math.random() * array.length)], extras: { sysMsgType: 'zhaohu', otherId: JSON.stringify(that.state.otherId), myId: JSON.stringify(that.state.myId) }, messageSendingOptions: JMessage.messageSendingOptions
                                        },
                                        (msg) => {
                                            let json = {
                                                "myId": that.state.myId,
                                                "targetUserId": that.state.otherId
                                            }
                                            _ajax.post_token("match/hello", json, function (res) {
                                                that.setState({
                                                    dazhaohu: true
                                                })
                                            })
                                        }, (error) => {
                                            that.props.updetadazhaohu(!that.state.dazhaohu, that.props.item)
                                                console.log(error)
                                            })
                                    }
                                    break;
                            }
                        }}
                    >
                        <View style={this.props.type == "1" ? preDetail.bottom_love_View : preDetail.bottom_love_ViewDan}>
                            <Image source={this.props.type == "1" ? XIAOXI : this.props.type == 2 ? (this.state.xihuans ? XIHUAN : BUXIHUAN) : (this.state.dazhaohu ? DAZHAOHUED : DAZHAOHU)} style={{ width: cal(22), height: cal(22) }} />
                            <Text style={{ color: "#5f5f5f", fontSize: cal(13), marginLeft: cal(4) }}> {this.props.type == "1" ? "发消息" : (this.props.type == "2" ? this.state.xihuans ? "喜欢" : "已喜欢" : (this.state.dazhaohu ? "已打过招呼" : "打招呼"))}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this._jubao()}
                </View>
                {this._Modal()}
            </View>
        )
    }
    _jubao() {
        if (this.props.type == "1") {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({
                            visible: true
                        })
                    }}
                >
                    <View style={{ justifyContent: 'center', position: "absolute", right: cal(25), top: 0, top: 0, height: cal(45), width: cal(100), alignItems: "flex-end" }}>
                        <Image source={MOREDIAN} style={{ width: cal(20), height: cal(5) }} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    _Modal() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => console.log('onRequestClose...')} >
                <View style={{}}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                visible: false
                            })
                        }}
                    >
                        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: height }}>
                            <View style={{ position: "absolute", bottom: 0, width: width, }}>
                                {/* <TouchableWithoutFeedback
                                    onPress={() => this.shield()}
                                >
                                    <View style={{ height: cal(55), paddingLeft: cal(10), paddingRight: cal(10) }}>
                                        <View style={{ height: cal(55), backgroundColor: "#fff", borderRadius: cal(4), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                            <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>{this.state.shield}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ height: cal(10) }}></View> */}
                                <TouchableWithoutFeedback
                                    onPress={() => this.jubao()}
                                >
                                    <View style={{ height: cal(55), paddingLeft: cal(10), paddingRight: cal(10) }}>
                                        <View style={{ height: cal(55), backgroundColor: "#fff", borderRadius: cal(4), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                            <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>举报此人</Text>
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
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }
    //举报
    jubao() {
        this.setState({
            visible: false
        })
        this.props.navigator.push({
            component: Jubao,
            params: {
                navigator: this.props.navigator,
                id: this.state.otherId,
                name: this.state.data.nickname

            }
        })
    }

}
let preDetail = StyleSheet.create({
    centerWrap: {
        borderWidth: cal(1),
        borderColor: "#dbdbdb",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: cal(14),
        // elevation: 1
    },
    _twoView: {
        width: cal(76),
        // alignItems: "center"，
        paddingLeft: cal(10)
    },
    _twoView2: {
        flex: 1,
        paddingRight: cal(10),
        paddingBottom: cal(12),
        paddingLeft: 0,
        // paddingTop:cal(4)
    },
    _twoView2_text: {
        fontSize: cal(12),
        color: "#828282"
    },
    _threeView2: {
        flexDirection: "row"
    },
    _threeView2_sub: {
        width: cal(63),
        height: cal(63),
        borderRadius: cal(8),
        backgroundColor: PublicColor.Public_ViewBackground,
        marginRight: cal(5)
    },
    flexDirections: {
        flexDirection: "row",
        height: cal(25),
        paddingTop: cal(1)
    },
    num: {
        marginTop: cal(20),
        color: PublicColor.Public_ClickBackground,
        fontSize: cal(20)
    },
    flexDirections_sub1: {
        width: cal(131)
    },
    bottom_love: {
        width: width,
        height: cal(48),
        position: "absolute",
        bottom: 0,
        zIndex: 9999,
        left: 0,
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: cal(2),
        borderTopColor: PublicColor.Public_ViewBackground,
        // elevation:4
    },
    bottom_loveDan: {
        width: width,
        height: cal(48),
        position: "absolute",
        bottom: 0,
        zIndex: 9999,
        left: 0,
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: cal(2),
        borderTopColor: PublicColor.Public_ViewBackground,
    },
    bottom_love_View: {
        justifyContent: "center",
        alignItems: "center",
        height: cal(48),
        paddingLeft: cal(23),
        flexDirection: "row",
    },
    bottom_love_ViewDan: {
        justifyContent: "center",
        alignItems: "center",
        height: cal(48),
        flexDirection: "row",
    },
    bottom_love_line: {
        width: cal(1),
        height: cal(56),
        backgroundColor: "#ddd"
    },
    title_text: {
        fontSize: cal(14),
        color: "#5f5f5f"
    }
})