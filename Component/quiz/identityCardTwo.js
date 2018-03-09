//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Platform, Modal, NativeModules, TouchableOpacity, Image, Dimensions, TextInput, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
const { cal } = require("./../Common/Cal.js");
import HraderLogin from './../Common/Header.js'
const IDCARD = require("./../image/id/idCard.png");
const IDCARD1 = require("./../image/id/manIdCord1.png");
const IDCARD2 = require("./../image/id/manIdCord2.png");
const MOMIDCARD1 = require("./../image/id/momIdCord1.png");
const MOMIDCARD2 = require("./../image/id/momIdCord2.png");
import ImagePicker from 'react-native-image-crop-picker';
import LUyou from './../home/Firest';
import JMessage from 'jmessage-react-plugin';
import Loadding from './../Common/Loadding.js';
import SearchAndm from './../viewpager/searchAndm.js';
import SplashScreen from 'react-native-splash-screen'
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
// var ImagePicker = require('react-native-image-picker');
import QuizOne from "./../quiz/quizOne.js";
import _ajax from '../Common/LoginAjax';
let options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    // customButtons: [
    //     { name: 'fb', title: 'Choose Photo from Facebook' },
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class IdentityCardClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCard: "",
            name: "",
            avatarSource1: "",
            avatarSource1Base64: "",
            avatarSource2: "",
            avatarSource2Base64: "",
            user_sex: "",
            visible: false,
            visiblenum: 0,
            id: "",
            Loadding: false,
            username: ""
        }
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result) != null) {
                that.setState({
                    user_sex: JSON.parse(result).user_sex,
                })
            }
        })
    }

    // 头像
    ImagePickers(item) {
        this.setState({
            visible: true,
            visiblenum: item
        })
    }
    _image() {
        if (this.state.avatarSource != null) {
            return (
                <Image source={this.state.avatarSource} style={{ width: cal(47), height: cal(47), borderRadius: cal(47) }} />
            )
        } else {
            return (
                <View>
                    <Image source={LOGO} style={{ width: cal(52), height: cal(47) }} />
                </View>
            )
        }
    }
    Loadding() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} title={"读取信息中..."} />
            )
        }
    }
    render() {
        return (
            <View style={IdentityCard.wrap}>
                <HraderLogin title={"身份认证"} type={"zhuce"} {... this.props} />
                {this.Loadding()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this._One()}
                    {this._Two()}
                    {this._Three()}
                    {/* {this._Btn()} */}
                    <View style={{ height: cal(30) }}>
                    </View>
                    {/* {this._Btn_skip()} */}
                </ScrollView>
                {this._modal()}
            </View>
        )
    }
    _One() {
        return (
            <View style={IdentityCard.OneWrap}>
                <Text style={IdentityCard.OneWrap_text1}>爱特缘是一个真实优质的婚恋交友</Text>
                <Text style={IdentityCard.OneWrap_text2}>平台，我们提倡身份认证，让恋爱更安全、可靠</Text>
            </View>
        )
    }
    _Two() {
        return (
            <View style={IdentityCard.TwoWrap}>
                <View style={IdentityCard.TwoWrap_View1}>
                    <Text style={IdentityCard.TwoWrap_View1_text}>请拍摄您的身份证</Text>
                </View>
                <View style={IdentityCard.TwoWrap_View2}>
                    <View style={IdentityCard.TwoWrap_View2_View_zheng}>
                        <TouchableOpacity
                            onPress={() => this.ImagePickers(1)}
                        >
                            <View style={IdentityCard.TwoWrap_View2_View_zheng_pai}>
                                <Image source={this.state.avatarSource1 != "" ? { uri: this.state.avatarSource1 } : IDCARD} style={{ width: cal(160), height: cal(96) }} />
                                {this._font(1)}
                            </View>
                        </TouchableOpacity>
                        <View style={IdentityCard.TwoWrap_View2_View_zheng_image}>
                            <Image source={this.state.user_sex == "male" ? IDCARD1 : MOMIDCARD1} style={{ width: cal(160), height: cal(96) }} />
                        </View>
                    </View>
                </View>
                <View style={[IdentityCard.TwoWrap_View2, { marginTop: cal(40) }]}>
                    <View style={IdentityCard.TwoWrap_View2_View_zheng}>
                        <TouchableOpacity
                            onPress={() => this.ImagePickers(2)}
                        >
                            <View style={IdentityCard.TwoWrap_View2_View_zheng_pai}>
                                <Image source={this.state.avatarSource2 != "" ? { uri: this.state.avatarSource2 } : IDCARD} style={{ width: cal(160), height: cal(96) }} />
                                {this._font(2)}
                            </View>
                        </TouchableOpacity>
                        <View style={IdentityCard.TwoWrap_View2_View_zheng_image}>
                            <Image source={this.state.user_sex == "male" ? IDCARD2 : MOMIDCARD2} style={{ width: cal(160), height: cal(96) }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    _font(item) {
        if (item == 1) {
            return (
                <View style={{ opacity: this.state.avatarSource1 == '' ? 1 : 0, position: "absolute", bottom: cal(10), left: (15), width: cal(130), }}>
                    <Text style={IdentityCard.font}>拍摄您手持身份证正面合照</Text>
                </View>
            )
        } else {
            return (
                <View style={{ opacity: this.state.avatarSource2 == '' ? 1 : 0, position: "absolute", bottom: cal(10), left: cal(24), width: cal(120), }}>
                    <Text style={IdentityCard.font}>拍摄您的身份证正面照</Text>
                </View>
            )
        }
    }

    _name(name) {
        let names = name.replace(/[^\u4E00-\u9FA5]/g, '');
        console.log(names)
        this.setState({ name: names })
    }
    _idCard(idCard) {
        let idCards = idCard.replace(/[\W]/g, '');
        this.setState({ idCard: idCards })
    }
    _Three() {
        return (
            <View style={IdentityCard.ThreeWrap}>
                <View style={IdentityCard.ThreeWrap_View1}>
                    <View style={{ paddingLeft: cal(13) }}>
                        <Text style={IdentityCard.ThreeWrap_View1_Text}>以上信息仅供此次认证使用，将严格保密</Text>
                    </View>
                </View>
                <View style={IdentityCard.ThreeWrap_View2}>
                    <TextInput
                        style={IdentityCard.TextInputStyle}
                        clearTextOnFocus={true}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        clearButtonMode='always'
                        value={this.state.name}
                        placeholder="请输入您的真实姓名"
                        placeholderTextColor={"#b1b1b1"}
                        onChangeText={(name) => this._name(name)}
                    />
                </View>
                <View style={IdentityCard.ThreeWrap_View2}>
                    <TextInput
                        style={IdentityCard.TextInputStyle}
                        clearTextOnFocus={true}
                        keyboardType='numeric'
                        underlineColorAndroid="rgba(0,0,0,0)"
                        clearButtonMode='always'
                        maxLength={18}
                        value={this.state.idCard}
                        placeholder="请输入您的身份证号码"
                        placeholderTextColor={"#b1b1b1"}
                        onChangeText={(idCard) => this._idCard(idCard)}
                    />
                </View>
            </View>
        )
    }
    // _Btn() {
    //     return (
    //         <View style={IdentityCard.btn}>
    //             <View style={
    //                 this.state.avatarSource1 != "" &&
    //                     this.state.avatarSource2 !== "" &&
    //                     this.state.name != "" &&
    //                     this.state.idCard != "" ?
    //                     (this.state.user_sex == "male" ? IdentityCard.btnView : IdentityCard.btnViewMOM) : IdentityCard.btnViewNO}>
    //                 <Text style={IdentityCard.btnView_Text}>提交</Text>
    //             </View>
    //         </View>
    //     )
    // }
    _Btn_skip() {
        return (
            <View style={[IdentityCard.btn2]}>
                <View style={IdentityCard.btnView2}>
                    <Text style={IdentityCard.btnView_Text2}>证件不在身边,暂时跳过</Text>
                </View>
            </View>
        )

    }









    _modal() {
        return (
            <Modal
                // animationType='slide'
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => console.log('onRequestClose...')} >
                <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1 }}>
                    <View style={{ position: "absolute", top: 0, zIndex: 1, width: width, flex: 1, }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    visible: false
                                })
                            }}
                        >
                            <View style={{ height: height }}></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ position: "absolute", bottom: 0, width: width, zIndex: 2 }}>
                        <View style={{ height: cal(115), backgroundColor: "#fff" }}>
                            <TouchableOpacity onPress={() => { this.ImagePickers_launchCamera(this.state.visibleNum) }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                    <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>拍照</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.ImagePickers_launchImageLibrary(this.state.visibleNum) }}>
                                <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", }}>
                                    <Text style={{ color: PublicColor.Public_ClickBackground, fontSize: PublicFontSize.PublicFontSize_30 }}>选择相册</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: cal(10) }}></View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    visible: false
                                })
                            }}
                        >
                            <View style={{ height: cal(45), backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: PublicFontSize.PublicFontSize_28, color: PublicColor.Public_Text3 }}>取消</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }
    //选择相册
    ImagePickers_launchImageLibrary() {
        this.setState({
            visible: false,
        })
        let that = this;
        let formData = new FormData();
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            includeBase64: true,
            cropping: true,
        }).then(image => {
            formData.append("format", image.mime);
            formData.append("image", image.data);
            if (this.state.visiblenum == 1) {
                that.setState({
                    avatarSource1: image.path,
                });
                formData.append("usage", 3);
                _ajax.post_image_token("user/image/upload", formData, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        if (that.state.username != "") {
                            that.props.idConfirmed(3) 
                            that.props.navigator.pop();
                        }
                    }
                })
            } else if (this.state.visiblenum == 2) {
                that.setState({
                    avatarSource2: image.path,
                    Loadding: true
                });
                formData.append("usage", 2);
                _ajax.post_image_token("user/image/upload", formData, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        that.setState({
                            id: res.id.idNum,
                            username: res.id.username,
                            name: res.id.username,
                            idCard: res.id.idNum,
                            Loadding: false
                        });
                        NativeModules.MyNativeModule.rnCallNative("上传成功");
                        if (that.state.avatarSource1 != "") {
                            that.props.idConfirmed(3) 
                            that.props.navigator.pop();
                        }
                    } else if (res.code == 1072) {
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                        NativeModules.MyNativeModule.rnCallNative(res.info);
                    } else if (res.code == 1073) {
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                        NativeModules.MyNativeModule.rnCallNative(res.info);
                    }
                    else if (res.code == 1074) {
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                        NativeModules.MyNativeModule.rnCallNative(res.info);
                    } else {
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                        NativeModules.MyNativeModule.rnCallNative(res.info);

                    }
                })
            }
        });
    }
    // 相机
    ImagePickers_launchCamera() {
        let formData = new FormData();
        this.setState({
            visible: false,
        })
        let that = this;
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            includeBase64: true,
            cropping: true
        }).then(image => {
            console.log(image)
            formData.append("format", image.mime);
            formData.append("image", image.data);
            if (that.state.visiblenum == 1) {
                that.setState({
                    avatarSource1: image.path,
                });
                formData.append("usage", 3);
                _ajax.post_image_token("user/image/upload", formData, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        if (that.state.username != "") {
                            that.props.idConfirmed(3) 
                            that.props.navigator.pop();
                        }
                    }
                })
            }
            else if (that.state.visiblenum == 2) {
                that.setState({
                    avatarSource2: image.path,
                    Loadding: true
                });
                formData.append("usage", 2);
                _ajax.post_image_token("user/image/upload", formData, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        that.setState({
                            avatarSource2: '',
                            id: res.id.idNum,
                            username: res.id.username,
                            Loadding: false
                        });
                        if (that.state.avatarSource1 != "") {
                            that.props.idConfirmed(3) 
                            that.props.navigator.pop();
                        }
                    } else if (res.code == 1072) {
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                        NativeModules.MyNativeModule.rnCallNative("上传身份证图片为非身份证!上传失败");
                    } else if (res.code == 1073) {
                        NativeModules.MyNativeModule.rnCallNative("上传身份证图片有作伪嫌疑!上传失败");
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                    }
                    else if (res.code == 1074) {
                        NativeModules.MyNativeModule.rnCallNative("上传身份证信息与注册信息不服!上传失败");
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });
                    } else {
                        NativeModules.MyNativeModule.rnCallNative("上传失败");
                        that.setState({
                            avatarSource2: '',
                            Loadding: false
                        });

                    }
                })
            }
        });
    }
}

let IdentityCard = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground,
    },
    OneWrap: {
        paddingTop: cal(13),
        alignItems: "center",
        paddingBottom: cal(13)
    },
    OneWrap_text1: {
        fontSize: cal(13),
        color: "#828282",

    },
    OneWrap_text2: {
        fontSize: cal(13),
        color: "#828282",
        marginTop: cal(2)
    },
    TwoWrap: {
        backgroundColor: "#fff",
        paddingBottom: cal(13)
    },
    TwoWrap_View1: {
        paddingTop: cal(13),
        paddingBottom: cal(13),
        borderBottomWidth: cal(0.5),
        borderBottomColor: "#b1b1b1"
    },
    TwoWrap_View1_text: {
        fontSize: cal(13),
        color: '#5f5f5f',
        paddingLeft: cal(13)
    },
    TwoWrap_View2: {
        marginTop: cal(13),
        paddingLeft: cal(13),
        paddingRight: cal(13),
    },
    TwoWrap_View2_View_zheng: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    TwoWrap_View2_View_zheng_image: {
        backgroundColor: "#eee"
    },
    ThreeWrap: {
        backgroundColor: "#fff",
        marginTop: cal(13),
        paddingBottom: cal(8)
    },
    ThreeWrap_View1: {
        height: cal(42.5),
        justifyContent: "center",
        borderBottomColor: "#d1d1d1",
        borderBottomWidth: cal(0.5)
    },
    ThreeWrap_View1_Text: {
        color: "#5f5f5f",
        fontSize: cal(13)
    },
    ThreeWrap_View2: {
        height: cal(50),
        justifyContent: "center",
        paddingLeft: cal(13),
        borderBottomColor: "#d1d1d1",
        borderBottomWidth: cal(0.5)
    },
    TextInputStyle: {
        height: cal(50),
        color: "#5f5f5f"
    },
    btn: {
        alignItems: "center",
        marginTop: cal(25),
    },
    btnView: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "#7293c9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: cal(2)
    },
    btnViewMOM: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "#958cf4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: cal(2)
    },
    btnViewNO: {
        width: cal(330),
        height: cal(50),
        backgroundColor: "#d1d1d1",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: cal(2)
    },
    btnView_Text: {
        color: "#fff",
        fontSize: cal(15)
    },
    btn2: {
        alignItems: "center",
        marginTop: cal(15),
        marginBottom: cal(30)
    },
    btnView2: {
        width: cal(330),
        height: cal(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: cal(2),
        borderWidth: cal(1),
        borderColor: "#7293c9",

    },
    btnView_Text2: {
        color: "#7293c9",
        fontSize: cal(15)
    },
    font: {
        fontSize: cal(12),
        color: "#b1b1b1",
        textAlign: "center"
    }
})
