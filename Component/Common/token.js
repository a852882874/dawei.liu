
import React, { Component } from 'react';
import { Dimensions, AsyncStorage } from 'react-native';
import _ajax from './LoginAjax';
const { width, height } = Dimensions.get('window');
export default class tokenImage extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', Taylor: '' };
    }
    static tokenImg(uuid, callback) {
        // callback('http://api.aityuan.com/api/user/image?uuid=' + uuid + '&token=' + JSON.parse(results))
        // AsyncStorage.getItem('image_host', (err, results) => {
        //     if (JSON.parse(results)) {
        //         fetch("http://api.aityuan.com/api/" + "qiniu_file_exists?filename=" + uuid, {
        //             method: 'GET',
        //             headers: {
        //             }
        //         }).then((response) => response.json())
        //             .then((responseJson) => {
        //                 if (responseJson.res == 1) {
        //                     callback("http://" + JSON.parse(results).image_host + "/" + uuid)
        //                 } else {
        AsyncStorage.getItem('tokenId', (err, results) => {
            callback('http://api.aityuan.com/api/user/image?uuid=' + uuid + '&token=' + JSON.parse(results))
        })
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }
        // })
    }
    static tokenImgDetail(uuid, callback) {
        AsyncStorage.getItem('image_host', (err, result) => {
            if (JSON.parse(result)) {
                fetch("http://api.aityuan.com/api/" + "qiniu_file_exists?filename=" + uuid, {
                    method: 'GET',
                    headers: {
                    }
                }).then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.res == 1) {
                            callback("http://" + JSON.parse(result).image_host + "/" + uuid)
                        } else {
                            AsyncStorage.getItem('tokenId', (err, resultsss) => {
                                console.log(resultsss)
                                callback('http://api.aityuan.com/api/user/image?uuid=' + uuid + '&token=' + JSON.parse(resultsss))
                            })
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        })
    }
    static tokenImgSmall(uuid, callback) {
        AsyncStorage.getItem('tokenId', (err, results) => {
            callback('http://api.aityuan.com/api/user/image?size=small&uuid=' + uuid + '&token=' + JSON.parse(results))
        })
    }
    static ImgNoToken(uuid) {
        // http://118.89.196.120:10601/api/reading/image?image=detail_topic2.png
        return ('http://api.aityuan.com/api/reading/image?image=' + uuid)
    }
    // static tokenImg(uuid, callback) {
    //     AsyncStorage.getItem('tokenId', (err, results) => {
    //         callback('http://118.89.196.120:10601/api/user/image?uuid=' + uuid +'&token='+ JSON.parse(results))
    //     })
    // }
    // static tokenImgSmall(uuid, callback) {
    //     AsyncStorage.getItem('tokenId', (err, results) => {
    //         callback('http://118.89.196.120:10601/api/user/image?size=small&uuid=' + uuid +'&token='+ JSON.parse(results))
    //     })
    // }
    // static ImgNoToken(uuid) {
    //     // http://118.89.196.120:10601/api/reading/image?image=detail_topic2.png
    //         return ('http://118.89.196.120:10601/api/reading/image?image=' + uuid )
    // }

}
