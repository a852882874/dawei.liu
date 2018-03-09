import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Modal, NativeModules,
    TouchableOpacity, Image, Dimensions, ScrollView, ListView,
    TouchableWithoutFeedback, TextInput, Alert, InteractionManager, DeviceEventEmitter,
    AsyncStorage
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import Loadding from './../Common/Loadding.js';
import { cal } from './../Common/Cal.js';
import tokenImage from './../Common/token.js';
import Pickers from 'react-native-picker';
const BACK = require('./../image/me/back.png');
import JMessage from 'jmessage-react-plugin';
const { PublicColor } = require("./../Common/Color.js")
import Swiper from 'react-native-swiper';
import PickerCity from './../Common/PickerCity.js';
const BACKGROUNDMOM = require('./../image/public/backgroundMom.png');
import { CachedImage } from "react-native-img-cache";
import PickerAlert from './../Common/Picker.js';
import Education from './../Common/education.js';
// import PicMore from './subFile/picMore.js';
const MAN = require("./../image/quize/man.png");
const ZUO = require('./../image/mom/zou.png');
const ZILIAO = require('./../image/public/ziliao.png');
const DELIMAGE = require('./../image/public/delImage.png');
const BACKIMGAE = require('./../image/public/backImage.png');
const BACKBLOCK = require('./../image/me/back_block.png');
import Nicheng from './subFile/nicheng.js';
const { PublicFontSize } = require("./../Common/FontSize.js")
// import Modal from 'react-native-simple-modal';
import { connect, Provider } from 'react-redux';
import { plus } from '../../redux/action';
import { getStore } from '../../redux/configureStore';
import ImagePicker from 'react-native-image-crop-picker';
import _ajax from '../Common/LoginAjax';
var ImagePickerAVAR = require('react-native-image-picker');
const _this = {};
const thatPic = {};
let options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    width: 150,
    height: 150,
    // customButtons: [
    //     { name: 'fb', title: 'Choose Photo from Facebook' },
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let userStart = {}
export default class myProfile extends Component {
    constructor(props) {
        super(props);
        thatPic = this;
        this.state = {
            avatarSource: this.props.avatarThumbPathImage ? this.props.avatarThumbPathImage : "",//头像
            avatarSourceBase64: "",
            avatarSourceJMessage: "",
            tabQie: 1,
            open: false,
            openNum: 1,
            openName: "昵称",
            offset: 0,
            Loadding: false,
            avatarSource2: "",
            scrollStart: 0,
            picmoreImage: [],//相册多选
            picmoreImageBase64: [],
            picmoreImageStart: [],
            imageSwipt: false,
            tishi: "",
            imageSwiptIndex: 0,
            visibleNum: 0,
            visible_touxiang: false,
            datasource: [{ "name": "liu" }, { "name": "zhang" }, { "name": "liu" }, { "name": "zhang" }],
            data1: [{ "name": "昵称" }, { "name": "性别" }, { "name": "生日" }, { "name": "身高" },
            { "name": "内心独白" }
            ],
            EndData: [{ "name": "家乡", },
            { "name": "职业" },
            { "name": "月收入" },
            { "name": "工作地区" },
            { "name": "学历" },
            { "name": "婚姻状况" },
            { "name": "有没有小孩" },
            { "name": "住房情况" },
            { "name": "买车情况" },
            // { "name": "接受异地恋" },
            { "name": "吸烟情况" },
            { "name": "饮酒情况" }
            ],
            SubData1: [{ "name": "年龄", "state": "请选择" }, { "name": "身高", "state": "请选择" }, { "name": "月收入", "state": "请选择" }, { "name": "婚姻状况", "state": "请选择" },
            { "name": "工作地点", "state": "请选择" }
            ],
            SubData2: [{ "name": "家乡", "state": "请选择" }, { "name": "学历", "state": "请选择" }, { "name": "有没有小孩", "state": "请选择" }, { "name": "是否吸烟", "state": "请选择" },
            { "name": "是否喝酒", "state": "请选择" }
            ],
            visible: false,
            ifChoose: false,
            content: "",
            picmoreImageSheng: [],
            avatarThumbPathImage2: {},
            userEd2: {},
            userStart: [],
            LoaddingStart: false,
            imageList: [],
            jsonData: {},
            avatarSource2ed: "",
            contemts: ""
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._fetchData();
        });
    }
    componentWillUnmount() {
        Pickers.hide();
        this.timessss && clearTimeout(this.timessss)
    }
    _fetchData() {
        let that = this;
        AsyncStorage.getItem('UserList', (err, result) => {
            if (JSON.parse(result) != null) {
                console.log(JSON.parse(result).UserList)
                that.setState({
                    userStart: JSON.parse(result).UserList,
                    userEd2: JSON.parse(result).UserList,
                    contemts: JSON.parse(result).UserList.nickname,
                })
            } else {
                _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                    console.log(res)
                    userStart = res.user;
                    that.setState({
                        userStart: userStart,
                        userEd2: res.user,
                        contemts: JSON.parse(result).UserList.nickname,
                    })

                })
            }
        });
        AsyncStorage.getItem('Image', (err, result) => {
            console.log(JSON.parse(result))
            if (JSON.parse(result) != null) {
                that.setState({
                    avatarSource2: JSON.parse(result),
                    LoaddingStart: true
                })
            } else {
                _ajax.get_token("user/image/list", that.props.navigator, function (res) {
                    if (res.code == 0 && res.imageList.length > 0) {
                        res.imageList.map((item) => {
                            if (item.usage == 1) {
                                // let uri = tokenImage(item.uuid)
                                // console.log(tokenImage(item.uuid))
                                tokenImage.tokenImg(item.uuid, function (res) {
                                    console.log(res)
                                    that.setState({
                                        avatarSource2: res,
                                        LoaddingStart: true
                                    })
                                })

                            }
                        })

                    } else {
                        that.setState({
                            LoaddingStart: true,
                            avatarSource2: "",
                        })
                    }

                })

            }
        })
        _ajax.get_token("user/image/list", that.props.navigator, function (res) {
            console.log(res);
            if (res.code == 0 && res.imageList.length > 0) {
                that.setState({
                    imageList: res.imageList
                })
                res.imageList.map((item) => {
                    if (item.usage == 0) {
                        tokenImage.tokenImg(item.uuid, function (res) {
                            that.setState({
                                picmoreImageSheng: that.state.picmoreImageSheng.concat({ uri: res, confirmed: item.confirmed }),
                                picmoreImage: that.state.picmoreImage.concat(res),
                                picmoreImageStart: that.state.picmoreImageStart.concat(res),
                                LoaddingStart: true
                            })
                        })
                    }
                })

            } else {
                that.setState({
                    LoaddingStart: true
                })
            }

        })

    }

    _tabQieHuan(Rieid) {
        Pickers.hide();
        this.setState({
            tabQie: Rieid
        })
    }
    isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
    _tabQie() {
        return (
            <Image
                source={BACKGROUNDMOM}
                style={[{ width: width, height: cal(44) }]}
            >
                <View style={[myProfileStyle.tabQieWrap, { backgroundColor: "rgba(0,0,0,0)" }]}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log(this.state.jsonData, this.state.picmoreImageBase64.length, this.state.avatarSource2ed != '');
                            if (!this.isEmptyObject(this.state.jsonData) || this.state.picmoreImageBase64.length > 0 || this.state.avatarSource2ed != '') {
                                Alert.alert(
                                    '',
                                    '是否放弃已修改内容 ?',
                                    [
                                        { text: '取消', onPress: () => console.log(), style: 'cancel' },
                                        {
                                            text: '确定', onPress: () => {
                                                this.props.navigator.pop()
                                            }
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            } else {
                                this.props.navigator.pop()
                            }
                        }}
                    >
                        <View style={{ paddingLeft: cal(15), paddingRight: cal(10), height: cal(40), justifyContent: "center" }}>
                            <Image source={BACK} style={{ width: cal(10), height: cal(18) }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={myProfileStyle.SubtabQieWrap}>
                        <TouchableWithoutFeedback
                            onPress={() => this._tabQieHuan(1)}
                        >
                            <View style={myProfileStyle.tabQieWrapViewOne}>
                                <Text style={this.state.tabQie == 1 ? myProfileStyle.tabQieWrapViewOneTextnan : myProfileStyle.tabQieWrapViewOneText}>基本资料</Text>
                                <View style={this.state.tabQie == 1 ? myProfileStyle.tabQieWrapViewLine : myProfileStyle.tabQieWrapViewLine2}></View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => this._tabQieHuan(2)}
                        >
                            <View style={myProfileStyle.tabQieWrapViewOne}>
                                <Text style={this.state.tabQie == 2 ? myProfileStyle.tabQieWrapViewOneTextnan : myProfileStyle.tabQieWrapViewOneText}>择偶条件</Text>
                                <View style={this.state.tabQie == 2 ? myProfileStyle.tabQieWrapViewLine : myProfileStyle.tabQieWrapViewLine2}></View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableOpacity
                        onPress={() => this._sentTiJiao()}
                    >
                        <View style={{ paddingRight: cal(20) }}>
                            <Text style={{ color: "#fff", fontSize: cal(14) }}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Image>

        )
    }
    _content() {
        if (this.state.tabQie == 1) {
            return (
                <View>
                    <View style={myProfileStyle.contentStyle}>
                        {this._contentSubOne()}
                        {this._contentSubTwo()}
                        {this._contentSubThree()}
                        {this._contentSubFour()}
                    </View>
                </View>
            )
        } else {
            // 第二页  择偶条件
            return (
                <View>
                    <View style={[myProfileStyle.contentStyle, { marginTop: 0 }]}>
                        {this._contentSubFuTwo_One()}
                        {this._contentSubFuTwo_Two()}
                    </View>
                </View>
            )
        }
    }




    // 第二页  择偶条件


    //  择偶条件   第一个View

    _contentSubFuTwo_Ones(item) {
        return (
            <TouchableOpacity
                onPress={() => this.PickePublic(item, 2)}
            >
                <View style={myProfileStyle._contentSubThree_oneWRAP}>
                    <View style={myProfileStyle._contentSubThree_one}>
                        <Text style={myProfileStyle._contentSubThree_oneText}>{item.name}</Text>
                        <View style={myProfileStyle._contentSubThree_one_view}>
                            {this._data2_user(item)}
                            <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _contentSubFuTwo_One() {
        let SubData1 = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.SubData1);
        return (
            <View style={myProfileStyle._contentSubThree}>
                <ListView
                    dataSource={SubData1}
                    renderRow={this._contentSubFuTwo_Ones.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }
    _contentSubFuTwo_Two() {
        let SubData2 = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.SubData2);
        return (
            <View style={myProfileStyle._contentSubThree}>
                <ListView
                    dataSource={SubData2}
                    renderRow={this._contentSubFuTwo_Ones.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }

















    //第一页
    // 头像
    ImagePickers() {
        this.setState({
            visible_touxiang: true
        })
    }

    // 第一页
    _contentSubOne() {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.ImagePickers()}
            >
                <View style={myProfileStyle._contentSubOne}>
                    <View style={{ width: cal(62), height: cal(62), borderRadius: cal(62), justifyContent: "center", alignItems: "center", backgroundColor: PublicColor.Public_ClickBackground }}>
                        <Image source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : (this.state.avatarSource != "" ? this.state.avatarSource : MAN)} style={{ width: cal(60), height: cal(60), borderRadius: cal(60) }} />
                        <View style={{ position: "absolute", bottom: 0, left: 0, zIndex: 999 }}>
                            {/* <Image
                                source={TOUMING}
                                style={{ width: cal(77), height: cal(21) ,justifyContent:"center",alignItems:"center"}}
                            >

                                <Text style={{ fontSize: cal(11), color: "#f5f5f5", }}>
                                    审核中
                                </Text>
                            </Image> */}
                        </View>
                    </View>
                    <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _content_img(item, key, rowId) {
        if (this.state.picmoreImage.length == 0) {
            return (
                <View style={{ width }}>
                    <Text>没上传图片</Text>
                </View>
            )
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        imageSwipt: true,
                        imageSwiptIndex: rowId
                    })
                }}
                key={rowId}
            >
                <View style={[myProfileStyle.imgg, { marginLeft: cal(9), borderRadius: cal(2) }]}>
                    <Image source={{ uri: item.uri }} style={{ width: cal(63), height: cal(63), borderRadius: cal(2) }} />
                    {this._shenhez(item)}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _shenhez(shenghe) {
        if (shenghe.confirmed == 4) {
            return (
                <Text>
                </Text>
            )
        } else if (shenghe.confirmed == 5) {
            return (
                <View style={{ width: cal(63), height: cal(20), backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", position: "absolute", bottom: 0 }}>
                    <Text style={{ fontSize: cal(11), color: "#f5f5f5", }}>未通过</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ width: cal(63), height: cal(20), backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", position: "absolute", bottom: 0 }}>
                    <Text style={{ fontSize: cal(11), color: "#f5f5f5", }}>审核中</Text>
                </View>
            )
        }
    }
    _contentSubTwo() {
        if (this.state.picmoreImage.length != 0) {
            let data = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.picmoreImageSheng)
            return (
                <View style={[myProfileStyle._contentSubTwo, { justifyContent: "flex-start", alignItems: "center" }]}>
                    <View style={myProfileStyle._contentSubTwo_one}>
                        <Text>相册</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if (this.state.picmoreImage.length == 4) {
                                NativeModules.MyNativeModule.rnCallNative("对不起，亲，最多只能传4张图片哦!");
                            } else {
                                this.setState({
                                    visible: true,
                                    visibleNum: 2
                                })
                            }
                        }}
                    >
                        <View style={{ justifyContent: "center", marginLeft: cal(18), alignItems: "center", }}>
                            <Image source={ZILIAO} style={{ width: cal(60), height: cal(60) }} />
                            <Text style={{ color: "#b1b1b1", fontSize: cal(10), position: "absolute", bottom: cal(5), left: cal(10) }}>上传照片</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView showsHorizontalScrollIndicator={false} style={{ width: cal(300) }} horizontal={true}>
                        <ListView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={myProfileStyle._contentSubTwoListview}
                            dataSource={data}
                            renderRow={this._content_img.bind(this)}
                            removeClippedSubviews={false}
                            initialListSize={100}
                        />
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={[myProfileStyle._contentSubTwo, { justifyContent: "flex-start", alignItems: "center" }]}>
                    <View style={myProfileStyle._contentSubTwo_one}>
                        <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(14) }}>相册</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                visible: true
                            })
                        }}
                    >
                        <View style={{ justifyContent: "center", marginLeft: cal(18) }}>
                            <Image source={ZILIAO} style={{ width: cal(60), height: cal(60) }} />
                            <Text style={{ color: "#b1b1b1", fontSize: cal(10), position: "absolute", bottom: cal(5), left: cal(10) }}>上传照片</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
    _onFocus() {
        Pickers.hide();
    }
    _nicehng(content, item) {
        let contentss = content.replace(/[\@\#\$\%\^\&\*\{\}\:\"\<\>\?\!\,\，\。]/ig, "");
        let contents = contentss.replace(/\s+/g, "");
        let blen = 0;
        for (i = 0; i < contents.length; i++) {
            if ((contents.charCodeAt(i) & 0xff00) != 0) {
                blen ++;
            }
            blen ++;
        }
        if (blen <= 16) {
            if (!this.lock) {
                this.state.userEd2.nickname = contents;
                this.state.jsonData.nickname = contents;
                this.setState({
                    content: contents,
                    userEd2: this.state.userEd2,
                    jsonData: this.state.jsonData,
                })
            }
        }
    }
    _onBlur() {
        let blen = 0;
        // for (i = 0; i < this.state.content.length; i++) {
        //     if ((this.state.content.charCodeAt(i) & 0xff00) != 0) {
        //         blen ++;
        //     }
        //     blen ++;
        // }
        for (i = 0; i < this.state.userEd2.nickname.length; i++) {
            if ((this.state.userEd2.nickname.charCodeAt(i) & 0xff00) != 0) {
                blen ++;
            }
            blen ++;
        }
        if (blen < 2) {
            NativeModules.MyNativeModule.rnCallNative("请输入1-8汉字或者2-16字母");
        }
    }
    _data1(item) {
        if (item.name == "昵称") {
            return (
                <View style={myProfileStyle._contentSubThree_oneWRAP}>
                    < View style={myProfileStyle._contentSubThree_one} >
                        <Text style={myProfileStyle._contentSubThree_oneText}>{item.name}</Text>
                        <View style={[myProfileStyle._contentSubThree_one_view]}>
                            <TextInput
                                style={{ width: cal(150), textAlign: "right", marginRight: cal(25), padding: 0 }}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                maxLength={16}
                                onFocus={this._onFocus.bind(this)}
                                onBlur={this._onBlur.bind(this)}
                                clearButtonMode="always"
                                value={this.state.userEd2.nickname}
                                placeholder={(this.state.userEd2.nickname) == '' ? "未填写" : this.state.userEd2.nickname}
                                placeholderTextColor={PublicColor.Public_Text4}
                                onChangeText={(content) => this._nicehng(content, item)}
                            />
                        </View>
                    </View >
                </View >
            )
        }
        else if (item.name == "性别" || item.name == "身高" || item.name == "生日") {
            return (
                <View style={myProfileStyle._contentSubThree_oneWRAP}>
                    <View style={myProfileStyle._contentSubThree_one}>
                        <Text style={myProfileStyle._contentSubThree_oneText}>{item.name}</Text>
                        <View style={[myProfileStyle._contentSubThree_one_view, { paddingRight: cal(12) }]}>
                            {this._data1_user(item)}
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this.PickePublic(item, 1)}>
                <View style={myProfileStyle._contentSubThree_oneWRAP}>
                    <View style={myProfileStyle._contentSubThree_one}>
                        <Text style={myProfileStyle._contentSubThree_oneText}>{item.name}</Text>
                        <View style={myProfileStyle._contentSubThree_one_view}>
                            {this._data1_user(item)}
                            <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //资料一   我的资料
    _contentSubThree() {
        let data1 = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.data1)
        return (
            < View style={myProfileStyle._contentSubThree} >
                <ListView
                    dataSource={data1}
                    renderRow={this._data1.bind(this)}
                    enableEmptySections={true}
                    initialListSize={100}
                />
            </ View>
        )
    }
    _contentSubFours(item) {
        return (
            <TouchableOpacity
                onPress={() => this.PickePublic(item, 1)}
            >
                <View style={myProfileStyle._contentSubThree_oneWRAP}>
                    <View style={myProfileStyle._contentSubThree_one}>
                        <Text style={myProfileStyle._contentSubThree_oneText}>{item.name}</Text>
                        <View style={myProfileStyle._contentSubThree_one_view}>
                            {this._data1_user(item)}
                            <Image source={ZUO} style={{ width: cal(6.5), height: cal(11.5) }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _contentSubFour() {
        let EndData = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.EndData)
        return (
            <View style={myProfileStyle._contentSubThree}>
                <ListView
                    dataSource={EndData}
                    renderRow={this._contentSubFours.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }
    _loadding() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} title={"保存中..."} />
            )
        }
    }
    render() {
        if (!this.state.LoaddingStart) {
            return (
                <Loadding />
            )
        }
        return (
            <View style={myProfileStyle.wrap}>
                {this._loadding()}
                {this._modal()}
                {this._modal_touxiang()}
                {this._imageSwipt()}
                {this._tabQie()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this._content()}
                    <View style={{ height: cal(100) }}></View>
                </ScrollView>
            </View>
        )
    }
    removeByValue(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if ([i] == value) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    _swipt() {
        if (this.state.picmoreImage.length != 0) {
            let imageInfo = []
            this.state.picmoreImage.map((item, key) => {
                imageInfo.push(
                    <TouchableWithoutFeedback key={key} onPress={() => { this.setState({ imageSwipt: false }) }}>
                        <View key={key} style={{ alignItems: "center", height: height, width: width, justifyContent: "center" }}>
                            <Image style={{ width: width, height: width, borderRadius: cal(2) }} source={{ uri: item }} />
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    Alert.alert(
                                        '',
                                        '确定删除该图片？',
                                        [
                                            {
                                                text: '删除', onPress: () => {
                                                    let that = this;
                                                    if (item.slice(0, 4) == "http") {
                                                        if (item.slice(0, 22) == "http://api.aityuan.com") {
                                                            let ssss = { "uuid": item.split('=')[1].split("&")[0] }
                                                            _ajax.post_token("user/image/delete", ssss, function (res) {
                                                                console.log(res)
                                                                if (res.code == 0) {
                                                                    that.removeByValue(that.state.picmoreImage, key);
                                                                    that.removeByValue(that.state.picmoreImageSheng, key)
                                                                    that.setState({
                                                                        picmoreImage: that.state.picmoreImage,
                                                                        picmoreImageSheng: that.state.picmoreImageSheng,
                                                                    })
                                                                } else if (res.code == 1006) {
                                                                    NativeModules.MyNativeModule.rnCallNative("不存在该图片");
                                                                }
                                                            })
                                                        } else {
                                                            let a = { "uuid": item.split('com')[1].split("/")[1] }
                                                            _ajax.post_token("user/image/delete", a, function (res) {
                                                                console.log(res)
                                                                if (res.code == 0) {
                                                                    that.removeByValue(that.state.picmoreImage, key);
                                                                    that.removeByValue(that.state.picmoreImageSheng, key)
                                                                    that.setState({
                                                                        picmoreImage: that.state.picmoreImage,
                                                                        picmoreImageSheng: that.state.picmoreImageSheng,
                                                                    })
                                                                } else if (res.code == 1006) {
                                                                    NativeModules.MyNativeModule.rnCallNative("不存在该图片");
                                                                }
                                                            })
                                                        }
                                                    } else if (item.slice(0, 4)) {
                                                        console.log(key)
                                                        that.removeByValue(that.state.picmoreImage, key)
                                                        that.removeByValue(that.state.picmoreImageSheng, key)
                                                        that.removeByValue(that.state.picmoreImageBase64, key - that.state.picmoreImageStart.length)
                                                        that.setState({
                                                            picmoreImage: that.state.picmoreImage,
                                                            picmoreImageBase64: that.state.picmoreImageBase64,
                                                            picmoreImageBase64: that.state.picmoreImageBase64
                                                        })
                                                    }
                                                }
                                            },
                                            { text: '考虑一下', onPress: () => console.log('OK Pressed') },
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                <View style={{ position: "absolute", top: cal(55), right: cal(30), width: cal(60), alignItems: "flex-end", height: cal(60) }}>
                                    <Image source={DELIMAGE} style={{ width: cal(18), height: cal(18) }} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => { this.setState({ imageSwipt: false }) }}>
                                <View style={{ position: "absolute", top: cal(55), left: cal(30) }}>
                                    <Image source={BACKIMGAE} style={{ width: cal(18), height: cal(18) }} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                )
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
                    index={this.state.imageSwiptIndex}
                    index={0}
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
    //拍照弹出modal     上传4张图片
    _modal() {
        return (
            <Modal
                // animationType='slide'
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
                        <View style={{ height: cal(111), backgroundColor: "#fff" }}>
                            <TouchableOpacity onPress={() => { this.ImagePickers_launchCamera(this.state.visibleNum) }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                    <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>拍照</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.ImagePickers_launchImageLibrary(this.state.visibleNum) }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", }}>
                                    <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>选择相册</Text>
                                </View>
                            </TouchableOpacity>
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
        )
    }
    ImagePickers_launchCamera(id) {
        this.setState({
            visible: false,
        })
        let that = this;
        ImagePicker.openCamera({
            includeBase64: true,
            cropping: true,
            width: 1200,
            height: 1200,
            enableRotationGesture: false
        }).then(image => {
            that.setState({
                picmoreImageBase64: that.state.picmoreImageBase64.concat(image),
                picmoreImage: that.state.picmoreImage.concat(image.path),
                picmoreImageSheng: that.state.picmoreImageSheng.concat({ uri: image.path, confirmed: 0 }),
            })
        });
    }
    ImagePickers_launchImageLibrary(id) {
        this.setState({
            visible: false,
        })
        let that = this;
        ImagePicker.openPicker({
            includeBase64: true,
            cropping: true,
            width: 1200,
            height: 1200,
            enableRotationGesture: false
        }).then(image => {
            console.log(image)
            that.setState({
                picmoreImageBase64: that.state.picmoreImageBase64.concat(image),
                picmoreImage: that.state.picmoreImage.concat(image.path),
                picmoreImageSheng: that.state.picmoreImageSheng.concat({ uri: image.path, confirmed: 0 }),
            })
        });
    }

    //头像

    _modal_touxiang() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible_touxiang}
                onRequestClose={() => console.log('onRequestClose...')} >
                <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1 }}>
                    <View style={{ position: "absolute", top: 0, zIndex: 1, width: width, flex: 1, }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    visible_touxiang: false
                                })
                            }}
                        >
                            <View style={{ height: height }}></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ position: "absolute", bottom: 0, width: width, zIndex: 2 }}>
                        <View style={{ height: cal(111), backgroundColor: "#fff" }}>
                            <TouchableOpacity onPress={() => { this.ImagePickers_launchCamera_touxiang() }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                    <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>拍照</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.ImagePickers_launchImageLibrary_touxiang() }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", }}>
                                    <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>选择相册</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: cal(10) }}></View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    visible_touxiang: false
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
        )
    }
    //拍照  头像
    ImagePickers_launchCamera_touxiang() {
        this.setState({
            visible_touxiang: false
        })
        ImagePickerAVAR.launchCamera(options, (response) => {
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
                let source = { uri: response.uri };
                let that = this;
                console.log(response.uri)
                that.setState({
                    avatarSource: response.uri,
                    avatarSource2: response.uri,
                    avatarSource2ed: response.uri,
                    avatarSourceBase64: response,
                    avatarSourceJMessage: response.path
                });
            }
        });
    }
    //相册   头像
    ImagePickers_launchImageLibrary_touxiang() {
        this.setState({
            visible_touxiang: false
        })
        // 相册
        ImagePickerAVAR.launchImageLibrary(options, (response) => {
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
                let source = { uri: response.uri };
                let that = this;
                console.log(response.uri)
                that.setState({
                    avatarSource: response.uri,
                    avatarSource2: response.uri,
                    avatarSource2ed: response.uri,
                    avatarSourceBase64: response,
                    avatarSourceJMessage: response.path
                });
            }
        });
    }







    //择偶对象。
    contets(content) {
        this.state.userEd2.selfDesc = content
        this.state.jsonData.selfDesc = content;
        this.setState({
            userEd2: this.state.userEd2,
            jsonData: this.state.jsonData
        })
    }
    PickePublic(item, type) {
        let that = this;
        //type == 1 时 填写自己的资料
        if (type == 1) {
            if (item.name == "生日") {
                // let json = {
                //     a: this.state.userEd2.birthday.split("-")[0] + "年",
                //     b: this.state.userEd2.birthday.split("-")[1] + "月",
                //     c: this.state.userEd2.birthday.split("-")[2].slice(0, 2) + "日"
                // }
                // PickerCity._showDatePicker(json, function (res) {
                //     that.state.userEd2.birthday = res[0].slice(0, 4) + '-' + (res[1].split("月")[0] < 10 ? "0" + res[1].split("月")[0] : res[1].split("月")[0]) + '-' + (res[2].split("日")[0] < 10 ? "0" + res[2].split("日")[0] : res[2].split("日")[0])
                //     that.setState({
                //         userEd2: that.state.userEd2
                //     })
                // })
                NativeModules.MyNativeModule.rnCallNative("生日不能修改哦");
            }
            else if (item.name == "身高") {
                // let json = this.state.userEd2.height;
                // PickerCity._showHeightMe(json, function (res) {
                //     that.state.userStart.height = that.state.userEd2.height;
                //     that.state.userEd2.height = res[0].slice(0, 3);
                //     that.setState({
                //         userEd2: that.state.userEd2,
                //     })
                // })
                NativeModules.MyNativeModule.rnCallNative("身高不能修改哦");
            }
            else if (item.name == "性别") {
                NativeModules.MyNativeModule.rnCallNative("性别不能修改哦");
            }
            else if (item.name == "内心独白") {
                that.props.navigator.push({
                    component: Nicheng,
                    params: {
                        text: "内心独白",
                        navigator: that.props.navigator,
                        name: that.state.userEd2.selfDesc,
                        contets: that.contets.bind(that)
                    }
                })
            }
            else if (item.name == "家乡") {
                let json = {
                    a: this.state.userEd2.hometownProvince,
                    b: this.state.userEd2.hometownCity,
                    c: this.state.userEd2.hometownDistrict
                }
                PickerCity._showAreaPicker(json,"feamle", function (res) {
                    that.state.userEd2.hometownProvince = res[0];
                    that.state.userEd2.hometownCity = res[1];
                    that.state.userEd2.hometownDistrict = res[2];
                    that.state.jsonData.hometownProvince = res[0];
                    that.state.jsonData.hometownCity = res[1];
                    that.state.jsonData.hometownDistrict = res[2];
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "职业") {
                let json = {
                    a: this.state.userEd2.industy == null ? "学生" : this.state.userEd2.industy,
                    b: this.state.userEd2.occupation == null ? "学生" : this.state.userEd2.occupation
                }
                PickerCity._showZhiYemom(json, function (res) {
                    // item.state = res[0] == "其他" ? "其他" : res[0] + '-' + res[1];
                    that.state.userEd2.industy = res[0];
                    that.state.userEd2.occupation = res[1];
                    that.state.jsonData.industy = res[0];
                    that.state.jsonData.occupation = res[1];
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "月收入") {
                PickerCity._showShouRuMom("feamle",function (res) {
                    that.state.userEd2.income = Education._income(res[0], true);
                    that.state.jsonData.income = Education._income(res[0], true);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "工作地区") {
                let json = {
                    a: this.state.userEd2.addrProvince,
                    b: this.state.userEd2.addrCity,
                    c: this.state.userEd2.addrDistrict
                }
                PickerCity._showAreaPickerWork(json, "female",function (res) {
                    that.state.userEd2.addrProvince = res[0];
                    that.state.userEd2.addrCity = res[1];
                    that.state.userEd2.addrDistrict = res[2];
                    that.state.jsonData.addrProvince = res[0];
                    that.state.jsonData.addrCity = res[1];
                    that.state.jsonData.addrDistrict = res[2];
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "学历") {
                PickerCity._showXueLi("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.education = Education._education(res[0], true);
                    that.state.jsonData.education = Education._education(res[0], true);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "婚姻状况") {
                PickerCity._showHunYin("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.maritalStatus = Education.maritalStatus(res[0], true);
                    that.state.jsonData.maritalStatus = Education.maritalStatus(res[0], true);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "有没有小孩") {
                PickerCity._showHaiZi("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.childrenStatus = Education.childrenStatus(res[0]);
                    that.state.jsonData.childrenStatus = Education.childrenStatus(res[0]);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "住房情况") {
                PickerCity._showZhufang("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.livingStatus = Education.livingStatus(res[0]);
                    that.state.jsonData.livingStatus = Education.livingStatus(res[0]);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })

            }
            else if (item.name == "买车情况") {
                PickerCity._showMaiChe("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.carOwingStatus = Education.carOwingStatus(res[0]);
                    that.state.jsonData.carOwingStatus = Education.carOwingStatus(res[0]);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "接受异地恋") {
                // PickerCity._showJieShouYiDiLian(function (res) {
                //     item.state = res[0]
                //     that.setState({
                //         EndData: that.state.EndData,
                //         jsonData: that.state.jsonData,
                //     })
                // })
            }
            else if (item.name == "吸烟情况") {
                PickerCity._showXiYan("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.smokingStatus = Education.smokingStatus(res[0], true);
                    that.state.userEd2.smokingStatus = Education.smokingStatus(res[0], true);
                    that.state.jsonData.smokingStatus = Education.smokingStatus(res[0], true);
                    that.state.jsonData.smokingStatus = Education.smokingStatus(res[0], true);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "饮酒情况") {
                PickerCity._showJiu("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.alcoholStatus = Education._yinjiu(res[0], true);
                    that.state.jsonData.alcoholStatus = Education._yinjiu(res[0], true);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else {
                this.setState({
                    open: true,
                    openName: item.name,
                    openNum: item.num
                })
            }
        } else {
            // 择偶条件
            if (item.name == "年龄") {
                PickerCity._showOld("feamle",function (res) {
                    // item.state = res[0] != "不限" ? res[0].slice(0, 2) + '-' + res[1] : '不限'
                    that.state.userEd2.spouseAgeMin = res[0].slice(0, 2) == "不限" ? 0 : res[0].slice(0, 2);
                    that.state.userEd2.spouseAgeMax = res[1].slice(0, 2) == "不限" ? 0 : res[1].slice(0, 2);
                    that.state.jsonData.spouseAgeMin = res[0].slice(0, 2) == "不限" ? 0 : res[0].slice(0, 2);
                    that.state.jsonData.spouseAgeMax = res[1].slice(0, 2) == "不限" ? 0 : res[1].slice(0, 2);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "家乡") {
                let json = {
                    a: this.state.userEd2.spouseHometownProvince,
                    b: this.state.userEd2.spouseHometownCity,
                    c: this.state.userEd2.spouseHometownDistrict
                }
                PickerCity._showAreaPickerWorkPerhome(json,"feamle", function (res) {
                    // item.state = res[0] == "不限" ? "不限" : res[0] + '-' + res[1] + '-' + res[2]
                    that.state.userEd2.spouseHometownProvince = res[0] == "不限" ? '' : res[0];
                    that.state.userEd2.spouseHometownCity = res[1] == "不限" ? '' : res[1];
                    that.state.userEd2.spouseHometownDistrict = res[2] == "不限" ? '' : res[2];
                    that.state.jsonData.spouseHometownProvince = res[0] == "不限" ? '' : res[0];
                    that.state.jsonData.spouseHometownCity = res[1] == "不限" ? '' : res[1];
                    that.state.jsonData.spouseHometownDistrict = res[2] == "不限" ? '' : res[2];
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "月收入") {
                PickerCity._showShouRuNamPer("female",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.spouseIncome = Education._income(res[0], false)
                    that.state.jsonData.spouseIncome = Education._income(res[0], false)
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }

            else if (item.name == "身高") {
                let that = this;
                PickerCity._showHeight("feamle",function (res) {
                    // item.state = res[0] != "不限" ? (res[0].split("cm"))[0] + "-" + res[1] : res[0]
                    that.state.userEd2.spouseHeightMin = res[0].slice(0, 3) == '不限' ? 0 : res[0].slice(0, 3);
                    that.state.userEd2.spouseHeightMax = res[1].slice(0, 3) == "不限" ? 0 : res[1].slice(0, 3);
                    that.state.jsonData.spouseHeightMin = res[0].slice(0, 3) == '不限' ? 0 : res[0].slice(0, 3);
                    that.state.jsonData.spouseHeightMax = res[1].slice(0, 3) == "不限" ? 0 : res[1].slice(0, 3);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "婚姻状况") {
                PickerCity._showHunYinPer("feamle",function (res) {
                    that.state.userEd2.spouseMaritalStatus = Education.maritalStatus(res[0], false);
                    that.state.jsonData.spouseMaritalStatus = Education.maritalStatus(res[0], false);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "工作地点") {
                let json = {
                    a: this.state.userEd2.spouseAddrProvince,
                    b: this.state.userEd2.spouseAddrCity,
                    c: this.state.userEd2.spouseAddrDistrict
                }
                PickerCity._showAreaPickerWorkPer(json,"feamle", function (res) {
                    // item.state = res[0] == "不限" ? "不限" : res[0] + '-' + res[1] + '-' + res[2]
                    that.state.userEd2.spouseAddrProvince = res[0] == "不限" ? "" : res[0];
                    that.state.userEd2.spouseAddrCity = res[1] == "不限" ? "" : res[1];
                    that.state.userEd2.spouseAddrDistrict = res[2] == "不限" ? "" : res[2];
                    that.state.jsonData.spouseAddrProvince = res[0] == "不限" ? "" : res[0];
                    that.state.jsonData.spouseAddrCity = res[1] == "不限" ? "" : res[1];
                    that.state.jsonData.spouseAddrDistrict = res[2] == "不限" ? "" : res[2];
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "学历") {
                PickerCity._showXueLiPer("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.spouseEducation = Education._education(res[0], false);
                    that.state.jsonData.spouseEducation = Education._education(res[0], false);

                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "有没有小孩") {
                PickerCity._showHaiZiPei("feamle",function (res) {
                    // item.state = res[0]
                    that.state.userEd2.spouseChildrenStatus = Education.childrenStatus(res[0], false);
                    that.state.jsonData.spouseChildrenStatus = Education.childrenStatus(res[0], false);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "是否吸烟") {
                PickerCity._showXiYanPer('feamle',function (res) {
                    that.state.userEd2.spouseSmokingStatus = Education.smokingStatus(res[0], false);
                    that.state.jsonData.spouseSmokingStatus = Education.smokingStatus(res[0], false);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
            else if (item.name == "是否喝酒") {
                PickerCity._showJiuPer("feamle",function (res) {
                    that.state.userEd2.spouseAlcoholStatus = Education._yinjiu(res[0], false);
                    that.state.jsonData.spouseAlcoholStatus = Education._yinjiu(res[0], false);
                    that.setState({
                        userEd2: that.state.userEd2,
                        jsonData: that.state.jsonData,
                    })
                })
            }
        }
    }
    aaaa(date) {
        let stringTime = date;
        let timestamp2 = Date.parse(new Date(stringTime));
        let birthDay = timestamp2;
        var now = parseInt(new Date().getTime());
        var hours = (now - birthDay) / 1000 / 60 / 60;
        return Math.floor(hours / (24 * 30 * 12));
    }
    _data1_user(item) {
        switch (item.name) {
            case "性别":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.sex == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.sex == null ? "未填写" : Education._sex(this.state.userEd2.sex)}
                    </Text>

                );
            case "生日":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.birthday == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.birthday == null ? "未填写" :
                            this.state.userEd2.birthday.split("-")[0] + "-" + this.state.userEd2.birthday.split("-")[1] + "-" + this.state.userEd2.birthday.split("-")[2].slice(0, 2)
                        }
                    </Text>

                );
            case "身高":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.height == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.height == null ? "未填写" : this.state.userEd2.height + "cm"}
                    </Text>

                );
            case "内心独白":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.selfDesc == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.selfDesc == null ? "请输入内心独白" : this.state.userEd2.selfDesc}
                    </Text>

                );
            case "家乡":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.hometownProvince == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.hometownProvince == null ?
                            "未填写"
                            : this.state.userEd2.hometownDistrict == null ? this.state.userEd2.hometownProvince + '-' + this.state.userEd2.hometownCity : (this.state.userEd2.hometownProvince + '-' + this.state.userEd2.hometownCity + '-' + this.state.userEd2.hometownDistrict)
                        }
                    </Text>
                );
            case "职业":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.industy == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.industy == null ? "未填写" : (this.state.userEd2.industy + "-" + this.state.userEd2.occupation)}
                    </Text>
                );
            case "月收入":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.income == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.income == null ? "未填写" : Education._incomeGet(this.state.userEd2.income, false)}
                    </Text>
                );
            case "工作地区":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.addrProvince == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.addrProvince == null ?
                            "未填写"
                            : (this.state.userEd2.addrDistrict == null ? this.state.userEd2.addrProvince + '-' + this.state.userEd2.addrCity : this.state.userEd2.addrProvince + '-' + this.state.userEd2.addrCity + '-' + this.state.userEd2.addrDistrict)
                        }
                    </Text>
                );
            case "学历":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.education == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.education == null ? "未填写" : Education._educationGet(this.state.userEd2.education, true)}
                    </Text>
                );
            case "婚姻状况":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.maritalStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.maritalStatus == null ? "未填写" : Education.maritalStatusGet(this.state.userEd2.maritalStatus, true)}
                    </Text>
                );
            case "有没有小孩":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.childrenStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.childrenStatus == null ? "未填写" : Education.childrenStatusGet(this.state.userEd2.childrenStatus)}
                    </Text>
                );
            case "住房情况":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.livingStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.livingStatus == null ? "未填写" : Education.livingStatusGet(this.state.userEd2.livingStatus)}
                    </Text>
                );
            case "买车情况":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.carOwingStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.carOwingStatus == null ? "未填写" : Education.carOwingStatusGet(this.state.userEd2.carOwingStatus)}
                    </Text>
                );
            case "接受异地恋":
                return (
                    <Text numberOfLines={1} style={[(this.state.sex == "请选择") ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        没这个字段
                    </Text>
                );
            case "吸烟情况":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.smokingStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.smokingStatus == null ? "未填写" : Education.smokingStatusGet(this.state.userEd2.smokingStatus, true)}
                    </Text>
                );
            case "饮酒情况":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.alcoholStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.alcoholStatus == null ? "未填写" : Education._yinjiuGet(this.state.userEd2.alcoholStatus, true)}
                    </Text>
                );
        }

    }


    //   择偶
    // <Text style={item.state == "请选择" ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END}>{item.state}</Text>
    _data2_user(item) {
        switch (item.name) {
            case "年龄":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseAgeMin == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {
                            this.state.userEd2.spouseAgeMin == null || this.state.userEd2.spouseAgeMin == 0 ?
                                "不限" :
                                this.state.userEd2.spouseAgeMax == null || this.state.userEd2.spouseAgeMax == 0 ? this.state.userEd2.spouseAgeMin + "岁以上" :
                                    this.state.userEd2.spouseAgeMin + "-" + this.state.userEd2.spouseAgeMax + "岁"}
                    </Text>

                );
            case "身高":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseHeightMin == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {
                            this.state.userEd2.spouseHeightMin == null || this.state.userEd2.spouseHeightMin == 0 ?
                                "不限" :
                                this.state.userEd2.spouseHeightMax == 0 || this.state.userEd2.spouseHeightMax == null ? this.state.userEd2.spouseHeightMin + "cm以上" :
                                    this.state.userEd2.spouseHeightMin + "-" + this.state.userEd2.spouseHeightMax + "cm"}
                    </Text>
                );
            case "月收入":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseIncome == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseIncome == null ? "未填写" : Education._incomeGetPer(this.state.userEd2.spouseIncome, true)}
                    </Text>
                );
            case "婚姻状况":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseMaritalStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseMaritalStatus == null ? "未填写" : Education.maritalStatusGet(this.state.userEd2.spouseMaritalStatus, false)}
                    </Text>
                );
            case "工作地点":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseAddrProvince == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseAddrProvince == null ?
                            "未填写" :
                            this.state.userEd2.spouseAddrProvince == "" ? '不限' :
                                this.state.userEd2.spouseAddrCity == null || this.state.userEd2.spouseAddrCity == "" ? this.state.userEd2.spouseAddrProvince :
                                    this.state.userEd2.spouseAddrDistrict == null || this.state.userEd2.spouseAddrDistrict == "" ? this.state.userEd2.spouseAddrProvince + "-" + this.state.userEd2.spouseAddrCity :
                                        (this.state.userEd2.spouseAddrProvince + "-" + this.state.userEd2.spouseAddrCity + "-" + this.state.userEd2.spouseAddrDistrict)
                        }
                    </Text>
                );
            case "家乡":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseHometownProvince == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {}
                        {this.state.userEd2.spouseHometownProvince == null ?
                            "未填写" :
                            this.state.userEd2.spouseHometownProvince == 0 ? "不限" :
                                this.state.userEd2.spouseHometownCity == 0 ? this.state.userEd2.spouseHometownProvince :
                                    this.state.userEd2.spouseHometownDistrict == 0 ? this.state.userEd2.spouseHometownProvince + "-" + this.state.userEd2.spouseHometownCity :
                                        (this.state.userEd2.spouseHometownProvince + "-" + this.state.userEd2.spouseHometownCity + "-" + this.state.userEd2.spouseHometownDistrict)
                        }
                    </Text>
                );
            case "学历":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseEducation == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseEducation == null ? "未填写" : Education._educationGet(this.state.userEd2.spouseEducation, false)}
                    </Text>
                );
            case "有没有小孩":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseChildrenStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseChildrenStatus == null ? "未填写" : Education.childrenStatusGet(this.state.userEd2.spouseChildrenStatus, false)}
                    </Text>
                );
            case "是否吸烟":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseSmokingStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseSmokingStatus == null ? "未填写" : Education.smokingStatusGet(this.state.userEd2.spouseSmokingStatus, false)}
                    </Text>
                );
            case "是否喝酒":
                return (
                    <Text numberOfLines={1} style={[(this.state.userEd2.spouseAlcoholStatus == null) ? myProfileStyle._contentSubThree_one_view_text : myProfileStyle._contentSubThree_one_view_text_END, { maxWidth: cal(150) }]}>
                        {this.state.userEd2.spouseAlcoholStatus == null ? "未填写" : Education._yinjiuGet(this.state.userEd2.spouseAlcoholStatus, false)}
                    </Text>
                );
        }
    }
    _sentTiJiao() {
        this.setState({
            Loadding: true
        })
        let blen = 0;
        console.log(this.state.contemts)
        if (this.state.content == "") {
            this.state.jsonData.nickname = this.state.contemts
            this.setState({
                content: this.state.contemts,
                jsonData: this.state.jsonData
            })
        } else {
            for (i = 0; i < this.state.content.length; i++) {
                if ((this.state.content.charCodeAt(i) & 0xff00) != 0) {
                    blen ++;
                }
                blen ++;
            }
            if (blen < 2) {
                NativeModules.MyNativeModule.rnCallNative("请输入1-8汉字或者2-16字母");
                this.setState({
                    Loadding: false
                })
                return false
            }
        }
        let UserList = {
            portraitConfirmed: this.props.userStart.portraitConfirmed,
            idConfirmed: this.props.userStart.idConfirmed,
            emailConfirmed: this.props.userStart.emailConfirmed,
            nickname: this.state.userEd2.nickname,
            addrCity: this.state.userEd2.addrCity,
            addrCountry: "CN",
            addrDistrict: this.state.userEd2.addrDistrict,
            addrProvince: this.state.userEd2.addrProvince,
            alcoholStatus: this.state.userEd2.alcoholStatus,
            birthday: this.state.userEd2.birthday,
            carOwingStatus: this.state.userEd2.carOwingStatus,
            childrenStatus: this.state.userEd2.childrenStatus,
            companyEmail: this.state.userEd2.companyEmail,
            education: this.state.userEd2.education,
            employer: this.state.userEd2.employer,
            height: this.state.userEd2.height,
            hometownCity: this.state.userEd2.hometownCity,
            hometownCountry: this.state.userEd2.hometownCountry,
            hometownDistrict: this.state.userEd2.hometownDistrict,
            hometownProvince: this.state.userEd2.hometownProvince,
            id: this.state.userEd2.id,
            income: this.state.userEd2.income,
            industy: this.state.userEd2.industy,
            livingStatus: this.state.userEd2.livingStatus,
            maritalStatus: this.state.userEd2.maritalStatus,
            mobileNr: this.state.userEd2.mobileNr,
            occupation: this.state.userEd2.occupation,
            selfDesc: this.state.userEd2.selfDesc,
            sex: this.state.userEd2.sex,
            smokingStatus: this.state.userEd2.smokingStatus,
            spouseAddrCity: this.state.userEd2.spouseAddrCity,
            spouseAddrCountry: this.state.userEd2.spouseAddrCountry,
            spouseAddrDistrict: this.state.userEd2.spouseAddrDistrict,
            spouseAddrProvince: this.state.userEd2.spouseAddrProvince,
            spouseAgeMax: this.state.userEd2.spouseAgeMax,
            spouseAgeMin: this.state.userEd2.spouseAgeMin,
            spouseChildrenStatus: this.state.userEd2.spouseChildrenStatus,
            spouseEducation: this.state.userEd2.spouseEducation,
            spouseHeight: this.state.userEd2.spouseHeight,
            spouseHeightMax: this.state.userEd2.spouseHeightMax,
            spouseHeightMin: this.state.userEd2.spouseHeightMin,
            spouseHometownCity: this.state.userEd2.spouseHometownCity,
            spouseHometownCountry: "CN",
            spouseHometownDistrict: this.state.userEd2.spouseHometownDistrict,
            spouseHometownProvince: this.state.userEd2.spouseHometownProvince,
            spouseIncome: this.state.userEd2.spouseIncome,
            spouseMaritalStatus: this.state.userEd2.spouseMaritalStatus,
            spouseAlcoholStatus: this.state.userEd2.spouseAlcoholStatus,
            spouseSmokingStatus: this.state.userEd2.spouseSmokingStatus,
            title: this.state.userEd2.title,
            nickname: this.state.content != "" ? this.state.content : this.state.userEd2.nickname
        }
        let json = {
            "user": this.state.jsonData
        }
        console.log(json)
        let that = this;
        that.selfManage(json, that)
            // .then(
            // function (data) {
            //     console.log(data)
            //     return that.imageUpload(that);
            // }
            // )
            .then(
            function (data) {
                console.log(data)
                return that.uploadXiang(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.imageUploads(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                that.setState({
                    picmoreImageBase64: []
                })
                return that.imageUpload(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.imageUploadsJMessage(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.JMessageUserName(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                that.setState({
                    Loadding: false
                })
                AsyncStorage.setItem('UserList', JSON.stringify({ UserList: UserList }), () => { });
                NativeModules.MyNativeModule.rnCallNative("保存成功");
                that.props.avatarThumbPath(that.state.avatarSource);
                that.props.navigator.pop()
                DeviceEventEmitter.emit('updetaMomIndex', '通知来了w');
            }
            )
    }
    //更新 资料

    selfManage(json, that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.post_token("user/self_manage", json, function (res) {
                console.log(res)
                if (res.code == 0) {
                    resolve("上传资料ok")
                } else {
                    that.setState({
                        Loadding: false
                    })
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        })
        return p;
    }

    //更新 相册
    uploadXiang(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            if (that.state.picmoreImageBase64.length > 0) {
                that.state.picmoreImageBase64.map((item) => {
                    let formData = new FormData();
                    formData.append("format", item.mime);
                    formData.append("image", item.data);
                    formData.append("usage", 0);
                    console.log(formData)
                    _ajax.post_image_token("user/image/upload", formData, function (res) {
                        console.log(res)
                        if (res.code == 0) {

                            resolve("相册ok")
                        } else {
                            that.setState({
                                Loadding: false
                            })
                            NativeModules.MyNativeModule.rnCallNative(res.info);
                        }
                    })
                })
            } else {
                resolve("相册ok")
            }
        });
        return p;
    }
    // 极光昵称修改

    JMessageUserName(that) {
        let json = {
            nickname: that.state.userEd2.nickname,
            gender: that.state.userEd2.sex
        }
        let p = new Promise(function (resolve, reject) {
            if (typeof that.state.jsonData.nickname != undefined) {
                _ajax.post_token("user/jpush_profile", json, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        resolve(" 极光昵称修改ok")
                    } else {
                        that.setState({
                            Loadding: false
                        })
                        NativeModules.MyNativeModule.rnCallNative("网络异常~稍后重试");
                    }
                })
            } else {
                resolve(" 极光昵称修改ok")
            }
        })
        return p;
    }
    // //更新 头像

    imageUpload(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            if (that.state.avatarSourceBase64 != "") {
                console.log()
                if (that.state.imageList.length > 0) {
                    that.state.imageList.map((item) => {
                        if (item.usage == 1) {
                            let a = { "uuid": item.uuid }
                            _ajax.post_token("user/image/delete", a, function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    resolve("删除头像ok")
                                } else {
                                    that.setState({
                                        Loadding: false
                                    })
                                    NativeModules.MyNativeModule.rnCallNative(res.info);
                                }
                            })
                        } else {
                            console.log(0)
                            resolve("头像删除ok")
                        }
                    })

                } else {
                    resolve("头像删除ok")
                }
            } else {
                resolve("头像删除ok")
            }
        });
        return p;
    }
    imageUploads(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            if (that.state.avatarSourceBase64 != "") {
                let formData = new FormData();
                formData.append("format", that.state.avatarSourceBase64.type == null ? "jpg" : that.state.avatarSourceBase64.type);
                formData.append("image", that.state.avatarSourceBase64.data);
                formData.append("usage", 1);
                console.log(formData)
                _ajax.post_image_token("user/image/upload", formData, function (res) {
                    // console.log(res)
                    if (res.code == 0) {
                        AsyncStorage.setItem('Image', JSON.stringify(that.state.avatarSource), () => { });
                        resolve("更新头像ok")
                    } else {
                        that.setState({
                            Loadding: false
                        })
                        NativeModules.MyNativeModule.rnCallNative(res.info);
                    }
                })

            } else {
                resolve("更新头像ok")
            }
        });
        return p;
    }
    imageUploadsJMessage(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            if (that.state.avatarSourceJMessage != "") {
                JMessage.updateMyAvatar({ imgPath: that.state.avatarSourceJMessage },
                    (a) => {
                        resolve("更新jiguang头像ok")
                    }, (error) => {
                        var code = error.code
                        var desc = error.description
                    })

            } else {
                resolve("jiguang头像ok")
            }
        });
        return p;
    }
}


let myProfileStyle = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground,
    },
    tabQieWrap: {
        height: cal(40),
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    SubtabQieWrap: {
        flexDirection: "row",
        alignItems: "center",
        width: cal(150),
        justifyContent: "space-between",
        height: cal(40)
    },
    tabQieWrapViewOne: {
        alignItems: "center",
        height: cal(35),
        justifyContent: "flex-end"
    },
    // tabQieWrapViewOneText: {
    //     color: PublicColor.Public_Text5,
    //     fontSize: cal(14)
    // },
    // tabQieWrapViewOneTextnan: {
    //     color: PublicColor.Public_MomClickBackground,
    //     fontSize: cal(14)
    // },
    tabQieWrapViewOneTextnan: {
        color: "#fff",
        fontSize: cal(17)
    },
    tabQieWrapViewOneText: {
        color: "#c1b8ff",
        fontSize: cal(16),
    },
    tabQieWrapViewLine2: {
        width: cal(63),
        height: cal(2),
        marginTop: cal(1)
    },
    tabQieWrapViewLine: {
        width: cal(63),
        height: cal(2),
        backgroundColor: "#fff",
        marginTop: cal(1),
        borderRadius: cal(1)
    },




    contentStyle: {
        marginTop: cal(10),
        // paddingLeft: cal(10),
        // paddingRight: cal(10)
    },
    // 头像设置样式
    _contentSubOne: {
        backgroundColor: "#fff",
        height: cal(85),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: cal(15),
        paddingRight: cal(10),
        borderWidth: cal(0.5),
        borderColor: "#e2e2e2"
    },
    // 头像相册样式
    _contentSubTwo: {
        backgroundColor: "#fff",
        height: cal(85),
        paddingLeft: cal(15),
        paddingRight: cal(10),
        marginTop: cal(10),
        borderWidth: cal(0.5),
        borderColor: "#e2e2e2",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    _contentSubTwo_one: {
        justifyContent: "center"
    },
    _contentSubTwo_three: {
        justifyContent: "center"
    },
    imgg: {
        width: cal(63),
        height: cal(63),
        backgroundColor: PublicColor.Public_ViewBackground
    },
    _contentSubTwoListview: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: cal(85)
    },

    // 设置昵称等
    _contentSubThree: {
        marginTop: cal(10),
        backgroundColor: "#fff",
        alignItems: "center",
        borderColor: "#e2e2e2",
        borderWidth: cal(0.5)
    },
    _contentSubThree_oneWRAP: {
        width: width,
        paddingLeft: cal(15)
    },
    _contentSubThree_one: {
        height: cal(50),
        flexDirection: "row",
        paddingRight: cal(15),
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#e2e2e2",
        borderBottomWidth: cal(0.5)
    },
    _contentSubThree_one_view: {
        flexDirection: "row",
        alignItems: "center"
    },
    _contentSubThree_one_view_text_input: {
        color: PublicColor.Public_Text4,
        fontSize: cal(14),
        marginRight: cal(12),
        width: cal(150),
        height: cal(40),
        textAlign: "right"
    },
    _contentSubThree_one_view_text_END_input: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14),
        marginRight: cal(12),
        height: cal(40),
        width: cal(150),
        textAlign: "right"
    },
    _contentSubThree_one_view_text: {
        color: PublicColor.Public_Text4,
        fontSize: cal(14),
        marginRight: cal(12)
    },
    _contentSubThree_one_view_text_END: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14),
        marginRight: cal(12)
    },
    mainContainer: {
        flex: 1,
        backgroundColor: PublicColor.Public_Text7
    },
    counter1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 0,
        backgroundColor: '#ffff00'
    },



    _contentSubThree_oneText: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14)
    }
})