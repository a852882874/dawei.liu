//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Platform, Image, Dimensions, ListView, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
const { cal } = require("./../Common/Cal.js");
const LOGO = require("./../image/quize/logo1.png");
const MAN = require("./../image/quize/man.png");
const MOM = require("./../image/quize/mom.png");
const QUAN = require("./../image/quize/quan.png");
const RIGHTED = require("./../image/quize/righted.png");
const LEFTED = require("./../image/quize/lefted.png");
const LEFT = require("./../image/quize/left.png");
const NANTOP = require("./../image/quize/nan_top.png");
const NANRIGHT = require("./../image/quize/nan_you.png");
const MOMTOP = require("./../image/quize/mom_top.png");
import QuizSuccess from './QuizSuccess.js';
import SplashScreen from 'react-native-splash-screen';
import JMessage from 'jmessage-react-plugin';
const { PublicColor } = require("./../Common/Color.js");
const { PublicFontSize } = require("./../Common/FontSize.js");
const that = {};
// import Swiper from 'react-native-swiper';
import Swiper from './../Common/Swiper.js';
export default class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aaas: false,
            manId: 0,
            page: 0,
            buttonTextShow: false,
            user_sex: "",
            info: [
                { title: "你在工作中经常加班吗?", ownPro: "", otherPro: "", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "222222222222222222?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "33333333333333?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "44444444444444444444?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "555555555555?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "6666666666?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "777777777?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
                { title: "88888888888?", own: ["经常", "不长时间", "长时间"], other: ["经常", "不长时间", "长时间"] },
            ]
        }
        this.state.info.map((item, key) => {
            item.ifOther = false
        })
        that = this;
        SplashScreen.hide();
        let _that = this;
        JMessage.getMyInfo((UserInf) => {
            if (typeof (UserInf.username) == "undefine") {
            } else {
                // 
                console.log("已登录")
                this.setState({
                    user_sex: UserInf.gender,
                })
            }
        })
    }
    manChoose(manId, items,id) {
        manId.ifOther = true;
        if(id == 2){
            manId.otherPro = items;
        }else{
            manId.ownPro = items;
        }
        this.setState({
            info: this.state.info
        })
    }
    // momChoose() {
    //     this.setState({
    //         aaas: true,
    //     })
    // }
    abc(key) {
        console.log(key);
        // if (key >= 4) {
        //     that.props.navigator.push({
        //         component: QuizSuccess,
        //         reset: true,
        //         params: {
        //             navigator: that.props.navigator
        //         }
        //     })
        // }
    }
    // dot={<View style={{backgroundColor:'rgba(121,121,121,0.9)', width: 10, height: 10,borderRadius: 10, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: cal(550)}} />}
    // activeDot={<View style={{backgroundColor: 'rgba(172,172,255,0.9)', width: 10, height: 10, borderRadius: 10, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: cal(550),}} />} 
    // _momArr_info_own(item, s, id) {
    //     console.log(s)
    //     return (

    //     )
    // }
    firstView(item) {
        if (!item.ifOther) {
            let info_own = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(item.own);
            return (
                <View style={{ marginTop: cal(130) }}>
                    <View style={QuizOne.touxiang}>
                        <Image source={MAN} style={{ width: cal(60), height: cal(60) }} />
                    </View>
                    <View style={[QuizOne.touxiang_view, { position: "relative" }]}>
                        <View style={{ position: "absolute", top: cal(-7), right: cal(35), width: cal(18), height: cal(18) }}>
                            <Image source={NANTOP} style={{ width: cal(18), height: cal(8), }} />
                        </View>
                        {/* <ListView
                            dataSource={info_own}
                            renderRow={this._momArr_info_own.bind([this,item])}
                            enableEmptySections={true}
                        /> */}
                        {
                            item.own.map((items, key) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.manChoose(item, items,2)}
                                        key={key}
                                    >
                                        <View style={this.state.user_sex == "male" ? QuizOne.touxiang_Subview : QuizOne.touxiang_Subview2}>
                                            <Text style={QuizOne.touxiang_Subview_text}>
                                                {items}
                                            </Text>
                                            <View style={{ width: cal(13), height: cal(13), backgroundColor: "#fff", justifyContent: "center", alignItems: "center", borderRadius: cal(13) }}>
                                                <View style={{ width: cal(12), height: cal(12), backgroundColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, borderRadius: cal(12) }}></View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            )
        } else {

            let info_other = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(item.other);
            return (
                <View style={{ marginTop: cal(20) }}>
                    <View >
                        <View style={{ alignItems: "flex-end", paddingRight: cal(15) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ position: "relative", }}>
                                    <View style={{ backgroundColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, padding: 10, paddingLeft: cal(20), paddingRight: cal(20), borderRadius: cal(2), marginRight: cal(15) }}>
                                        <Text style={{ color: "#fff" }}>{item.ownPro}哈哈</Text>
                                    </View>
                                    <View style={{ position: "absolute", top: cal(10), left: cal(76), width: cal(18), height: cal(18) }}>
                                        <Image source={NANRIGHT} style={{ width: cal(8), height: cal(18), }} />
                                    </View>
                                </View>
                                <Image source={MAN} style={{ width: cal(60), height: cal(60) }} />
                            </View>
                        </View>
                        <View style={{ paddingLeft: cal(15), flexDirection: "row", alignItems: "center" }}>
                            <Image source={MOM} style={{ width: cal(60), height: cal(60) }} />
                            <Text style={{ fontSize: cal(12), color: "#5f5f5f", marginLeft: cal(10) }}>希望你的另一半</Text>
                        </View>
                        <View style={[QuizOne.touxiang_view, { position: "relative" }]}>
                            <View style={{ position: "absolute", top: cal(-7), left: cal(35), width: cal(18), height: cal(18) }}>
                                <Image source={MOMTOP} style={{ width: cal(18), height: cal(8), }} />
                            </View>

                            {
                                item.other.map((items, key) => {
                                    return (
                                        <View key = {key}>
                                            <TouchableOpacity
                                                onPress={() => this.manChoose(items,item)}
                                            >
                                                <View style={[QuizOne.touxiang_Subview, QuizOne.touxiang_Subview_mom]}>
                                                    <Text style={[QuizOne.touxiang_Subview_text, QuizOne.touxiang_Subview_mom_text]}>
                                                        {items}
                                                    </Text>
                                                    <Image source={QUAN} style={{ width: cal(13), height: cal(13) }} />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: cal(1), width: cal(345), backgroundColor: "#fafafa" }}></View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                <View
                    style={{ flex: 1 }}
                >
                    <Swiper
                        height={height}
                        loop={false}
                        style={{ position: "relative" }}
                        showsPagination={true}
                        index={0}
                        horizontal={true}
                        iosbounces={true}
                        iosautomaticallyAdjustContentInsets={false}
                        iosalwaysBounceVertical={true}
                        iosalwaysBounceHorizontal={true}
                        showsButtons={true}
                        aaa={this.state.aaas}
                        bbb={this.abc.bind(this)}
                        buttonText={
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        buttonTextShow: !this.state.buttonTextShow
                                    })
                                }}
                            >
                                <View style={QuizOne.buttonText}>
                                    <Text style={{ color: "#828282", fontSize: cal(12) }}>这个对我来说很重要</Text>
                                    <View style={QuizOne.buttonTextView}>
                                        <View style={this.state.buttonTextShow ? (this.state.user_sex == "male" ? QuizOne.buttonTextViewSub : QuizOne.buttonTextViewSub2) : ""}></View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        nextButton={<View style={{ width: cal(25), height: cal(25) }}><Image source={RIGHTED} style={{ width: cal(21), height: cal(21) }} /></View>}
                        prevButton={<View style={{ width: cal(25), height: cal(25) }}><Image source={LEFTED} style={{ width: cal(21), height: cal(21) }} /></View>}
                        prevButtonNo={<View style={{ width: cal(25), height: cal(25) }}><Image source={LEFT} style={{ width: cal(21), height: cal(21) }} /></View>}
                    >
                        {this._xun_json()}
                    </Swiper>
                </View>
            </View>
        )
    }
    _xun_json() {
        let pushJson = [];
        this.state.info.map((item, key) => {
            pushJson.push(<View style={QuizOne.titlw}>
                <View style={QuizOne.title_top} key={key}>
                    <Text style={QuizOne.title_top_text}>{item.title}</Text>
                </View>
                {this.firstView(item)}
            </View>)
        })
        return pushJson;
    }
    logining() {

    }
}

let QuizOne = StyleSheet.create({
    titlw: {
        paddingTop: cal(100)
    },
    title_top: {
        alignItems: 'center',

    },
    title_top_text: {
        fontSize: cal(15),
        color: PublicColor.Public_Text5
    },
    touxiang: {
        alignItems: "flex-end",
        paddingRight: cal(15)
    },
    touxiang_view: {
        alignItems: "center",
        marginTop: cal(15)
    },
    touxiang_Subview: {
        width: cal(345),
        height: cal(50),
        backgroundColor: PublicColor.Public_ClickBackground,
        marginBottom: cal(0.5),
        borderRadius: cal(2),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: cal(32.5),
        paddingLeft: cal(15)
    },
    touxiang_Subview2: {
        width: cal(345),
        height: cal(50),
        backgroundColor: PublicColor.Public_MomClickBackground,
        marginBottom: cal(0.5),
        borderRadius: cal(2),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: cal(32.5),
        paddingLeft: cal(15)
    },
    touxiang_Subview_mom: {
        backgroundColor: "#fff",
        marginBottom: 0,
    },
    touxiang_Subview_text: {
        color: "#fff",
        fontSize: cal(13)
    },
    touxiang_Subview_mom_text: {
        color: "#000",
    },
    buttonText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonTextView: {
        width: cal(12),
        height: cal(12),
        borderRadius: cal(12),
        borderWidth: cal(1),
        borderColor: "#828282",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: cal(3),
        marginRight: cal(3),
    },
    buttonTextViewSub: {
        width: cal(6),
        height: cal(6),
        borderRadius: cal(6),
        backgroundColor: PublicColor.Public_ClickBackground,
    },
    buttonTextViewSub2: {
        width: cal(6),
        height: cal(6),
        borderRadius: cal(6),
        backgroundColor: PublicColor.Public_MomClickBackground,
    }
})
