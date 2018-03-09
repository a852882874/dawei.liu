import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import { cal } from './../Common/Cal';
const { PublicColor } = require("./../Common/Color.js")
let ChatStyle = StyleSheet.create({
    wrap: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    otherWrap: {
        flexDirection: "row",
        alignItems: "center",
        // height: cal(75),
        paddingLeft: cal(13),
    },
    otherWrap_two: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: cal(6)
    },
    otherWrap_two_sub: {
        // height: cal(40),
        paddingLeft: cal(17),
        paddingRight: cal(17),
        paddingTop: cal(10),
        paddingBottom: cal(10),
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: cal(4)
    },
    otherWrapImage: {
        flexDirection: "row",
        alignItems: "center",
        height: cal(150),
        paddingLeft: cal(13)
    },
    otherWrapImage_two: {
        height: cal(120),
        flexDirection: "row",
        alignItems: "center",
        marginLeft: cal(10)
    },
    otherWrapImage_two_sub: {
        height: cal(120),
        paddingLeft: cal(17),
        paddingRight: cal(17),
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: cal(4)
    },
    //底部发送按钮
    sentMess: {
        backgroundColor: "#fff",
        width: width,
        position: "absolute",
        bottom: 0
    },
    sentMess_One: {
        flexDirection: "row",
        alignItems: "center",
        height: cal(65)
    },
    sentMess_one_add: {
        width: cal(29),
        height:cal(30),
        marginLeft: cal(8),
        marginRight: cal(4),
        
    },
    sentMess_two: { height: cal(35), },
    sentMess_two_textInput: {
        width: cal(230),
        height: cal(35),
        borderColor: "#b3b3b3",
        borderWidth: cal(0.5),
        borderRadius: cal(2),
        fontSize: cal(14),
        padding:0
    },
    sentMess_two_textInputQieYuYin: {
        width: cal(230), height: cal(35),
        borderColor: PublicColor.Public_Text4, borderWidth: cal(0.5), borderRadius: cal(2), justifyContent: "center", alignItems: "center"
    },
    View_Input: {
        height: cal(73),
        backgroundColor: "#eeeeee",
        width: cal(280),
    },
    textInputStyle: { //文本输入组件样式 
        fontSize: cal(12),
        height: cal(25),
        color: PublicColor.Public_Text1,
        paddingLeft: cal(10),
        width: cal(280),
        maxHeight: cal(73),
    },












//对方 图片消息
    chatImage:{ width: width, alignItems: "center", marginBottom: cal(5), marginTop: cal(10) },
    otherWrapImageMO:{ backgroundColor: PublicColor.Public_ClickBackground, width: cal(45), height: cal(45), justifyContent: "center", alignItems: "center", borderRadius: cal(45) },
    timeText:{color:"#828282"},
    otherWrapImageMOMy:{ backgroundColor: PublicColor.Public_ClickBackground, width: cal(45), height: cal(45), justifyContent: "center", alignItems: "center", borderRadius: cal(45) }
})
export { ChatStyle }