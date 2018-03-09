import React, { Component } from 'react';
import { AsyncStorage, Navigator } from 'react-native';
export default class timew extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', Taylor: '' };
    }
    // static time(inputTime) {
    //     var  date  =  new  Date(inputTime);
    //     var  y  =  date.getFullYear();
    //     var  m  =  date.getMonth()  +  1;
    //     m  =  m  <  10  ?  ('0'  +  m)  :  m;
    //     var  d  =  date.getDate();
    //     d  =  d  <  10  ?  ('0'  +  d)  :  d;
    //     var  h  =  date.getHours();
    //     h  =  h  <  10  ?  ('0'  +  h)  :  h;
    //     var  minute  =  date.getMinutes();
    //     var  second  =  date.getSeconds();
    //     minute  =  minute  <  10  ?  ('0'  +  minute)  :  minute;
    //     second  =  second  <  10  ?  ('0'  +  second)  :  second;
    //     timew.timestampFormat(parseInt(inputTime/1000))
    //     // return  y  +  '-'  +  m  +  '-'  +  d + ' ' + h + ':' + minute + ':' + second;
    // }
    static time(timestamp) {
        var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
        var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
        var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
        var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象
        var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
        var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

        if (timestampDiff < 60) { // 一分钟以内
            return "刚刚";
        } else if (timestampDiff < 3600) { // 一小时前之内
            return Math.floor(timestampDiff / 60) + "分钟前";
        } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
            return ('今天' + timew.zeroize(H) + ':' + timew.zeroize(i));
        } else {
            var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
            if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
                return '昨天' + timew.zeroize(H) + ':' + timew.zeroize(i);
            } else if (curDate.getFullYear() == Y) {
                return timew.zeroize(m) + '月' + timew.zeroize(d) + '日 ' + timew.zeroize(H) + ':' + timew.zeroize(i);
            } else {
                return Y + '年' + timew.zeroize(m) + '月' + timew.zeroize(d) + '日 ' + timew.zeroize(H) + ':' + timew.zeroize(i);
            }
        }
    }
    static zeroize(num) {
        return (String(num).length == 1 ? '0' : '') + num;
    }
}
