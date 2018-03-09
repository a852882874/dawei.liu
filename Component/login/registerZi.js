//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView, InteractionManager,
    Platform, Image, Dimensions, TextInput, NativeModules,
    TouchableOpacity, AsyncStorage, ListView, Modal
} from 'react-native'
const { width, height } = Dimensions.get("window");
import PickerCity from './../Common/PickerCity.js';
import QuizOne from "./../quiz/quizOne.js";
import SplashScreen from 'react-native-splash-screen'
import SentImage from "./setImage.js";
import HraderLogin from './../Common/Header.js'
import Permissions from 'react-native-permissions';
import XiuGaiUserName from './xiuGaiUserName.js';
const { cal } = require("./../Common/Cal.js");
const JIANTOU = require("./../image/me/zou.png");
import _ajax from "./../Common/LoginAjax.js";
import JMessage from 'jmessage-react-plugin';
const { PublicColor } = require("./../Common/Color.js")
const QQLOGIN = require("./../image/login/qq.png");
const WEIBOLOGIN = require("./../image/login/weibo.png");
const WEIXINLOGIN = require("./../image/login/weixin.png");
export default class registerzi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: this.props.phone,
            passWord: this.props.passWord,
            info: [
                { "type": "性别", "value": "请选择" },
                { "type": "昵称", "value": "请输入昵称" },
                { "type": "生日", "value": "请选择" },
                { "type": "身高", "value": "请选择" },
                { "type": "学历", "value": "请选择" },
                { "type": "婚姻状况", "value": "请选择" },
                { "type": "工作地址", "value": "请选择" },
                { "type": "月收入", "value": "请选择" }
            ],
            sexGu: "male",
            disableds: true,
            content: "",
            visible: false,
            addrCountry: "CN",
            addrProvince: "",//省
            addrCity: "",//城市
            addrDistrict: "",//区
            birthday: "",//生日
            education: "",//学历
            height: "", //身高
            income: "",//收入
            maritalStatus: "",//婚姻
            sex: "",//性别
            username: "",//昵称
            JMusername: "",
            huawei: false
        }
        this.lock = false;
    }
    componentWillUnmount() {
        this.timerBtn && clearTimeout(this.timerBtn)
        this.lock = true;
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let that = this;
            AsyncStorage.getItem('user_sex', (err, result) => {
                console.log(result)
                if (JSON.parse(result)) {
                    that.state.info[0].value = JSON.parse(result).user_sex == 'female' ? "女" : "男";
                    if (!that.lock) {
                        that.setState({
                            sexGu: JSON.parse(result).user_sex,
                            info: that.state.info,
                            disableds: false
                        })
                    }
                }
            })
            AsyncStorage.getItem('user_token', (err, result) => {
                console.log(JSON.parse(result).username)
                if (!that.lock) {
                    that.setState({
                        JMusername: JSON.parse(result).username
                    })
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
            SplashScreen.hide();
        })
    }
    //内容
    _text() {
        return (
            <View style={{ width: width, alignItems: "center" }}>
                <View style={TianxieStyle._textView}>
                    <Text style={TianxieStyle._textViewText}>注册成功后你的性别、生日、身高将不能修改，请认真填写</Text>
                </View>
            </View>
        )
    }
    _content() {
        let info = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.info);
        return (
            <View style={TianxieStyle._contentWrap}>
                <View style={TianxieStyle._content}>
                    <ListView
                        contentContainerStyle={{ backgroundColor: "#fff", }}
                        dataSource={info}
                        renderRow={this._conArr.bind(this)}
                        enableEmptySections={true}
                    />

                </View>
            </View>
        )
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
            item.value = contents;
            if (!this.lock) {
                this.setState({
                    content: contents,
                    info: this.state.info
                })
            }
        }
    }
    _conArr(item) {
        if (item.type == "昵称") {
            return (
                <View style={{ paddingLeft: cal(10), height: cal(55), marginBottom: cal(1) }}>
                    <View style={{ height: cal(55), paddingLeft: cal(5), backgroundColor: "#fff", borderBottomColor: "#eee", borderBottomWidth: cal(0.5), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={TianxieStyle.textTex}>{item.type}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingRight: cal(15), }}>
                            <TextInput
                                style={{ width: cal(150), textAlign: "right", marginRight: cal(10), padding: 0, color: "#808080" }}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                clearButtonMode='always'
                                maxLength={16}
                                placeholder={"请输入昵称"}
                                value={this.state.content}
                                placeholderTextColor={PublicColor.Public_Text4}
                                onChangeText={(content) => this._nicehng(content, item)}
                            />
                            {this._Jiantou(item)}
                        </View>
                    </View>
                </View>
            )
        } else if (item.type == "性别") {
            return (
                <View style={{ paddingLeft: cal(10), height: cal(55), marginBottom: cal(0.5) }}>
                    <View style={{ height: cal(55), paddingLeft: cal(5), backgroundColor: "#fff", paddingRight: cal(15), borderBottomColor: "#eee", borderBottomWidth: cal(0.5), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={TianxieStyle.textTex}>{item.type}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <Text style={item.type != "性别" ? ((item.value == "请选择" || item.value == "请输入昵称") ? { marginRight: cal(10), color: "#b1b1b1" } : { marginRight: cal(10), color: "#808080" }) : { marginRight: cal(20), color: "#808080" }}>{item.value}</Text>
                            {this._Jiantou(item)}
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity
                    onPress={() => this.Xiugai(item)}
                    style={{ height: cal(55), marginBottom: cal(0.5) }}
                >
                    <View style={{ paddingLeft: cal(10), }}>
                        <View style={{ height: cal(55), paddingLeft: cal(5), backgroundColor: "#fff", paddingRight: cal(15), borderBottomColor: "#eee", borderBottomWidth: cal(0.5), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={TianxieStyle.textTex}>{item.type}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={item.value == "请选择" ? { marginRight: cal(10), color: "#b1b1b1" } : { marginRight: cal(10), color: "#808080" }}>{item.value}</Text>
                                {this._Jiantou(item)}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    _Jiantou(item) {
        if (item.type != "性别") {
            return (
                <Image source={JIANTOU} style={{ width: cal(12), height: cal(12) }} />
            )
        }
    }
    _btn() {
        return (
            <View style={TianxieStyle.btnwrap}>
                <TouchableOpacity
                    disabled={
                        this.state.content == "" ||
                            this.state.info[2].value == "请选择" ||
                            this.state.info[3].value == "请选择" ||
                            this.state.info[4].value == "请选择" ||
                            this.state.info[5].value == "请选择" ||
                            this.state.info[6].value == "请选择" ||
                            this.state.info[7].value == "请选择" ||
                            this.state.disableds ?
                            true : false

                    }
                    onPress={() => this.Btn()}>
                    <View style={
                        this.state.content == "" ||
                            this.state.info[2].value == "请选择" ||
                            this.state.info[3].value == "请选择" ||
                            this.state.info[4].value == "请选择" ||
                            this.state.info[5].value == "请选择" ||
                            this.state.info[6].value == "请选择" ||
                            this.state.info[7].value == "请选择" ||
                            this.state.disableds ?
                            TianxieStyle.btnwView0 :
                            (this.state.sexGu == "male" ? TianxieStyle.btnwView1 : TianxieStyle.btnwView2)}>
                        <Text style={TianxieStyle.btnwText1}>
                            下一步
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View style={TianxieStyle.wrap_wrap}>
                <ScrollView style={{ paddingBottom: this.state.huawei ? cal(30) : 0 }}>
                    <HraderLogin type={"noback"} title={"注册信息"} navigator={this.props.navigator} />
                    {this._text()}
                    {this._content()}
                    {this._btn()}
                    <Modal
                        visible={this.state.visible}
                        transparent={true}
                        animationType='fade'
                        onRequestClose={() => { alert("Modal has been closed.") }}
                        modalDidOpen={() => console.log('modal did open')}
                        modalDidClose={() => this.setState({ open: false })}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center", height: height, backgroundColor: "rgba(0,0,0,0.4)" }}>
                            <View style={{ width: cal(240), height: cal(100), backgroundColor: "#fff", borderRadius: cal(2) }}>
                                <View style={{ height: cal(55), alignItems: "center", justifyContent: "center", }}>
                                    <Text style={{ alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: cal(15), color: "#2e2e2e" }}>您的小米手机没有设置悬浮窗权限，请前往设置</Text>
                                </View>
                                <View style={{ width: cal(240), height: cal(0.5), backgroundColor: "#b1b1b1", }}>
                                </View>
                                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                visible: false
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
                                            console.log(NativeModules.MyNativeModule)
                                            AsyncStorage.setItem('quanxian', JSON.stringify('quanxian'), () => { });
                                            NativeModules.MyNativeModule.openSetting()
                                        }}
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: cal(15), color: this.state.sexGu == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>去设置</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        )
    }
    //修改资料
    Xiugai(item) {
        let that = this;
        switch (item.type) {
            case "性别":
                NativeModules.MyNativeModule.rnCallNative("对不起不能修改性别!");
                return false;
            case "生日":
                let json = {
                    a: this.state.sexGu == 'male' ? '1990' + "年" : '1992' + "年",
                    b: "1" + "月",
                    c: "1" + "日"
                }
                PickerCity._showDatePicker(json, this.state.sexGu,function (res) {
                    item.value = res[0].slice(0, 4) + '-' + (res[1].split("月")[0] < 10 ? "0" + res[1].split("月")[0] : res[1].split("月")[0]) + '-' + (res[2].split("日")[0] < 10 ? "0" + res[2].split("日")[0] : res[2].split("日")[0])
                    that.setState({
                        info: that.state.info
                    })
                })
                return false
            case "身高":
                if (this.state.sexGu == 'male') {
                    let jsonheight = '170';
                    PickerCity._showHeightMe(jsonheight,this.state.sexGu, function (res) {
                        console.log(res)
                        // item.value = res[0] != "不限" ? (res[0].split("cm"))[0] + "-" + res[1] : res[0]
                        item.value = (res[0]);

                        that.setState({
                            info: that.state.info
                        })
                    })
                    return false
                } else {
                    let jsonheight = '160';
                    PickerCity._showHeightMemom(jsonheight,this.state.sexGu, function (res) {
                        console.log(res)
                        // item.value = res[0] != "不限" ? (res[0].split("cm"))[0] + "-" + res[1] : res[0]
                        item.value = (res[0])
                        that.setState({
                            info: that.state.info
                        })
                    })
                    return false
                }
            case "学历":
                // let jsonxueli = '本科';
                PickerCity._showXueLi(this.state.sexGu,function (res) {
                    item.value = res[0]
                    that.setState({
                        info: that.state.info
                    })
                })
                return false
            case "婚姻状况":
                PickerCity._showHunYin(this.state.sexGu,function (res) {
                    item.value = res[0]
                    that.setState({
                        info: that.state.info
                    })
                })
                return false
            case "工作地址":
                let jsons = {
                    a: "江苏",
                    b: "南京",
                    c: "栖霞区"
                }
                PickerCity._showAreaPickerWork(jsons,this.state.sexGu, function (res) {
                    item.value = res[0] + '-' + res[1] + '-' + res[2];
                    that.setState({
                        info: that.state.info,
                        addrProvince: res[0],
                        addrCity: res[1],
                        addrDistrict: res[2]
                    })
                })
                return false
            case "月收入":
                if (this.state.sexGu == "male") {
                    PickerCity._showShouRuNam(this.state.sexGu,function (res) {
                        item.value = res[0]
                        that.setState({
                            info: that.state.info
                        })
                    })
                    return false
                }
                else {
                    PickerCity._showShouRuMom(this.state.sexGu,function (res) {
                        item.value = res[0]
                        that.setState({
                            info: that.state.info
                        })
                    })
                    return false
                }

        }
    }
    mUsers(content, item) {
        item.value = content;
        this.setState({
            info: this.state.info
        })
    }
    Btn() {
        let that = this;
        let blen = 0;
        for (i = 0; i < this.state.content.length; i++) {
            if ((this.state.content.charCodeAt(i) & 0xff00) != 0) {
                blen ++;
            }
            blen ++;
        }
        if (blen < 2) {
            NativeModules.MyNativeModule.rnCallNative("昵称格式1-8汉字或者2-16字母");
            return false;
        }
        that.setState({
            disableds: true
        })
        that.timerBtn = setTimeout(function (res) {
            that.setState({
                disableds: false,
            })
        }, 5000)
        let infoObject = {
            sex: this.state.sexGu,
            muser: this.state.info[1].value,
            data: this.state.info[2].value,
            height: this.state.info[3].value,
            xueli: this.state.info[4].value,
            hunyin: this.state.info[5].value,
            addrCountry: "CN",
            addrProvince: this.state.addrProvince,//省
            addrCity: this.state.addrCity,//城市
            addrDistrict: this.state.addrDistrict,//区
            yueshouru: this.state.info[7].value,
        }
        JMessage.login({
            username: that.state.JMusername,
            password: '111111'
        }, (data) => {
            that.timerBtn && clearTimeout(that.timerBtn)
            that.setState({
                disableds: false,
            })
            _ajax.get("config", function (res) {
                console.log(res)
                AsyncStorage.setItem("image_host", JSON.stringify({ image_host: res.config.image_host }))
            })
            that.props.navigator.push({
                component: SentImage,
                // reset: true,
                params: {
                    navigator: that.props.navigator,
                    username: that.state.phone,
                    password: that.state.passWord,
                    infoObject: infoObject
                }
            })
        }, (error) => {
            console.log(error)
            if (error.code == 801003) {
                JMessage.register({
                    username: that.state.JMusername,
                    password: '111111'
                })
                NativeModules.MyNativeModule.rnCallNative("操作频繁~请重试下");
            }
        })




    }
}

let TianxieStyle = StyleSheet.create({
    wrap_wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground,
        // position: "absolute",
        // height: height-cal(20),
        // width: width,
        // bottom: 0
    },
    _textView: {
        width: cal(296),
        marginTop: cal(10)
    },
    _textViewText: {
        textAlign: "center",
        lineHeight: cal(18),
        fontSize: cal(13),
        color: "#999"
    },
    _content: {
        borderWidth: cal(0.5),
        borderColor: "#e3e3e3",
        backgroundColor: "#fff"
    },
    _contentWrap: {
        marginTop: cal(10)
    },
    btnwrap: {
        alignItems: "center",
        height: cal(50),
        //  position:"absolute",
        //  bottom:cal(20),
        width: width,
        marginTop: cal(20)
    },
    btnwView1: {
        width: cal(330),
        height: cal(50),
        backgroundColor: PublicColor.Public_ClickBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btnwView2: {
        width: cal(330),
        height: cal(50),
        backgroundColor: PublicColor.Public_MomClickBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btnwView0: {
        width: cal(330),
        height: cal(50),
        backgroundColor: PublicColor.Public_NoClockBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btnwText1: {
        color: "#fff"
    },
    textTex: {
        fontSize: cal(14),
        color: "#474747"
    }
})
