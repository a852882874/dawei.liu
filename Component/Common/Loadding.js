import React, { Component } from 'react';
import { View, Dimensions, ActivityIndicator,Text } from 'react-native';
import { cal } from './Cal';
const { PublicColor } = require("./Color.js")
const { width, height } = Dimensions.get('window');
export default class loadding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: this.props.from ? this.props.from : 0
        }
    }
    render() {
        switch (this.state.from) {
            case 'transent':
                return (
                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: cal(-40),zIndex:100000000 }}>
                        <View style={{backgroundColor:'rgba(0,0,0,0.6)',width:cal(100),justifyContent:"center",alignItems:"center",height:cal(100),borderRadius:cal(10)}}>
                            <ActivityIndicator
                                color={"#fff"}
                                size={'large'}
                            />
                            <Text style={{color:"#fff",marginTop:cal(10)}}>{this.props.title?this.props.title:"加载中..."}</Text>
                        </View>
                    </View>
                )
            case 'transentmom':
                return (
                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', position: 'absolute', }}>
                        <ActivityIndicator
                            color={"#958cf4"}
                            size={'large'}
                        />
                    </View>
                )
            case 'loggingChoose':
                return (
                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', position: 'absolute', backgroundColor: PublicColor.Public_Text7 }}>
                        <ActivityIndicator
                            size={'large'}
                        />
                    </View>
                )
            case 'loggingChoose2':
                return (
                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: cal(-100), backgroundColor: PublicColor.Public_Text7 }}>
                        <ActivityIndicator
                            size={'large'}
                        />
                    </View>
                )
            case 'imformation2':
                return (
                    <View style={{ width: width, height: height, position: 'absolute', backgroundColor: '#fff', paddingTop: cal(110) }}>
                        <ActivityIndicator
                            size={'large'}
                        />
                    </View>
                )
            // break;
            case 'circle':
                return (
                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', backgroundColor: '#fff', paddingTop: cal(50) }}>
                        <ActivityIndicator
                            size={'large'}
                        />
                    </View>
                )
            // break;
            default:
                return (
                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', position: 'absolute', backgroundColor: '#fff', }}>
                        <ActivityIndicator
                            size={'large'}
                        />
                    </View>
                )
        }
    }
}
