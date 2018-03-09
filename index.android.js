// 商城的入口文件
import React, { Component } from 'react';
import {
    AppRegistry, Alert, View, Text, NativeModules, StatusBar
} from 'react-native';
import Entry from './Component/Entry';
import JMessage from 'jmessage-react-plugin';
import codePush from "react-native-code-push";
import SplashScreen from 'react-native-splash-screen';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
export default class projeact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: true,
            totalBytes: 0,
            receivedBytes: 0
        }
        this.lock = false;
    }
    codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Installing update");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("updateInstalling ");
                break;
        }
    }
    codePushDownloadDidProgress(progress) {
        if (!this.lock) {
            this.setState({
                receivedBytes: progress.receivedBytes,
                totalBytes: progress.totalBytes,
            })
        }
        // Alert.alert("提示", (progress.receivedBytes / progress.totalBytes * 100 + "%"), [{
        //     text: "ok", onPress: () => {
        //         codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE })
        //     }
        // }])
        if (!this.lock) {
            if (parseInt(parseInt(this.state.receivedBytes) / parseInt(this.state.totalBytes) * 100) == 100) {
                NativeModules.MyNativeModule.rnCallNative("正在加载更新内容请稍后~")
                this.times = setTimeout(function () {
                    codePush.restartApp();
                }, 2000)
                // this.setState({
                //     start: true
                // })
            }
        }
        if (!this.lock) {
            console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
        }
    }
    componentDidMount() {
        codePush.allowRestart();//在加载完了可以允许重启
        codePush.checkForUpdate().then((update) => {
            console.log(update)
            if (!update) {
            } else {
                SplashScreen.hide();
                this.setState({
                    start: false
                })
                codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE })
               console.log(1)
            }
        })
    }
    componentWillUnmount() {
        this.times && clearTimeout(this.times)
    }
    componentWillMount() {
        JMessage.init({
            appkey: "d97d63f088fb5f3bafd670f5",
            isOpenMessageRoaming: true,
            isProduction: true,
        })
        codePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
    }
    render() {
        if (this.state.start) {
            return (
                <View style={{ flex: 1 }}>
                    {/* <StatusBar backgroundColor='rgba(255,0,0,0.4)'/> */}
                    <Entry {... this.props} />
                </View>
            )
        } else {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Text>检测到最新版本~正在下载中...</Text>
                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <Text>{this.state.totalBytes == 0 ? 0 : parseInt(parseInt(this.state.receivedBytes) / parseInt(this.state.totalBytes) * 100)}</Text>
                        <Text>%</Text>
                    </View>
                </View>
            )
        }
    }
}
projeact = codePush(codePushOptions)(projeact);
AppRegistry.registerComponent('projeact', () => projeact);