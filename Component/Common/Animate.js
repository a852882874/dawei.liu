import React, { Component } from 'react'
import { View,StyleSheet,Text,Platform,Navigator,Dimensions,ToastAndroid,BackAndroid,TouchableWithoutFeedback,Animated,Alert} from 'react-native'
 import {cal} from './Cal';
import Header from './Header.js';
export default class Mess extends Component{
   constructor(props){
     super(props)
     this.start = {
         
     }
    }
    componentDidMount() {
       
    }
    render() {
        return (
            <Animated.View style={[styles.demo, {
                    height: this.state.fadeInOpacity
                }]}>
                
            </Animated.View>
        );
    }
}
 
var styles = StyleSheet.create({
    demo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30
    }
});