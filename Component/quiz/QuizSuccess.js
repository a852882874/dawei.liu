//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView, Platform, Image,
    Dimensions, TextInput, TouchableWithoutFeedback, AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizText from './quizText.js'
const { cal } = require("./../Common/Cal.js");
const LOGO = require("./../image/quize/success.png");
import LUyou from './../home/Firest';
import JMessage from 'jmessage-react-plugin';
import SearchAndm from './../viewpager/searchAndm.js';
import IdentityCard from './../quiz/identityCard.js';
import ProfessionalCertification from './../page/ProfessionalCertification.js';
const { PublicColor } = require("./../Common/Color.js")
import SplashScreen from 'react-native-splash-screen'
import _ajax from '../Common/LoginAjax';
export default class quizOneSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 5,
            a: 1,
            idCord: "",
            user_sex: "",
            emailConfirmed: ""
        }
        SplashScreen.hide()
    }
    componentDidMount() {
        let that = this;
        that._sex(that)
            .then(
            function (data) {
                console.log(data)
                return that._emailConfirmed(that);
            }
            )
            .then(
            function (data) {
                that.props.navigator.replace({
                    component: IdentityCard,
                    reset: true,
                    params: {
                        navigator: that.props.navigator,
                    }
                })
                return false
                return false
                return false
                return false
            }
            )
    }

    _sex(that) {
        let p = new Promise(function (resolve, reject) {
            AsyncStorage.getItem('user_sex', (err, result) => {
                if (JSON.parse(result) != null) {
                    if (JSON.parse(result).user_sex == "male") {
                        resolve("性别")
                    } else {
                        that.props.navigator.replace({
                            component: IdentityCard,
                            reset: true,
                            params: {
                                navigator: that.props.navigator,
                            }
                        })
                        return false
                    }
                } else {
                    resolve("性别")
                }
            })
        })
        return p;

    }
    componentWillUnmount(){
        this.times && clearTimeout(this.times);
    }
    _emailConfirmed(that) {
        let p = new Promise(function (resolve, reject) {
            _ajax.get_token("user/self_manage", that.props.navigator, function (res) {
                console.log(res)
                if (res.user.emailConfirmed == 0) {
                    that.times = setTimeout(function () {
                        that.times && clearTimeout(that.times);
                        that.props.navigator.replace({
                            component: ProfessionalCertification,
                            reset: true,
                            type: "image",
                            params: {
                                navigator: that.props.navigator,
                                frist: false
                            }
                        })
                    }, 200)
                    return false
                } else {
                    resolve("email")
                }
            })
        })
        return p;
    }
    render() {
        return (
            <View style={QuizOneSuccess.wrap}>
                <Image source={LOGO} style={QuizOneSuccess.image} />
                <Text style={QuizOneSuccess.text_text}>问题都回答完了，缘分还会远么？</Text>
            </View>
        )
    }
    logining() {

    }
}

let QuizOneSuccess = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PublicColor.Public_ViewBackground,
        alignItems: "center"
    },
    image: {
        width: cal(124),
        height: cal(155),
        marginTop: cal(85)
    },
    text_text: {
        marginTop: cal(80),
        color: PublicColor.Public_Text3,
        fontSize: cal(14)
    }
})
