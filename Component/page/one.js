//这里设置路由，包括所有文件的入口
import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableHighlight,
    TextInput,
    NativeModules,
    PermissionsAndroid,
    UIManager,
    StyleSheet, Text, Platform, Navigator, Dimensions, ToastAndroid, BackAndroid, AsyncStorage, Alert
} from 'react-native'
const { width, height } = Dimensions.get("window")
import IMUI from 'aurora-imui-react-native';
import TimerMixin from 'react-timer-mixin';
import Time from './../Common/Time'
var MessageList = IMUI.MessageList;
import Header from "./../Common/Header.js"
var ChatInput = IMUI.ChatInput;
const AuroraIMUIController = IMUI.AuroraIMUIController;
const IMUIMessageListDidLoad = "IMUIMessageListDidLoad";
import JMessage from 'jmessage-react-plugin';
const listener={}
export default class ChatActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messagess: [],
            idName:'',
            page: 1,
            username:this.props.username,
            pageShow: true,
            single: this.props.groupId === "",
            groupNum: '(1)',
            inputContent: '',
            recordText: '按住 说话',
            menuContainerHeight: 1000,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
            isDismissMenuContainer: false,
            ceshi:{},
            sss:1
        };
    }
    componentDidMount(){
        JMessage.enterConversation({ type: 'single', username: this.props.username, appKey: this.props.appKey },
        (conversation) => {
        }, (error) => {
            var code = error.code
            var desc = error.description
        })
        this.props.sides(1)
        listener = (message) => {
            AsyncStorage.getItem('user_token', (err, result) => {
                this.setState({
                    idName : result.username
                })
                console.log(message.thumbPath)
                JMessage.getHistoryMessages({
                    type: 'single', username: this.props.username,
                    appKey: this.props.appKey, from: 0, limit: 100
                },
                    (msgArr) => { // 以参数形式返回消息对象数组
                        if (message.type == "text") {
                            var messages = [{
                                msgId: msgArr[0].target.username,
                                status: "send_succeed",
                                msgType: "text",
                                text: message.text,
                                isOutgoing: message.from.username == JSON.parse(result).username ? true : false,
                                fromUser: {
                                    userId: message.from.username,
                                    displayName: message.from.username,
                                    avatarPath:  message.from.avatarThumbPath
                                },
                                timeString: Time.time(message.createTime),
                            }];
                        }else if(message.type == "image"){
                            var messages = [{
                                msgId: message.target.username,
                                status: "send_succeed",
                                msgType: "image",
                                mediaPath: message.thumbPath,
                                isOutgoing: message.from.username == JSON.parse(result).username ? true : false,
                                fromUser: {
                                    userId: message.from.username,
                                    displayName: message.from.username,
                                    avatarPath: "ironman"
                                },
                                timeString: Time.time(message.createTime),
                            }];
                        }else{
                            return false
                        }
                        AuroraIMUIController.appendMessages(messages);
                    }, (error) => {
                        var code = error.code
                        var desc = error.description
                    })
            })
          }
          
          JMessage.addReceiveMessageListener(listener) // 添加监听
        this.onMsgClick = this.onMsgClick.bind(this);
        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.onMsgLongClick = this.onMsgLongClick.bind(this);
        this.onStatusViewClick = this.onStatusViewClick.bind(this);
        this.onTouchMsgList = this.onTouchMsgList.bind(this);
        this.onSendText = this.onSendText.bind(this);
        this.onSendGalleryFiles = this.onSendGalleryFiles.bind(this);
        this.onStartRecordVideo = this.onStartRecordVideo.bind(this);
        this.onFinishRecordVideo = this.onFinishRecordVideo.bind(this);
        this.onCancelRecordVideo = this.onCancelRecordVideo.bind(this);
        this.onStartRecordVoice = this.onStartRecordVoice.bind(this);
        this.onFinishRecordVoice = this.onFinishRecordVoice.bind(this);
        this.onTakePicture = this.onTakePicture.bind(this);
        this.onCancelRecordVoice = this.onCancelRecordVoice.bind(this);
        this.onSwitchToMicrophoneMode = this.onSwitchToMicrophoneMode.bind(this);
        this.onSwitchToGalleryMode = this.onSwitchToGalleryMode.bind(this);
        this.onSwitchToCameraMode = this.onSwitchToCameraMode.bind(this);
        this.onTouchEditText = this.onTouchEditText.bind(this);
        this.onPullToRefresh = this.onPullToRefresh.bind(this);
        this.onFullScreen = this.onFullScreen.bind(this);
    }
//     componentWillUnmount (){
//         JMessage.resetUnreadMessageCount({ type: 'single', username:trhis.props.username, appKey: this.props.appKey },
//             (conversation) => {
//             console.log(conversation)
//             }, (error) => {
//             var code = error.code
//             var desc = error.description
//             }
//             )
// }
    componentWillMount() { }
    onMsgClick(message) {
        console.log("message click! " + message);
    }
    onMsgLongClick(message) {
        console.log("message long click " + message);
    }

    onAvatarClick(fromUser) {

        console.log("Avatar click! " + fromUser);

    }
    onStatusViewClick(message) {
        console.log("on message resend! " + message);
    }
    onTouchMsgList() {
        console.log("Touch msg list, hidding soft input and dismiss menu");
        this.setState({
            isDismissMenuContainer: true,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
        });
    }
    onPullToRefresh() {
        if (this.state.pageShow) {
            var messages = this.state.messagess.slice(1, 50);
            AuroraIMUIController.insertMessagesToTop(messages);
            this.setState({
                pageShow: false
            })
        }
    }
//发送文本
    onSendText(text) {
        console.log(this.props)
        JMessage.sendTextMessage({
            type: 'single', username: this.props.username, appKey: this.props.appKey,
            text: text, extras: { key1: this.props.username }, messageSendingOptions: {
                // JMessage.messageSendingOptions
                isShowNotification: true,
                isRetainOffline: true,
                isCustomNotificationEnabled: true,
                notificationTitle: this.state.idName,
                notificationText: text
            }
        },
            (msg) => {
                var messages = [{
                    msgId: msg.id,
                    status: "send_succeed",
                    msgType: "text",
                    text: msg.text,
                    isOutgoing: true,
                    fromUser: {
                        userId: msg.from.username,
                        displayName: msg.from.username,
                        avatarPath: "ironman"
                    },
                    timeString: Time.time(msg.createTime),
                }];
                AuroraIMUIController.appendMessages(messages);
            }, (error) => {
                console.log(error)
                var code = error.code
                var desc = error.description
            })
        this.setState({
            menuContainerHeight: this.state.menuContainerHeight == 1000 ? 999 : 1000
        });
    }
    onSendGalleryFiles(mediaFiles) {
        // do something.
        AuroraIMUIController.scrollToBottom(true);
        for (var i = 0; i < mediaFiles.length; i++) {
            var mediaFile = mediaFiles[i];
            console.log(mediaFiles );
            JMessage.sendImageMessage({
                type: 'single', username: this.props.username, appKey: this.props.appKey,
                path: mediaFile.mediaPath, extras: { key1: 'value1' }, messageSendingOptions: JMessage.messageSendingOptions
            },
                (msg) => {
                    console.log(mediaFile);
                    var messages;
                    if (mediaFile.mediaType == "image") {
                        messages = [{
                            msgId: msg.id,
                            status: "send_succeed",
                            msgType: "image",
                            isOutgoing: true,
                            mediaPath: mediaFile.mediaPath,
                            fromUser: {
                                userId: msg.from.username,
                                displayName: msg.from.username,
                                avatarPath: "ironman"
                            },
                            timeString: new Date(parseInt(msg.createTime)).toLocaleString().replace(/:\d{1,2}$/, ' '),
                        }];
                    } else {

                        messages = [{
                            msgId: "1",
                            status: "send_going",
                            msgType: "video",
                            isOutgoing: true,
                            mediaPath: mediaFile.mediaPath,
                            duration: mediaFile.duration,
                            fromUser: {
                                userId: "1",
                                displayName: "ken",
                                avatarPath: "ironman"
                            },
                            timeString: new Date(parseInt(msg.createTime)).toLocaleString().replace(/:\d{1,2}$/, ' '),
                        }];
                    }
                    AuroraIMUIController.appendMessages(messages);
                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })
        }
    }
    onStartRecordVideo() {
        console.log("start record video");
        AuroraIMUIController.scrollToBottom(true);
    }
    onFinishRecordVideo(mediaPath, duration) {
        console.log("finish record video, Path: " + mediaPath + " duration: " + duration);
        var messages = [{
            msgId: "1",
            status: "send_going",
            msgType: "video",
            isOutgoing: true,
            mediaPath: mediaPath,
            duration: duration,
            fromUser: {
                userId: "1",
                displayName: "ken",
                avatarPath: "ironman"
            },
            timeString: "10:00"
        }];
        AuroraIMUIController.appendMessages(messages);
    }
    onCancelRecordVideo() {
        console.log("cancel record video");
    }
    onStartRecordVoice() {
        console.log("start record voice");
    }
    onFinishRecordVoice(mediaPath, duration) {
        console.log("finish record voice, mediaPath: " + mediaPath + " duration: " + duration);
        var messages = [{
            msgId: "1",
            status: "send_going",
            msgType: "voice",
            isOutgoing: true,
            mediaPath: mediaPath,
            duration: duration,
            fromUser: {
                userId: "1",
                displayName: "ken",
                avatarPath: "ironman"
            },
            timeString: "10:00"
        }];
        AuroraIMUIController.appendMessages(messages);
    }
    onCancelRecordVoice() {
        console.log("cancel record voice");
    }
    onTakePicture(mediaPath) {
        JMessage.sendImageMessage({
            type: 'single', username: this.props.username, appKey: this.props.appKey,
            path: mediaPath, extras: { key1: 'value1' }, messageSendingOptions: JMessage.messageSendingOptions
        },
            (msg) => {
                // do something.

            }, (error) => {
                var code = error.code
                var desc = error.description
            })
        var messages = [{
            msgId: msg.id,
            status: "send_going",
            msgType: "image",
            isOutgoing: true,
            mediaPath: mediaPath,
            fromUser: {
                userId: msg.from.username,
                displayName: msg.from.username,
                avatarPath: "ironman"
            },
            timeString: new Date(parseInt(msg.createTime)).toLocaleString().replace(/:\d{1,2}$/, ' '),
        }];
        AuroraIMUIController.appendMessages(messages);
    }
    async onSwitchToMicrophoneMode() {
        console.log("switch to microphone mode, set menuContainerHeight : " + this.state.menuContainerHeight);
        AuroraIMUIController.scrollToBottom(true);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
                    'title': 'IMUI needs Record Audio Permission',
                    'message': 'IMUI needs record audio ' +
                    'so you can send voice message.'
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can record audio");
            } else {
                console.log("Record Audio permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
        this.setState({
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 420
            },
            menuContainerHeight: 1000,
        });
    }
    async onSwitchToGalleryMode() {
        console.log("switch to gallery mode");
        AuroraIMUIController.scrollToBottom(true);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    'title': 'IMUI needs Read External Storage Permission',
                    'message': 'IMUI needs access to your external storage ' +
                    'so you select pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can select pictures");
            } else {
                console.log("Read External Storage permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
        this.setState({
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 420
            },
            menuContainerHeight: 1000,
        });
    }
    async onSwitchToCameraMode() {
        console.log("switch to camera mode");
        AuroraIMUIController.scrollToBottom(true);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                    'title': 'IMUI needs Camera Permission',
                    'message': 'IMUI needs access to your camera ' +
                    'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
        this.setState({
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 420
            },
            menuContainerHeight: 850,
        });
    }
    onTouchEditText() {
        console.log("will scroll to bottom");
        AuroraIMUIController.scrollToBottom(true);
    }
    onFullScreen() {
        this.setState({
            menuContainerHeight: 1920
        });
        console.log("Set screen height to full screen");
    }

    componentWillMount() {
        let that = this;
        AsyncStorage.getItem('user_token', (err, result) => {
            JMessage.getHistoryMessages({
                type: 'single', username: this.props.username,
                appKey: this.props.appKey, from: 0, limit: 100
            },
                (msgArr) => { // 以参数形式返回消息对象数组
                    console.log(msgArr)
                    if (msgArr.length == 0) return false;
                    let push = []
                    let a = {}
                    for (var i = 0; i < msgArr.length; i++) {
                        if (msgArr[i].type == "text") {
                            a = {
                                msgId: msgArr[i].target.username,
                                status: "send_succeed",
                                msgType: "text",
                                text: msgArr[i].text,
                                isOutgoing: msgArr[i].from.username == JSON.parse(result).username ? true : false,
                                fromUser: {
                                    userId: msgArr[i].from.username,
                                    displayName: msgArr[i].from.username,
                                    avatarPath: "ironman"
                                },
                                timeString: Time.time(msgArr[i].createTime),
                            }
                            push.push(a)
                        }
                        else if(msgArr[i].type == "image"){
                            a = {
                                msgId: msgArr[i].target.username,
                                status: "send_succeed",
                                msgType: "image",
                                mediaPath: msgArr[i].thumbPath,
                                isOutgoing: msgArr[i].from.username == JSON.parse(result).username ? true : false,
                                fromUser: {
                                    userId: msgArr[i].from.username,
                                    displayName: msgArr[i].from.username,
                                    avatarPath: "ironman"
                                },
                                timeString: Time.time(msgArr[i].createTime),
                            }
                            push.push(a)
                        }else{
                            return false
                        }
                    }
                    that.setState({
                        messagess: push
                    })
                    if (msgArr[0].type == "text") {
                        var messages = [{
                            msgId: msgArr[0].target.username,
                            status: "send_succeed",
                            msgType: "text",
                            text: msgArr[0].text,
                            isOutgoing: msgArr[0].from.username == JSON.parse(result).username ? true : false,
                            fromUser: {
                                userId: msgArr[0].from.username,
                                displayName: msgArr[0].from.username,
                                avatarPath: "ironman"
                            },
                            timeString: Time.time(msgArr[0].createTime),
                        }];
                    }else if(msgArr[0].type == "image"){
                        var messages = [{
                            msgId: msgArr[0].target.username,
                            status: "send_succeed",
                            msgType: "image",
                            mediaPath: msgArr[0].thumbPath,
                            isOutgoing: msgArr[0].from.username == JSON.parse(result).username ? true : false,
                            fromUser: {
                                userId: msgArr[0].from.username,
                                displayName: msgArr[0].from.username,
                                avatarPath: "ironman"
                            },
                            timeString: Time.time(msgArr[0].createTime),
                        }];
                    }else{
                        return false
                    }


                    AuroraIMUIController.appendMessages(messages);
                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })

        })
    }
    componentWillUnmount() {
        JMessage.removeReceiveMessageListener(listener) // 移除监听(一般在 componentWillUnmount 中调用)
        this.timer && clearTimeout(this.timer);
        AuroraIMUIController.removeMessageListDidLoadListener(IMUIMessageListDidLoad);
        
    }
    render() {
        return (
            <View style={styles.container}>
                <Header title={this.props.username} type={"setting"} navigator={this.props.navigator}/>
                <MessageList
                    style={{ flex: 1 }}
                    {...this.props}
                    ref={(ref) => this.messageList = ref}
                    onMsgClick={this.onMsgClick}
                    onMsgLongClick={this.onMsgLongClick}
                    onAvatarClick={this.onAvatarClick}
                    onStatusViewClick={this.onStatusViewClick}
                    onTouchMsgList={this.onTouchMsgList}
                    onPullToRefresh={this.onPullToRefresh}
                    sendBubble={{ imageName: "send_msg", padding: 10 }}
                    receiveBubbleTextColor={'#ffffff'}
                    sendBubbleTextSize={18}
                    receiveBubbleTextSize={14}
                    sendBubblePressedColor={'#dddddd'}
                    eventMsgTxtColor={'#ffffff'}
                    eventMsgTxtSize={16}
                />
                <ChatInput
                    style={this.state.chatInputStyle}
                    menuContainerHeight={this.state.menuContainerHeight}
                    isDismissMenuContainer={this.state.isDismissMenuContainer}
                    onSendText={this.onSendText.bind(this)}
                    onSendGalleryFiles={this.onSendGalleryFiles}
                    onTakePicture={this.onTakePicture}
                    onStartRecordVideo={this.onStartRecordVideo}
                    onFinishRecordVideo={this.onFinishRecordVideo}
                    onCancelRecordVideo={this.onCancelRecordVideo}
                    onStartRecordVoice={this.onStartRecordVoice}
                    onFinishRecordVoice={this.onFinishRecordVoice}
                    onCancelRecordVoice={this.onCancelRecordVoice}
                    onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
                    onSwitchToGalleryMode={this.onSwitchToGalleryMode}
                    onSwitchToCameraMode={this.onSwitchToCameraMode}
                    onTouchEditText={this.onTouchEditText}
                    onFullScreen={this.onFullScreen}
                />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});