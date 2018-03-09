//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Image, Dimensions, ToastAndroid, BackAndroid, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
import { cal } from './../Common/Cal.js';
import Header from './../Common/Header.js';
const { PublicColor } = require("./../Common/Color.js")
const ZUO = require('./../image/me/zou.png')

export default class setMess extends Component {
    constructor(props) {
        super(props);
    }
    _OneView() {
        return (
            <View style={setMessStyle.View_One}>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >更换手机号</Text>
                    <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={setMessStyle.View_One_line}></View>
                </View>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >修改密码</Text>
                    <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={setMessStyle.View_One_line}></View>
                </View>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >清除缓存</Text>
                    <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                </View>
            </View>
        )
    }
    _TwoView() {
        return (
            <View style={[setMessStyle.View_One,{marginTop:cal(10)}]}>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >意见反馈</Text>
                    <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={setMessStyle.View_One_line}></View>
                </View>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >不良信息举报</Text>
                    <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={setMessStyle.View_One_line}></View>
                </View>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >关于</Text>
                    <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                </View>
            </View>
        )
    }
    _ThreeView(){
        return(
            <View  style={[setMessStyle.View_One,{marginTop:cal(10)}]}>
                <View style={setMessStyle.View_One_sub}>
                    <Text style={setMessStyle.View_One_sub_text} >退出当前账号</Text>
                    <Image source={ZUO} style={{width:cal(12),height:cal(12)}} />
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={setMessStyle.wrap}>
                <Header type={"zhuce"} title={"设置"} navigator={this.props.navigator} />
                <View style={setMessStyle.View_wrap}>
                    {this._OneView()}
                    {this._TwoView()}
                    {this._ThreeView()}
                </View>
            </View>
        )
    }
}

let setMessStyle = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor:PublicColor.Public_ViewBackground
    },
    View_wrap: {
        marginTop: cal(10),
        paddingLeft: cal(10),
        paddingRight: cal(10),

    },
    View_One: {
        backgroundColor: "#fff",
        borderRadius: cal(2),
        borderWidth: cal(1),
        borderColor: "#dcdcdc"
    },
    View_One_sub: {
        height: cal(50),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: cal(20),
        paddingRight: cal(10)
    },
    View_One_line: {
        width: cal(340),
        height: cal(0.5),
        backgroundColor: "#dcdcdc"
    },
    View_One_sub_text: {
        fontSize: cal(14),
        color:PublicColor.Public_Text3
    }
})