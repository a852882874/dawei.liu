// 注销并退出
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, AsyncStorage, Dimensions, Linking, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
import MyIndex from './../../page/MyIndex.js';
import { cal } from './../../Common/Cal.js';
import JMessage from 'jmessage-react-plugin';
import Login from './../../login/login.js';
import _ajax from './../../Common/LoginAjax'
const { PublicColor } = require("./../../Common/Color.js")
export default class ExitLogouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 0,
            sex: "",
            phone: ""
        }
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
        JMessage.getMyInfo((UserInf) => {
            console.log(UserInf)
            if (typeof (UserInf.username) == "undefine") {
            } else {
                console.log(UserInf)
                this.setState({
                    phone: UserInf.username
                })
            }
        })
    }
    render() {
        return (
            <View style={ExitLogout.wrap}>
                <Header type={"zhuce"} title={"注销账号"} navigator={this.props.navigator} />
                {this._one()}
                {this._two()}
                {this._btn()}
            </View>
        )
    }
    _one() {
        return (
            <View style={{ alignItems: "center", marginTop: cal(15) }}>
                <Text style={{ color: PublicColor.Public_Text4, fontSize: cal(12) }}>注销账号期间，系统将会停止把你推荐给其他用户，聊天等其他</Text>
                <Text style={{ color: PublicColor.Public_Text4, fontSize: cal(12) }}>功能也将关闭，再次登录将会自动恢复所有功能</Text>
            </View>
        )
    }
    _two() {
        return (
            <View>
                <View style={ExitLogout._twoWrap}>
                    <View style={ExitLogout._two} >
                        <TouchableOpacity
                            onPress={() => this.qieHuan(0)}
                        >
                            <View style={ExitLogout._twoView}>
                                <View style={[ExitLogout._twoViewSub, {
                                    borderTopWidth: cal(0.5),
                                    borderTopColor: PublicColor.Public_Text9,
                                }]}>
                                    <View style={ExitLogout._twoViewSub_View}>
                                        <Text style={ExitLogout._twoViewSub_View_Text}>暂时不使用该平台</Text>
                                    </View>
                                    <View style={ExitLogout.XIaodianView}>
                                        <View style={this.state.content == 0 ? (this.state.sex == "male" ? ExitLogout.XIaodianViewSub : ExitLogout.XIaodianViewSub2) : ""}></View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.qieHuan(1)}
                        >
                            <View style={ExitLogout._twoView}>
                                <View style={ExitLogout._twoViewSub}>
                                    <View style={ExitLogout._twoViewSub_View}>
                                        <Text style={ExitLogout._twoViewSub_View_Text}>已经在该平台找到心仪的对象</Text>
                                    </View>
                                    <View style={ExitLogout.XIaodianView}>
                                        <View style={this.state.content == 1 ? (this.state.sex == "male" ? ExitLogout.XIaodianViewSub : ExitLogout.XIaodianViewSub2) : ""}></View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.qieHuan(2)}
                        >
                            <View style={ExitLogout._twoView}>
                                <View style={ExitLogout._twoViewSub}>
                                    <View style={ExitLogout._twoViewSub_View}>
                                        <Text style={ExitLogout._twoViewSub_View_Text}>在该平台没有找到心仪的对象</Text>
                                    </View>
                                    <View style={ExitLogout.XIaodianView}>
                                        <View style={this.state.content == 2 ? (this.state.sex == "male" ? ExitLogout.XIaodianViewSub : ExitLogout.XIaodianViewSub2) : ""}></View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.qieHuan(3)}
                        >
                            <View style={ExitLogout._twoView}>
                                <View style={ExitLogout._twoViewSub}>
                                    <View style={ExitLogout._twoViewSub_View}>
                                        <Text style={ExitLogout._twoViewSub_View_Text}>其他</Text>
                                    </View>
                                    <View style={ExitLogout.XIaodianView}>
                                        <View style={this.state.content == 3 ? (this.state.sex == "male" ? ExitLogout.XIaodianViewSub : ExitLogout.XIaodianViewSub2) : ""}></View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    qieHuan(id) {
        this.setState({
            content: id
        })
    }
    _btn() {
        return (

            <View style={ExitLogout.Btn_View}>
                <TouchableOpacity
                    disabled={this.state.content == 0 || this.state.content == 1 || this.state.content == 2 || this.state.content == 3 ? false : true}
                    onPress={() => this.BtnSent()}
                >
                    <View style={[ExitLogout.Btn_View_SubView, this.state.content == 0 || this.state.content == 1 || this.state.content == 2 || this.state.content == 3 ? (this.state.sex == "male" ? ExitLogout.Btn_View_SubView1 : ExitLogout.Btn_View_SubView12) : ExitLogout.Btn_View_SubView2]}>
                        <Text style={ExitLogout.Btn_View_SubView_Text}>注销并退出</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    BtnSent() {
        let formData = new FormData();
        let Value = "";
        // formData.append("phoneN", parseInt(this.state.phone))
        // formData.append("Value", this.state.content)
        switch (this.state.content) {
            case 0:
                Value = "暂时不使用该平台";
                break;
            case 1:
                Value = "已经在该平台找到心仪的对象";
                break;
            case 2:
                Value = "在该平台没有找到心仪的对象";
                break;
            case 3:
                Value = "其他";
                break;
        }
        console.log(Value)
        let json = { "reason": Value }
        let that = this;
        _ajax.post_token("user/signoff", json, function (res) {
            console.log(res)
            if (res.code == 0) {
                JMessage.logout();
                AsyncStorage.removeItem("user_mom_old", function (errs) { })
                AsyncStorage.removeItem("visibleShowScrollViewLeft", function (errs) { })
                AsyncStorage.removeItem("visibleShowScrollViewRight", function (errs) { })
                AsyncStorage.removeItem("topics_mtime", function (errs) { })
                AsyncStorage.removeItem("bannar_mtime", function (errs) { })
                AsyncStorage.removeItem("freq_asked_questions_mtime", function (errs) { })
                AsyncStorage.removeItem("user_mom_old", function (errs) { })
                AsyncStorage.removeItem("tokenId", function (errs) { })
                AsyncStorage.removeItem("image_host", function (errs) { })
                AsyncStorage.removeItem("UserList", function (errs) { })
                AsyncStorage.removeItem("Image", function (errs) { })
                AsyncStorage.removeItem("UserList", function (errs) { })
                AsyncStorage.removeItem("ziliao", function (errs) { })
                AsyncStorage.removeItem("Image", function (errs) { })
                AsyncStorage.removeItem("user_token", function (errs) {
                    if (!errs) {
                        that.props.navigator.push({
                            component: Login,
                            reset: true,
                            params: {
                                navigator: that.props.navigator,
                            }
                        })
                    }
                });
            }
        })
    }
}
let ExitLogout = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground
    },
    _twoWrap: {
        backgroundColor: PublicColor.Public_ViewBackground,
        // paddingLeft: cal(10),
        // paddingRight: cal(10),
        marginTop: cal(10)
    },
    _two: {
        backgroundColor: "#fff",
        // borderColor: "#e2e2e2",
        // borderWidth: cal(0.5)
    },
    _twoView: {
        height: cal(60),
        flexDirection: "row",
        alignItems: "center",
        // paddingLeft: cal(6),
        // paddingRight: cal(10)
        paddingLeft: cal(15)
    },
    _twoViewSub: {
        height: cal(60),
        borderBottomWidth: cal(0.5),
        borderBottomColor: PublicColor.Public_Text9,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    _twoViewSub_View: {
        flexDirection: "row",
        alignItems: "center",
    },
    _twoViewSub_View_Text: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14),
        marginLeft: cal(3)
    },
    XIaodianView: {
        width: cal(14),
        height: cal(14),
        borderRadius: cal(14),
        borderWidth: cal(1),
        borderColor: PublicColor.Public_NoClockBackground,
        marginRight: cal(15),
        justifyContent: "center",
        alignItems: "center"
    },
    XIaodianViewSub: {
        width: cal(6),
        height: cal(6),
        borderRadius: cal(6),
        backgroundColor: PublicColor.Public_ClickBackground,
    },
    XIaodianViewSub2: {
        width: cal(6),
        height: cal(6),
        borderRadius: cal(6),
        backgroundColor: PublicColor.Public_MomClickBackground,
    },
    Btn_View: {
        marginTop: cal(135),
        alignItems: "center"
    },
    Btn_View_SubView: {
        width: cal(300),
        height: cal(50),
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: 'center'
    },
    Btn_View_SubView1: {
        backgroundColor: PublicColor.Public_ClickBackground,
    },
    Btn_View_SubView12: {
        backgroundColor: PublicColor.Public_MomClickBackground,
    },
    Btn_View_SubView2: {
        backgroundColor: PublicColor.Public_NoClockBackground,
    },
    Btn_View_SubView_Text: {
        color: "#fff",
        fontSize: cal(15),
    }
})