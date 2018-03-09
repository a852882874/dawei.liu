
//举报对象
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, NativeModules, Platform, AsyncStorage, ListView, InteractionManager,
    Navigator, Dimensions, ScrollView, Image, TouchableOpacity, TextInput
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
import MyIndex from './../../page/MyIndex.js';
import { cal } from './../../Common/Cal.js';
const { PublicColor } = require("./../../Common/Color.js");
const { PublicFontSize } = require("./../../Common/FontSize.js")
import JMessage from 'jmessage-react-plugin';
// import LinearGradient from 'react-native-linear-gradient';
// const MORENAVI = require('./../../image/chat/chatMo.png');
const JIANTOU = require('./../../image/me/zou.png');
const ABOUT = require('./../../image/shezhi/about.png');
const JUBAO = require('./../../image/shezhi/jubao.png');
const MOREN = require('./../../image/chat/chatMo.png')
const JUBAOED = require('./../../image/shezhi/jubaoed.png');
import _ajax from '../../Common/LoginAjax';
import tokenImage from './../../Common/token.js';
export default class JubaiduixiangClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: '',
            info: [

            ]
        }
    }
    componentDidMount() {
        let that = this;
        InteractionManager.runAfterInteractions(() => {
            that.mutuallike_list(that).then(function (data) {
                AsyncStorage.getItem('user_sex', (err, result) => {
                    if (JSON.parse(result)) {
                        that.setState({
                            sex: JSON.parse(result).user_sex,
                        })
                    }
                })
            })
        })
    }
    mutuallike_list(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("match/mutuallike_list", that.props.navigator, function (res) {
                res.userList.map((item) => {
                    tokenImage.tokenImg(item.portraitImageUuid, function (image) {
                        item.uri = image
                    })
                })
                console.log(res.userList)
                that.setState({
                    info: res.userList
                })
                resolve(" ok2")
            })
        })
        return p;

    }
    render() {
        let info = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.info);
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_Text7 }}>
                <Header type={"zhuce"} alert={this.state.content} title={"选择要举报的对象"} navigator={this.props.navigator} />
                <ListView
                    contentContainerStyle={{ backgroundColor: "#fff", marginTop: cal(10) }}
                    dataSource={info}
                    renderRow={this._conArr.bind(this)}
                    enableEmptySections={true}
                />
            </View >
        )
    }
    _conArr(item) {
        return (
            <View style={Jubaiduixiang.ListViewStyle_sub}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.JubaNname(item.nickname, item.id);
                        this.props.navigator.pop();
                    }}
                >
                    <View style={[Jubaiduixiang.ListViewStyle_sub_View]}>
                        <View style={this.state.sex == "male" ? Jubaiduixiang.image : Jubaiduixiang.image2}>
                            <Image source={{ uri: item.uri }} style={{ width: cal(40), height: cal(40), borderRadius: cal(40) }} />
                        </View>
                        <Text style={Jubaiduixiang.ListViewStyle_sub_View_text}>{item.nickname}</Text>
                        {/* <Image source={JIANTOU} style={{ width: cal(12), height: cal(12) }} /> */}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}
let Jubaiduixiang = StyleSheet.create({
    bottomfeedback: {
        paddingLeft: cal(15),
        paddingRight: cal(15),
        // marginTop: cal(10),
    },
    ListViewStyle_sub: {
        height: cal(55),
        paddingLeft: cal(15),
        // paddingRight: cal(6)
    },
    ListViewStyle_sub_View: {
        borderBottomWidth: cal(0.5),
        paddingRight: cal(15),
        height: cal(55),
        borderBottomColor: PublicColor.Public_Text9,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // paddingLeft: cal(5)
    },
    ListViewStyle_sub_View_text: {
        color: PublicColor.Public_Text3,
        fontSize: PublicFontSize.PublicFontSize_28,
        marginLeft: cal(10)
    },
    image: {
        width: cal(40),
        height: cal(40),
        backgroundColor: PublicColor.Public_ClickBackground,
        borderRadius: cal(40)
    },
    image2: {
        width: cal(40),
        height: cal(40),
        backgroundColor: PublicColor.Public_MomClickBackground,
        borderRadius: cal(40)
    }
})