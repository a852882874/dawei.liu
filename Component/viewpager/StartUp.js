//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View,StyleSheet,Text,Platform,Navigator,Dimensions,ToastAndroid,BackAndroid,TouchableWithoutFeedback,AsyncStorage,Alert} from 'react-native'
const {width,height} = Dimensions.get("window");
const {cal} = require("./../Common/Cal.js");
import GuidePager from './guidePager';
import SplashScreen from 'react-native-splash-screen'
export default class StartUp extends Component{
	constructor(props){  
        super(props);
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    toUpGuidePager(){
        let user_old = "old";
        AsyncStorage.setItem('user_old', JSON.stringify({ user_old }), () => { });        
        this.props.navigator.push({
            component:GuidePager,
            reset:true,
            params:{
                navigator:this.props.navigator
            }
        })
    } 	
    render(){
    		return (
                <View style={StartUpStyle.wrap}>
                    <View style={StartUpStyle.swipt}></View>
                    <TouchableWithoutFeedback onPress={()=>this.toUpGuidePager()}>
                        <View style={StartUpStyle.btn}>
                            <Text style={StartUpStyle.text}>
                                开启体验之旅
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={StartUpStyle.kong}></View>
                </View>
          )
    }
}

let StartUpStyle = StyleSheet.create({
    wrap:{
        height:height,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    btn:{
        width:cal(150),
        height:cal(50),
        backgroundColor:"#00ffff",
        flex:1,
        alignItems:"center",
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        fontWeight:'800'
    },
    swipt:{
        flex:9
    },
    kong:{
        flex:1
    }
})