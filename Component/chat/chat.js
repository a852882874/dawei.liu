import React, { Component } from 'react';
import {
    findNodeHandle,
    UIManager,
    View,
    NativeModules,
    Text,
    StyleSheet, Navigator, Keyboard, TouchableOpacity, ScrollView
    , RefreshControl, ListView, Image, Dimensions, Platform, AsyncStorage,
    Modal, PermissionsAndroid,
    TextInput,
    ActivityIndicator,
    LayoutAnimation,
    TouchableWithoutFeedback,
    Animated,
    TouchableHighlight
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Time from './../Common/Time';
import Header from './../Common/Header';
import { cal } from './../Common/Cal';
const { PublicColor } = require("./../Common/Color.js")
const MAN = require('./../image/quize/man.png')
const MOMVN = require('./../image/quize/mom.png')
import { ChatStyle } from './chatStyle.js';
const BACK = require('./../image/me/back.png');
const BACKBLOCK = require('./../image/me/back_block.png');
const CHATX = require('./../image/chat/chatx.jpg');
import LinearGradient from 'react-native-linear-gradient';
import PicMore from './../page/subFile/picMore.js';
var ImagePicker = require('react-native-image-picker');
const dismissKeyboard = require('dismissKeyboard');
import IMUI from 'aurora-imui-react-native';
const AuroraIMUIController = IMUI.AuroraIMUIController;
const IMUIMessageListDidLoad = "IMUIMessageListDidLoad";
import Gallery from 'react-native-image-gallery';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import JMessage from 'jmessage-react-plugin';
import Sound from 'react-native-sound';
const _this = {};
let options = {
    title: '请选择', cancelButtonTitle: '取消', takePhotoButtonTitle: '拍照', chooseFromLibraryButtonTitle: '选择相册', storageOptions: { skipBackup: true, path: 'images' }
};
import { Icon } from 'native-base';
import Emoji from 'react-native-emoji'
import Swiper from 'react-native-swiper'
import { Images, Colors, Metrics } from './Themes'
import Styles from './Styles/MessageScreenStyle'
// var spliddit = require('spliddit');
var emoji = require("./emoji");
const MODE_TEXT = "mode_text";
const MODE_RECORD = "mode_record";
//输入框初始高度
const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 34,
    android: 41,
});
const MAX_COMPOSER_HEIGHT = 100;
export const MIN_INPUT_TOOLBAR_HEIGHT = Platform.select({
    ios: 44,
    android: 54,
});
const ACTION_BUTTON_HEIGHT = 220;
const EMOJI_HEIGHT = 190;
export default class chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otherUsername: this.props.username,//他人的username
            appKey: this.props.appKey,
            dataSource: [],
            dataSourceListView: [{}],
            avatarSource: "",
            showModal: false,
            modalImg: '',
            show: true,
            keyboardSpace: 0,
            page: 1,
            content: "",// 输入消息
            addShow: 0,//发送的增加功能
            yuying: "语音",//语音

            pageAudio: 1,
            currentTime: 0.0,
            recording: false,
            stoppedRecording: false,
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath,
            hasPermission: undefined,


            mode: MODE_TEXT,
            opacity: "#fff",
            focused: false,
            isEmoji: false,
            value: '',
            actionVisible: false,
            actionAnim: new Animated.Value(0)

        }

        _this = this;
        listener = (message) => {
            console.log(message)
            this.setState({
                // dataSource: msgArr.reverse(),
                dataSource: this.state.dataSource.concat(message),
            })
        }
        JMessage.addReceiveMessageListener(listener) // 添加监听

        this.composerHeight = MIN_COMPOSER_HEIGHT;
        this.actionBarHeight = 0;
    }



    componentWillUnmount() {
        if (listener) {
            JMessage.removeReceiveMessageListener(listener) // 移除监听(一般在 componentWillUnmount 中调用)
        }
    }
    //键盘抬起 高度（获取键盘高度）
    _keyboardDidShow(frames) {
        const keyboardSpace = frames.endCoordinates.height//获取键盘高度
    }
    componentWillMount() {
        _this = this
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        let that = this;
        AsyncStorage.getItem('user_token', (err, result) => {
            JMessage.getHistoryMessages({
                type: 'single', username: that.state.otherUsername,
                appKey: that.state.appKey, from: 0, limit: that.state.page * 4
            },
                (msgArr) => { // 以参数形式返回消息对象数组
                    console.log(msgArr)
                    that.setState({
                        // dataSource: msgArr.reverse(),
                        dataSource: msgArr.reverse(),
                        page: ++that.state.page,
                        show: false
                    })

                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })

        })
    }
    //render  渲染

    render() {
        if (this.state.show) {
            return (
                <View>
                    <Text>67890</Text>
                </View>
            )
        } else {
            let dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }).cloneWithRows(this.state.dataSource);
            return (
                <View style={ChatStyle.wrap}>
                    <Header title={this.props.username} type={"setting"} navigator={this.props.navigator} />
                    {/* <ScrollView ref={(node) => this.scrollTabs = node}> */}
                    <View>
                        <Image source={ require('./image/shiming.png') } style={{width:cal(20),height:cal(20)}}/>
                    </View>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.onPullRelease.bind(this)}
                            />}
                        //topIndicatorRender={this.topIndicatorRender.bind(this)}
                        //topIndicatorHeight={cal(110)}
                        contentContainerStyle={{}}
                        onPullRelease={this.onPullRelease.bind(this)}
                        onEndReached={this._endReached.bind(this)}
                        enableEmptySections={true}
                        dataSource={dataSource}
                        renderRow={this._content_detail.bind(this)}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={{ height: this.state.addShow ? cal(270) : cal(65) }}></View>
                    {/* </ScrollView> */}
                    <View style={ChatStyle.sentMess}>
                        <View style={[ChatStyle.sentMess_One, { borderBottomColor: "#eee", borderBottomWidth: cal(1) }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    dismissKeyboard();
                                    console.log(this.state.addShow )
                                    if (this.state.addShow == 0 || this.state.addShow == 2) {
                                        this.setState({
                                            addShow: 1,
                                            emoji:false
                                        })
                                    } else {
                                        this.setState({
                                            addShow: 0,
                                            emoji:false
                                        })
                                    }
                                }}
                            >
                                <View style={ChatStyle.sentMess_one_add}>
                                    <Text style={{ fontSize: cal(30) }}>+</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={ChatStyle.sentMess_two}>
                                <TextInput
                                    style={ChatStyle.sentMess_two_textInput}
                                    clearButtonMode='always'
                                    multiline={true}
                                    value={this.state.content}
                                    placeholder="说点什么吧..."
                                    placeholderTextColor={PublicColor.Public_NoClockBackground}
                                    onChangeText={this.handleChangeText.bind(this)}
                                    // onChangeText={(content) => this.setState({ content })}
                                    ref={(search) => { this.search = search }}
                                    editable={true}
                                    returnKeyType='send'
                                    onChange={this.onChange.bind(this)}
                                    onFocus={this.handleFocusSearch.bind(this)}
                                    onBlur={this.handleBlurSearch.bind(this)}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            {this._renderEmojiButton()}
                            <TouchableOpacity
                                disabled={this.state.content != "" ? false : true}
                                onPress={() => this.onSendText()}
                            >
                                <View style={{ width: cal(60), height: cal(40), backgroundColor: "red", }}>
                                    <Text>发送</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this._addGongNeng()}
                    </View>
                    {/*这里是一个图片查看器*/}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.showModal}
                        onRequestClose={() => this.setState({ showModal: false })}
                    >
                        <Gallery
                            style={{ flex: 1, backgroundColor: 'black' }}
                            images={[
                                { source: { uri: this.state.modalImg } }

                            ]}
                            onSingleTapConfirmed={() => this.setState({ showModal: false })}
                        />
                    </Modal>
                </View>
            )
        }
    }
    //选择 相册后点击确定 回调数据
    picmores(imageInfo) {
        _this.onSendImage(imageInfo)
    }
    //点击加号出现的消息框
    _addGongNeng() {
        if (this.state.addShow == 1) {
            return (
                <View style={{ height: cal(300), flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingLeft: cal(20), paddingRight: cal(20) }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigator.push({
                                component: PicMore,
                                type: "image",//注意这个赋值，
                                params: {
                                    navigator: this.props.navigator,
                                    type: "chat",
                                    picmore: this.picmores.bind(this)
                                }
                            })
                        }}

                    >
                        <View style={{ width: cal(60), marginTop: cal(20), backgroundColor: "#eee", height: cal(60), justifyContent: "center", alignItems: "center" }}>
                            <Text>相册</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.paizhao()}
                    >
                        <View style={{ width: cal(60), marginTop: cal(20), backgroundColor: "#eee", height: cal(60), justifyContent: "center", alignItems: "center" }}>
                            <Text>拍照</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => {
                            this.onStartRecordVoice(1)
                        }}
                        onPressOut={() => {
                            this.onStartRecordVoice(2)
                        }}
                    >
                        <View style={{ width: cal(60), marginTop: cal(20), backgroundColor: "#eee", height: cal(60), justifyContent: "center", alignItems: "center" }}>
                            <Text>{this.state.yuying}</Text>
                        </View>
                    </TouchableOpacity>
                </View >
            )
        } else if (this.state.addShow == 2) {
            return (
                <View>
                    {this.state.isEmoji ? this._renderEmoji() : this._aa()}
                </View>
            )
        }
    }
    //  列表渲染的 数据
    _content_detail(item) {
        if (item.from.username == this.state.otherUsername) {
            //对方 图片消息
            if (item.type == "image") {
                return (
                    <View style={{}}>
                        <View style={[{ paddingLeft: cal(10) }]}>
                            <Text>{Time.time(item.createTime)}</Text>
                        </View>
                        <View style={ChatStyle.otherWrapImage}>
                            <Image source={MOMVN} style={{ width: cal(46), height: cal(46) }} />
                            <View style={ChatStyle.otherWrapImage_two}>
                                <Image source={CHATX} style={{ width: cal(5.5), height: cal(6) }} />
                                <View style={ChatStyle.otherWrapImage_two_sub}>
                                    {this._ifImage_Text(item)}
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
            // 对方消息
            return (
                <View style={{}}>
                    <View style={[{ paddingLeft: cal(10) }]}>
                        <Text>{Time.time(item.createTime)}</Text>
                    </View>
                    <View style={ChatStyle.otherWrap}>
                        <Image source={MOMVN} style={{ width: cal(46), height: cal(46) }} />
                        <View style={ChatStyle.otherWrap_two}>
                            <Image source={CHATX} style={{ width: cal(5.5), height: cal(6) }} />
                            <View style={ChatStyle.otherWrap_two_sub}>
                                {this._ifImage_Text(item)}
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            //我方消息
            if (item.type == "image") {
                return (
                    <View style={{ alignItems: "flex-end", }}>
                        <View style={[{ paddingRight: cal(10) }]}>
                            <Text>{Time.time(item.createTime)}</Text>
                        </View>
                        <View style={[ChatStyle.otherWrapImage, { justifyContent: "flex-end" }]}>
                            <View style={ChatStyle.otherWrapImage_two}>
                                <Image source={CHATX} style={{ width: cal(5.5), height: cal(6) }} />
                                <View style={[ChatStyle.otherWrapImage_two_sub, { backgroundColor: "#bbb" }]}>
                                    {this._ifImage_Text(item, 1)}
                                </View>
                            </View>
                            <Image source={MOMVN} style={{ width: cal(46), height: cal(46) }} />
                        </View>
                    </View>
                )
            }
            return (
                <View style={{ alignItems: "flex-end", }}>
                    <View style={[{ paddingRight: cal(10) }]}>
                        <Text>{Time.time(item.createTime)}</Text>
                    </View>
                    <View style={[ChatStyle.otherWrap, { justifyContent: "flex-end" }]}>
                        <View style={[ChatStyle.otherWrap_two,]}>
                            <Image source={CHATX} style={{ width: cal(5.5), height: cal(6) }} />
                            <View style={[ChatStyle.otherWrap_two_sub, { backgroundColor: "#bbb" }]}>
                                {this._ifImage_Text(item, 2)}
                            </View>
                        </View>
                        <Image source={MAN} style={{ width: cal(46), height: cal(46) }} />
                    </View>
                </View>
            )
        }
    }
    //判断是文字还是图片
    _ifImage_Text(item, id) {
        if (item.type == "text") {
            return (
                <Text style={id == 2 ? { color: "#fff" } : ""}>{item.text}</Text>
            )
        } else if (item.type == "image") {

            return (
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            showModal: true,
                            modalImg: "file:///" + item.thumbPath
                        })
                    }}
                >
                    <View>
                        <Image source={{ uri: "file:///" + item.thumbPath }} style={{ width: cal(50), height: cal(200) }} />
                    </View>
                </TouchableOpacity>
            )
        } else if (item.type == "voice") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this._play(item.path)
                    }}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", width: cal(200) }}>
                        <Text style={{ color: "red" }}>{item.extras.key1}s语音</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }






    //下拉刷新
    onPullRelease(resolve) {
        let that = this;
        JMessage.getHistoryMessages({
            type: 'single', username: that.state.otherUsername,
            appKey: that.state.appKey, from: 0, limit: that.state.page * 3
        },

            (msgArr) => { // 以参数形式返回消息对象数组
                if (msgArr.length != that.state.dataSource.length) {
                    that.setState({
                        // dataSource: msgArr.reverse(),
                        dataSource: msgArr.reverse(),
                        page: ++that.state.page,
                        show: false
                    })
                } else {
                    return false;
                }
                // that.scrollTabs.scrollTo({ x: 0, y: cal(150000000000000000000000000000000000000000000000000000000000000000) })
            }, (error) => {

                var code = error.code
                var desc = error.description
            })

        if (resolve) resolve();
    }
    //上啦加载
    _endReached() {

    }


    //发送文本消息
    onSendText() {
        let that = this;
        // that._scrollView.scrollTo({ x: 0, y: 1000000 });
        JMessage.sendTextMessage({
            type: 'single', username: that.props.username, appKey: that.props.appKey,
            text: that.state.content, extras: { key1: that.props.username }, messageSendingOptions: JMessage.messageSendingOptions
        },
            (msg) => {
                dismissKeyboard();
                that.setState({
                    // dataSource: msgArr.reverse(),
                    dataSource: that.state.dataSource.concat(msg),
                    content: ""
                })
                // that.scrollTabs.scrollTo({ x: 0, y: 9999999999999999333333333333333339999999999999999999999999999999999999999999999999999999999999999999999960 })
            }, (error) => {
                console.log(error)
                var code = error.code
                var desc = error.description
            })

    }

    //发送照片
    onSendImage(image) {
        for (let i = 0; i < image.length; i++) {
            var mediaFile = image[i];
            console.log(mediaFile)
            JMessage.sendImageMessage({
                type: 'single', username: this.state.otherUsername, appKey: this.state.appKey,
                path: mediaFile.uri, extras: { key1: this.state.otherUsername }, messageSendingOptions: JMessage.messageSendingOptions
            },
                (msg) => {
                    console.log(msg);
                    that.setState({
                        // dataSource: msgArr.reverse(),
                        dataSource: that.state.dataSource.concat(msg),
                        addShow: 0
                    })
                    // that.scrollTabs.scrollTo({ x: 0, y: 10099999999999999999999999999999900 + 60 })
                }, (error) => {
                    var code = error.code
                    var desc = error.description
                })
        }
    }



    //拍照
    paizhao() {
        let that = this;
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.path };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                JMessage.sendImageMessage({
                    type: 'single', username: this.state.otherUsername, appKey: this.state.appKey,
                    path: source.uri, extras: { key1: this.state.otherUsername }, messageSendingOptions: JMessage.messageSendingOptions
                },
                    (msg) => {
                        console.log(msg)
                        that.setState({
                            // dataSource: msgArr.reverse(),
                            dataSource: that.state.dataSource.concat(msg),
                            addShow: 0
                        })
                        // that.scrollTabs.scrollTo({ x: 0, y: 9099999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 })
                    }, (error) => {
                        var code = error.code
                        var desc = error.description
                    })

            }
        });
    }



    //语音
    onStartRecordVoice(id) {
        if (id == 1) {
            this.setState({
                yuying: "开始录音"
            })
            this._record()
        } else {
            this.setState({
                yuying: "语音"
            })
            this._stop();
        }
    }










    //  录音功能

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    componentDidMount() {
        this._checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            if (!hasPermission) return;

            this.prepareRecordingPath(this.state.audioPath + '/' + Date.parse(new Date()) + '.aac');

            AudioRecorder.onProgress = (data) => {
                this.setState({ currentTime: Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }


    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }
        console.log(new Date())
        if (this.state.stoppedRecording) {
            this.setState({
                pageAudio: ++this.state.pageAudio
            })
            this.prepareRecordingPath(this.state.audioPath + '/' + Date.parse(new Date()) + '.aac');
        }

        this.setState({ recording: true });

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }
    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }
        this.setState({ stoppedRecording: true, recording: false });

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }
    //播放语音
    async _play(audioPath) {
        // if (this.state.recording) {
        //     await this._stop();
        // }
        console.log(audioPath);
        setTimeout(() => {
            var sound = new Sound(audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });
            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }
    _finishRecording(didSucceed, filePath) {
        let that = this;
        this.setState({ finished: didSucceed });
        console.log("file://" + filePath)
        JMessage.sendVoiceMessage({
            type: 'single', username: that.state.otherUsername, appKey: that.state.appKey,
            path: filePath, extras: { key1: JSON.stringify(this.state.currentTime) }, messageSendingOptions: JMessage.messageSendingOptions
        },
            (msg) => {
                console.log(msg)
                that.setState({
                    dataSource: that.state.dataSource.concat(msg),
                })
                // that.scrollTabs.scrollTo({ x: 0, y: 100000000000000000000000000000000000000000000 })

            }, (error) => {
                var code = error.code
                var desc = error.description
            })
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }


    //表情
    _renderEmojiButton() {
        return (
            <TouchableOpacity style={{
                paddingLeft: 5,
                paddingRight: 5,
                alignSelf: "stretch",
                justifyContent: "center"
            }}
                onPress={()=>{this.handleEmojiOpen()}}>
                {
                    this.state.isEmoji ? 
                    // <Icon name="ios-happy-outline" /> */}
                    <Image source={require('./Images/chatBar_keyboard.png')} />
                        :  <Image source={require('./Images/chatBar_keyboard.png')} />
                }
            </TouchableOpacity>
        )
    }

    handleSend() {
        alert("发送")
    }
    handleEmojiOpen() {
        dismissKeyboard();
        var isEmoji = this.state.isEmoji;
        isEmoji = !isEmoji;
        // if (this.search) {
        //     this.search.blur();
        // }
        setTimeout(() => {
            if (isEmoji) {
                this.setState({
                    addShow:2,
                })
                this.actionBarHeight = EMOJI_HEIGHT;
                // this.onHeightChange();
            } else {
                this.actionBarHeight = 0;
                if (this.search) {
                    // this.search.focus();
                }
            }
            this.setState({
                isEmoji: isEmoji,
                actionVisible: false,
                mode: MODE_TEXT
            });
            Animated.timing(          // Uses easing functions
                this.state.actionAnim,    // The value to drive
                { toValue: 1 }           // Configuration
            ).start();
        }, 100);
    }

    handleEmojiClick(v) {
        console.log(v)
        var newValue = (this.state.content || '') + v;
        this.setState({
            content: newValue
        });
    }

    handleEmojiCancel() {
        if (!this.state.content) return;
        // const arr = spliddit(this.state.value);
        let newValue = '';
        arr.pop();
        newValue = arr.join('');
        this.setState({
            content: newValue
        });
        this.content = newValue;
    }

    handleFocusSearch() {
        this.setState({
            isEmoji: false,
            actionVisible: false,
            focused: true,
            addShow:0
        });
        Animated.timing(
            this.state.actionAnim,
            { toValue: 1 }
        ).start();
    }

    handleBlurSearch() {
        this.setState({ focused: false ,addShow:0});
    }

    handleChangeText(v) {
        console.log(v)
        if (v.length > 0 && v[v.length - 1] == '\n') {
            if (this.composerHeight != MIN_COMPOSER_HEIGHT) {
                this.composerHeight = MIN_COMPOSER_HEIGHT;
                this.onHeightChange();
            }
            this.setState({ content: '' });
        } else {
            this.setState({
                content: v,
            });
        }
    }

    _renderEmoji() {
        const { isEmoji, focused } = this.state;
        const emojiStyle = [];
        const rowIconNum = 7;
        console.log(emoji.map)
        const emojis = Object.keys(emoji.map).map((v, k) => {
            const name = emoji.map[v]
            return (
                <TouchableOpacity key={v + k} onPress={() => {
                    this.handleEmojiClick(v)
                }}>
                    <Text style={[Styles.emoji, emojiStyle]}><Emoji name={name} /></Text>
                </TouchableOpacity>
            )
        });
        return <Animated.View style={[Styles.emojiRow, {
            opacity: this.state.actionAnim, height: cal(200), transform: [{
                translateY: this.state.actionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                })
            }]
        }]}>
            <Swiper style={Styles.wrapper} loop={false}
                height={EMOJI_HEIGHT - 35}
                dotStyle={{ bottom: -25 }}
                activeDotStyle={{ bottom: -25 }}
            >
                <View style={Styles.slide}>
                    <View style={Styles.slideRow}>
                        {emojis.slice(0, rowIconNum)}
                    </View>
                    <View style={Styles.slideRow}>
                        {emojis.slice(1 * rowIconNum, rowIconNum * 2)}
                    </View>
                    <View style={Styles.slideRow}>
                        {emojis.slice(2 * rowIconNum, rowIconNum * 3 - 1)}
                        <TouchableOpacity onPress={this.handleEmojiCancel.bind(this)}>
                            <Icon name="ios-backspace-outline" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.slide}>
                    <View style={Styles.slideRow}>
                        {emojis.slice(3 * rowIconNum - 1, rowIconNum * 4 - 1)}
                    </View>
                    <View style={Styles.slideRow}>
                        {emojis.slice(4 * rowIconNum - 1, rowIconNum * 5 - 1)}
                    </View>
                    <View style={Styles.slideRow}>
                        {emojis.slice(5 * rowIconNum - 1, rowIconNum * 6 - 1)}
                        <TouchableOpacity onPress={this.handleEmojiCancel.bind(this)}>
                            <Icon name="ios-backspace-outline" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.slide}>
                    <View style={Styles.slideRow}>
                        {emojis.slice(6 * rowIconNum - 1, rowIconNum * 7 - 1)}
                    </View>
                    <View style={Styles.slideRow}>
                        {emojis.slice(7 * rowIconNum - 1, rowIconNum * 8 - 1)}
                    </View>
                    <View style={Styles.slideRow}>
                        {emojis.slice(8 * rowIconNum - 1, rowIconNum * 9- 1)}
                        <TouchableOpacity onPress={this.handleEmojiCancel.bind(this)}>
                            <Icon name="ios-backspace-outline" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
            <View style={{ height: 35, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity onPress={() => this.handleSend()}
                    style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: 55 }}>
                    <Text style={{ color: '#fff' }}>发送2</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }


    onHeightChange() {
        var h = this.composerHeight + (MIN_INPUT_TOOLBAR_HEIGHT - MIN_COMPOSER_HEIGHT) + this.actionBarHeight;
        console.info('inptu height', h)
        // this.props.onHeightChange(h);
    }

    onChange(e) {
        let newComposerHeight = null;
        if (e.nativeEvent && e.nativeEvent.contentSize) {
            newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, e.nativeEvent.contentSize.height));
        } else {
            newComposerHeight = MIN_COMPOSER_HEIGHT;
        }
        if (this.composerHeight != newComposerHeight) {
            this.composerHeight = newComposerHeight;
            // this.onHeightChange();
        }
    }


    handleLayout(e) {

        this.refs.record.measure((x, y, w, h, px, py) => {
            console.log("record measure:", x, y, w, h, px, py);
            this.recordPageX = px;
            this.recordPageY = py;
        });
    }


    _aa() {
        return (
            <View></View>
        )
    }


}
let Chat = StyleSheet.create({

})
