import React, { Component } from 'react';
import { AppRegistry, TextInput, StyleSheet } from 'react-native';
import { cal } from './Cal.js'
const { PublicColor } = require("./Color.js")
export default class AutoExpandingTextInput extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态 
        this.state = { text: '', height: 0 };
        // this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
       
    }
    onContentSizeChange(event) {
        this.setState({ 
            text: event.nativeEvent.text, 
            height:event.nativeEvent.contentSize.height 
        }); 
    }
    render() {
        return (
            <TextInput {...this.props}
                //将组件定义的属性交给TextInput 
                multiline={true}
                onChange={this.onChange.bind(this)}
                onContentSizeChange={this.onContentSizeChange.bind(this)}
                style={[styles.textInputStyle,this.props.style , { height:cal( Math.max(cal(60), this.state.height) )}]}
                // value={this.state.text} 
                />);
    }
}
const styles = StyleSheet.create({
    textInputStyle: { //文本输入组件样式 
        // width: cal(345),
        height: cal(60),
        fontSize: cal(13),
        color:PublicColor.Public_Text1,
        paddingLeft:cal(10),
        backgroundColor: "#fff",
        maxHeight: cal(165),
    }
});