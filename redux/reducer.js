const initialState = {
    name:"请输入昵称",
    sex:"",
    day:"",
    height:"",
    content:"请写下个人内心独白"
}
const a = true
// state xiangdangy1zhuangtashu?
//根据reducer创建configureStre。js
export const calculate=(state =initialState,action)=>{
    switch (action.type){
        case 'name':
        return {
            name:action.number.name,
            content:action.number.content,
            sex:action.number.sex,
            day:action.number.day,
            height:action.number.height,
        };
        case 'content':
        return {
            name:action.number.name,
            content:action.number.content,
            sex:action.number.sex,
            day:action.number.day,
            height:action.number.height,
        };
        case 'sex':
        return {
            name:action.number.name,
            content:action.number.content,
            sex:action.number.sex,
            day:action.number.day,
            height:action.number.height,
        };
        case 'day':
        return {
            name:action.number.name,
            content:action.number.content,
            sex:action.number.sex,
            day:action.number.day,
            height:action.number.height,
        };
        case 'height':
        return {
            name:action.number.name,
            content:action.number.content,
            sex:action.number.sex,
            day:action.number.day,
            height:action.number.height,
        };
        default :
        return state;
    }
}
