//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, Modal, ScrollView, InteractionManager, TouchableWithoutFeedback, Platform, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizText from './quizTest.js'
const { cal } = require("./../Common/Cal.js");
import Header from "./../Common/Header.js";
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
const LOGO = require("./../image/quize/quizIndex.png");
import _ajax from '../Common/LoginAjax';
import Loadding from './../Common/Loadding.js'
export default class quizIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_sex: "",
            data: "",
            open: false,
            latest_date: "",
            Loadding: true
        }

    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._fetchData();
        });
    }
    _fetchData() {
        let that = this;
        that.imageUploads2(that).then(function (data) {
            return that.imageUploads(that);
        }).then(function (data) {
            that.setState({
                Loadding: false
            })
        })
    }

    imageUploads2(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            AsyncStorage.getItem('user_sex', (err, result) => {
                if (JSON.parse(result)) {
                    that.setState({
                        user_sex: JSON.parse(result).user_sex,
                    })
                    resolve("1")
                } else {
                    resolve("1")
                }
            })
        });
        return p;
    }
    imageUploads(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            _ajax.get_token("match/questions/user/answer_stat", that.props.navigator, function (res) {
                console.log(res)
                let stringTime = res.latest_date;
                let timestamp2 = Date.parse(new Date(stringTime));
                timestamp2 = timestamp2 / 1000;
                let timestamp = Date.parse(new Date());
                timestamp = timestamp / 1000;
                let nTime = timestamp - timestamp2;
                let data = Math.floor(nTime / 86400);
                let hour = Math.floor(nTime % 86400 / 3600);
                let minute = Math.floor(nTime % 86400 % 3600 / 60);
                // console.log(data + '-' + hour + '-' + minute )
                if (data < 7) {
                    that.setState({
                        data: 7-data
                    })

                } else if (data >= 7) {
                    that.setState({
                        data: 0,
                    })
                }
                resolve("1")
            })
        });
        return p;
    }
    _Loadding() {
        if (this.state.Loadding) {
            return (
                // <Loadding from={"transent"} title={"正在加载中..."} />
                <Loadding from={"transent"} />
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                <Header title={""} type={"zhuce"} {... this.props} />
                {this._Loadding()}
                <View style={{ paddingTop: cal(60), paddingBottom: cal(60), alignItems: "center" }}>
                    <Image source={LOGO} style={{ width: cal(111), height: cal(81) }} />
                </View>
                <View style={{ alignItems: "center", }}>
                    <Text style={{ color: PublicColor.Public_Text3, fontSize: PublicFontSize.PublicFontSize_34, marginBottom: cal(9) }}>心灵匹配</Text>
                    <Text style={{ textAlign: "center", fontSize: PublicFontSize.PublicFontSize_28, color: PublicColor.Public_Text1, marginBottom: cal(2) }}>心灵匹配利用精准的数据分析，为你推荐</Text>
                    <Text style={{ textAlign: "center", fontSize: PublicFontSize.PublicFontSize_28, color: PublicColor.Public_Text1 }}>最般配的那个ta</Text>
                    <Text style={{ textAlign: "center", fontSize: PublicFontSize.PublicFontSize_24, color: PublicColor.Public_Text4, marginTop: cal(35) }}>已完成该心灵测试</Text>
                </View>
                <View style={{ alignItems: "center", position: "absolute", bottom: 0 }}>
                    <TouchableOpacity
                        disabled={this.state.data == 0 ? false : true}
                        onPress={() => {
                            this.BtnQuizText()

                        }}
                    >
                        <View style={this.state.data != 0 || this.state.Loadding ? QuizOne.btn3 : (this.state.user_sex == "male" ? QuizOne.btn : QuizOne.btn2)}>
                            <Text style={QuizOne.btn_text}>{this.state.data != 0 ? this.state.data + '天后可重新测试' : "重新测试"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.open}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={() => { alert("Modal has been closed.") }}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({ open: false })}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                open: false
                            })
                        }}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center", height: height, backgroundColor: "rgba(0,0,0,0.4)" }}>
                            <View style={{ width: cal(280), height: cal(140), backgroundColor: "#fff", borderRadius: cal(5) }}>
                                <View style={{ justifyContent: "center", alignItems: "center", height: cal(144 - 0.5 - 20 - 50 - 18), marginTop: cal(16) }}>
                                    <Text style={{ fontSize: cal(14), color: "#5f5f5f" }}>R（大招）：时间倒转，重置心灵匹配测试</Text>
                                    <Text style={{ fontSize: cal(14), color: "#5f5f5f" }}>技能冷却时间：一周</Text>
                                </View>
                                <View style={{ width: cal(280), height: cal(0.5), backgroundColor: "#b1b1b1", marginTop: cal(20) }}>

                                </View>
                                <View style={{ height: cal(50), justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                open: false
                                            })
                                        }}
                                        style={{ flex: 1, borderRightWidth: cal(0.5), borderRightColor: "#b1b1b1", height: cal(50) }}
                                    >
                                        <View style={{ alignItems: "center", height: cal(50), justifyContent: "center" }}>
                                            <Text style={{ fontSize: cal(14), color: "#5f5f5f" }}>取消</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => {
                                            this.setState({
                                                open: false,
                                            })
                                            this.props.navigator.replace({
                                                component: QuizText,
                                                // reset:true,
                                                params: {
                                                    type: "登录",
                                                    navigator: this.props.navigator
                                                }
                                            })
                                        }}
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: cal(14), color: this.state.user_sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>开始测试</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }
    BtnQuizText() {
        this.setState({
            open: true
        })

    }
}

let QuizOne = StyleSheet.create({
    btn: {
        width: width,
        height: cal(50),
        backgroundColor: PublicColor.Public_ClickBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn2: {
        width: width,
        height: cal(50),
        backgroundColor: PublicColor.Public_MomClickBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn3: {
        width: width,
        height: cal(50),
        backgroundColor: PublicColor.Public_NoClockBackground,
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn_text: {
        color: '#fff',
        fontSize: cal(15)
    },

})
