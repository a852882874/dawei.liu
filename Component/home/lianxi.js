//   女生主页
import React, { Component } from 'react'
import { View, Image, Text, Platform, Navigator, Animated, Dimensions, ToastAndroid, BackAndroid, AsyncStorage, Alert } from 'react-native'
const { width, height } = Dimensions.get("window");
export default class Emnskdas extends Component {
    constructor(props) {
        super(props);
        this.state = {
             fadeInOpacity: new Animated.Value(0), // 初始值            
            width: new Animated.Value(0), // 初始值            
            height: new Animated.Value(0) // 初始值            
        };
    }
    componentDidMount() {
                Animated.timing(this.state.fadeInOpacity, {
                    toValue: 1, // 目标值
                    duration: 2500, // 动画时间
                }).start();
                Animated.timing(this.state.width, {
                    toValue: 250, // 目标值
                    duration: 1000, // 动画时间
                }).start();
                Animated.timing(this.state.height, {
                    toValue: 250, // 目标值
                    duration: 1000, // 动画时间
                }).start();
            }
        
    render() {

        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    source={{ uri: 'http://i.imgur.com/XMKOH81.jpg' }}
                    style={{
                        width: this.state.width, height: this.state.height,
                        opacity: this.state.fadeInOpacity

                    }}
                />
            </View>
        );
    }
}
