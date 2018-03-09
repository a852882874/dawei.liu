import React, { Component } from 'react'
import { View,StyleSheet,Text,Platform,Navigator,Dimensions,ToastAndroid,BackAndroid,TouchableWithoutFeedback,AsyncStorage,Alert} from 'react-native'
const {width,height} = Dimensions.get("window");
import Header from './../Common/Header.js'
export default class Me extends Component{
	constructor(props){  
        super(props);
    }
    _setShezhi(){
        return(
            <View>
                <Text>你好</Text>
            </View>
        )
    }
    render(){
    		return (
                <View style={{flex:1,backgroundColor:"red"}}>
                    <Header title={"我的"} type={"Me"} navigator={this.props.navigator}/>
                    {this._setShezhi()}
                </View>
          )
    }
}