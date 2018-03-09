//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator,
    Dimensions, Image, BackAndroid,
    TouchableWithoutFeedback, AsyncStorage, Alert, InteractionManager
} from 'react-native'
const { width, height } = Dimensions.get("window");
const { cal } = require("./../Common/Cal.js");
const { PublicColor } = require("./../Common/Color.js")
import Header from "./../Common/Header.js";
// const SEARCHBANNER = require('./../image/mom/search.png');
const SEARCHBANNER = require('./../image/gif/search.gif');
import SplashScreen from 'react-native-splash-screen'
import Firest from './../home/FirestFamle.js';
export default class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diandian: "...",
        }
        this.lock = false;
        let that = this;
        InteractionManager.runAfterInteractions(() => {
            SplashScreen.hide();
            that.times = setTimeout(function () {
                if (!that.lock) {
                    that.props.navigator.replace({
                        component: Firest,
                        reset: true,
                        type: "image",//注意这个赋值，
                        sex:"female",
                        params: {
                            navigator: that.props.navigator,
                            gender: that.props.gender,
                        }
                    })
                    that.times && clearTimeout(that.times)
                }
                return false;
            }, 3000)
            return false;
        });
    }
    componentWillUnmount() {
        this.lock = true;
        this.times && clearTimeout(this.times)
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", position: "relative" }}>
                <Header type={"noback"} title={"寻觅"} {... this.props} />
                <View style={{ marginTop: cal(100), position: "relative" }}>
                    <Image source={SEARCHBANNER} style={{ width: cal(315), height: cal(265) }} />
                </View>
                <Text style={{ marginTop: cal(85), color: PublicColor.Public_Text3, fontSize: cal(14) }}>正在为你寻找合适的人{this.state.diandian}</Text>
            </View>
        )
    }
}

let SearchAm = StyleSheet.create({
    starts: {
        width: cal(14),
        height: cal(14),
        position: 'absolute',
        borderRadius: cal(14),
        alignItems: "center",
        justifyContent: "center"
    },
    starts_View: {
        width: cal(7.5),
        height: cal(7.5),
        borderRadius: cal(7.5),
        backgroundColor: "#f19500"
    }
})