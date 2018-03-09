
//意见反馈
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, NativeModules, Dimensions, AsyncStorage,
    ScrollView, Image, TouchableOpacity, TextInput
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
import MyIndex from './../../page/MyIndex.js';
import { cal } from './../../Common/Cal.js';
const { PublicColor } = require("./../../Common/Color.js");
import _ajax from '../../Common/LoginAjax';
// import LinearGradient from 'react-native-linear-gradient';
import JMessage from 'jmessage-react-plugin';
// const MORENAVI = require('./../../image/chat/chatMo.png');
const ABOUT = require('./../../image/shezhi/about.png');
export default class feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            // 沟通和理解往往比一两句情话更让人温暖，
            sex: ""
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
                <Header type={"zhuce"} alert={this.state.content != "" ? "alert" : ""} title={"意见反馈"} navigator={this.props.navigator} />
                <View style={Feedback.bottomfeedback}>
                    <View style={Feedback.bottom_View}>
                        <AutoExpandingTextInput
                            placeholderTextColor={"#b1b1b1"}
                            onChangeText={(content) => this.setState({ content: content })}
                            clearTextOnFocus={true}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            disableFullscreenUI={true}
                            multiline={true}
                            clearButtonMode='always'
                            maxLength={1500}
                            placeholder={'你的每一个走心的建议，都会让我变得更好。'}
                            style={[Feedback.textInput]}
                        />
                        {/* <View style={Feedback.setImage}>
                            <Image source={ABOUT} style={{width:cal(52),height:cal(47)}} />
                            <Text style={[Feedback.colorCommon,{marginLeft:cal(10)}]}>添加照片</Text>
                        </View> */}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: cal(10) }}>
                        <Text style={Feedback.colorCommon}>{this.state.content.length}</Text>
                        <Text style={Feedback.colorCommon}>/</Text>
                        <Text style={Feedback.colorCommon}>1500</Text>
                    </View>
                </View>
                {/* <View style={Feedback.tishi}>
                    <Text style={Feedback.tishi_text}>反馈问题意见时，如有需要可以最多添加四张照片，非常感谢。</Text>
                </View> */}
                <View style={Feedback.btnWrap}>
                    <TouchableOpacity
                        disabled={this.state.content != "" ? false : true}
                        onPress={() => this._Sent()}
                    >
                        <View style={[Feedback.btnWrap_View, this.state.content != "" ? { backgroundColor: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground } : { backgroundColor: PublicColor.Public_NoClockBackground }]}>
                            <Text style={Feedback.btnWrap_view_text}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    _Sent() {
        let json = {
            detail: this.state.content
        }
        let that = this;
        _ajax.post_token("user/complain", json, function (res) {
            console.log(res)
            if (res.code == 0) {
                NativeModules.MyNativeModule.rnCallNative("意见反馈提交成功");
                that.props.navigator.pop();
            }else{
                NativeModules.MyNativeModule.rnCallNative(res.info);
            }
        })
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
        height: cal(197),
        backgroundColor: "#fff",
        borderRadius: cal(3),
        //注意：这一句是可以让安卓拥有灰色阴影  
        // elevation: 4,
        borderWidth: cal(0.5),
        borderColor: '#eee',
        position: "relative"
    },
    setImage: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: cal(12),
        paddingBottom: cal(12)
    },
    textInput: {
        width: cal(345),
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
        fontSize: cal(12)
    },
    btnWrap: {
        marginTop: cal(116),
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