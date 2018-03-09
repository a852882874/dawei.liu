
//  设置界面
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator,
    AsyncStorage, Dimensions, ScrollView, Image, TouchableOpacity, Alert, NativeModules
} from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import Loadding from './../Common/Loadding.js';
import MyIndex from './../page/MyIndex.js';
import { cal } from './../Common/Cal.js';
const { PublicColor } = require("./../Common/Color.js")
import Storage from "./../Common/Storage";
import Feedback from './settingSubThree/feedback.js';
import Jubao from './settingSubThree/jubao.js';
import About from './settingSubThree/about.js';
import Xieyi from './settingSubThree/xieYi.js';
import ExitLogout from './settingSubThree/exitLogout.js';
import Login from './../login/login.js';
import ChangePassword from './settingSubThree/changePassword.js';
import Phone from './settingSubThree/phone.js';
import LinearGradient from 'react-native-linear-gradient';
const MORENAVI = require('./../image/chat/chatMo.png');
const ZUO = require('./../image/me/zou.png');
const ZHIYERENZHENG = require('./../image/public/rengzheng.png');
import Modal from 'react-native-simple-modal';
import JMessage from 'jmessage-react-plugin';
import _ajax from '../Common/LoginAjax';
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openNUM: 0,
            offset: 0,
            sex: "",
            Loadding: false,
            UserList: {}
        }
        this.lock = false;
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                if (!that.lock) {
                    that.setState({
                        sex: JSON.parse(result).user_sex,
                    })
                }
            }
        })
        AsyncStorage.getItem('UserList', (err, result) => {
            if (JSON.parse(result) != null) {
                if (!that.lock) {
                    that.setState({
                        UserList: JSON.parse(result).UserList
                    })
                }
            } else {
                _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                    if (!that.lock) {
                        that.setState({
                            UserList: res.user,
                        })
                    }
                })
            }
        });
    }
    _Loadding() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} title={"清除中..."} />
            )
        }
    }
    componentWillUnmount() {
        this.time && clearTimeout(this.time);
        this.lock = true;
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                <Header type={"zhuce"} title={"设置"} {... this.props} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this._Loadding()}
                    {/*    第一层     */}
                    <View>
                        <View style={setting._twoWrap}>
                            <View style={setting._two} >
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: Phone,
                                            params: {
                                                navigator: this.props.navigator
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={[setting._twoViewSub, {
                                            borderTopWidth: cal(0.5),
                                            borderTopColor: "#eee",
                                        }]}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>更换手机号</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: ChangePassword,
                                            params: {
                                                navigator: this.props.navigator,
                                                UserList: this.state.UserList
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={setting._twoViewSub}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>修改密码</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.lock) {
                                            this.setState({
                                                open: true,
                                                openNUM: 1
                                            })
                                        }
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={setting._twoViewSub}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>清除缓存</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: ExitLogout,
                                            params: {
                                                navigator: this.props.navigator
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={setting._twoViewSub}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>注销账号</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    {/*    第二层     */}
                    <View>
                        <View style={setting._twoWrap}>
                            <View style={setting._two} >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: Xieyi,
                                            params: {
                                                navigator: this.props.navigator
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={setting._twoViewSub}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>用户协议</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: Feedback,
                                            params: {
                                                navigator: this.props.navigator
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={setting._twoViewSub}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>意见反馈</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: Jubao,
                                            params: {
                                                navigator: this.props.navigator
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={setting._twoViewSub}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>不良信息举报</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: About,
                                            params: {
                                                navigator: this.props.navigator
                                            }
                                        })
                                    }}
                                >
                                    <View style={setting._twoView}>
                                        <View style={[setting._twoViewSub, {

                                        }]}>
                                            <View style={setting._twoViewSub_View}>
                                                <Text style={setting._twoViewSub_View_Text}>关于</Text>
                                            </View>
                                            <Image source={ZUO} style={{ width: cal(12), height: cal(12) }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (!this.lock) {
                                this.setState({
                                    open: true,
                                    openNUM: 2
                                })
                            }
                        }}
                    >
                        <View style={{ alignItems: "center", marginTop: cal(25) }}>
                            <View style={{ width: cal(330), height: cal(50), borderRadius: cal(2), justifyContent: "center", alignItems: "center", backgroundColor: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>
                                <Text style={{ color: "#fff", fontSize: cal(15) }}>
                                    退出
                        </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    offset={this.state.offset}
                    open={this.state.open}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({ open: false })}
                    style={{ alignItems: 'center', width: width }}>
                    {this._Model()}
                </Modal>

            </View>
        )
    }
    _Model() {
        if (this.state.openNUM == 1) {
            return (
                <View style={{ width: cal(300) }}>
                    <View style={{ height: cal(55), justifyContent: "center", paddingLeft: cal(25) }}>
                        <Text style={{ color: "#2e2e2e", fontSize: cal(15) }}>确定清除缓存数据吗？</Text>
                    </View>
                    <View style={{ justifyContent: "flex-end", height: cal(50), alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!this.lock) {
                                    this.setState({
                                        open: false
                                    })
                                }
                            }}
                        >
                            <View style={{ padding: cal(15), marginRight: cal(8), }}>
                                <Text style={{ fontSize: cal(15), color: "#5f5f5f" }}>取消</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                let that = this;
                                Storage._getStorage();
                                Storage._clearDataByKey('preDetailImageList');
                                Storage._clearDataByKey('preDetailImage');
                                Storage._clearDataByKey('user');
                                if (!that.lock) {
                                    that.setState({
                                        open: false,
                                        Loadding: true
                                    })
                                    that.time = setTimeout(function (res) {
                                        that.setState({
                                            Loadding: false
                                        })
                                        NativeModules.MyNativeModule.rnCallNative("清除缓存成功");
                                    }, 3000)
                                }

                            }}
                        >
                            <View style={{ padding: cal(10) }}>
                                <Text style={{ color: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else if (this.state.openNUM == 2) {
            return (
                <View style={{ width: cal(300) }}>
                    <View style={{ height: cal(55), justifyContent: "center", paddingLeft: cal(25) }}>
                        <Text style={{ color: "#2e2e2e", fontSize: cal(15), }} >确定退出爱特缘吗？</Text>
                    </View>
                    <View style={{ justifyContent: "flex-end", height: cal(50), alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!this.lock) {
                                    this.setState({
                                        open: false
                                    })
                                }
                            }}
                        >
                            <View style={{ padding: cal(15), marginRight: cal(8), }}>
                                <Text >取消</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.logout()
                            }}
                        >
                            <View style={{ padding: cal(10) }}>
                                <Text style={{ color: this.state.sex == 'male' ? PublicColor.Public_ClickBackground : PublicColor.Public_MomClickBackground }}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }


    //退出  登录页
    logout() {
        let that = this;
        JMessage.logout();
        _ajax.post_token("user/logout", {}, function (res) {
            console.log(res)
        })
        AsyncStorage.removeItem("Image", function (errs) { })
        AsyncStorage.removeItem("tokenId", function (errs) {
            if (!errs) {
                that.props.navigator.replace({
                    component: Login,
                    reset: true,
                    params: {
                        navigator: that.props.navigator,
                        sex: that.state.sex
                    }
                })
            }
        });

    }
}
let setting = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'red'
    },
    _oneWrap: {
        height: cal(200),
    },
    _twoWrap: {
        backgroundColor: PublicColor.Public_ViewBackground,
        // paddingLeft: cal(10),
        // paddingRight: cal(10),
        marginTop: cal(10)
    },
    _two: {
        backgroundColor: "#fff",
        // borderColor: "#e2e2e2",
        // borderWidth: cal(0.5)
    },
    _twoView: {
        height: cal(60),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: cal(15),
        // paddingRight: cal(10)
    },
    _twoViewSub: {
        height: cal(60),
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#eee",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: cal(15)
    },
    _twoViewSub_View: {
        flexDirection: "row",
        alignItems: "center",
        // paddingLeft: cal(9)

    },
    _twoViewSub_View_Text: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14),
        marginLeft: cal(3)
    }
})