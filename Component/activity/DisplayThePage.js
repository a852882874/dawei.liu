/**
 * Created by Zyf on 2017/8/2.
 * 基于webview的Canvas画布
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  TouchableOpacity,Dimensions
} from 'react-native';
const { width, height } = Dimensions.get("window");
var html = 
`<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="x5-orientation" content="portrait">
    <title></title>
    <script type="text/javascript" src="http://www.aityuan.com/html2canvas.js"></script>
    <script type="text/javascript" src="http://libs.baidu.com/jquery/2.0.0/jquery.js"></script>
    <style>
        html,
        body,
        span,
        object,
        li,
        ul,
        img iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        pre,
        a,
        em,
        img,
        strong,
        sub,
        sup,
        b,
        i,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            outline: none;
            color: #000000;
            font-weight: normal;
            -webkit-box-sizing: border-box;
            font-family: "Microsoft Yahei", 'HelveticaNeueLt';
            text-decoration: none;
        }

        html {
            font-size: 13.333vw;
            height: 100%;
        }
        body {
            font-size: 0.24rem;
            width: 100%;
        }
    </style>
</head>
<script type="text/javascript">
    window.document.addEventListener('message', function (e) {
        var obj = JSON.parse(e.data);
        document.getElementById("canvasLogo").src = obj.dataSub.a;
        document.getElementById("four").src = obj.dataSub.b;
        document.getElementById("one").src = obj.dataSub.d;
        document.getElementById("two").src = obj.dataSub.e;
        document.getElementById("three").src = obj.dataSub.f;
        document.getElementById("content").innerHTML = obj.dataSub.c;
        if (obj.action == 1) {
            takeScreenshot()
        }
    });
    function takeScreenshot() {
        html2canvas(document.getElementById('view'), {
            onrendered: function (canvas) {
                var url = canvas.toDataURL();
                document.body.appendChild(canvas);
                window.postMessage(JSON.stringify({ action: 0, url: url }));
            }
        });
    }
</script>
<body>
    <div id="view" style="width:100%;height:14.03rem;">
        <img id="one" src="http://www.aityuan.com/backgroundSub.jpg" style="width:100%;height:14.03rem;position:absolute;top:0;left:0;z-index:-2" >
        <div style="width:100%;height:100%;overflow:hidden">
            <div style="display:flex;width:5.79rem;height:5.73rem;margin:0 auto;position:relative;margin-top:1.2rem;margin-bottom:0.24rem;align-items:center;justify-content:center;">
                <img id="two" src="http://www.aityuan.com/canvasBackground.png"  style="position:absolute;width:4.5.79rem;height:4.73rem;z-index:-1"/>
                <img id="canvasLogo" src=""  style="width:4.5rem;height:4.5rem;margin-top:0.1rem;padding-bottom:0.5rem"/>
            </div>
            <div style="height:1.18rem;margin-bottom:0.46rem;display:flex;justify-content:center">
                <img id="three" src="http://www.aityuan.com/growth.png" style="height:1.18rem" />
            </div>
            <div style="padding-left:1rem;padding-right:1rem;">
                <p id="content" style="margin:0 auto;text-align:center;font-size:0.28rem;color:#af8661">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>
            </div>
            <div style="display:flex;justify-content:center;position:absolute;bottom:1.30rem;padding-left:0.86rem;padding-right:0.86rem">
                <div>
                    <img id="four" src="http://www.aityuan.com/dl.png" style="width:1.54rem;height:1.54rem;" />
                </div>
                <div style="height:1.34rem;margin-left:0.15rem">
                    <p style="font-size:0.2rem;color:#d19054;margin-top:0.2rem">扫描左侧二维码下载 “爱特缘” APP(暂时只支持安卓用户)</p>
                    <p style="font-size:0.2rem;color:#d19054;margin-top:0.5rem">注：下载有机会参与抽奖赢得好礼哦</p>
                </div>
            </div>
        </div>

    </div>
</body>
</html>
</body>
</html>
`;

export default class WebCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:height,
      width: width
    }
  }
  // 铅笔
  _pen(a,b,c,d,e,f){
    this.post({action: 1,dataSub:{a:a,b:b,c:c,d:d,e:e,f:f}});
  }

  post(obj){
    this.webview.postMessage(JSON.stringify(obj));
  }

  webviewload(){
    // alert('加载成功！')
    this.webview.injectJavaScript('init_canvas('+this.props.width+', '+this.props.height+');');
    if (this.props.onLoad){
      this.props.onLoad();
    }
  }

  messageHandler(e){
    var obj = JSON.parse(e.nativeEvent.data);
    if (obj.action == 0){
      this.props.handleBase64(obj.url);
    }
  } 

  render() {
    return (
      <View style={[styles.container, {width:this.state.width, height:this.state.height}]}>  
        <WebView 
          style={{width:this.state.width, height:this.state.height,backgroundColor:"rgba(0,0,0,0)"}}
          ref = {(w) => {this.webview = w}}
          onLoad={this.webviewload.bind(this)}
          source={{html: html}}
          onMessage={this.messageHandler.bind(this)}
          javaScriptEnabled={true}
          domStorageEnabled={false}
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={false}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
    container: {  
        backgroundColor: 'rgba(0,0,0,0)',
    }
});  
