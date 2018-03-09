import {Dimensions} from 'react-native';
const  {width ,height} = Dimensions.get('window');
let age = function(date){

    let dates = date.split("-")[0]+ "-" +date.split("-")[1] + "-" +date.split("-")[2].slice(0, 2)
    let stringTime = dates;
    let timestamp2 = Date.parse(new Date(stringTime));
    let birthDay = timestamp2;
    var now = parseInt(new Date().getTime());
    var hours = (now - birthDay) / 1000 / 60 / 60;
    return Math.floor(hours / (24 * 30 * 12))+"岁";
}
export {age}