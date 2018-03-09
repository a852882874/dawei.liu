// 关于
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, Dimensions, AsyncStorage,
    Linking, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../../Common/Header.js';
import AutoExpandingTextInput from './../../Common/AutoExpandingTextInput.js';
import MyIndex from './../../page/MyIndex.js';
import JMessage from 'jmessage-react-plugin';
import { cal } from './../../Common/Cal.js'
const { PublicColor } = require("./../../Common/Color.js")
const ABOUTLOGIN = require("./../../image/shezhi/aboutLogin.png")
export default class about extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            sex:""
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
            <View style={Abolt.wrap}>
                <Header type={"zhuce"} title={"关于"} navigator={this.props.navigator} />
                <View style={Abolt.xing}>
                    <View style={Abolt.xing_View}>
                        <View style={{ width: cal(72), height: cal(72),  }}>
                            <Image source={ABOUTLOGIN} style={{width:cal(72),height:cal(72)}} />
                        </View>
                        <Text style={Abolt.xing_view_text1}>爱特缘</Text>
                        <Text style={Abolt.xing_view_text2}>v1.0.0</Text>
                    </View>
                </View>
                <View style={Abolt.bottom}>
                    <TouchableOpacity
                        // onPress={() => Linking.canOpenURL('tel:246-765-7777').then(supported => {
                        //     if (supported) {
                        //         Linking.openURL('tel:246-765-7777');
                        //     } else {
                        //         console.log('无法打开该URI: ' + 'tel:246-765-7777');
                        //     }
                        // })}
                    >
                        <View style={[Abolt.bottom_view,{ borderTopWidth: 0.5,borderTopColor:"#eee" }]}>
                            <Text style={Abolt.bottom_view_text1}>联系客服(QQ)</Text>
                            <Text style={[Abolt.bottom_view_text2,{color: this.state.sex == 'male' ?PublicColor.Public_ClickBackground:PublicColor.Public_MomClickBackground}]}>1628634652</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.canOpenURL('mailto:support@aityuan.com').then(supported => {
                            if (supported) {
                                Linking.openURL('mailto:support@aityuan.com');
                            } else {
                                console.log('无法打开该URI: ' + 'support@aityuan.com');
                            }
                        })}
                    >
                        <View style={[Abolt.bottom_view,]}>
                            <Text style={Abolt.bottom_view_text1}>官方邮箱</Text>
                            <Text style={[Abolt.bottom_view_text2,{color: this.state.sex == 'male' ?PublicColor.Public_ClickBackground:PublicColor.Public_MomClickBackground}]}>support@aityuan.com</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.canOpenURL('http://www.aityuan.com').then(supported => {
                            if (supported) {
                                Linking.openURL('http://www.aityuan.com');
                            } else {
                                console.log('无法打开该URI: ' + 'www.aityuan.com');
                            }
                        })}
                    >
                        <View style={[Abolt.bottom_view, ]}>
                            <Text style={Abolt.bottom_view_text1}>官方网站</Text>
                            <Text style={[Abolt.bottom_view_text2,{color: this.state.sex == 'male' ?PublicColor.Public_ClickBackground:PublicColor.Public_MomClickBackground}]}>www.aityuan.com</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
let Abolt = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_Text7
    },
    xing: {
        height: cal(242),
        backgroundColor: PublicColor.Public_Text7,
        justifyContent: "center",
        alignItems: "center"
    },
    xing_View: {
        alignItems: "center"
    },
    xing_view_text1: {
        marginTop: cal(10),
        fontSize: cal(15),
        color: PublicColor.Public_Text5
    },
    xing_view_text2: {
        marginTop: cal(1),
        fontSize: cal(12),
        color: PublicColor.Public_Text1,
    },
    bottom: {
        backgroundColor: "#fff",
        paddingLeft: cal(15),
    },
    bottom_view: {
        borderBottomWidth: cal(0.5),
        paddingRight: cal(15),
        borderBottomColor: "#eee",
        height: cal(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bottom_view_text1: {
        fontSize: cal(14),
        color: PublicColor.Public_Text3
    },
    bottom_view_text2: {
        
        fontSize: cal(14)
    }
})