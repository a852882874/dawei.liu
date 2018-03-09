import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform,AsyncStorage, Navigator, Dimensions, ToastAndroid, Image, TouchableWithoutFeedback, Animated, TextInput } from 'react-native'
import HraderLogin from './../Common/Header.js'
import LinearGradient from 'react-native-linear-gradient';
import { cal } from './../Common/Cal';
const { PublicColor } = require("./../Common/Color.js")
const { width, height } = Dimensions.get('window');
const BACKGROUND = require('./../image/public/background.png');
const BACK = require('./../image/me/back.png');
const BACKBLOCK = require('./../image/me/back_block.png');
const _this = {};
export default class Mess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            sex: ""
        }
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result).user_sex) {
                that.setState({
                    sex: JSON.parse(result).user_sex,
                })
            }
        })
    }
    _top() {
        if (this.state.sex == "male") {
            return (
                <View>
                    <Image
                        source={BACKGROUND}
                        style={[{ height: cal(44), paddingLeft: cal(15), paddingRight: cal(15), width: width, backgroundColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigator.pop()
                            }}
                        >
                            <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                <Image source={BACKBLOCK} style={{ width: cal(21), height: cal(21) }} />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: cal(17), color: PublicColor.Public_Text5 }}>填写昵称</Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.mUser(this.state.content, this.props.item);
                                this.props.navigator.pop();
                            }}
                        >
                            <View style={{ position: "absolute", top: 0, right: cal(15), height: cal(44), justifyContent: "center" }}>
                                <Text style={{ color: "#1f1f1f", fontSize: cal(15) }}>保存</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Image>
                </View>
            )
        } else {
            return (
                <LinearGradient colors={['#958cf4', '#7b6ff1']}
                    start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 1.0 }}
                    locations={[0, 0.6]}
                    style={[nicheng.linearGradient]}>
                    <View style={{ height: cal(44), width: width, position: "absolute", left: 0, top: 0, justifyContent: "center", alignItems: "center" }}>
                        <TouchableWithoutFeedback
                            onPress={() => {

                                this.props.navigator.pop()
                            }}
                        >
                            <View style={{ position: "absolute", top: 0, left: cal(15), height: cal(44), justifyContent: "center" }}>
                                <Image source={BACK} style={{ width: cal(19), height: cal(19) }} />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: cal(17), color: "#fff" }}>{this.props.text}</Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.mUser(this.state.content, this.props.item);
                                this.props.navigator.pop();
                            }}
                        >
                            <View style={{ position: "absolute", top: 0, right: cal(15), height: cal(44), justifyContent: "center" }}>
                                <Text style={{ color: "#fff", fontSize: cal(15) }}>保存</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </LinearGradient>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                <View style={{ height: cal(44), }}>
                    {this._top()}
                    <View style={nicheng.bottomNicheng}>
                        <View style={nicheng.bottom_View}>
                            <TextInput
                                style={nicheng.textInput}
                                clearTextOnFocus={true}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                enablesReturnKeyAutomatically={true}
                                blurOnSubmit={true}
                                disableFullscreenUI={true}
                                multiline={true}
                                autoFocus={true}
                                clearButtonMode='always'
                                maxLength={10}
                                placeholder={"请修改新昵称"}
                                placeholderTextColor={PublicColor.Public_NoClockBackground}
                                onChangeText={(content) => this.setState({ content: content })}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: cal(4) }}>
                            <Text>{this.state.content.length}</Text>
                            <Text>/</Text>
                            <Text>10</Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}



// maxLength={11}
// 
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
    }
});