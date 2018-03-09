//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Platform, InteractionManager, Image, Dimensions, TextInput, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizOne from "./../home/Firest.js"
import SearchAndm from "./../viewpager/searchAndm.js";
import SplashScreen from 'react-native-splash-screen'
import JMessage from 'jmessage-react-plugin';
import Loadding from './../Common/Loadding.js';
import tokenImage from './../Common/token.js';
import QuizOnessss from './../quiz/quizOne.js';
import _ajax from "./../Common/LoginAjax.js";
import RegisterZi from './registerZi.js';
import ProfessionalCertification from './../page/ProfessionalCertification.js';
export default class LoginSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = { sex: '', emailConfirmed: 1 }
    }
    self_manage(that) {
        _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
            if (res.user.sex == 1 || res.user.sex == 2) {
                _ajax.get_token("match/questions/user/answer_stat", that.props.navigator, function (sss) {
                    if (sss.answered_questions_num > 0) {
                        AsyncStorage.setItem('UserList', JSON.stringify({ UserList: res.user }), () => { });
                        let user_sexsss = res.user.sex == 1 ? "male" : "female";
                        if (res.user.emailConfirmed == 0 && res.user.sex == 1) {
                            AsyncStorage.setItem('user_sex', JSON.stringify({ 'user_sex': user_sexsss }), () => {
                                that.props.navigator.push({
                                    component: ProfessionalCertification,
                                    reset: true,
                                    type: "image",//注意这个赋值，
                                    params: {
                                        navigator: that.props.navigator,
                                        frists: false
                                    }
                                })
                            });
                            return false;
                        }
                        _ajax.get_token("user/image/list", that.props.navigator, function (resssss) {
                            if (resssss.code == 0 && resssss.imageList.length > 0) {
                                resssss.imageList.map((item) => {
                                    if (item.usage == 1) {
                                        tokenImage.tokenImg(item.uuid, function (ressssss) {
                                            console.log(ressssss)
                                            AsyncStorage.setItem('Image', JSON.stringify(ressssss), () => { });
                                        })
                                    }
                                })
                            }
                        })
                        let user_sex = res.user.sex == 1 ? "male" : "female";
                        AsyncStorage.setItem('user_sex', JSON.stringify({ 'user_sex': user_sex }), () => {
                            that.props.navigator.replace({
                                component: res.user.sex == 1 ? QuizOne : SearchAndm,
                                reset: true,
                                type: "image",//注意这个赋值，
                                params: {
                                    gender: user_sex,
                                    navigator: that.props.navigator,
                                    other: true,
                                    pageXOffset: 1
                                }
                            })
                        });
                    } else {
                        that.props.navigator.replace({
                            component: QuizOnessss,
                            reset: true,
                            type: "image",//注意这个赋值，
                            params: {
                                navigator: that.props.navigator,
                            }
                        })
                        return false;
                    }
                })
            }
            else {
                that.props.navigator.replace({
                    component: RegisterZi,
                    reset: true,
                    type: "image",//注意这个赋值，
                    params: {
                        gender: that.state.sex,
                        navigator: that.props.navigator
                    }
                })
            }
        });
    }
    componentDidMount() {
        let that = this
        InteractionManager.runAfterInteractions(() => {
            _ajax.get("config", function (res) {
                console.log(res)
                AsyncStorage.setItem("image_host", JSON.stringify({ image_host: res.config.image_host }))
            })
            that.self_manage(that)
        });
    }
    componentWillUnmount() {
        // SplashScreen.hide()
    }
    _fetchData() {
        console.log(1)
    }
    render() {
        return (
            <Loadding from={"transent"} title={"正在登录中..."} />
        )
    }
}