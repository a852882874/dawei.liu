//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView,
    Modal, Platform, TouchableOpacity, Image, Dimensions,
    TextInput, TouchableWithoutFeedback, AsyncStorage, Alert, NativeModules
} from 'react-native'
const { width, height } = Dimensions.get("window");
const { cal } = require("./../Common/Cal.js");
import HraderLogin from './../Common/Header.js'
import Loadding from './../Common/Loadding.js'

const LOGO = require("./../image/login/setImage.png");
import LUyou from './../home/Firest';
import SHA256 from 'crypto-js/enc-base64';
import JMessage from 'jmessage-react-plugin';
import SearchAndm from './../viewpager/searchAndm.js';
import Zhuanhuan from './../Common/education.js';
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
import SplashScreen from 'react-native-splash-screen';
var ImagePicker = require('react-native-image-picker');
import QuizOne from "./../quiz/quizOne.js";
import _ajax from "./../Common/LoginAjax.js";
let options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    width: 150,
    height: 150,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class setImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: '',
            user_sex: "",
            idName: '',
            idPassword: "",
            avatarSourcePath: "",
            visible: false,
            dataBase: "",
            avatarSourcePath_path: '',
            Loadding: false,
            avatarSourceData: "",

        }
        this.lock = false;
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                if (!that.lock) {
                    that.setState({
                        user_sex: JSON.parse(result).user_sex,
                    })
                }
            }
        })
        AsyncStorage.getItem('user_token', (err, result) => {
            if (!that.lock) {
                this.setState({
                    idName: JSON.parse(result).username,
                    idPassword: '111111'
                })
            }
        })
        AsyncStorage.getItem('tokenId', (err, result) => {
            if (!that.lock) {
                if (JSON.parse(result)) {
                    that.setState({
                        tokenId: JSON.parse(result)
                    })
                }
            }
        })
        SplashScreen.hide();

    }

    // 头像
    ImagePickers() {
        if (!this.lock) {
            this.setState({
                visible: true
            })
        }
        // ImagePicker.showImagePicker(options, (response) => {launchImageLibrary launchCamera
        // });
    }
    ImagePickers_launchImageLibrary() {
        if (!this.lock) {
            this.setState({
                visible: false
            })
        }
        // 相册
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                let that = this;
                if (!that.lock) {
                    that.setState({
                        avatarSourceData: response,
                        avatarSource: response.uri,
                        avatarSourcePath: response.data,
                        avatarSourcePath_path: response.path
                    });
                }
            }
        });
    }
    //拍照
    ImagePickers_launchCamera() {
        if (!this.lock) {
            this.setState({
                visible: false
            })
        }
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                let that = this;
                if (!that.lock) {
                    that.setState({
                        avatarSourceData: response,
                        avatarSource: response.uri,
                        avatarSourcePath: response.data,
                        avatarSourcePath_path: response.path
                    });
                }
            }
        });
    }
    _image() {
        if (this.state.avatarSource != "") {
            return (
                <Image source={{ uri: this.state.avatarSource }} style={{ width: cal(120), height: cal(120), borderRadius: cal(120) }} />
            )
        } else {
            return (
                <View>
                    <Image source={LOGO} style={{ width: cal(120), height: cal(120) }} />
                </View>
            )
        }
    }
    render() {

        return (
            <View style={SetImage.wrap}>
                <Modal
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
                            <View style={{ height: cal(111), backgroundColor: "#fff" }}>
                                <TouchableOpacity onPress={() => { this.ImagePickers_launchCamera() }}>
                                    <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", borderBottomColor: "#e8e8e8", borderBottomWidth: cal(0.5) }}>
                                        <Text style={{ color: this.state.user_sex =="male"?PublicColor.Public_ClickBackground:PublicColor.Public_MomClickBackgroundQuan, fontSize: PublicFontSize.PublicFontSize_30 }}>拍照</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.ImagePickers_launchImageLibrary() }}>
                                    <View style={{ height: cal(55), justifyContent: "center", alignItems: "center", }}>
                                        <Text style={{ color: this.state.user_sex =="male"?PublicColor.Public_ClickBackground:PublicColor.Public_MomClickBackgroundQuan, fontSize: PublicFontSize.PublicFontSize_30 }}>选择相册</Text>
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
                <HraderLogin title={"上传头像"} type={"zhuce"} {... this.props} />
                <View style={SetImage.View_wrap}>
                    <TouchableOpacity
                        onPress={() => this.ImagePickers()}
                    >
                        <View>
                            {this._image()}
                        </View>
                    </TouchableOpacity>
                    <Text style={SetImage.Text1}>美图不是万能的，一点不用也是万万不能的</Text>
                    {/* <Text style={SetImage.Text2}>真是的你更容易被{this.state.user_sex == "male" ? "她" : "他"}找到</Text> */}
                </View>
                <View style={SetImage.btnwrap}>
                    <TouchableOpacity
                        disabled={this.state.avatarSource != "" ? false : true}
                        onPress={() => this.Btn()}>
                        <View style={this.state.avatarSource != "" ? (this.state.user_sex == "male" ? SetImage.btnwView1 : SetImage.btnwView3) : SetImage.btnwView2}>
                            <Text style={SetImage.btnwText1}>
                                完成
                    </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this._loadding()}
            </View>
        )
    }
    _loadding() {
        if (this.state.Loadding) {
            return (
                <Loadding from={"transent"} />
            )
        }
    }
   
    componentWillUnmount() {
        if (!this.lock) {
            this.setState({
                Loadding: false
            })
        }
        this.time && clearTimeout(this.time);
        this.lock = true;
    }
    Btn() {
        let that = this;
        that.setState({
            Loadding: true
        })
        let base64Str = that.state.avatarSourcePath;
        let infoObject = that.props.infoObject;
        let user = {
            sex: Zhuanhuan._sex(infoObject.sex),//0: 男, 1:女
            nickname: infoObject.muser,
        }
        let user2 = {
            addrCountry: infoObject.addrCountry,
            addrProvince: infoObject.addrProvince,//省
            addrCity: infoObject.addrCity,//城市
            addrDistrict: infoObject.addrDistrict,//区
            birthday: infoObject.data,//addrProvince addrCity addrDistrict
            height: parseInt(infoObject.height.slice(0, 3)),//addrProvince addrCity addrDistrict
            maritalStatus: Zhuanhuan.maritalStatus(infoObject.hunyin, true),//0: 无, 1: 未婚, 2:
            nickname: infoObject.muser,
            sex: Zhuanhuan._sex(infoObject.sex),//0: 男, 1:女
            education: Zhuanhuan._education(infoObject.xueli, true),//0: 男, 1:女
            income: Zhuanhuan._income(infoObject.yueshouru, true)
        }
        let json = {
            "user": user
        }
        let json2 = {
            "user": user2
        }
        let formData = new FormData();
        formData.append("format", this.state.avatarSourceData.type);
        formData.append("image", this.state.avatarSourceData.data);
        formData.append("usage", 1);

        that.self_manage(json, that)
            .then(
            function (data) {
                console.log(data)
                return that.imageUpload(formData, that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.self_manage(json2, that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.JMessageUpdateMyAvatar(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.JMessageUpdateMyInfo(infoObject, that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.AsyncStorageImage(that);
            }
            )
            .then(
            function (data) {
                console.log(data)
                return that.AsyncStorageZiliao(that);
            }
            )
            // .then(
            // function (data) {
            //     console.log(data)
            //     return that.self_shezhiUserList(that);
            // }
            // )
            .then(
            function (data) {
                that.setState({
                    Loadding: false
                })
                NativeModules.MyNativeModule.rnCallNative("头像上传成功，请等待审核中");
                that.props.navigator.replace({
                    component: QuizOne,
                    reset: true,
                    params: {
                        navigator: that.props.navigator
                    }
                })
            }
            )

    }
    //更新用户信息   自己后台接口
    self_shezhiUserList(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                if (res.code == 0) {
                    AsyncStorage.setItem('UserList', JSON.stringify({ UserList: res.user }), () => {
                        resolve("设置Userlist")
                    });
                } else {
                    resolve("设置Userlist")
                }
            })
        });
        return p;
    }
    //更新用户信息   自己后台接口
    self_manage(json, that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            console.log(json)
            _ajax.post_token("user/self_manage", json, function (res) {
                console.log(res)
                if (res.code == 0) {
                    resolve("更新用户信息2")
                } else {
                    that.setState({
                        Loadding: false
                    })
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        });
        return p;
    }
    //极光更新用户资料   昵称
    JMessageUpdateMyInfo(infoObject, that) {
        let json = {
            nickname: infoObject.muser,
            gender: Zhuanhuan._sex(infoObject.sex),
        }
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            _ajax.post_token("user/jpush_profile", json, function (res) {
                console.log(res)
                if (res.code == 0) {
                    resolve(" 极光昵称修改ok")
                } else {
                    that.setState({
                        Loadding: false
                    })
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        });
        return p;
    }


    //极光更新用户头像

    JMessageUpdateMyAvatar(that) {

        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            console.log(that.state.avatarSourcePath_pat)
            JMessage.updateMyAvatar({ imgPath: that.state.avatarSourcePath_path },
                (a) => {
                    console.log(a)
                    resolve("极光更新用户头像3")
                }, (error) => {
                    console.log(error)
                    that.setState({
                        Loadding: false
                    })
                    var code = error.code
                    var desc = error.description
                })
        });
        return p;
    }
    //极光更新用户信息
    // JMessageUpdateMyInfo(infoObject, that) {
    //     let p = new Promise(function (resolve, reject) {
    //         //做一些异步操作
    //         let a = { nickname: infoObject.muser ,gender:infoObject.sex}
    //         JMessage.updateMyInfo(a, (a) => {
    //             resolve("极光更新用户信息4")
    //         }, (error) => {
    //             that.setState({
    //                 Loadding: false
    //             })
    //             console.log(error)
    //             var code = error.code
    //             var desc = error.description
    //         })
    //     });
    //     return p;
    // }
    //设置缓存  Image  用于以后从本地获取图片
    AsyncStorageImage(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            AsyncStorage.setItem('Image', JSON.stringify(that.state.avatarSource), () => {
                resolve("设置缓存  Image5")
            });
        });
        return p;
    }
    //设置缓存  ziliao  用于判断师傅填写过资料
    AsyncStorageZiliao(that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            AsyncStorage.setItem('ziliao', JSON.stringify('wqwqw'), () => {
                resolve("设置缓存   ziliao6")
            });
        });
        return p;
    }
    //更新  用户头像   自己后台
    imageUpload(formData, that) {
        let p = new Promise(function (resolve, reject) {
            //做一些异步操作
            _ajax.post_image_token("user/image/upload", formData, function (res) {
                console.log(res)
                if (res.code == 0) {
                    resolve("更新  用户头像   自己后台1")
                } else {
                    that.setState({
                        Loadding: false
                    })
                    NativeModules.MyNativeModule.rnCallNative(res.info);
                }
            })
        });
        return p;
    }





}

let SetImage = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground,

    },
    View_wrap: {
        alignItems: "center",
        marginTop: cal(70),
    },
    Text1: {
        color: PublicColor.Public_Text3,
        fontSize: cal(14),
        marginTop: cal(20)
    },
    Text2: {
        color: PublicColor.Public_Text1,
        fontSize: cal(11),
        marginTop: cal(6)
    },
    btnwrap: {
        alignItems: "center", height: cal(50),
        marginTop: cal(60)
    },
    btnwView1: {
        width: cal(330),
        height: cal(50),
        backgroundColor: PublicColor.Public_ClickBackground,
        borderRadius: cal(3),
        justifyContent: "center",
        alignItems: "center"
    },
    btnwView3: {
        width: cal(330),
        height: cal(50),
        backgroundColor: PublicColor.Public_MomClickBackground,
        borderRadius: cal(3),
        justifyContent: "center",
        alignItems: "center"
    },
    btnwView2: {
        width: cal(330),
        height: cal(50),
        backgroundColor: PublicColor.Public_NoClockBackground,
        borderRadius: cal(3),
        justifyContent: "center",
        alignItems: "center"
    },
    btnwText1: {
        color: "#fff"
    }

})
