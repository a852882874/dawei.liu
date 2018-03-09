//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View,StyleSheet,Text,Platform,Navigator,Dimensions,ToastAndroid,BackAndroid,AsyncStorage,Alert} from 'react-native'
const {width,height} = Dimensions.get("window");
import My from './../page/myProfile.js';
import MyIndex from './../page/MyIndex.js';
export default class entry extends Component{
	constructor(props){  
        super(props);
    } 	
    render(){
        return (
            <View style={{height:height}}>
                <MyIndex {...this.props}/>
            </View>
      )
    }
}
