//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, ToastAndroid, BackAndroid, AsyncStorage, Alert } from 'react-native'
// import {getValue,setValue} from './counter'
// import {on,remove} from './event'
import { connect, Provider } from 'react-redux';
import { plus } from '../redux/action';
import { getStore } from '../redux/configureStore';
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store : null
        }
    }
    componentDidMount(){
        const store = getStore();
        this.setState({
            store : store
        });
    }
    render() {
        if(!this.state.store){
            return(
                <View>
                    <Text>qwweq</Text>
                </View>
            )
        }
        return (
            <Provider store={this.state.store}>
                <View>
                    <Counter1 />
                    <Counter2 />
                </View>
            </Provider>
        )
    }
}
class __Counter1 extends Component {
    render() {
        return (

            <View style={entryStyle.counter1}>
                <Text>计数器</Text>
                <Text>{this.props.calculate.c}</Text>
                <Text onPress={() => {
                    //生成一个action分发
                    alert(1)
                    this.props.dispatch(plus(2));
                }}>点击增加</Text>
            </View>

        )
    }
}
class __Counter2 extends Component {
    render() {
        return (
            <View style={entryStyle.counter1}>
                <Text>计数器</Text>
                <Text>{this.props.calculate.c}</Text>
                <Text onPress={() => {
                    this.props.dispatch(plus(2));
                }}>点击增加</Text>
            </View>
        )
    }
}
//store(all) 结构
// store = {
//     calculate : {c:13},
//     navigator : {id:"",name:""}

// }

//配置map映射表 mapStateToProps(store)可以拿到直接的数据
const mapStateToProps = state => {
    return {
        //state.xxx必须与reducer一样名字
        calculate: state.calculate
    }
}

let Counter1 = connect(mapStateToProps)(__Counter1);
let Counter2 = connect(mapStateToProps)(__Counter2);
const entryStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    counter1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: '#ffff00'
    }
})