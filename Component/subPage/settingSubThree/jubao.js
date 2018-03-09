
//举报
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, ListView, NativeModules, Dimensions, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
import MyIndex from './../../page/MyIndex.js';
import JubaoDetail from './jubaoDetail.js';
import JubaoDuixiang from './jubaoDuixiang.js';
import { cal } from './../../Common/Cal.js'
const JIANTOU = require('./../../image/me/zou.png');
const { PublicColor } = require("./../../Common/Color.js");
const { PublicFontSize } = require("./../../Common/FontSize.js")
export default class Jbaoubao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JubaNnameText: this.props.name ? this.props.name : "",
            JubaNnameId: this.props.id ? this.props.id : "",
            info:
                [
                    { "name": "举报对象" },
                    { "name": "发布不适当骚扰信息", 'keyId': 1 },
                    { "name": "存在欺诈骗钱行为", 'keyId': 2 },
                    { "name": "存在侵权行为", 'keyId': 3 },
                    { "name": "发布色情/诽谤/暴恐内容", 'keyId': 4 },
                    { "name": "其他不良行为", 'keyId': 5 },
                ]

        }
    }
    render() {
        let a = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.info)
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground, }}>
                <Header type={"zhuce"} title={"不良信息举报"} navigator={this.props.navigator} />
                <View style={Jubao.ViewList}>
                    <ListView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={Jubao.ListViewStyle}
                        dataSource={a}
                        renderRow={this._conArr.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            </View>
        )
    }
    _conArr(item, id, key) {
        if (item.name == "举报对象") {
            return (
                <View>
                    <View style={Jubao.ListViewStyle_sub}>
                        <TouchableOpacity
                            onPress={() => this.jubaoDetail(item)}
                        >
                            <View style={[Jubao.ListViewStyle_sub_View, key == 0 ? { borderTopWidth: cal(0.5), borderTopColor: PublicColor.Public_Text9 } : {}]}>
                                <Text style={Jubao.ListViewStyle_sub_View_text}>{item.name}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#5f5f5f", fontSize: cal(15) }}>{this.state.JubaNnameText}</Text>
                                    <Image source={JIANTOU} style={{ width: cal(12), height: cal(12) }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: cal(10), backgroundColor: PublicColor.Public_ViewBackground }}>
                    </View>
                </View>
            )
        }
        return (
            <View style={Jubao.ListViewStyle_sub}>
                <TouchableOpacity
                    onPress={() => this.jubaoDetail(item)}
                >
                    <View style={[Jubao.ListViewStyle_sub_View, key == 0 ? { borderTopWidth: cal(0.5), borderTopColor: PublicColor.Public_Text9 } : {}]}>
                        <Text style={Jubao.ListViewStyle_sub_View_text}>{item.name}</Text>
                        <Image source={JIANTOU} style={{ width: cal(12), height: cal(12) }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    JubaNnames(name, id) {
        this.forceUpdate()
        this.setState({
            JubaNnameText: name,
            JubaNnameId: id,
            info: this.state.info
        })
    }
    jubaoDetail(item) {
        if (item.name == "举报对象") {
            this.props.navigator.push({
                component: JubaoDuixiang,
                params: {
                    navigator: this.props.navigator,
                    type: item.name,
                    JubaNname: this.JubaNnames.bind(this),
                }
            })
        } else {
            if (this.state.JubaNnameText == "") {
                NativeModules.MyNativeModule.rnCallNative("请先选择举报对象！");
            } else {
                this.props.navigator.push({
                    component: JubaoDetail,
                    params: {
                        navigator: this.props.navigator,
                        type: item.keyId,
                        JubaNnameId: this.state.JubaNnameId,
                        JubaNnameText: this.state.JubaNnameText,
                    }
                })
            }
        }
    }
}
let Jubao = StyleSheet.create({
    ViewList: {
        marginTop: cal(15),
        // paddingLeft: cal(10),
        // paddingRight: cal(10),

    },
    ListViewStyle: {
        backgroundColor: "#fff",
        // borderWidth: cal(0.5),
        // borderColor: PublicColor.Public_Text2

    },
    ListViewStyle_sub: {
        height: cal(50),
        paddingLeft: cal(15),
        // paddingRight: cal(6)
    },
    ListViewStyle_sub_View: {
        borderBottomWidth: cal(0.5),
        paddingRight: cal(15),
        height: cal(50),
        borderBottomColor: PublicColor.Public_Text9,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingLeft: cal(5)
    },
    ListViewStyle_sub_View_text: {
        color: PublicColor.Public_Text3,
        fontSize: PublicFontSize.PublicFontSize_28
    }
})