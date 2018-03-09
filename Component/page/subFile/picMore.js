import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      selected: [],
      image:"",
      type:this.props.type?this.props.type:"publue"
    };
  }
  getSelectedImages(images, current) {
    var num = images.length;
    this.setState({
      num: num,
      selected: images,
    });
    let source = { uri: current.uri };
    this.setState({
        image : source
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{justifyContent:"center",paddingLeft:10,alignItems:"center"}}>
              <Text>取消</Text>
          </View>
          <Text style={styles.text}>
            已选择<Text style={styles.bold}> {this.state.num} </Text> 张图片(最多可选择{this.state.type =="publue"? 4 : 9}张)
          </Text>
          <TouchableWithoutFeedback
            onPress={()=>{
                this.props.picmore(this.state.selected);
                this.props.navigator.pop()
            }}
          >
          <View style={{justifyContent:"center",paddingRight:10,alignItems:"center"}}>
              <Text>确定</Text>
          </View>
          </TouchableWithoutFeedback>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={this.state.type =="publue"? 4 : 9}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={4}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6AE2D',
    },
    content: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    //   flexWrap: 'wrap',
    },
    text: {
      fontSize: 16,
      alignItems: 'center',
      color: '#fff',
    },
    bold: {
      fontWeight: 'bold',
    },
    info: {
      fontSize: 12,
    },
  });