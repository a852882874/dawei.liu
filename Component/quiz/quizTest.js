//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView, Platform, InteractionManager, NativeModules,
    Image, Dimensions, ListView, TextInput, TouchableOpacity, AsyncStorage, Alert,
} from 'react-native'
const { width, height } = Dimensions.get("window");
import _ajax from '../Common/LoginAjax';
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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "./loggingChoose/TabBarlogging.js";
import TabBarloggList from "./loggingChoose/TabBarloggList.js";
export default class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Imformation: [],
            sex: "",
            nextPropsPage: false,
            answers: [],
            page: true
        }
        this.lock = false;
    }
    componentWillUnmount(){
        this.lock = true
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let obj_art = [];
            for (let i = 1; i <= 30; i++) {
                obj_art.push({ name: i })
            }
            if (!this.lock) {
                this.setState({
                    Imformation: obj_art,
                })
            }
            SplashScreen.hide()
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
        });
    }
    next(content, json) {
        if (!this.lock) {
            this.setState({
                nextPropsPage: content
            })
        }
        if (this.state.answers.length >= 1) {
            this.state.answers.map((item, key) => {
                if (item.questionId == json.questionId) {
                    this.state.answers[key] = json;
                    if (!this.lock) {
                        this.setState({
                            answers: this.state.answers
                        })
                    }
                } else {
                    if (!this.lock) {
                        this.setState({
                            answers: this.state.answers.concat(json)
                        })
                    }
                }
            })
        } else {
            if (!this.lock) {
                this.setState({
                    answers: this.state.answers.concat(json)
                })
            }
        }

    }
    nextPropsPage(content) {
        if (!this.lock) {
            this.setState({
                nextPropsPage: content
            })
        }
    }
    componentDidUpdate() {
        if (!this.lock) {
            if (this.state.answers.length >= 15) {
                let json = {
                    "answers": this.state.answers
                }
                let that = this;
                console.log(that.state.page)
                if (that.state.page) {
                    NativeModules.MyNativeModule.rnCallNative("你已经完成测试~");
                    _ajax.post_token("match/questions/answers", json, function (res) {
                        if (res.code == 0) {
                            if (that.props.type == "登录") {
                                that.props.navigator.pop();
                            } else {
                                AsyncStorage.setItem('ceshiti', JSON.stringify('wqwqw'), () => { });
                                that.props.navigator.push({
                                    component: QuizSuccess,
                                    reset: true,
                                    type: "image",//注意这个赋值，
                                    params: {
                                        navigator: that.props.navigator
                                    }
                                })
                            }
                        }
                    })
                    if (!that.lock) {
                        that.setState({
                            page: false
                        })
                    }
                }
            }
        }
    }
    _list_Infor(item) {
        return (
            <TabBarloggList data={item} navigator={this.props.navigator} sex={this.state.sex} next={this.next.bind(this)} num={this.state.answers.length} />
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                <ScrollableTabView
                    // renderTabBar={() => <TabBar tab2s={this.state.Imformation} />}
                    next={this.nextPropsPage.bind(this)}
                    nextValue={this.state.nextPropsPage}
                >
                    {
                        this.state.Imformation.map((item, key) => {
                            return (
                                <View tabLabel={key} key={key}>
                                    {this._list_Infor(item)}
                                </View>
                            )
                        })
                    }
                </ScrollableTabView>


            </View>
        )
    }

}

let QuizOne = StyleSheet.create({

})
