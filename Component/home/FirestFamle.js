//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View, StyleSheet, Text, Platform, Navigator, InteractionManager,
    ToastAndroid, Image, BackAndroid, AsyncStorage, Alert
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
const INDEX = 'Index';
import Index from './index';
// import MomIndex from './momIndex';
import MomIndex from './Coverflow';
// import MomIndex from './lianxi';
const SITEMAP = 'SiteMap';
import SiteMap from './momSiteMap';

const SIDE = 'Side';
import Side from './side';
import Chat from './../chat/chat2.js';
const MEPROFILE = 'MeProfile';
import MeProfile from './momMySet';
import JMessage from 'jmessage-react-plugin';
import Loadding from './../Common/Loadding.js'
const CATEGORY_NORMAL = require('./../image/mom/index3.png');
const CATEGORY_NORMALED = require('./../image/mom/indexed3.png');
const CATEGORY_NORMAL2 = require('./../image/mom/sitemap3.png');
const CATEGORY_NORMALED2 = require('./../image/mom/sitemaped3.png');
const CATEGORY_NORMAL3 = require('./../image/mom/side4.png');
const CATEGORY_NORMALED3 = require('./../image/mom/sideed3.png');
const CATEGORY_NORMAL4 = require('./../image/mom/my3.png');
const CATEGORY_NORMALED4 = require('./../image/mom/myed3.png');
import { cal } from './../Common/Cal.js';
const { PublicColor } = require("./../Common/Color.js")
export default class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: INDEX,
            show: false,
            Loadding: true,
            appKey: "d97d63f088fb5f3bafd670f5",
        }
        this.lock = false;
        let that = this;
        this.listenerlixian = (result) => {
            if(result){
                if (!that.lock) {
                    that.setState({
                        show: true
                    })
                }
            }
        }
        JMessage.addSyncOfflineMessageListener(this.listenerlixian) 
        this.listener = (message) => {
            if (!that.lock) {
                that.setState({
                    show: true
                })
            }
        }
        JMessage.addReceiveMessageListener(this.listener) // 添加监听   消息监听
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
                    if (!that.lock) {
                        that.setState({
                            show: true,
                            Loadding: false
                        })
                    }
                } else {
                    if (!that.lock) {
                        that.setState({
                            show: false,
                            Loadding: false
                        })
                    }
                }
                return false
            } else {
                if (!that.lock) {
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
    componentDidUpdate() { }
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
    chongxin() { }
    componentWillUnmount() {
        this.lock = true
        JMessage.removeSyncOfflineMessageListener(this.listenerlixian)
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
                onPress={() => { this.setState({ selectedTab: tag }); }}
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
                renderView = <MomIndex {...this.props} />;
                break;
            case SITEMAP:
                renderView = <SiteMap {...this.props} />;
                break;
            case SIDE:
                renderView = <Side  {...this.props} show={this.show.bind(this)} />;
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
        console.log(arr.length)
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
        return false
    }
    render() {
        // if (this.state.Loadding) return <Loadding from={"transent"} />
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab} show={this.state.show}>
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_NORMALED, INDEX, '寻觅', this._createChildView(INDEX))}
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
    },
    tab: {
        height: cal(50),
        backgroundColor: "#fcfcfc",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: cal(3)
    },
    tabIcon: {
        width: cal(25),
        height: cal(25),
    },
    tabText: {
        fontSize: cal(12),
        color: PublicColor.Public_Text1,
        marginTop: cal(1),
        fontWeight:"400"
    },
    selectedTabText: {
        fontSize: cal(12),
        color: PublicColor.Public_MomClickBackground,
        fontWeight:"400"
    }
});