
//意见反馈
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, NativeModules, Platform, AsyncStorage,
    Navigator, Dimensions, ScrollView, Image, TouchableOpacity, TextInput
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
import MyIndex from './../../page/MyIndex.js';
import { cal } from './../../Common/Cal.js';
const { PublicColor } = require("./../../Common/Color.js");
import JMessage from 'jmessage-react-plugin';
// import LinearGradient from 'react-native-linear-gradient';
// const MORENAVI = require('./../../image/chat/chatMo.png');
const ABOUT = require('./../../image/shezhi/about.png');
const JUBAO = require('./../../image/shezhi/jubao.png');
const JUBAOED = require('./../../image/shezhi/jubaoed.png');
import _ajax from '../../Common/LoginAjax';
export default class feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            type: this.props.type,
            jubaoimage: false,
            sex: ''
        }

        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_Text7 }}>
                <Header type={"zhuce"} alert={this.state.content != "" ? "alert" : ""} title={"举报内容"} navigator={this.props.navigator} />
                <View style={Feedback.bottomfeedback}>
                    <View style={Feedback.bottom_View}>
                        <AutoExpandingTextInput
                            placeholderTextColor={PublicColor.Public_NoClockBackground}
                            onChangeText={(content) => this.setState({ content: content })}
                            clearTextOnFocus={true}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            disableFullscreenUI={true}
                            multiline={true}
                            clearButtonMode='always'
                            maxLength={1500}
                            placeholder={"请进行详细描述"}
                            style={Feedback.textInput}
                        />
                        {/* <View style={Feedback.setImage}>
                            <Image source={ABOUT} style={{ width: cal(52), height: cal(47) }} />
                            <Text style={[Feedback.colorCommon, { marginLeft: cal(10) }]}>图片依据</Text>
                        </View> */}
                        <View style={{ height: cal(43), flexDirection: "row", alignItems: "center", position: "absolute", bottom: 0, width: width, borderTopWidth: cal(0.5), borderTopColor: "#e1e1e1" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        jubaoimage: !this.state.jubaoimage
                                    })
                                }}
                            ><View style={{ height: cal(43), flexDirection: "row", alignItems: 'center' }}>
                                    <View style={{ paddingLeft: cal(10), paddingRight: cal(8) }}>
                                        <Image source={this.state.jubaoimage ? JUBAOED : JUBAO} style={{ width: cal(15), height: cal(15), }} />
                                    </View>
                                    <Text style={{ color: "#828282", fontSize: cal(14) }}>匿名</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: cal(10) }}>
                        <Text style={Feedback.colorCommon}>{this.state.content.length}</Text>
                        <Text style={Feedback.colorCommon}>/</Text>
                        <Text style={Feedback.colorCommon}>1500</Text>
                    </View>
                </View >
                <View style={Feedback.btnWrap}>
                    <TouchableOpacity
                        disabled={this.state.content != "" ? false : true}
                        onPress={() => {
                            let json = {
                                'targetId': this.props.JubaNnameId,
                                'reason': this.state.type,
                                'detail': this.state.content,
                            }
                            let that = this;
                            console.log(json)
                            _ajax.post_token("user/complain", json, function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    NativeModules.MyNativeModule.rnCallNative("举报成功");
                                    let headNav = that.props.navigator
                                    headNav.popToRoute(
                                        that.props.navigator.getCurrentRoutes()[1]
                                    )
                                }else{
                                    NativeModules.MyNativeModule.rnCallNative(res.info);
                                }
                            })
                        }}
                    >
                        <View style={[Feedback.btnWrap_View, this.state.content != "" ? { backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground } : { backgroundColor: PublicColor.Public_NoClockBackground }]}>
                            <Text style={Feedback.btnWrap_view_text}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}
let Feedback = StyleSheet.create({
    bottomfeedback: {
        paddingLeft: cal(15),
        paddingRight: cal(15),
        marginTop: cal(10),
    },
    bottom_View: {
        width: cal(345),
        height: cal(250),
        backgroundColor: "#fff",
        borderRadius: cal(3),
        //注意：这一句是可以让安卓拥有灰色阴影  
        borderWidth: cal(0.5),
        borderColor: "#eee",
        position: "relative"
    },
    setImage: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: cal(12),
        paddingBottom: cal(48)
    },
    textInput: {
        width: cal(345),
        height: cal(90),
        paddingBottom: cal(15),
        color: "#5f5f5f",
        fontSize: cal(13)
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
    colorCommon: {
        color: PublicColor.Public_Text4,
        fontSize: cal(12)
    },
    tishi: {
        marginTop: cal(51),
        alignItems: "center"
    },
    tishi_text: {
        color: PublicColor.Public_Text1,
        fontSize: cal(11)
    },
    btnWrap: {
        marginTop: cal(50),
        alignItems: "center"
    },
    btnWrap_View: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "red",
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btnWrap_view_text: {
        color: "#fff",
        fontSize: cal(16)
    }
})