import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, AsyncStorage, ScrollView, Dimensions, Image, ListView, ActivityIndicator } from 'react-native';
import _ajax from './../../Common/LoginAjax';
import { cal } from '../../Common/Cal';
import Loadding from './../../Common/Loadding';
const { width, height } = Dimensions.get('window');
const { PublicColor } = require("./../../Common/Color.js");
const { PublicFontSize } = require("./../../Common/FontSize.js");
import JMessage from 'jmessage-react-plugin';
import header from '../../Common/Header';
const LOGO = require("./../../image/quize/logo1.png");
const MAN = require("./../../image/quize/man1.png");
const MOM = require("./../../image/quize/mom1.png");
const QUAN = require("./../../image/quize/quan.png");
import tokenImage from './../../Common/token.js';
const RIGHTED = require("./../../image/quize/righted.png");
const LEFTED = require("./../../image/quize/lefted.png");

const DANONE = require("./../../image/quize/danOne.png");
const DANTWO = require("./../../image/quize/danTwo.png");
const IMPORTNO = require("./../../image/quize/importNo.png");
const IMPORTED = require("./../../image/quize/importEd.png");

const LEFT = require("./../../image/quize/left.png");
const NANTOP = require("./../../image/quize/nan_top.png");
const NANRIGHT = require("./../../image/quize/nan_you.png");
const MOMTOP = require("./../../image/quize/mom_top.png");
export default class Tabbar2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {},
            loaddings: true,
            user_sex: "",
            key: 0,
            avatarSource2: "",
            importance: 0,
            json: {

            },
            itemscontent: '',
            momShow: 1000,
            huawei: false
        }
        this.lock = false;
    }
    componentWillMount() {
        this._endReached();
    }
    _endReached() {
        let that = this;
        if (that.props.data.name == 1) {
            _ajax.get_token("match/questions?q=start", that.props.navigator, function (res) {
                console.log(res.question);
                res.question.ifShow = false;
                if (!that.lock) {
                    that.setState({
                        loaddings: false,
                        question: res.question
                    })
                }
            })
        } else {
            _ajax.get_token("match/questions?q=next", that.props.navigator, function (res) {
                console.log(res.question);
                res.question.ifShow = false;
                if (!that.lock) {
                    that.setState({
                        loaddings: false,
                        question: res.question
                    })
                }
            })
        }
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                if (!that.lock) {
                    that.setState({
                        user_sex: JSON.parse(result).user_sex,
                    })
                }
            }
        })
        AsyncStorage.getItem('huawei', (err, result) => {
            if (JSON.parse(result) != null) {
                console.log(JSON.parse(result))
                if (!that.lock) {
                    that.setState({
                        huawei: JSON.parse(result),
                    })
                }
            } else {

            }
        })
        AsyncStorage.getItem('Image', (err, result) => {
            console.log(JSON.parse(result))
            if (JSON.parse(result) != null) {
                that.setState({
                    avatarSource2: JSON.parse(result),
                })
            } else {
                _ajax.get_token("user/image/list", that.props.navigator, function (res) {
                    console.log(res)
                    if (res.code == 0 && res.imageList.length > 0) {
                        res.imageList.map((item) => {
                            if (item.usage == 1) {
                                tokenImage.tokenImg(item.uuid, function (res) {
                                    console.log(res)
                                    if (!that.lock) {
                                        that.setState({
                                            avatarSource2: res,
                                        })
                                    }
                                })
                            }
                        })
        
                    }
                })
            }
        })
        
    }
    render() {
        if (this.state.loaddings) {
            return (<Loadding from={'loggingChoose2'} />)
        } else {
            // console.log(this.state.question)
            // let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}); 
            return (
                <View tabLabel={this.props.keys} key={this.props.keys} style={{ height: height }} >
                    <View style={QuizOne.oneText}>
                        <Text style={{ fontSize: PublicFontSize.PublicFontSize_26, color: PublicColor.Public_Text1 }}>{this.props.num}</Text>
                        <Text style={{ fontSize: PublicFontSize.PublicFontSize_26, color: PublicColor.Public_Text1 }}>/</Text>
                        {/* <Text style={{ fontSize: PublicFontSize.PublicFontSize_26, color: PublicColor.Public_Text1 }}>{this.props.data.name}</Text> */}
                        <Text style={{ fontSize: PublicFontSize.PublicFontSize_26, color: PublicColor.Public_Text1 }}>15</Text>
                    </View>
                    <View style={this.state.huawei ? QuizOne.title_top_huawei : QuizOne.title_top}>
                        <Text style={QuizOne.title_top_text}>{this.state.question.question}</Text>
                    </View>
                    {this.firstView()}
                    {this._import()}
                </View>
            )
        }
    }
    firstView() {
        if (this.state.question.type == 0) {
            console.log(this.state.avatarSource2)
            if (!this.state.question.ifShow) {
                return (
                    <View style={{ marginTop: this.state.huawei ? cal(20) : cal(80) }}>
                        <View style={QuizOne.touxiang}>
                            <Image source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : MAN} style={{ width: cal(60), height: cal(60), borderRadius: cal(60) }} />
                        </View>
                        <View style={[QuizOne.touxiang_view, { position: "relative" }]}>
                            <View style={{ position: "absolute", top: cal(-5), right: cal(35), width: 0, height: 0, borderBottomWidth: 5, borderRightWidth: 5, borderLeftWidth: 5, borderLeftColor: "transparent", borderRightColor: "transparent", borderColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, }}></View>
                            {/* <Image source={NANTOP} style={{ width: cal(18), height: cal(8), }} /> */}
                            {
                                this.state.question.options.map((items, key) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => this.manChoose(1, key, items)}
                                            key={key}
                                            style={{ marginBottom: cal(0.5) }}
                                        >
                                            <View key={key} style={this.props.sex == "male" ? QuizOne.touxiang_Subview : QuizOne.touxiang_Subview2}>
                                                <Text style={QuizOne.touxiang_Subview_text}>
                                                    {items}
                                                </Text>
                                                <Image
                                                    style={{ width: cal(13), height: cal(13), justifyContent: "center", alignItems: "center" }}
                                                    source={DANONE}
                                                >

                                                </Image>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{ marginTop: this.state.huawei ? cal(10) : cal(30) }}>
                        <View >
                            <View style={{ alignItems: "flex-end", paddingRight: cal(15) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ position: "relative", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ backgroundColor: this.state.user_sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, padding: 10, paddingLeft: cal(20), paddingRight: cal(20), borderRadius: cal(2), }}>
                                            <Text style={{ color: "#fff" }}>{this.state.itemscontent}</Text>
                                        </View>
                                        {/* <View style={{ width: cal(18), height: cal(18), marginLeft: cal(-2) }}>
                                            <Image source={NANRIGHT} style={{ width: cal(8), height: cal(18), }} />
                                        </View> */}
                                        <View style={{marginRight:cal(5),marginLeft:cal(-1),width:0,height:0,borderBottomWidth:5,borderTopWidth:5,borderLeftWidth:5,borderColor:this.state.user_sex == "male" ?PublicColor.Public_ClickBackground:PublicColor.Public_MomClickBackground,borderBottomColor:"transparent",borderTopColor:"transparent"}}></View>
                                    </View>
                                    <Image source={this.stateavatarSource2 != "" ? { uri: this.state.avatarSource2 } : MAN} style={{ width: cal(60), height: cal(60), borderRadius: cal(60) }} />
                                </View>
                            </View>
                            <View style={{ paddingLeft: cal(15), marginTop: cal(20), flexDirection: "row", alignItems: "center" }}>
                                <Image source={this.state.user_sex == "male" ? MOM : MAN} style={{ width: cal(60), height: cal(60) }} />
                                <Text style={{ fontSize: cal(12), color: "#5f5f5f", marginLeft: cal(10) }}>希望你的另一半</Text>
                            </View>
                            <View style={[QuizOne.touxiang_view, { position: "relative" }]}>
                                <View style={{ position: "absolute", top: cal(-7), left: cal(35), width: cal(18), height: cal(18) }}>
                                    <Image source={MOMTOP} style={{ width: cal(18), height: cal(8), }} />
                                </View>

                                {
                                    this.state.question.options.map((items, key) => {
                                        return (
                                            <View key={key}>
                                                <TouchableOpacity
                                                    onPress={() => this.manChoose(2, key)}
                                                    style={{ marginBottom: cal(0.5) }}
                                                >
                                                    <View style={[QuizOne.touxiang_Subview, QuizOne.touxiang_Subview_mom]}>
                                                        <Text style={[QuizOne.touxiang_Subview_text, QuizOne.touxiang_Subview_mom_text]}>
                                                            {items}
                                                        </Text>
                                                        <Image source={QUAN} style={{ width: cal(13), height: cal(13), justifyContent: "center", alignItems: "center" }} >
                                                            <View style={{ width: cal(7), height: key == this.state.momShow ? cal(7) : 0, borderRadius: cal(7), backgroundColor: PublicColor.Public_ClickBackground }}></View>
                                                        </Image>
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
        else {
            return (
                <View style={{ marginTop: cal(80) }}>
                    <View style={[QuizOne.touxiang, { flexDirection: "row", justifyContent: "flex-end" }]}>
                        <Image source={this.state.avatarSource2 == "" ? { uri: this.state.avatarSource2 } : MAN} style={{ width: cal(60), height: cal(60) }} />
                        <Image source={MOM} style={{ width: cal(60), height: cal(60), marginLeft: cal(-20) }} />
                    </View>
                    <View style={[QuizOne.touxiang_view, { position: "relative" }]}>
                        <View style={{ position: "absolute", top: cal(-7), right: cal(35), width: cal(18), height: cal(18) }}>
                            <Image source={NANTOP} style={{ width: cal(18), height: cal(8), }} />
                        </View>
                        {
                            this.state.question.options.map((items, key) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.manChoose(2, key)}
                                        key={key}
                                    >
                                        <View style={this.props.sex == "male" ? QuizOne.touxiang_Subview : QuizOne.touxiang_Subview2}>
                                            <Text style={QuizOne.touxiang_Subview_text}>
                                                {items}
                                            </Text>
                                            <View style={{ width: cal(13), height: cal(13), backgroundColor: "#fff", justifyContent: "center", alignItems: "center", borderRadius: cal(13) }}>
                                                <View style={{ width: cal(12), height: cal(12), backgroundColor: this.props.sex == "male" ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground, borderRadius: cal(12) }}></View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            )

        }
    }
    _import() {
        if (this.state.question.ifShow) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (this.state.importance == 10) {
                            if (!this.lock) {
                                this.setState({
                                    importance: 0
                                })
                            }
                        } else {
                            if (!this.lock) {
                                this.setState({
                                    importance: 10
                                })
                            }
                        }
                    }}
                    style={{ position: "absolute", bottom: this.state.huawei ? cal(40) : cal(75), flexDirection: "row", justifyContent: "center", alignItems: "center", width: width, zIndex: 11 }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <View>
                            <Text style={{ fontSize: 15, color: "#828282" }}>这题对我很重要</Text>
                        </View>
                        {/* <View style={QuizOne.buttonTextView}>
                            <Text style={this.state.importance == 10 ? this.state.user_sex == "male" ? QuizOne.buttonTextViewSub : QuizOne.buttonTextViewSub2 : ''}></Text>
                        </View> */}
                        <Image
                            source={this.state.importance == 10 ? IMPORTED : IMPORTNO}
                            style={{ width: cal(13), height: cal(13), marginLeft: cal(3), justifyContent: "center", alignItems: "center" }}>
                            {/* <Text style={this.state.importance == 10 ? this.state.user_sex == "male" ? QuizOne.buttonTextViewSub : QuizOne.buttonTextViewSub2 : ''}></Text> */}
                        </Image>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    manChoose(id, key, itemscontent) {
        if (id == 1) {
            this.state.question.ifShow = !this.state.question.ifShow
            if (!this.lock) {
                this.setState({
                    question: this.state.question,
                    key: key,
                    itemscontent: itemscontent
                })
            }
        } else if (id == 2) {
            let a = {
                'questionId': this.state.question.id,
                'answer1': this.state.key,
                'answer2': key,
                'importance': this.state.importance
            }
            if (!this.lock) {
                this.setState({
                    momShow: key
                })
            }
            this.props.next(true, a);
        }
    }
}
let QuizOne = StyleSheet.create({
    titlw: {
        paddingTop: cal(100)
    },
    title_top: {
        alignItems: 'center',
        marginTop: cal(40),
        paddingRight: cal(15),
        paddingLeft: cal(15)
    },
    title_top_huawei: {
        alignItems: 'center',
        marginTop: cal(20),
        paddingRight: cal(15),
        paddingLeft: cal(15)
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
        // borderColor: "red"
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
    },









    oneText: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: cal(42) }

})
