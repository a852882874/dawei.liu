
//  设置界面
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, ListView, InteractionManager, AsyncStorage, Dimensions, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import MyIndex from './../page/MyIndex.js';
import { cal } from './../Common/Cal.js';
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
import Feedback from './settingSubThree/feedback.js';
import Jubao from './settingSubThree/jubao.js';
import About from './settingSubThree/about.js';
import Xieyi from './settingSubThree/xieYi.js';
import tokenImage from './../Common/token.js';
import ExitLogout from './settingSubThree/exitLogout.js';
import ChangePassword from './settingSubThree/changePassword.js';
const BANNER = require('./../image/index/banner.png');
import Phone from './settingSubThree/phone.js';
import LinearGradient from 'react-native-linear-gradient';
const MORENAVI = require('./../image/chat/chatMo.png');
const ZUO = require('./../image/me/zou.png');
import Modal from 'react-native-simple-modal';
import JMessage from 'jmessage-react-plugin';
import _ajax from './../Common/LoginAjax';
export default class IndexDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item
        }
        console.log(this.props.item)
    }
    render() {
        if (this.props.type == "huati") {
            return (
                <View style={IndexDetailStyle.wrap}>
                    <Header type={"zhuce"} title={this.state.data.title} {... this.props} />
                    <ScrollView showsVerticalScrollIndicator={false} style={IndexDetailStyle.ScrollStyle}>
                        {this._Content()}
                        <View style={{ height: cal(10) }}></View>
                    </ScrollView>
                </View>
            )
        } else if (this.props.type == "banner") {
            return (
                <View style={IndexDetailStyle.wrap}>
                    <Header type={'zhuce'} title={this.state.data.body[0].h1} {... this.props} />
                    <ScrollView showsVerticalScrollIndicator={false} style={IndexDetailStyle.ScrollStyle}>
                        {this._ContentBanner()}
                        <View style={{ height: cal(10) }}></View>
                    </ScrollView>
                </View>
            )
        }
    }
    _Content() {
        let body = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.data.body)
        return (
            <View style={IndexDetailStyle.content}>
                <View style={IndexDetailStyle.content_View_Title}>
                    <Text style={IndexDetailStyle.content_View_Title_title}>{this.state.data.title}</Text>
                </View>
                <Text style={IndexDetailStyle.content_View_Title_title2}>{this.state.data.subtitle}</Text>
                <View style={{ height: cal(150), alignItems: "center" }}>
                    <View style={IndexDetailStyle.contentImage}>
                        <Image source={{uri:tokenImage.ImgNoToken(this.state.data.image)}} style={IndexDetailStyle.contentImage} />
                    </View>
                </View>

                <ListView
                    dataSource={body}
                    renderRow={this._momArr_ziliao.bind(this)}
                    enableEmptySections={true}
                />

            </View >
        )
    }
    _ContentBanner() {
        let body = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.data.body)
        return (
            <View style={IndexDetailStyle.content}>
                <View style={{ backgroundColor: PublicColor.Public_ViewBackground, height: cal(150),marginTop:cal(10) }}>
                    <Image source={BANNER} style={{ width: width, height: cal(150), resizeMode: 'stretch' }} />
                </View>
                <ListView
                    dataSource={body}
                    renderRow={this._momArr_ziliao.bind(this)}
                    enableEmptySections={true}
                />
            </View >
        )
    }
    _momArr_ziliao(item) {
        let _SubmomArr_ziliao = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(item.p);
        return (
            <View style={IndexDetailStyle.contentContentN}>
                <View style={IndexDetailStyle.contentContentN_one}>
                    <Text style={IndexDetailStyle.contentContentN_one_text} >{item.h1}</Text>
                </View>
                <View>
                    <ListView
                        dataSource={_SubmomArr_ziliao}
                        renderRow={this.SubmomArr_ziliao.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            </View>
        )
    }
    SubmomArr_ziliao(items) {
        return (
            <View>
                <Text style={IndexDetailStyle.contentContentN_Two_text}>{items}</Text>
            </View>
        )
    }
}
let IndexDetailStyle = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: "#fff"
    },
    ScrollStyle: {
    },
    content: {
        paddingLeft: cal(15),
        paddingRight: cal(15),
    },
    contentImage: {
        width: cal(345),
        height: cal(150),
        backgroundColor: "#eee"
    },
    contentContentN: {
        marginBottom: cal(5)
    },
    content_View_Title: {
        paddingTop: cal(10),
        paddingBottom: cal(15)
    },
    content_View_Title_title: {
        fontWeight: "800",
        color: PublicColor.Public_Text5,
        fontSize: PublicFontSize.PublicFontSize_30
    },
    content_View_Title_title2: {
        color: PublicColor.Public_Text5,
        fontSize: PublicFontSize.PublicFontSize_30,
        marginBottom: cal(10)
    },
    contentContentN_one: {
        paddingTop: cal(18),
        paddingBottom: cal(6)
    },
    contentContentN_Two_text: {
        marginBottom: cal(10),
        lineHeight: 26,
        color: PublicColor.Public_Text1,
        fontSize: PublicFontSize.PublicFontSize_26
    },
    contentContentN_one_text: {
        color: PublicColor.Public_Text5,
        fontSize: PublicFontSize.PublicFontSize_30
    }
})