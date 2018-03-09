//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ScrollView,
    Platform, InteractionManager, Image, Dimensions, TextInput,
    TouchableWithoutFeedback, AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window");
import QuizOne from "./../home/Firest.js"
import SearchAndm from "./../viewpager/searchAndm.js";
import SplashScreen from 'react-native-splash-screen'
import JMessage from 'jmessage-react-plugin';
import LoginSuccess from "./loginSuccess.js";
export default class otherLoginSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: '',
            s: true
        }


    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let that = this;
            AsyncStorage.getItem('user_sex', (err, result) => {
                console.log(result)
                if (JSON.parse(result)) {
                    that.setState({
                        sex: JSON.parse(result).user_sex,
                    })
                }
            })
            this._fetchData();
        });
    }
    componentWillUnmount() {
        // SplashScreen.hide()
    }
    _fetchData() {
        if (this.state.s) {
            this.setState({
                s: false
            })
            let that = this;
            JMessage.login({
                username: that.props.username,
                password: '111111'
            })
            AsyncStorage.setItem('tokenId', JSON.stringify(that.props.token), () => {
                AsyncStorage.setItem('user_token', JSON.stringify({ username: that.props.username, password: that.props.passWord }), () => { });
                that.props.navigator.push({
                    component: LoginSuccess,
                    params: {
                        navigator: that.props.navigator
                    }
                })
            })
        }
    }
    render() {

        return (
            <View>
            </View>
        )
    }
}