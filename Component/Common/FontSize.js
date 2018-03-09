import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import { cal } from './Cal';
let PublicFontSize ={
    PublicFontSize_28:cal(14),
    PublicFontSize_24:cal(12),
    PublicFontSize_30:cal(15),
    PublicFontSize_26:cal(13),
    PublicFontSize_28:cal(14),
    PublicFontSize_22:cal(11),
    PublicFontSize_34:cal(17),
    PublicFontSize_20:cal(10),
    PublicFontSize_40:cal(20),
}
export { PublicFontSize }