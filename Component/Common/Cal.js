import {Dimensions} from 'react-native';
const  {width ,height} = Dimensions.get('window');
let cal = function(num){
    return width/(375/num);
}
export {cal}