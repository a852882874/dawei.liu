//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator,
    Image,
    Modal,
    Dimensions, ToastAndroid, BackAndroid, TouchableWithoutFeedback, TouchableOpacity,
    AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window");
const { cal } = require("./../Common/Cal.js");
import Login from './../login/login.js';
const LOGOONE = require("./../image/backgroundqqqqqqqq1.png");
const LOGOTWO = require("./../image/backgroundqqqqqqqq2.png");
const LOGOTHREE = require("./../image/backgroundqqqqqqqq3.png");
const LOGOSIX = require("./../image/lingxed.png");
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';
import header from '../Common/Header';
// const LOGOACTIVITY = require('./../image/activity/logo.png');
// const ENTRANCE = require('./../image/activity/entrance.png');
// import ValentinesDay from '../activity/ValentinesDay';
export default class guidePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            huawei: false,
            activetyFristUser: false
        }
        let that = this;
        that.lock = false;
        // AsyncStorage.removeItem("active",function(errs) {})
        AsyncStorage.getItem('huawei', (err, result) => {
            if (JSON.parse(result) != null && !that.lock) {
                that.setState({
                    huawei: JSON.parse(result),
                })
            } else {

            }
        })
        // that.ActivetyFristUser(that)
        that.time_SplashScreen = setTimeout(function () {
            SplashScreen.hide();
        }, 2000)
    }
    ActivetyFristUser(that) {
        AsyncStorage.getItem("active", (err, results) => {
            if (JSON.parse(results) == null) {
                that.setState({
                    activetyFristUser: true
                })
            } else {
                that.setState({
                    activetyFristUser: false
                })
            }
        })
    }
    componentWillUnmount() {
        this.lock = true
        this.time_SplashScreen && clearTimeout(this.time_SplashScreen);
    }
    toUpGuidePager(sex) {
        let user_sex = sex;
        let that = this;
        Alert.alert(
            '',
            '性别入口选择后不能修改，请谨慎选择',
            [
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                        console.log(1)
                        AsyncStorage.setItem('user_sex', JSON.stringify({ user_sex }), () => { });
                        that.props.navigator.replace({
                            component: Login,
                            reset: true,
                            params: {
                                navigator: that.props.navigator,
                                sex: user_sex
                            }
                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }
    render() {
        return (
            <View style={GuidePagerStyle.wrap}>
                <View style={GuidePagerStyle.swipt}>
                    {/* {this._activetyFristUser()} */}
                    <Swiper
                        loop={false}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                        paginationStyle={{ bottom: cal(27) }}
                        showsButtons={false}
                        dot={
                            <View style={{ backgroundColor: "#e5e5e5", width: cal(7), height: cal(7), marginLeft: cal(4), marginRight: cal(4), borderRadius: cal(7) }}></View>}
                        activeDot={<View style={{ backgroundColor: "#989898", marginLeft: cal(4), marginRight: cal(4), width: cal(7), height: cal(7), borderRadius: cal(7) }}></View>}
                    >

                        <View style={GuidePagerStyle.View_swper}>
                            <Image source={LOGOONE} style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: null,
                                backgroundColor: 'rgba(0,0,0,0)',
                            }} />
                        </View>
                        <View style={GuidePagerStyle.View_swper}>
                            <Image source={LOGOTWO} style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: null,
                                backgroundColor: 'rgba(0,0,0,0)',
                            }} />
                        </View>
                        <View style={GuidePagerStyle.View_swper}>
                            <Image source={LOGOTHREE} style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: null,
                                backgroundColor: 'rgba(0,0,0,0)',
                            }} />
                            <View style={[GuidePagerStyle.btnWrap, this.state.huawei ? { bottom: cal(35) } : {}]}>
                                <TouchableWithoutFeedback onPress={() => this.toUpGuidePager("male")}>
                                    <View style={GuidePagerStyle.btn}>
                                        <Text style={GuidePagerStyle.text}>
                                            IT精英男
                                            </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.toUpGuidePager("female")}>
                                    <View style={[GuidePagerStyle.btn, GuidePagerStyle.momBtn]}>
                                        <Text style={GuidePagerStyle.text}>
                                            单身优质女
                                            </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                            {/* <View style={GuidePagerStyle.kong}></View> */}
                        </View>
                    </Swiper>
                </View>
            </View>
        )
    }
    // _activetyFristUser() {
    //     if (this.state.activetyFristUser) {
    //         return (
    //             <Modal
    //                 animationType='fade'
    //                 transparent={true}
    //                 visible={this.state.activetyFristUser}
    //                 onRequestClose={() => console.log('onRequestClose...')} >
    //                 <View style={{ width: width, height: height, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" }}>
    //                     <View style={{ width: cal(310), height: cal(264), marginTop: cal(-50) }}>
    //                         <Image source={LOGOACTIVITY} style={{ width: cal(310), height: cal(264) }} />
    //                         <TouchableWithoutFeedback onPress={() => { this.setState({ activetyFristUser: false }) }}>
    //                             <View style={{ width: cal(100), height: cal(100), borderRadius: cal(100), position: "absolute", zIndex: 99999, left: cal(-15), top: cal(-15) }}>
    //                             </View>
    //                         </TouchableWithoutFeedback>
    //                         <TouchableOpacity onPress={() => {
    //                            AsyncStorage.setItem('active', JSON.stringify({ active: "wwwww"}), () => { });
    //                             this.setState({
    //                                 activetyFristUser: false
    //                             })
    //                             this.props.navigator.push({
    //                                 component: ValentinesDay,
    //                                 params: {
    //                                     navigator: this.props.navigator,
    //                                     new: true
    //                                 }
    //                             })
    //                         }}
    //                             style={{ width: cal(150), height: cal(40), borderRadius: 100, position: "absolute", left: cal(80), bottom: cal(26) }}
    //                         >
    //                             <View >
    //                             </View>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             </Modal>
    //         )
    //     }
    // }
}

let GuidePagerStyle = StyleSheet.create({
    wrap: {
        width: width,
        height: height,
        position: "absolute",
        bottom: 0
        // flex: 1,
    },
    btnWrap: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        position: "absolute",
        bottom: cal(45),
        height: cal(50),
        zIndex: 19999,
    },
    kong: {
        height: cal(100)
    },
    btn: {
        width: cal(136),
        height: cal(39),
        // borderWidth: cal(0.5),
        // borderColor: "#7293c9",
        // backgroundColor: "rgba(114,147,201,0.4)",
        backgroundColor: "#b0a9f8",
        borderRadius: cal(5),
        alignItems: "center",
        justifyContent: 'center',

    },
    momBtn: {
        // borderColor: "#958cf4",
        // backgroundColor: "rgba(149,140,244,0.4)"
        marginLeft: cal(40)
    },
    text: {
        color: '#fff',
        fontSize: cal(18),
        fontWeight: '800'
    },
    swipt: {
        flex: 1
    },
    title_text: {
        color: "#2e2e2e",
        fontSize: cal(20),
        marginTop: cal(52),
        marginBottom: cal(15)
    },
    text_text: {
        color: "#5f5f5f",
        marginBottom: cal(1),
        fontSize: cal(13),
    },
    View_swper: {
        flex: 1,
    }
})