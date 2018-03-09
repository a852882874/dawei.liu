//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, InteractionManager, ToastAndroid, Image, BackAndroid, AsyncStorage, Alert } from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
const INDEX = 'Index';
import Index from './index';
// import Index from './../viewpager/StartUp';
import MomIndex from './momIndex';
// import MomIndex from './lianxi';
const SITEMAP = 'SiteMap';
import SiteMap from './siteMap';
const SIDE = 'Side';
import Side from './side';
const MEPROFILE = 'MeProfile';
import MeProfile from './mySet';
import JMessage from 'jmessage-react-plugin';
import Loadding from './../Common/Loadding.js';
import Chat from './../chat/chat2.js';

const CATEGORY_NORMAL = require('./../image/index/index3.png');
const CATEGORY_NORMALED = require('./../image/index/indexed3.png');
const CATEGORY_NORMAL2 = require('./../image/index/sitemap3.png');
const CATEGORY_NORMALED2 = require('./../image/index/sitemaped3.png');
const CATEGORY_NORMAL3 = require('./../image/index/side3.png');
const CATEGORY_NORMALED3 = require('./../image/index/sideed3.png');
const CATEGORY_NORMAL4 = require('./../image/index/my3.png');
const CATEGORY_NORMALED4 = require('./../image/index/myed3.png');
import { cal } from './../Common/Cal.js';
const { PublicColor } = require("./../Common/Color.js")
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: INDEX,
            user_sex: "",
            show: false,
            Loadding: true,
            a: false,
            appKey: "d97d63f088fb5f3bafd670f5",
        }
        this.lock = false;
        let that = this;
        this.listener = (message) => {
            if (!that.lock) {
                that.setState({
                    show: true
                })
            }
        }
        JMessage.addReceiveMessageListener(this.listener) // 添加监听   消息监听
    }
    componentDidMount() {
        let that = this;
        this.listenerlixian = (result) => {
            if (!that.lock) {
                that.setState({
                    show: true,
                    Loadding: false,
                    a: true
                })
                return false
            }
        }
        JMessage.addSyncOfflineMessageListener(this.listenerlixian) // 添
        JMessage.getConversations((conArr) => { // conArr: 会话数组。\
            if (conArr.length > 0) {
                conArr.map((item, key) => {
                    if (item.latestMessage != undefined && item.latestMessage.extras.sysMsgType != "link") {
                        JMessage.getUserInfo({ username: item.target.username, appKey: that.state.appKey },
                            (userInfo) => {
                                conArr[key].latestMessage.target = userInfo;
                            }, (error) => {
                                var code = error.code
                                var desc = error.description
                            })

                    }
                })
            }
        }, (error) => {
            var code = error.code
            var desc = error.description
        })

    }
    componentWillMount() {
        let that = this;
        this.listenersss = (message) => {
            that.props.navigator.push({
                component: Chat,
                params: {
                    navigator: that.props.navigator,
                    mobileNr: message.message.from.username,
                    username: message.message.from.nickname,
                    appKey: message.message.from.appKey,
                    chong: this.chongxin.bind(that),
                    guanliyuan: false,
                    otherId: message.message.extras.otherId,
                    // myId: message.message.extras.myId
                }
            })
        }
        JMessage.addClickMessageNotificationListener(this.listenersss) // 添加监听

        JMessage.getConversations((conArr) => { // conArr: 会话数组。
            let arr = [];
            if (conArr.length > 0) {
                conArr.map((item, key) => {
                    if (item.unreadCount != 0) {
                        arr.push(item)
                    } else if (item.unreadCount == 0) {
                    }
                })
                if (arr.length > 0) {
                    that.setState({
                        show: true,
                        Loadding: false
                    })
                } else {
                    if (!that.state.a) {
                        that.setState({
                            show: false,
                            Loadding: false
                        })
                        return false
                    }
                }
                return false
            } else {
                if (!that.state.a) {
                    that.setState({
                        show: false,
                        Loadding: false
                    })
                }
            }
        }, (error) => {
            var code = error.code
            var desc = error.description
        })


    }
    chongxin() { }
    componentWillUnmount() {
        this.lock = true
        JMessage.removeReceiveMessageListener(this.listener)
        JMessage.removeSyncOfflineMessageListener(this.listenerlixian) // 移除监听(一般在 componentWillUnmount 中调用)
        JMessage.removeClickMessageNotificationListener(this.listenersss) // 移除监听(一般在 componentWillUnmount 中调用)
    }
    _renderTabItem(img, selectedImg, tag, name, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img} />}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg} />}
                title={name}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                onPress={() => { this.setState({ selectedTab: tag }) }}
            >
                <View>
                    {childView}
                </View>
            </TabNavigator.Item>
        );
    }
    _createChildView(tag) {
        let renderView;
        switch (tag) {
            case INDEX:
                // renderView = <SiteMap {...this.props} />;   
                renderView = <Index {...this.props} />;
                break;
            case SITEMAP:
                // renderView = <SiteMap sides={this.sides.bind(this)} {...this.props} />;
                renderView = <SiteMap {...this.props} />;
                break;
            case SIDE:
                renderView = <Side {...this.props} show={this.show.bind(this)} />;
                break;
            case MEPROFILE:
                renderView = <MeProfile {...this.props} />;
                break;

            default: break;
        }
        return (<View>{renderView}</View>)
    }
    show(a) {
        let arr = [];
        a.map((item, key) => {
            if (item.unreadCount != 0) {
                arr.push(item)
            } else if (item.unreadCount == 0) {

            }
        })
        if (arr.length > 0) {
            if (!this.lock) {
                this.setState({
                    show: true
                })
            }
        } else {
            if (!this.lock) {
                this.setState({
                    show: false
                })
            }
        }
        return false;
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                {/* <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}> */}
                <TabNavigator hidesTabTouch={true} tabBarStyle={[styles.tab]} show={this.state.show}>
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_NORMALED, INDEX, '推荐', this._createChildView(INDEX))}
                    {this._renderTabItem(CATEGORY_NORMAL2, CATEGORY_NORMALED2, SITEMAP, '喜欢', this._createChildView(SITEMAP))}
                    {this._renderTabItem(CATEGORY_NORMAL3, CATEGORY_NORMALED3, SIDE, '消息', this._createChildView(SIDE))}
                    {this._renderTabItem(CATEGORY_NORMAL4, CATEGORY_NORMALED4, MEPROFILE, '我的', this._createChildView(MEPROFILE))}
                </TabNavigator>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fcfcfc'
    },
    tab: {
        height: cal(50),
        backgroundColor: "#fcfcfc",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: cal(3)
    },
    tabIcon: {
        width: cal(16),
        height: cal(16),
        // resizeMode: 'stretch',
    },
    tabText: {
        fontSize: cal(11),
        color: PublicColor.Public_Text1,
        marginTop: cal(4)
    },
    selectedTabText: {
        fontSize: cal(11),
        color: PublicColor.Public_ClickBackground,
    }
});