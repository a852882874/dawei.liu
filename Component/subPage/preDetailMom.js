//
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, InteractionManager, ListView, NetInfo, TouchableOpacity, CameraRoll,
    NativeModules, Modal, Dimensions, ScrollView, Image, AsyncStorage, DeviceEventEmitter, Animated, PanResponder,
    TouchableWithoutFeedback
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import MyIndex from './../page/MyIndex.js';
import One from "./../page/one.js";
import { cal } from './../Common/Cal.js';
import appKey from './../Common/appKey.js';
import RNFetchBlob from "react-native-fetch-blob";
import Jubao from './../subPage/settingSubThree/jubao.js';
import Education from './../Common/education.js';
import LinearGradient from 'react-native-linear-gradient';
const MORENAVI = require('./../image/chat/chatMo.png');
import JMessage from 'jmessage-react-plugin';
const MOREDIAN = require('./../image/sitemap/more.png')
// const MEIGANJUE = require('./../image/sitemap/meiganjue.png');
import _ajax from '../Common/LoginAjax';
import { age } from './../Common/age.js';
const { PublicFontSize } = require("./../Common/FontSize.js")
import Loadding from './../Common/Loadding.js';
const MEIGANJUE = require('./../image/mom/meiganjue.png')
const XIAOXI = require('./../image/mom/xiaoxiDetail.png')
const BUXIHUAN = require('./../image/sitemap/buxihuan.png');
const SIDEMOREMOM = require('./../image/mom/more.png');
const UPDATE = require('./../image/updata.png');
const XIHUAN = require('./../image/sitemap/xihuan.png');
const ZUO = require('./../image/me/zou.png');
const { PublicColor } = require("./../Common/Color.js");
const TOUMING = require('./../image/me/toum.png');
const BACK = require('./../image/me/back.png');
import Swiper from 'react-native-swiper';
const BACKIMGAE = require('./../image/public/backImage.png');
import Chat from './../chat/chat2.js';
const SHIMING = require('./../image/sitemap/shiming1.png')
const ZHIYE = require('./../image/sitemap/zhiye.png')
import tokenImage from './../Common/token.js';
import { CachedImage } from "react-native-img-cache";
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "昵称",
            idName: "sdaas",
            MyUsername: "",
            visible: false,
            appKey: appKey,
            otherName: this.props.username,
            type: this.props.type ? this.props.type : "2",
            data: {},
            myId: '',
            otherId: this.props.id,
            // otherIdIM:this.props.mobileNr,
            Loadding: false,
            picmoreImage: [],
            picmoreImageDetail: [],
            avatarSource2: "",
            avatarSource2panduan: "",
            avatarSourceShenhe: "asasa",
            shield: '屏蔽此人',
            shieldId: '1',
            xihuan: false,
            xihuanDan: false,
            imageSwipt: false,
            UserList: {},
            imageInfo: 0,
            trans: new Animated.ValueXY(),
            trans2: new Animated.ValueXY(),
            picmoreImageDeatil: [],
            swiperNum: 0
        }
        let that = this;
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
    componentDidMount() {
        let that = this;
        InteractionManager.runAfterInteractions(() => {
            // that.ilikeonly_list(that);
            _ajax.get_token("user?targetUserId=" + this.props.id, that.props.navigator, function (res) {
                console.log(res)
                if (res.code == 0) {
                    that.setState({
                        data: res.user,
                        // Loadding: false
                    })
                    if (that.props.username != res.user.nickname && that.props.huidiao) {
                        that.props.updataUsername(that.props.type);
                    }
                }
            })
            _ajax.get_token('match/relation?others=' + that.state.otherId, that.props.navigator, function (res) {
                if (res.relations.by.length == 0 && res.relations.to.length == 0) {

                } else {
                    if (res.relations.to[0][1] != undefined) {
                        that.setState({
                            xihuanDan: true
                        })
                    }
                    if (res.relations.by.length > 0 && res.relations.to.length > 0) {
                        if (res.relations.by[0][1] == 1 && res.relations.to[0][1]) {
                            that.setState({
                                xihuan: true
                            })
                        }
                    }
                }
            })
            AsyncStorage.getItem('UserList', (err, result) => {
                if (JSON.parse(result) != null) {
                    that.setState({
                        myId: JSON.parse(result).UserList.id,
                        UserList: JSON.parse(result).UserList
                    })
                } else {
                    _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                        that.setState({
                            myId: res.user.id,
                        })
                    })
                }
            });
            _ajax.get_token('user/image/list?objectUid=' + this.props.id, that.props.navigator, function (res) {
                console.log(res)
                if (res.code == 0 && res.imageList.length > 0) {
                    let json = [];
                    res.imageList.map((item) => {
                        if (item.usage == 0) {
                            tokenImage.tokenImgDetail(item.uuid, function (res) {
                                that.setState({
                                    picmoreImage: that.state.picmoreImage.concat(res),
                                    picmoreImageDeatil: that.state.picmoreImageDeatil.concat({ uri: res, confirmed: item.confirmed }),
                                    // Loadding: false,
                                })
                            })
                            if (item.confirmed == 4) {
                                json.push(item)
                            }
                        }
                        else if (item.usage == 1) {
                            if (item.confirmed == 4) {
                                tokenImage.tokenImgDetail(item.uuid, function (res) {
                                    that.setState({
                                        avatarSource2: res,
                                        avatarSource2panduan: "11",
                                        Loadding: false
                                    })
                                    if (that.props.uri != that.state.avatarSource2 && that.props.huidiao) {
                                        that.props.updataImage(that.props.type);
                                    }
                                })
                            } else {
                                that.setState({
                                    avatarSourceShenhe: "",
                                    avatarSource2panduan: "11",
                                    Loadding: false
                                })
                            }
                        } else {
                            that.setState({
                                Loadding: false,
                                avatarSource2panduan: "11",
                            })
                        }
                    })
                    that.setState({
                        imageInfo: json.length
                    })
                } else {
                    that.setState({
                        avatarSourceShenhe: "",
                        avatarSource2panduan: "11",
                    })
                }
            })
        })
        return false;
    }

    Imahe() {
        if (this.state.avatarSource2panduan != "") {
            return (
                <Image source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : MORENAVI} style={{ width: cal(77), borderRadius: cal(77), height: cal(77) }} />
            )
        }
    }
    _one() {
        return (
            <View>
                <Image
                    source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : MORENAVI}
                    style={{ height: cal(194), width: width }}
                >
                    <View style={{ width: width, height: cal(194), backgroundColor: "rgba(0,0,0,0.4)" }}>
                        <View style={[{ height: cal(150), paddingTop: cal(44), alignItems: "center" }]}>
                            <View style={{ position: "absolute", top: 0, left: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width, height: cal(44) }}>
                                <TouchableWithoutFeedback
                                    onPress={() => { this.props.navigator.pop() }}
                                >
                                    <View style={{ paddingLeft: cal(15), height: cal(44), justifyContent: "center", paddingRight: cal(30), }}>
                                        <Image source={BACK} style={{ width: cal(10), height: cal(18) }} />
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                            <Animated.View style={{
                                alignItems: "center",
                                transform: [
                                    { translateY: this.state.trans.y },
                                    { translateX: this.state.trans.x },
                                ],
                            }}
                                {...this._panResponder.panHandlers}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: cal(77), borderRadius: cal(77), height: cal(77) }}>
                                        {this.Imahe()}
                                    </View >
                                    {this._Commend()}
                                </View>
                                <Text style={{ color: "#fff", fontWeight: "800", marginTop: cal(10) }}>{this.state.data.nickname ? this.state.data.nickname : ""}</Text>
                                <Text style={{ color: "#fff", fontWeight: "800", marginTop: cal(3) }}>{this.state.data.birthday ? age(this.state.data.birthday, true) : "30岁"}</Text>
                            </Animated.View>
                        </View>
                        {this._idConfirmed()}
                        {this._emailConfirmed()}
                    </View>
                </Image>
            </View>
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
    _emailConfirmed() {
        if (this.state.data.emailConfirmed == 4) {
            return (
                <View style={{ position: "absolute", bottom: cal(35), flexDirection: "row", alignItems: "center", justifyContent: "center", right: cal(15), width: cal(68), borderRadius: cal(2), borderWidth: cal(0.5), borderColor: "#fff", height: cal(18) }}>
                    <Text style={{ fontSize: cal(10), color: "#fff", marginRight: cal(4) }}>职业认证</Text>
                    <Image source={ZHIYE} style={{ width: cal(12), height: cal(11.5) }} />
                </View>
            )
        }
    }
    _idConfirmed() {
        if (this.state.data.idConfirmed == 4) {
            return (
                <View style={{ position: "absolute", bottom: cal(10), flexDirection: "row", alignItems: "center", justifyContent: "center", right: cal(15), width: cal(68), borderRadius: cal(2), borderWidth: cal(0.5), borderColor: "#fff", height: cal(18) }}>
                    <Text style={{ fontSize: cal(10), color: "#fff", marginRight: cal(4) }}>实名认证</Text>
                    <Image source={SHIMING} style={{ width: cal(12), height: cal(12) }} />
                </View>
            )
        }
    }
    _two() {
        return (
            <View style={[preDetail.centerWrap, { paddingBottom: cal(10) }]}>
                <View style={preDetail._twoView}><Text style={preDetail.title_text}>内心独白</Text></View>
                <View style={preDetail._twoView2}>
                    <Text style={preDetail._twoView2_text}>
                        {this.state.data.selfDesc}
                    </Text>
                </View>
            </View>
        )
    }
    _three() {
        let a = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.picmoreImageDeatil)
        return (
            <View style={[preDetail.centerWrap, { justifyContent: "flex-start", paddingBottom: cal(14) }]}>
                <View style={preDetail._twoView}>
                    <View>
                        <Text style={preDetail.title_text}>他的相册</Text>
                        {/* <Text style={preDetail.num}>{this.state.picmoreImageDetail.length}</Text> */}
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
                </View>
            )
        } else {
            return (
                <ListView
                    dataSource={a}
                    renderRow={this._conArr.bind(this)}
                    enableEmptySections={true}
                    contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
                    initialListSize={100}
                />
            )
        }
    }
    _conArr(item, id, key) {
        if (item.confirmed != 4) {
            return (
                <Text>
                </Text>
            )
        }
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

    //下载图片 + 保存图片

    longPressEvent(uri) {
        // alert(uri)
        if (Platform.OS === "ios") {
            let promise = CameraRoll.saveToCameraRoll(img);
            promise.then(function (result) {
                alert('保存成功！地址如下：\n' + result);
            }).catch(function (error) {
                alert('保存失败！\n' + error);
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
                    console.log("file://" + res.path())
                    let promise = CameraRoll.saveToCameraRoll("file://" + res.path(), 'photo');
                    promise.then(function (result) {
                        NativeModules.MyNativeModule.rnCallNative('保存相册成功！')
                    }).catch(function (error) {
                        NativeModules.MyNativeModule.rnCallNative('保存相册失败！')
                        // alert('保存失败！\n' + error);
                    });
                })
        }
    }
    _swipt() {
        if (this.state.picmoreImageDeatil.length != 0) {
            let imageInfo = []
            this.state.picmoreImageDeatil.map((item, key) => {
                console.log(item)
                if (item.confirmed == 4) {
                    imageInfo.push(
                        <TouchableWithoutFeedback key={key}>
                            <View style={{ alignItems: "center", height: height, width: width, justifyContent: "center" }}>
                                <TouchableWithoutFeedback >
                                    <CachedImage source={{ uri: item.uri }} style={{ width: width, height: width, borderRadius: cal(2) }} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.setState({ imageSwipt: false }) }}>
                                    <View style={{ position: "absolute", top: 0, paddingTop: cal(55), left: cal(30), width: width, height: cal(100), }}>
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
            <View style={{ height: height, width: width, zIndex: 9999999999999, backgroundColor: "rgba(0,0,0,1)", position: "absolute", left: 0, top: 0 }}>
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
                            <Text style={preDetail.title_text}>关于他</Text>
                            <Text style={preDetail.num}>100%</Text>
                        </View>
                    </View>
                    <View style={preDetail._fourView2}>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>婚姻状况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education.maritalStatusGet(this.state.data.maritalStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>身高</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.height}cm</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>工作地区</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.addrCity == null ? "未填写" : this.state.data.addrCity}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>月收入</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education._incomeGet(this.state.data.income, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>学历</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education._educationGet(this.state.data.education, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>职业</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.industy == null ? "未填写" : (this.state.data.industy + "-" + this.state.data.occupation)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>家乡</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{this.state.data.hometownProvince}{this.state.data.hometownCity}{this.state.data.hometownProvince == null && this.state.data.hometownCity == null ? "未填写" : ""}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>有没有小孩</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education.childrenStatusGet(this.state.data.childrenStatus, true)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>住房情况</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education.livingStatusGet(this.state.data.livingStatus, true)}</Text>
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
                                <Text style={preDetail._twoView2_text}>{Education.maritalStatusGet(this.state.data.spouseMaritalStatus, false)}</Text>
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
                                <Text style={preDetail._twoView2_text}>
                                    {this.state.data.spouseAddrProvince == null || this.state.data.spouseAddrProvince == 0 ? "不限" : this.state.data.spouseAddrProvince}
                                    {this.state.data.spouseAddrCity}
                                </Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>月收入</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education._incomeGetPer(this.state.data.spouseIncome, false)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>学历</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education._educationGet(this.state.data.spouseEducation, false)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>家乡</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>
                                    {this.state.data.spouseHometownProvince == 0 || this.state.data.spouseHometownProvince == null ? "不限" : this.state.data.spouseHometownProvince}
                                    {this.state.data.spouseHometownCity == 0 || this.state.data.spouseHometownCity == null ? "" : this.state.data.spouseHometownCity}
                                </Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>有没有小孩</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education.childrenStatusGet(this.state.data.spouseChildrenStatus, false)}</Text>
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
                                <Text style={preDetail._twoView2_text}>{Education.smokingStatusGet(this.state.data.spouseSmokingStatus, false)}</Text>
                            </View>
                        </View>
                        <View style={preDetail.flexDirections}>
                            <View style={preDetail.flexDirections_sub1}>
                                <Text style={preDetail._twoView2_text}>是否喝酒</Text>
                            </View>
                            <View>
                                <Text style={preDetail._twoView2_text}>{Education._yinjiuGet(this.state.data.spouseAlcoholStatus, false)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: cal(50), }}>
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
                {this._xihuan_buxihuan()}
                {this._Modal()}
            </View>
        )
    }
    _Modal() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => console.log('onRequestClose...')} >
                <View style={{}}>
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
                                onPress={() => {
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
                                }}
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
                </View>
            </Modal>
        )
    }

    _xihuan_buxihuan() {
        if (this.props.type == "4") {
            return (
                <View style={preDetail.bottom_love2}>
                    <TouchableWithoutFeedback
                        onPress={() => { this._chat_LIKEDan() }}
                    >
                        <View style={[preDetail.bottom_love_View,]}>
                            <Image source={this.state.xihuanDan ? BUXIHUAN : XIHUAN} style={{ width: cal(22), height: cal(22) }} />
                            <Text style={{ color: '#5f5f5f', fontSize: cal(13), marginLeft: cal(6) }}>{this.state.xihuanDan ? "已喜欢" : "喜欢"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
                </View>
            )
        }
        else if (this.props.type == "2") {
            return (
                <View style={preDetail.bottom_love2}>
                    <TouchableWithoutFeedback
                        onPress={() => { this._chat_xihuan() }}
                    >
                        {/* <View style={[preDetail.bottom_love_View, { paddingLeft: cal(70) }]}>
        <Image source={this.props.type == "2" ? MEIGANJUE : BUXIHUAN} style={{ width: cal(27), height: cal(27) }} />
        <Text> {this.props.type == "2" ? "没感觉" : "不喜欢"}</Text>
    </View>
    <View style={preDetail.bottom_love_line}>
    </View> */}
                        <View style={[preDetail.bottom_love_View,]}>
                            <Image source={XIAOXI} style={{ width: cal(22), height: cal(22) }} />
                            <Text style={{ color: '#5f5f5f', fontSize: cal(13), marginLeft: cal(6) }}>发消息</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
                </View>
            )
        }
        else if (this.props.type == "3") {
            return (
                <View style={preDetail.bottom_love2}>
                    {/* <TouchableWithoutFeedback
                        onPress={() => { this._chat_xihuan() }}
                    >
                        <View style={[preDetail.bottom_love_View,]}>
                            <Image source={XIAOXI} style={{ width: cal(22), height: cal(22) }} />
                            <Text style={{ color: '#5f5f5f', fontSize: cal(13), marginLeft: cal(6) }}>发消息</Text>
                        </View>
                    </TouchableWithoutFeedback> */}
                    <TouchableWithoutFeedback onPress={() => { this._chat_LIKE() }}>
                        <View style={[preDetail.bottom_love_View,]}>
                            <Image source={this.state.xihuan ? BUXIHUAN : XIHUAN} style={{ width: cal(22), height: cal(22) }} />
                            <Text style={{ color: '#5f5f5f', fontSize: cal(13), marginLeft: cal(6) }}>{this.state.xihuan ? "已喜欢" : "喜欢"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
                </View>
            )
        }
    }
    _chat_LIKE() {
        // if(this.state.UserList.portraitConfirmed == 5){
        //     NativeModules.MyNativeModule.rnCallNative("你的头像审核不通过~请重新上传头像");
        //     return false
        // }
        if (!this.state.xihuan) {
            let that = this;
            that.setState({
                xihuan: !that.state.xihuan
            })
            let json = {
                "myId": that.state.myId,
                "targetUserId": that.state.otherId
            }
            console.log(json)
            _ajax.post_token("match/like", json, function (res) {
                console.log(res)
                DeviceEventEmitter.emit('userNameDidChange', '通知来了');
            })
        }
    }
    _chat_LIKEDan() {
        // if(this.state.UserList.portraitConfirmed == 5){
        //     NativeModules.MyNativeModule.rnCallNative("你的头像审核不通过~请重新上传头像");
        //     return false
        // }
        if (!this.state.xihuanDan) {
            let that = this;
            that.setState({
                xihuanDan: !that.state.xihuanDan
            })
            let json = {
                "myId": that.state.myId,
                "targetUserId": that.state.otherId
            }
            console.log(json)
            _ajax.post_token("match/like", json, function (res) {
                console.log(res)
                DeviceEventEmitter.emit('userNameDidChange', '通知来了');
                if (res.code == 0) {
                    that.props.yichu(that.props.yichuKey);
                    that.props.navigator.pop();
                } else {
                    that.setState({
                        xihuanDan: !that.state.xihuanDan
                    })
                    that.props.navigator.pop();
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        }
    }
    shield() {
        let that = this;
        let json = {
            "targetUserId": that.state.otherId,
            "block": that.state.shieldId
        }
        if (that.state.shieldId == "1") {
            that.setState({
                shield: "已屏蔽此人",
                shieldId: "0"
            })
        } else {
            that.setState({
                shield: "屏蔽此人",
                shieldId: "1"
            })
        }
        _ajax.post_token("match/block", json, function (res) {
            console.log(res)
        })
    }
    _chat_xihuan() {
        let that = this;
        if (that.props.type == "2") {
            // JMessage.enterConversation({ type: 'single', username: that.state.otherName, appKey: that.state.appKey },
            //     (conversation) => {
            if (that.props.pop) {
                that.props.navigator.pop();
            } else {
                that.props.navigator.push({
                    component: Chat,
                    params: {
                        navigator: that.props.navigator,
                        appKey: that.state.appKey,
                        mobileNr: that.state.data.mobileNr,
                        username: that.state.data.nickname,
                        guanliyuan: false,
                        chong: that.chongxin.bind(that),
                        otherId: this.props.id
                    }
                })
            }
            // }, (error) => {
            //     var code = error.code
            //     var desc = error.description
            // })
        } else {
            that.props.navigator.pop();
            NativeModules.MyNativeModule.rnCallNative("喜欢");
        }
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
        paddingLeft: cal(10)
    },
    _twoView2: {
        flex: 1,
        paddingBottom: cal(12),
        paddingLeft: 0,
        paddingRight: cal(10)
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
        backgroundColor: PublicColor.Public_MomClickBackground,
        marginRight: cal(5)
    },
    flexDirections: {
        flexDirection: "row",
        height: cal(25),
        paddingTop: cal(1)
    },
    num: {
        marginTop: cal(20),
        color: PublicColor.Public_MomClickBackground
    },
    flexDirections_sub1: {
        width: cal(131)
    },
    bottom_love2: {
        width: width,
        height: cal(48),
        position: "absolute",
        bottom: 0,
        left: 0,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        borderTopWidth: cal(2),
        borderTopColor: PublicColor.Public_ViewBackground,
        // elevation:4
    },
    bottom_love3: {
        width: width,
        height: cal(48),
        position: "absolute",
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        borderTopWidth: cal(2),
        borderTopColor: PublicColor.Public_ViewBackground,
        // elevation:4
    },
    bottom_love_View: {
        justifyContent: "space-between",
        alignItems: "center",
        height: cal(48),
        flexDirection: "row",
        paddingLeft: cal(23),
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