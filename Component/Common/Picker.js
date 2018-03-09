import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions, Platform, Picker } from 'react-native';
import Register from './../login/register.js';
import Me from './../page/Me.js'
const { width, height } = Dimensions.get('window');
import { cal } from './Cal';
import JMessage from 'jmessage-react-plugin';
const BACK = require('./../image/me/back.png');
const BACKBLOCK = require('./../image/me/back_block.png');
import LinearGradient from  'react-native-linear-gradient';
export default class header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type ? this.props.type : "suiji"
        }
    }
    ToRegister() {
        this.props.navigator.push({
            component: Register,
            params: {
                navigator: this.props.navigator
            }
        })
    }
    render() {
        return(
            <Picker
            selectedValue={language}
            onValueChange={
                lang => { language: lang }}
            mode='dialog'>
            <Picker.Item label='java' value='java' />
            <Picker.Item label='javaScript' value='javaScript' />
            <Picker.Item label='Php' value='Php' />
            <Picker.Item label='Android' value='Android' />
            <Picker.Item label='React-native' value='React-native' />
        </Picker>
        )            
    }
}
let styles = StyleSheet.create({
   
})
