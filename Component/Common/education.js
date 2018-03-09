import React, { Component } from 'react';
import { AsyncStorage, Navigator, View, Picker } from 'react-native';
export default class Zhuanhuan extends Component {
    constructor(props) {
        super(props)
    }
    //  学历  字符转换 数字
    static _education(data, own) {
        if (own == true) {
            switch (data) {
                case "未知":
                    return 0
                case "初中":
                    return 1
                case "高中":
                    return 2
                case "大专":
                    return 3
                case "本科":
                    return 4
                case "研究生":
                    return 5
                case "博士":
                    return 6
                default:
                    return 7
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "初中":
                    return 1
                case "高中":
                    return 2
                case "大专":
                    return 3
                case "本科":
                    return 4
                case "研究生":
                    return 5
                case "博士":
                    return 6
                default:
                    return 7
            }
        }
    }
    //    收入
    static _income(data, own) {
        if (own == true) {
            switch (data) {
                case "未知":
                    return 0
                case "5000元以下":
                    return 1
                case "5000-8000":
                    return 2
                case "8000-12000":
                    return 3
                case "12000-20000":
                    return 4
                case "20000-50000":
                    return 5
                case "50000元以上":
                    return 6
                case "2000元以下":
                    return 1
                case "2000-5000":
                    return 2
                case "5000-10000":
                    return 3
                case "10000-20000":
                    return 4
                case "20000-50000":
                    return 5
                default:
                    return 6
            }

        } else {
            switch (data) {
                case "不限":
                    return 0
                case "5000元以下":
                    return 1
                case "5000以上":
                    return 2
                case "8000以上":
                    return 3
                case "12000以上":
                    return 4
                case "20000以上":
                    return 5
                case "50000元以上":
                    return 6

                case "2000元以下":
                    return 1
                case "2000元以上":
                    return 2
                case "5000元以上":
                    return 3
                case "10000元以上":
                    return 4
                case "20000元以上":
                    return 5
                case "50000元以上":
                    return 6
                default:
                    return 7
            }
        }

    }

    //婚姻
    static maritalStatus(data, own) {
        if (own == true) {
            switch (data) {
                case "未知":
                    return 0
                case "未婚":
                    return 1
                case "离异":
                    return 2
                case "丧偶":
                    return 3
                default:
                    return 4
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "未婚":
                    return 1
                case "离异":
                    return 2
                case "丧偶":
                    return 3
                default:
                    return 4
            }

        }
    }
    //性别
    static _sex(data) {
        switch (data) {
            case "male":
                return 1
            case "female":
                return 2
            case 1:
                return "男"
            case 2:
                return '女'
            default:
                return 3
        }
    }
    // 饮酒
    static _yinjiu(data, own) {
        if (own == true) {
            switch (data) {
                case "未知":
                    return 0
                case "不喝酒":
                    return 1
                case "偶尔":
                    return 2
                case "经常":
                    return 3
                default:
                    return 4
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "不喝酒":
                    return 1
                case "偶尔":
                    return 2
                case "经常":
                    return 3
                default:
                    return 5
            }

        }
    }
    // 有没有小孩
    static childrenStatus(data, own) {
        if (own == true) {
            switch (data) {
                case "未知":
                    return 0
                case "无小孩":
                    return 1
                case "有小孩归自己":
                    return 2
                case "有小孩归对方":
                    return 3
                default:
                    return 4
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "无小孩":
                    return 1
                case "有小孩归自己":
                    return 2
                case "有小孩归对方":
                    return 3
                default:
                    return 5
            }

        }
    }

    //吸烟状况
    static smokingStatus(data, own) {
        if (own == true) {
            switch (data) {
                case "未知":
                    return 0
                case "不吸烟":
                    return 1
                case "偶尔":
                    return 2
                case "经常":
                    return 3
                default:
                    return 4
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "不吸烟":
                    return 1
                case "偶尔":
                    return 2
                case "经常":
                    return 3
                default:
                    return 4
            }

        }
    }
    // 买车
    static carOwingStatus(data, own) {
        if (own) {
            switch (data) {
                case "未知":
                    return 0
                case "已买车":
                    return 1
                case "未买车":
                    return 2
                default:
                    return 3
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "已买车":
                    return 1
                case "未买车":
                    return 2
                    
                default:
                    return 3
            }
        }
    }
    static carOwingStatusGet(data, own) {
        if (own) {
            switch (data) {
                case 1:
                    return "已买车"
                case 2:
                    return "未买车"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "已买车"
                case 2:
                    return "未买车"
                case null:
                    return "未填写"
                default:
                    return data
            }
        }
    }

    // 购房情况

    static livingStatus(data, own) {
        if (own) {
            switch (data) {
                case "未知":
                    return 0
                case "有":
                    return 1
                case "无":
                    return 2
                case null:
                    return "未填写"
                default:
                    return 3
            }
        } else {
            switch (data) {
                case "不限":
                    return 0
                case "有":
                    return 1
                case "无":
                    return 2
                case null:
                    return "未填写"
                default:
                    return 3
            }

        }
    }
    static livingStatusGet(data, own) {
        if (own) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "有"
                case 2:
                    return "无"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "有"
                case 2:
                    return "无"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }















    //数字 转换 字符

    //反向转换 月收入  自己的
    static _incomeGet(data, male) {
        if (male == true) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "5000元以下"
                case 2:
                    return "5000-8000"
                case 3:
                    return "8000-12000"
                case 4:
                    return "12000-20000"
                case 5:
                    return "20000-50000"
                case 6:
                    return "50000元以上"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "2000元以下"
                case 2:
                    return "2000-5000"
                case 3:
                    return "5000-10000"
                case 4:
                    return "10000-20000"
                case 5:
                    return "20000-50000"
                case 6:
                    return "50000元以上"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }
    //反向转换  月收入 配哦要求
    static _incomeGetPer(data, male) {
        if (male == true) {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "5000元以下"
                case 2:
                    return "5000以上"
                case 3:
                    return "8000以上"
                case 4:
                    return "12000以上"
                case 5:
                    return "20000以上"
                case 6:
                    return "50000元以上"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "2000元以下"
                case 2:
                    return "2000元以上"
                case 3:
                    return "5000元以上"
                case 4:
                    return "10000元以上"
                case 5:
                    return "20000元以上"
                case 6:
                    return "50000元以上"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }

    //  学历  
    static _educationGet(data, own) {
        if (own) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "初中"
                case 2:
                    return "高中"
                case 3:
                    return "大专"
                case 4:
                    return "本科"
                case 5:
                    return "研究生"
                case 6:
                    return "博士"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "初中"
                case 2:
                    return "高中"
                case 3:
                    return "大专"
                case 4:
                    return "本科"
                case 5:
                    return "研究生"
                case 6:
                    return "博士"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }
    //婚姻状况
    static maritalStatusGet(data, own) {
        if (own == true) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "未婚"
                case 2:
                    return "离异"
                case 3:
                    return "丧偶"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "未婚"
                case 2:
                    return "离异"
                case 3:
                    return "丧偶"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }
    // 有没有小孩
    static childrenStatusGet(data, own) {
        if (own == true) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "无小孩"
                case 2:
                    return "有小孩归自己"
                case 3:
                    return "有小孩归对方"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "无小孩"
                case 2:
                    return "有小孩归自己"
                case 3:
                    return "有小孩归对方"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }


    //吸烟状况
    static smokingStatusGet(data, own) {
        if (own == true) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "不吸烟"
                case 2:
                    return "偶尔"
                case 3:
                    return "经常"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "不吸烟"
                case 2:
                    return "偶尔"
                case 3:
                    return "经常"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }
    // 饮酒
    static _yinjiuGet(data, own) {
        if (own == true) {
            switch (data) {
                case 0:
                    return "未知"
                case 1:
                    return "不喝酒"
                case 2:
                    return "偶尔"
                case 3:
                    return "经常"
                case null:
                    return "未填写"
                default:
                    return data
            }
        } else {
            switch (data) {
                case 0:
                    return "不限"
                case 1:
                    return "不喝酒"
                case 2:
                    return "偶尔"
                case 3:
                    return "经常"
                case null:
                    return "未填写"
                default:
                    return data
            }

        }
    }
}
