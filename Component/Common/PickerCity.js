import React, { Component } from 'react';
import { AsyncStorage, Navigator, View, Picker } from 'react-native';
import Pickers from 'react-native-picker';
import area from './../json/area.json';
import areaPer from './../json/areaPer.json';
const language = "";
import JMessage from 'jmessage-react-plugin';
const page = 1;
export default class picker extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', Taylor: '', language: '', sex: "" };
    }
    componentDidMount() {
        let that= this;
        AsyncStorage.getItem('user_sex', (err, result) => {
            if (JSON.parse(result)) {
                that.setState({
                    sex : JSON.parse(result).user_sex
                })
            }
        })
    }
    static _createJiu() {
        let date = ["不喝酒", "偶尔", "经常"];
        return date
    }
    static _createJiuPer() {
        let date = ["不限", "不喝酒", "偶尔", "经常"];
        return date
    }

    static _createHaiZi() {
        let date = ["无小孩", "有小孩归自己", "有小孩归对方"];
        return date
    }
    static _createHaiZiPer() {
        let date = ["不限", "无小孩", "有小孩归自己", "有小孩归对方"];
        return date
    }
    static _createHunYin() {
        let date = ["未婚", "离异", "丧偶"];
        return date
    }
    static _createHunYinPer() {
        let date = ["不限", "未婚", "离异", "丧偶"];
        return date
    }
    static _createXueLi() {
        let date = ["初中", "高中", "大专", "本科", "研究生", "博士"];
        return date
    }
    static _createXueLiPer() {
        let date = ["不限", "初中", "高中", "大专", "本科", "研究生", "博士"];
        return date
    }
    static _createZhufang() {
        let date = ["有", "无"];
        return date
    }
    static _createJieShouYiDiLian() {
        let date = ["接受", "看情况", "不接受"];
        return date
    }
    static _createXiYan() {
        let date = ["不吸烟", "偶尔", "经常"];
        return date
    }
    static _createXiYanPer() {
        let date = ["不限", "不吸烟", "偶尔", "经常"];
        return date
    }
    static _createMaiChe() {
        let date = ["已买车", "未买车"];
        return date
    }
    static _createShouRu(sex) {
        if (sex == 1) {
            let date = ["5000元以下", "5000-8000", "8000-12000", "12000-20000", "20000-50000", "50000元以上"];
            return date
        } else {
            let date = ["2000元以下", "2000-5000", "5000-10000", "10000-20000", "20000-50000", "50000元以上"];
            return date
        }
    }
    static _createShouRuPer(sex) {
        if (sex == 1) {
            let date = ["不限", "5000元以下", "5000以上", "8000以上", "12000以上", "20000以上", "50000元以上"];
            return date
        } else {
            let date = ["不限", "2000元以下", "2000元以上", "5000元以上", "10000元以上", "20000元以上", "50000元以上"];
            return date
        }
    }
    static _createHeightMe() {
        let date = [];
        for (var i = 150; i <= 220; i++) {
            date.push(i + "cm")
        }
        // let date = ["男","女","不选择"];
        return date
    }

    static _createHeightMemom() {
        let date = [];
        for (var i = 120; i <= 200; i++) {
            date.push(i + "cm")
        }
        // let date = ["男","女","不选择"];
        return date
    }
    static _createHeight() {
        let date = [
            // { "不限": [""] },
            // { "121cm": ["130cm", "140cm", "150cm", "160cm", "170cm", "180cm", "190cm", "200cm", "210cm", "220cm"] },
            // { "131cm": ["140cm", "150cm", "160cm", "170cm", "180cm", "190cm", "200cm", "210cm", "220cm"] },
            // { "141cm": ["150cm", "160cm", "170cm", "180cm", "190cm", "200cm", "210cm", "220cm"] },
            // { "151cm": ["160cm", "170cm", "180cm", "190cm", "200cm", "210cm", "220cm"] },
            // { "161cm": ["170cm", "180cm", "190cm", "200cm", "210cm", "220cm"] },
            // { "171cm": ["180cm", "190cm", "200cm", "210cm", "220cm"] },
            // { "181cm": ["190cm", "200cm", "210cm", "220cm"] },
            // { "191cm": ["200cm", "210cm", "220cm"] },
            // { "201cm": ["210cm", "220cm"] },
            // { "211cm": ["220cm"] },
        ];
        for (let i = 120; i < 220; i++) {
            let month = ['不限'];
            let _date = {};
            if (i == 120) {
                _date['不限'] = month;
            } else {
                for (let j = i + 1; j <= 220; j++) {
                    month.push(j + "cm");
                }
                _date[i + 'cm'] = month;
            }
            date.push(_date);
        }
        // let date = ["男","女","不选择"];
        return date
    }
    static _createOld() {
        let date = [];
        for (let i = 17; i < 57; i++) {
            let month = ['不限'];
            let _date = {};
            if (i == 17) {
                _date['不限'] = month;
            } else {
                for (let j = i + 1; j <= 58; j++) {
                    month.push(j + "岁");
                }
                _date[i + '岁'] = month;
            }
            date.push(_date);
        }
        return date;
    }
    static _createZhiYe() {
        let date = [
            {
                "技术": [
                    "软件开发工程师",
                    "软件测试工程师",
                    "软件开发经理",
                    "软件测试经理",
                    "硬件开发工程师",
                    "硬件测试工程师",
                    "硬件开发经理",
                    "硬件测试经理",
                    "系统工程师",
                    "架构师",
                    "测试总监",
                    "技术总监",
                    "CTO",
                    "运维工程师",
                    "运维经理",
                    "运维总监",
                    "项目专员",
                    "项目经理",
                    "项目总监",
                    "系统管理员",
                    "系统经理",
                    "其他"
                ]
            },
            { "产品": ["产品助理", "产品专员", "产品策划", "产品经理", "高级产品经理", "产品总监", "其他"] },
            { "设计": ["网页设计师", "高级网页设计师", "UI设计师", "高级UI设计师", "UE设计师", "高级UE设计师", "原画师", "平面设计师", "设计经理", "设计总监", "其他"] },
            {
                "运营": ["运营专员", "运营经理", "运营总监", "商务助理",
                    "商务专员", "商务经理", "推广专员", "推广经理", "渠道专员", "渠道经理",
                    "客服专员", "客服经理", "文案策划", "副总编", "主编", "COO", "其他"
                ]
            },
            {
                "市场": ["市场策划", "市场策划经理", "市场顾问", "高级市场顾问", "市场营销",
                    "市场营销经理", "市场推广", "市场推广经理", "SEO",
                    "SEO经理", "SEM", "SEM经理", "媒介专员",
                    "媒介经理", "品牌专员", "品牌经理", "采购专员",
                    "采购经理", "客服代表", "大客服代表", "BD经理",
                    "渠道专员", "渠道经理", "销售总监", "市场总监",
                    "商务总监", "公关专员", "公关经理", "采购总监",
                    "投资专员", "投资经理", "投资总监", "CMO", "其他"
                ]
            },
            {
                "职能": [
                    "人事专员", "行政专员", "招聘专员", "前台", "总助", "文秘", "助理", "会计",
                    "出纳", "财务", "结算", "税务", "审计", "风控", "法务", "律师",
                    "专利", "行政", "HRM", "HRD", "行政总监", "财务经理", "财务总监", "CFO", "CEO", "其他"

                ]
            },
            { "其他": ["其他"] },
        ];
        return date
    }
    static _createZhiYemom() {
        let date = [
            {
                "IT互联网": [
                    "产品",
                    "研发",
                    "销售",
                    "运营",
                    "编辑",
                    "市场商务",
                    "设计",
                    "运维安全",
                    "测试",
                    "客服",
                    "行政后勤",
                    "人力资源",
                    "项目管理",
                    "法务",
                    "其他"
                ]
            },
            { "金融": ["销售理财", "银行", "财税审计", "证券", "市场商务", "信托", "保险", "融资租赁", "拍卖典当", "人力资源", "行政后勤", "高管", "其他"] },
            { "法律/会计/咨询": ["律师", "公司法务", "公证员", "法律顾问", "审计税务", "商业咨询", "市场调研", "其他"] },
            {
                "贸易": ["项目管理", "采购", "物流跟单", "仓储",
                    "单证报关", "市场商务", "销售", "财务", "人力资源", "战略投资",
                    "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "房屋建筑": ["工程师", "销售 ", "设计规划", "项目管理", "市场商务",
                    "行政IT", "质检造假", "开发", "物业",
                    "战略投资", "法务", "高管", "其他"
                ]
            },
            {
                "学生": ["学生"]
            },
            {
                "文化传媒": [
                    "设计师", "后期", "摄影", "主持", "导演", "销售", "会展", "策划",
                    "艺人", "经纪人", "编辑记者", "编导制作", "艺术家", "出版发行", "行政人员", "高管", "其他"
                ]
            },
            {
                "电子/硬件": [
                    "销售", "生产制造", "技术", "硬件研发", "工程维护", "管理", "市场商务", "行政人事",
                    "设计师", "采购", "其他"
                ]
            },
            {
                "教育科研": [
                    "小学教师", "中学教师", "大学教师", "幼教", "教务管理", "课外辅导", "技能培训", "销售",
                    "人力资源", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "零售": [
                    "销售主管", "市场推广", "策划", "商品开发", "销售", "财务", "人力资源", "战略投资",
                    "法务", "行政IT", "其他"
                ]
            },
            {
                "能源/环保/水利": [
                    "技术", "经营管理", "采购", "物流", "市场商务", "财务", "销售", "人力资源",
                    "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "酒店旅游": [
                    "景点管理", "导游", "酒店管理", "厨师", "市场商务", "销售", "财务", "人力资源",
                    "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "制药/生物科技": [
                    "研发试验", "采购", "仓储", "质检", "市场商务", "财务", "销售", "人力资源",
                    "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "医疗": [
                    "辅诊", "医生", "护士", "医学影像", "营养师", "市场商务", "销售", "财务", "人力资源",
                    "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "生活服务": [
                    "餐饮", "美容", "市场商务", "销售", "财务", "人力资源", "战略投资", "法务",
                    "行政IT", "高管", "其他"
                ]
            },
            {
                "交通运输": [
                    "仓储", "贷代", "机长", "乘务", "路政", "港务销售", "财务", "人力资源",
                    "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "电信": [
                    "技术研发", "采购", "工程师", "项目管理", "市场商务", "销售", "财务", "人力资源",
                    "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "政府": [
                    "事业单位", "公务员", "军人", "军工", "公安司法", "后勤人员", "其他"
                ]
            },
            {
                "社会组织": [
                    "商会", "环保", "健康医疗", "扶贫", "慈善公益", "文化教育", "其他"
                ]
            },
            {
                "轻业/重业": [
                    "开发", "设计", "采购", "仓储", "物流", "研发", "质检", "市场商务",
                    "销售", "财务", "人力资源", "战略投资", "法务", "行政IT", "高管", "其他"
                ]
            },
            {
                "农业牧渔": [
                    "销售", "项目管理", "采购", "仓储物流", "技术", "质检", "市场商务", "人力资源",
                    "战略投资", "法务", "从政IT", "高管", "其他"
                ]
            },
            { "其他": ["其他"] },
        ];
        return date
    }
    static _createSex() {
        let date = ["男", "女", "不选择"];
        return date
    }
    static _createDateData() {
        let date = [];
        for (let i = 1960; i <= 2000; i++) {
            let month = [];
            for (let j = 1; j < 13; j++) {
                let day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day.push(k + '日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if (i % 4 === 0) {
                        day.push(29 + '日');
                    }
                }
                else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let k = 1; k < 32; k++) {
                        day.push(k + '日');
                    }
                }
                else {
                    for (let k = 1; k < 31; k++) {
                        day.push(k + '日');
                    }
                }
                let _month = {};
                _month[j + '月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i + '年'] = month;
            date.push(_date);
        }
        return date;
    }
    static _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    static _createAreaDataPer() {
        let data = [];
        let aa = [{
            "name": "不限",
            "area": [
                "不限"
            ]
        }];
        let bb = ["不限"]
        let len = areaPer.length;
        if (page == 1) {
            for (let i = 0; i < len; i++) {
                let city = [];
                if (areaPer[i] != "不限") {
                    areaPer[i]['city'] = aa.concat(areaPer[i]['city'])
                }
                for (let j = 0, cityLen = areaPer[i]['city'].length; j < cityLen; j++) {
                    let _city = {};
                    if (areaPer[i]['city'][j]['name'] != "不限") {
                        areaPer[i]['city'][j]['area'] = bb.concat(areaPer[i]['city'][j]['area'])
                    }
                    _city[areaPer[i]['city'][j]['name']] = areaPer[i]['city'][j]['area'];
                    city.push(_city);
                }
                let _data = {};
                _data[areaPer[i]['name']] = city;
                data.push(_data);
            }
            page = 2
            return data;
        } else {
            for (let i = 0; i < len; i++) {
                let city = [];
                for (let j = 0, cityLen = areaPer[i]['city'].length; j < cityLen; j++) {
                    let _city = {};
                    _city[areaPer[i]['city'][j]['name']] = areaPer[i]['city'][j]['area'];
                    city.push(_city);
                }
                let _data = {};
                _data[areaPer[i]['name']] = city;
                data.push(_data);
            }
            return data;
        }
    }

    //收入  （男方  收入）
    static _showShouRuNam(sex,callback) {
        Pickers.init({
            pickerData: picker._createShouRu(1),
            pickerFontSize: 16,
            pickerTitleText: '收入',
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //收入  （配偶是男方  收入）
    static _showShouRuNamPer(sex,callback) {
        Pickers.init({
            pickerData: picker._createShouRuPer(1),
            pickerFontSize: 16,
            pickerTitleText: '收入',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //收入  （女方  收入）
    static _showShouRuMom(sex,callback) {
        Pickers.init({
            pickerData: picker._createShouRu(2),
            pickerFontSize: 16,
            pickerTitleText: '收入',
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //收入  （配偶是女方  收入）
    static _showShouRuMomPer(sex,callback) {
        Pickers.init({
            pickerData: picker._createShouRuPer(2),
            pickerFontSize: 16,
            pickerTitleText: '收入',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }



    //身高   择偶对象  （范围）
    static _showHeight(sex,callback) {
        Pickers.init({
            pickerData: picker._createHeight(),
            pickerFontSize: 16,
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerTitleText: '身高',
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //年龄   择偶对象  （范围）
    static _showOld(sex,callback) {
        Pickers.init({
            pickerData: picker._createOld(),
            pickerFontSize: 16,
            pickerTitleText: '年龄',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //职业
    static _showZhiYe(sex,callback) {
        Pickers.init({
            pickerData: picker._createZhiYe(),
            pickerFontSize: 16,
            pickerTitleText: '职业',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //职业
    static _showZhiYemom(json, callback) {
        Pickers.init({
            pickerData: picker._createZhiYemom(),
            pickerFontSize: 16,
            pickerTitleText: '职业',
            pickerFontColor: [0, 0, 0, 1],
            selectedValue: [json.a, json.b],
            pickerConfirmBtnColor: [149, 140, 244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //身高   自己身高  （个人确定身高) 男士高度 
    static _showHeightMe(json,sex, callback) {
        Pickers.init({
            pickerData: picker._createHeightMe(),
            pickerFontSize: 16,
            pickerTitleText: '身高',
            pickerFontColor: [0, 0, 0, 1],
            selectedValue: [json != null ? json + "cm" : "150cm"],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //身高   自己身高  （个人确定身高) 女女士高度 
    static _showHeightMemom(json,sex, callback) {
        Pickers.init({
            pickerData: picker._createHeightMemom(),
            pickerFontSize: 16,
            pickerTitleText: '身高',
            selectedValue: [json != null ? json + "cm" : "150cm"],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //性别
    static _showSex(callback) {
        Pickers.init({
            pickerData: picker._createSex(),
            pickerFontSize: 16,
            pickerTitleText: '性别',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }


    //生日
    static _showDatePicker(json,sex, callback) {
        Pickers.init({
            pickerData: picker._createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '生日',
            pickerFontColor: [0, 0, 0, 1],
            selectedValue: [json.a != null ? json.a : "1995年", json.b != null ? json.b : "1月", json.c != null ? json.c : "1日"],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue, pickedIndex)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //家乡
    static _showAreaPicker(json,sex, callback) {
        Pickers.init({
            pickerTitleText: '家乡',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createAreaData(),
            selectedValue: [json.a != null ? json.a : "江苏", json.b != null ? json.b : "南京", json.c != null ? json.c : "栖霞区"],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
                console.log(pickedValue)
            },
            onPickerCancel: pickedValue => {

                console.log(pickedValue)
            },
            onPickerSelect: pickedValue => {
                console.log(pickedValue)
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    //学历
    static _showXueLi(sex,callback) {
        Pickers.init({
            pickerTitleText: '学历',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            selectedValue: ["本科"],
            pickerData: picker._createXueLi(),
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    //  （配偶）学历
    static _showXueLiPer(sex,callback) {
        Pickers.init({
            pickerTitleText: '学历',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createXueLiPer(),
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    // 住房情况
    static _showZhufang(sex,callback) {
        Pickers.init({
            pickerTitleText: '住房情况',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createZhufang(),
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    // 买车情况
    static _showMaiChe(sex,callback) {
        Pickers.init({
            pickerTitleText: '买车情况',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createMaiChe(),
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    // 接受异地恋
    static _showJieShouYiDiLian(callback) {
        Pickers.init({
            pickerTitleText: '接受异地恋',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createJieShouYiDiLian(),
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    // 吸烟情况
    static _showXiYan(sex,callback) {
        Pickers.init({
            pickerTitleText: '吸烟情况',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createXiYan(),
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    // (配偶)吸烟情况
    static _showXiYanPer(sex,callback) {
        Pickers.init({
            pickerTitleText: '吸烟情况',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerData: picker._createXiYanPer(),
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            // selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
            }
        });
        Pickers.show();
    }
    //工作地址
    static _showAreaPickerWork(json,sex, callback) {
        Pickers.init({
            pickerTitleText: '工作地址',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerData: picker._createAreaData(),
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            selectedValue: [json.a != null ? json.a : "江苏", json.b != null ? json.b : "南京", json.c != null ? json.c : "栖霞区"],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
            }
        });
        Pickers.show();
    }
    //（配偶）工作地址
    static _showAreaPickerWorkPer(json, sex,callback) {
        Pickers.init({
            pickerTitleText: '工作地址',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createAreaDataPer(),
            selectedValue: [json.a != null ? json.a : "江苏", json.b != null ? json.b : "南京", json.c != null ? json.c : "栖霞区"],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
            }
        });
        Pickers.show();
    }
    //（配偶）家乡
    static _showAreaPickerWorkPerhome(json, sex,callback) {
        Pickers.init({
            pickerTitleText: '家乡',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            pickerData: picker._createAreaDataPer(),
            selectedValue: [json.a != null ? json.a : "江苏", json.b != null ? json.b : "南京", json.c != null ? json.c : "栖霞区"],
            onPickerConfirm: pickedValue => {
                callback(pickedValue)
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
            }
        });
        Pickers.show();
    }
    //婚姻状况
    static _showHunYin(sex,callback) {
        Pickers.init({
            pickerData: picker._createHunYin(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '婚姻状况',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //(配偶)婚姻状况
    static _showHunYinPer(sex,callback) {
        Pickers.init({
            pickerData: picker._createHunYinPer(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '婚姻状况',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //有没有小孩
    static _showHaiZi(sex,callback) {
        Pickers.init({
            pickerData: picker._createHaiZi(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '有没有小孩',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //(配偶)有没有小孩
    static _showHaiZiPei(sex,callback) {
        Pickers.init({
            pickerData: picker._createHaiZiPer(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '有没有小孩',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }

    //  饮酒情况
    static _showJiu(sex,callback) {
        Pickers.init({
            pickerData: picker._createJiu(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '是否喝酒',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
    //  配偶 饮酒情况
    static _showJiuPer(sex,callback) {
        Pickers.init({
            pickerData: picker._createJiuPer(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '是否喝酒',
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnColor: sex == 'male' ? [88,117,212, 1] : [149,140,244, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                callback(pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Pickers.show();
    }
}
