//函数就是action 的创造函数

export const plus =(number,type)=>({
    type : type,
    a:true,
    number:number
})
//action 意图
//plus(1)=》{type}