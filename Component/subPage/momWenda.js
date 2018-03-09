
//  设置界面
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, AsyncStorage, ListView,
    Dimensions, ScrollView, Image, TouchableOpacity, Alert,InteractionManager
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import MyIndex from './../page/MyIndex.js';
import { cal } from './../Common/Cal.js';
import _ajax from './../Common/LoginAjax.js';

const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
import Feedback from './settingSubThree/feedback.js';
import Jubao from './settingSubThree/jubao.js';
import About from './settingSubThree/about.js';
import Xieyi from './settingSubThree/xieYi.js';
import ExitLogout from './settingSubThree/exitLogout.js';
import ChangePassword from './settingSubThree/changePassword.js';
import Phone from './settingSubThree/phone.js';
import LinearGradient from 'react-native-linear-gradient';
const MORENAVI = require('./../image/chat/chatMo.png');
const ZUO = require('./../image/me/zou.png');
import Modal from 'react-native-simple-modal';

import JMessage from 'jmessage-react-plugin';
export default class wendaDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wenda: []
        }
    }
    componentWillMount() {
        let that = this
        InteractionManager.runAfterInteractions(() => {
            that.freq_asked_questions(that);
        });
    }
    freq_asked_questions(that) {
        _ajax.get_token("reading/freq_asked_questions", that.props.navigator, function (res) {
            that.setState({
                wenda: res.freq_asked_questions
            })
        })
    }
    _subBody(items) {
        return (
            <Text style={WendaDetailStyle.content_text}>
                {items}
            </Text>
        )
    }
    _momArr_ziliao(item) {
    }
    _two(itemTwo) {
        let subBody = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(itemTwo.p)
        return (
            <View style={WendaDetailStyle.subTitle}>
                <View style={WendaDetailStyle.subTitle_View}>
                    <Text style={WendaDetailStyle.subTitle_View_text}>{itemTwo.h1}</Text>
                </View>
                <View style={WendaDetailStyle.content}>
                    <ListView
                        dataSource={subBody}
                        renderRow={this._subBody.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            </View>
        )
    }
    _one(itemOne) {

        let bodyTwo = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(itemOne.answer)
        return (
            <View>
                <View style={{ marginBottom: cal(15) }}>
                    <Text style={{ fontSize: cal(18), color: "#958cf4" }}>{itemOne.question}</Text>
                </View>
                <ListView
                    dataSource={bodyTwo}
                    renderRow={this._two.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }
    render() {
        let body = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.wenda)
        return (
            <View style={WendaDetailStyle.wrap}>
                <Header type={"zhuce"} title={"新手引导"} {... this.props} />
                <View style={{ paddingLeft: cal(10), paddingRight: cal(10), }}>
                    <ListView
                        dataSource={body}
                        renderRow={this._one.bind(this)}
                        enableEmptySections={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: cal(20), paddingBottom: cal(50) }}
                    />
                </View>
            </View>
        )
    }

}
let WendaDetailStyle = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        paddingTop: cal(22),
        paddingBottom: cal(22)
    },
    title_text: {
        color: "#7293c9",
        fontSize: cal(20)
    },
    subTitle: {
        marginBottom: cal(16)
    },
    subTitle_View: {
        marginBottom: cal(9)
    },
    subTitle_View_text: {
        color: "#5f5f5f",
        fontSize: cal(15)
    },
    content: {

    },
    content_text: {
        color: "#828282",
        fontSize: cal(14),
        lineHeight: 22
    }
})