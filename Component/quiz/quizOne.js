//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View,StyleSheet,Text,ScrollView,Platform,Image,Dimensions,TextInput,TouchableWithoutFeedback,AsyncStorage,Alert} from 'react-native'
const {width,height} = Dimensions.get("window");
import QuizTest from './quizTest.js'
const {cal} = require("./../Common/Cal.js");
import Header from "./../Common/Header.js";
const { PublicColor } = require("./../Common/Color.js")
const { PublicFontSize } = require("./../Common/FontSize.js")
import SplashScreen from 'react-native-splash-screen'

const LOGO = require("./../image/quize/logo2.png");
export default class register extends Component{
	constructor(props){  
        super(props);
        this.state = {
            user_sex:""
        }
        let that = this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    user_sex: JSON.parse(result).user_sex,
                })
            }
        })
        SplashScreen.hide()
    }
    render(){
    		return (
                <View style={{flex:1,backgroundColor:PublicColor.Public_ViewBackground}}>
                    <Header title={"测试"} type={"noback"} {... this.props} />
                    <View style={{paddingTop:cal(55),paddingBottom:cal(35),alignItems:"center"}}>
                        <Image source={LOGO} style={{width:cal(120),height:cal(120)}} />
                    </View>
                    <View style={{alignItems:"center",paddingLeft:cal(18),paddingRight:cal(18)}}>
                        <Text style={{color:PublicColor.Public_Text3,fontSize:PublicFontSize.PublicFontSize_28,marginBottom:cal(9),textAlign:"center"}}>认真考虑每一道题目，因为我是真的很想给你寻一位适合你的人。</Text>
                        <Text style={{textAlign:"center",fontSize:PublicFontSize.PublicFontSize_28,color:PublicColor.Public_Text1,lineHeight:25,marginBottom:cal(14)}}></Text>
                        <Text style={{textAlign:"center",fontSize:PublicFontSize.PublicFontSize_22,color:PublicColor.Public_Text4}}>该题库有30道题目，你可任意挑选15道进行测试问答</Text>
                    </View>
                    <View style={{alignItems:"center",marginTop:cal(25)}}>
                        <TouchableWithoutFeedback
                            onPress={()=>{
                                this.props.navigator.push({
                                    component:QuizTest,
                                    params:{
                                        navigator:this.props.navigator,
                                        type:"未登录"
                                    }
                                })
                            }}
                        >
                            <View style={this.state.user_sex == "male"?QuizOne.btn:QuizOne.btn2}>
                                <Text style={QuizOne.btn_text}>开始</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
          )
    }
    logining(){

    }
}

let QuizOne = StyleSheet.create({
    btn:{
        width:cal(330),
        height:cal(50),
        backgroundColor:PublicColor.Public_ClickBackground,
        borderRadius:cal(2),
        justifyContent:"center",
        alignItems:"center"
    },
    btn2:{
        width:cal(330),
        height:cal(50),
        backgroundColor:PublicColor.Public_MomClickBackground,
        borderRadius:cal(2),
        justifyContent:"center",
        alignItems:"center"
    },
    btn_text:{
        color:'#fff',
        fontSize:cal(15)
    },
})
