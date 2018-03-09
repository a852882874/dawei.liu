import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text, Platform, Navigator, AsyncStorage, Dimensions, TouchableOpacity, ToastAndroid, Image, TouchableWithoutFeedback, Animated, TextInput } from 'react-native'
import Header from "./../../Common/Header.js";
import LinearGradient from 'react-native-linear-gradient';
import { cal } from './../../Common/Cal';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
const { PublicColor } = require("./../../Common/Color.js")
const { width, height } = Dimensions.get('window');
const BACK = require('./../../image/me/back.png');
const BACKBLOCK = require('./../../image/me/back_block.png');
const BACKBLOCKMom = require('./../../image/me/back.png');
const BACKGROUND = require('./../../image/public/background.png');
import JMessage from 'jmessage-react-plugin';
export default class Mess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.name == null ? "" : this.props.name,
            sex: "",
        }
    }
    componentDidMount() {
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
    }
    _content_n() {
        return (
            <View style={{ height: cal(44), width: width, position: "absolute", left: 0, top: 0, justifyContent: "center", alignItems: "center" }}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigator.pop()
                    }}
                >
                    <View style={{ position: "absolute", top: 0, left: cal(15), width: cal(29), height: cal(44), justifyContent: "center" }}>
                        <Image source={this.state.sex=="male"?BACKBLOCK:BACKBLOCKMom} style={{ width:this.state.sex=="male"? cal(21):cal(10), height: this.state.sex=="male"?cal(21):cal(18) }} />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: cal(17), color: this.state.sex == "male" ? PublicColor.Public_Text5:"#fff" }}>{this.props.text}</Text>
                <TouchableWithoutFeedback
                    disabled={this.state.content == "" ? true : false}
                    onPress={() => {
                        if (this.state.content == "") {
                            this.props.navigator.pop()
                        } else {
                            this.props.contets(this.state.content)
                            this.props.navigator.pop()
                        }
                    }}
                >
                    <View style={{ position: "absolute", top: 0, right: cal(15), height: cal(44), justifyContent: "center" }}>
                        <Text style={{ fontSize: cal(15), color: this.state.content == ""?PublicColor.Public_Text2:this.state.sex == "male"?PublicColor.Public_Text5:"#fff" }}>确定</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    _sex() {
        if (this.state.sex == "male") {
            return (
                <View>
                    <Image
                        source={BACKGROUND}
                        style={[{ height: cal(44), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
                    >
                        {this._content_n()}
                    </Image>
                </View>
            )
        } else {
            return (
                <LinearGradient colors={['#b7b1f8', '#958cf4']}
                    start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 1.0 }}
                    locations={[0.4, 0.6]}
                    style={[nicheng.linearGradient]}>
                    {this._content_n()}
                </LinearGradient>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#eee" }}>
                <View style={{ height: cal(44), }}>
                    {this._sex()}
                </View>
                <View style={nicheng.bottomNicheng}>
                    <View style={nicheng.bottom_View}>
                        <AutoExpandingTextInput
                            style={nicheng.textInput}
                            clearTextOnFocus={true}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            disableFullscreenUI={true}
                            multiline={true}
                            autoFocus={true}
                            clearButtonMode='always'
                            maxLength={this.props.text == "昵称" ? 10 : 1500}
                            value={this.state.content}
                            // placeholder={this.props.name}
                            placeholderTextColor={PublicColor.Public_NoClockBackground}
                            onChangeText={(content) => this.setState({ content: content })}

                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: cal(4) }}>
                        <Text>{this.state.content.length != null ? this.state.content.length : 0}</Text>
                        <Text>/</Text>
                        <Text>1500</Text>
                    </View>
                </View>
                {/* <View style={nicheng.btn}>
                    <TouchableOpacity
                        disabled={this.state.content != "" ? false : true}
                        onPress={() => this.ToText()}
                    >
                        <View style={[nicheng.btnLoggin,
                        this.state.content != '' ? { backgroundColor: this.state.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }
                            : { backgroundColor: PublicColor.Public_NoClockBackground, }
                        ]}>
                            <Text style={nicheng.btn_text}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
    ToText() {
        alert()
    }
}

let nicheng = StyleSheet.create({
    linearGradient: {
        height: cal(44)
    },
    bottomNicheng: {
        paddingLeft: cal(15),
        paddingRight: cal(15),
        marginTop: cal(10),
    },
    bottom_View: {
        width: cal(345),
        height: cal(197),
        backgroundColor: "#fff",
        borderRadius: cal(3)
    },
    textInput: {
        width: cal(345),
        height: cal(197),
        color: PublicColor.Public_Text3
    },
    mainContainer: {
        flex: 1,
        backgroundColor: PublicColor.Public_Text1
    },
    counter1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 0,
        backgroundColor: '#ffff00'
    },
    btn: {
        marginTop: cal(60),
        width: width,
        height: cal(50),
        alignItems: "center",
        borderRadius: cal(4)
    },
    btnLoggin: {
        width: cal(330),
        height: cal(50),
        borderRadius: cal(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btn_text: {
        color: '#fff',
        fontSize: cal(15)
    },
});