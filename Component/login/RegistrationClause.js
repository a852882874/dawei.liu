
// 用户协议
import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Navigator, Dimensions, ScrollView, Image, TouchableWithoutFeedback, TextInput } from 'react-native'
const { width, height } = Dimensions.get("window");
import Header from './../Common/Header.js';
import MyIndex from './../page/MyIndex.js';
import { cal } from './../Common/Cal.js';
const { PublicColor } = require("./../Common/Color.js")

export default class RegistrationClauseClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: PublicColor.Public_ViewBackground }}>
                <Header type={"zhuce"} title={"爱特缘服务条约及隐私协议"} navigator={this.props.navigator} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ marginTop: cal(5), backgroundColor: "#fff", flex: 1 }}>
                        <View style={{ marginTop: cal(25), paddingLeft: cal(15),paddingRight: cal(12) }}>
                            <View>
                                <Text style={{ color: PublicColor.Public_Text5, fontSize: cal(15) }}>1.协议内容及签署</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>1.1本协议内容包括协议正文及所有爱特缘已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，任何爱特缘提供的服务均受本协议约束。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>1.2用户应当在使用爱本应用服务之前认真阅读全部协议内容，对于协议中显示的内容，用户应认真阅读。用户确认爱特缘对协议中所含免除或限制其责任的条款已尽提示、说明义务，用户同意此等条款，用户如对协议内容有任何异议的，应向爱特缘咨询。但无论用户事实上是否在使用本应用服务之前认真阅读了本协议内容，只要用户使用爱特缘服务，既与爱特缘缔结了本协议，本协议即对用户产生约束，届时用户不应以未阅读本协议的内容或者未获得爱特缘对用户问询的解答等理由，主张本协议无效或要求撤销本协议。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>1.3用户承诺接受并遵守本协议的约定。如果用户不同意本协议的约定，应立即停止注册程序或停止使用爱特缘服务。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>1.4爱特缘有权根据需要不时地制订、修改本协议或各类规则，并以网站公示的方式进行公告，不再单独通知用户。变更后的协议和规则一经公布后，立即自动生效。如用户不同意相关变更，应当立即停止使用本应用服务。用户继续使用爱特缘服务的，即表示用户接受经修订的协议。</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text5, fontSize: cal(15) }}>2.用户注册</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>2.1用户的陈述与保证
用户保证，在用户完成注册程序或以其他爱特缘允许的方式实际使用时，用户应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若用户不具备前述主体资格，则用户及用户的监护人应承担因此而导致的一切后果，同时爱特缘将保留追究用户及其监护人民事、刑事责任等权利，且爱特缘有权注销(永久冻结)用户的爱特缘账号,账号内的剩余费用不予退回，并有权向用户及用户的监护人索赔。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>2.2用户注册条件
(1)申请注册成为爱特缘的用户应同时满足下列全部条件：
在注册之日以及此后使用爱特缘交友服务期间必须以恋爱或者婚姻为目的；
在注册之日以及此后使用爱特缘交友服务期间必须是单身状态，包括未婚、离异或是丧偶；
在注册之日必须年满18周岁以上。
(2)为更好的享有本应用提供的服务，用户应当按照法律法规要求：
向爱特缘提供本人真实、正确、最新及完整的资料；随时更新登记资料，保持其真实性及有效性；征友过程中，务必保持征友帐号的唯一性。如爱特缘有合理理由怀疑用户提供的资料错误、不实、过时或不完整的，本应用有权暂停或终止您的账号，并拒绝您现在和未来使用本服务之全部或任何部分。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>2.3账号及账号管理
在用户认可本协议，完成用户注册程序或以其他爱特缘允许的方式实际使用爱特缘服务时，用户可以对账号设置昵称、密码，通过该账号用户可随时改变昵称及密码。
用户设置的昵称不得违反法律法规的规定、不得侵犯或涉嫌侵犯他人合法权益，否则引起的一切后果由用户独自承担，同时爱特缘保留取消用户资格的权利。
用户应对账号(包括昵称、密码)的安全以及对通过用户账号所实施的行为负责。如果发现任何人不当使用用户的账号或有任何其他可能危及用户账号安全的情形时，用户应当立即以有效方式通知爱特缘，要求爱特缘暂停相关服务。用户理解爱特缘对用户的请求采取行动需要合理时间，爱特缘对在采取行动前已经产生的后果(包括但不限于用户的任何损失)不承担任何责任。
除非有法律规定或生效法律文书认定，且征得爱特缘的同意，否则，用户不得以任何方式转让、赠与或继承账号(与账号相关的财产权益除外)。如果爱特缘以合法途径获知使用者并非账号初始注册人，爱特缘有权回收该账号而无须向该账号使用人承担法律责任，由此带来的包括并不限于用户资料清空等损失由用户自行承担。爱特缘禁止用户私下有偿或无偿转让账号及其中的虚拟物品，用户应当自行承担因违反此要求而遭致的任何损失，同时爱特缘保留追究上述行为人法律责任的权利。</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>3.爱特缘服务</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>3.1爱特缘通过互联网为用户提供服务，包括在线及无线的相关业务。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>3.2对于利用爱特缘进行非法活动，或其言行(无论线上或者线下的)背离真诚交友目的，或违反用户使用规范的，爱特缘将严肃处理，包括但不限于采取将其列入黑名单、将其被投诉的情形公之于众、删除用户删除用户帐号、移送相关司法机关查办等措施。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>3.3为提高爱特缘用户交友的成功率，爱特缘会通过向用户发送电子邮件、短信或电话通知的方式向用户发送广告信（内容包括但不限于服务流程确认，其他用户希望联系、约见，活动信息和咨询，新服务或新产品的推介）；用户在爱特缘注册或实际使用本应用服务，即是明确同意接收该等电子邮件、短信或接听电话；用户如拒绝接收该类广告信，须以相同方式回复爱特缘明确表明拒绝接收。</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>4.用户使用规范</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>用户无权实施包括但不限于下列行为：</Text>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.1用户在使用本应用服务时必须符合中国有关法律、法规以及国际法的有关规定。用户不得利用爱特缘制作、发表、复制、传送、传播、储存等以下信息：</Text>
                                    <View><Text>(1)违反宪法确定的基本原则的；</Text></View>
                                    <View><Text>(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</Text></View>
                                    <View><Text>(3)损害国家荣誉和利益的；</Text></View>
                                    <View><Text>(4)煽动民族仇恨、民族歧视，破坏民族团结的；</Text></View>
                                    <View><Text>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</Text></View>
                                    <View><Text>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</Text></View>
                                    <View><Text>(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</Text></View>
                                    <View><Text>(8)含有虚假、有害、胁迫、侵害他人隐私、粗俗、猥亵、骚扰、侵害、中伤、侮辱或者诽谤他人，其他有悖道德、令人反感的内容；</Text></View>
                                    <View><Text>(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</Text></View>
                                    <View><Text>(10)以非法民间组织名义活动的；</Text></View>
                                    <View><Text>(11)侵犯他人知识产权、商业秘密或其他合法权利的；</Text></View>
                                    <View><Text>(12)含有法律、行政法规禁止的其他内容的。</Text></View>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.2用户不得利用爱本应用服务误导、欺骗他人。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.3未经爱特缘书面同意，用户不得从事以下活动：</Text>
                                    <View><Text>(1)未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</Text></View>
                                    <View><Text>(2)未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</Text></View>
                                    <View><Text>(3)故意制作、传播计算机病毒等破坏性程序的；</Text></View>
                                    <View><Text>(4)其他危害计算机信息网络安全的行为。</Text></View>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.4用户不得以任何方式干扰本应用的服务。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.5用户承诺，使用本应用服务仅为个人使用之目的，不得利用本应用服务从事商业活动及营利活动。未经爱特缘同意，不得将本应用之服务提供给他人使用。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.6用户在投诉其他用户有违法行为或违反本注册条款情形时，投诉者应承担不实投诉所产生的全部法律责任。如侵犯他人的合法权益，投诉人应独立承担全部法律责任。如给爱特缘造成损失的，投诉人应对爱特缘履行相应的赔偿责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.7使用本应用服务的过程中，用户不得以任何方式危害未成年人的利益。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.8用户不得冒充任何人或机构，包含但不限于冒充爱特缘工作人员、主持人，或以虚伪不实的方式陈述或谎称与任何人或机构有关的。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>4.9用户不得冒用他人身份信息注册，不得恶意使用注册帐号导致其他用户误认。</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>5.用户隐私。</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>用户个人隐私信息是指在用户注册本应用帐号，参加任何形式的活动时，爱特缘网站收集的用户个人身份识别资料，包括下列信息：用户的姓名、昵称、出生日期、性别、职业、所在行业、个人收入、手机号码、电子邮件、地址信息以及网站自动接收并记录用户的浏览器和服务器日志上的信息(含用户登录所在地的IP地址、在线、无线信息、信件资料等)。而非个人隐私信息是指用户对爱特缘软件的操作状态以及使用习惯等一些明确且客观反映在爱特缘服务器终端的基本记录信息和其他一切个人隐私信息范围外的普通信息。爱特缘收集上述信息将用于：提供网站服务、和第三方合作提供IPTV、互联网电视等服务、改进网页内容，满足用户对某种产品、活动的需求、通知用户最新产品、活动信息，或根据法律法规要求的用途。用户同意爱特缘收集上述信息并自愿向爱特缘提供上述信息。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>尊重用户个人隐私是爱特缘的一项基本政策。所以，爱特缘在未经用户的授权时不得公开、编辑或透露其真实姓名、联系方式等注册资料及保存在爱特缘各项服务中的非公开内容，除非爱特缘在诚信的基础上认为透露这些信息在以下几种情况是必要的：</Text>
                                    <View><Text>(1)您明确同意让第三方共享资料；</Text></View>
                                    <View><Text>(2)只有透露您的个人信息，才能提供您所要求的产品和服务；</Text></View>
                                    <View><Text>(3)为保护本网站、会员及社会公众的财产权利或人身权利；</Text></View>
                                    <View><Text>(4)“隐私政策”列出的各类情况；</Text></View>
                                    <View><Text>(5)执行软件验证服务；</Text></View>
                                    <View><Text>(6)执行软件升级服务；</Text></View>
                                    <View><Text>(7)网络同步服务；</Text></View>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>6.法律责任和免责</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.1爱特缘不保证本应用服务一定能满足用户的要求，也不保证服务不会中断，对服务的及时性、安全性、真实性、出错发生都不作保证。用户理解并接受下载或通过本应用服务取得任何信息资料取决于用户自己，并由其承担系统受损、资料丢失以及其它任何风险。对在任何情况下因使用或不能使用本应用服务所产生的直接、间接、偶然、特殊及后续的损害及风险，爱特缘及合作单位不承担任何责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.2爱特缘对用户账号上所有服务将尽力维护其安全性及方便性，但对服务中出现的信息(包括但不限于用户发布的信息)删除或储存失败不承担任何责任。另外我们保留判定用户的行为是否符合本协议的权利。如果用户违背了本协议的规定，爱特缘有权中止或终止对其爱特缘帐号的服务。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.3使用本应用服务涉及到互联网服务，可能会受到各个环节不稳定因素的影响，存在因不可抗力、计算机病毒、黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何网络、技术、通信线路等原因造成的服务中断或不能满足用户要求的风险，用户须明白并自行承担以上风险，爱特缘不承担任何责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.4用户因第三方如电信部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力原因而遭受的经济损失，爱特缘不承担任何责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.5因技术故障等事件影响到服务正常运行的，爱特缘承诺在第一时间内与相关单位配合，及时处理进行修复，但用户因此而遭受的经济损失，爱特缘不承担任何责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.6用户违反本协议或相关的规则，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的诉讼费用、律师费用以及必要的调查费用等，用户同意赔偿爱特缘与合作公司、关联公司，并使之免受损害。对此，爱特缘有权视用户的行为性质，采取包括但不限于中断使用许可、停止提供服务、限制使用、法律责任追究等措施。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.7用户了解并同意，本应用不对因下述任一情况而导致用户的任何损害赔偿承担责任：</Text>
                                    <View><Text>(1)使用或未能使用本应用服务。</Text></View>
                                    <View><Text>(2)第三方未经批准的使用用户的账号或更改用户的数据。</Text></View>
                                    <View><Text>(3)用户对本应用服务的误解。</Text></View>
                                    <View><Text>(4)任何非因爱特缘的原因而引起的与本应用服务有关的其它损失。</Text></View>
                                    <View><Text>(5)因用户进行上传或张贴，而导致任何第三方提出侵权或索赔要求的，用户承担全部责任。</Text></View>
                                    <View><Text>(6)任何第三方对于用户在本应用的公开使用区域张贴的内容进行复制、修改、编辑、传播等行为的，该行为产生的法律后果和责任均由行为人承担，与爱特缘无关。</Text></View>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.8对于所有用户(包括通过实名认证和未通过实名认证的用户)上传的照片、资料、证书及填写的个人信息等，爱特缘已采用相关措施并已尽合理努力进行审核，但不保证其内容的正确性、合法性或可靠性，相关责任由上传上述内容的用户单独负责。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.9用户理解并接受：用户以自己的独立判断从事与交友相关的行为，并独立承担可能产生的责任，爱特缘不承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.10爱特缘对直接、间接、偶然、特殊及继起的损害不负责任，这些损害包括但不限于：不正当使用产品服务，用户自行下载所导致的对用户电脑所造成的任何损坏及数据丢失、在网上购买商品或类似服务，在网上进行交易，非法使用服务或用户传送的信息有所变动。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.11爱特缘对所有用户自发组织的活动、自发成立的组织不承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.12尽管爱特缘已采取相应的技术保障措施，但用户仍有可能收到各类的广告信(爱特缘发送的广告信除外)或其他不以交友为目的邮件，爱特缘不承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.13对于爱特缘策划、发起、组织或是承办的任何用户活动(包括但不限于收取费用以及完全公益的活动)，本应用不对上述活动的效果向用户作出任何保证或承诺，也不担保活动期间用户自身行为的合法性、合理性。由此产生的任何对于用户个人或者他人的人身或者是名誉以及其他损害，爱特缘不承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.14对于通过本应用发布的各种广告信息、链接、资讯等，爱特缘不保证其内容的正确性、合法性或可靠性，相关责任由广告商承担；并且，对于用户经由本应用服务与广告商进行联系或商业往来，完全属于用户和广告商之间的行为，与爱特缘无关。对于前述商业往来所产生的任何损害或损失，爱特缘不承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.15对于用户的投诉，本应用将尽合理努力认真核实，但不保证最终公之于众的投诉的真实性、合法性，对于投诉内容侵犯会员隐私权、名誉权等合法权利的，所有法律责任由投诉者承担，与爱特缘无关。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.16在本应用注册的爱特缘工作人员以用户身份及其他非工作人员身份进行的任何活动和行为，本应用不承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>6.17对于用户冒用他人身份信息注册成为爱特缘用户、利用他人的名义发布任何信息、恶意使用注册帐号导致其他用户误认等非法行为，爱特缘将协同相关部门予以处理。</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>7.知识产权。</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>7.1 本公司对本网站所拥有之权利包括但不限于爱特缘及其许可方受中国法律法规及世界范围内其他可适用的法律、法规或国际条约、国际惯例保护的任何资料、商标及其他知识产权和所有权。除公共领域可获得的信息或者您已获得我们书面许可的情况外，您不得复制、修改、公布、传播、执行、转载、许可使用、创建衍生作品、转移显示、出售、转售、以非法手段获取或以任何其他方式处置任何本公司拥有知识产权或所有权的任何信息。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>7.2 未经该类拥有者事先同意，您不能以任何方式张贴、散布或转载任何受保护的资料、商标或其他知识产权。除上述规定外，如果您相信您的作品在本网站上被以一种构成侵害知识产权的方式复制或公布，请向我们的知识产权代理提供以下全部信息：知识产权的所有人（含被授权人或所有人的代理人）的电子或实际签名；您声称受到侵犯的受保护作品之说明；您声称受侵犯资料在本网站上的位置说明；您的地址、电话号码和电子邮件地址；有关您确信该复制或公布行为未经知识产权所有者或其代理或法律批准的书面陈述；您表明以上信息是准确的而且您是知识产权所有人或所有人的代理人的书面陈述，该书面陈述需您本人签字确认方被视为有效。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>7.3 您一经使用本网站，则表示您承认本公司对本网站及本网站所收集、制作、发布之各类信息拥有完全知识产权或所有权，包括但不限于各类文档、图像、数据库等，除非法律或本协议明确规定该等权利属于个人。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>7.4 如您将各类信息公布到本网站的任何公共区域，则表示您同意，同时您自动授予，并且您陈述并保证您有权授予本网站不可撤销的、永久的、非独占的、完全免费的、世界范围的许可。在该等许可下，您同意本网站使用、复制、执行、显示并传播该内容，您也同意我们基于该内容创作衍生作品或将该内容整合到其他作品中且我们对该等衍生作品或整合作品拥有完全的知识产权；同时，在该等许可下，您已授予我们对上述许可的再许可权，即我们可以将您授予我们的许可转授给其他第三人，并且我们行使再许可权不需要再获得您的同意。</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>8.协议终止</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>8.1用户在此同意，爱特缘有权自行全权决定以任何理由不经事先通知的中止、终止向用户提供部分或全部本应用服务，暂时冻结或永久冻结(注销)用户的账号，且无须为此向用户或任何第三方承担任何法律责任。</Text>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>8.2出现以下情况时，爱特缘有权直接以注销账号的方式终止本协议：</Text>
                                    <View><Text>(1)爱特缘终止向用户提供服务后，用户涉嫌再一次直接或间接或以他人名义注册为爱特缘用户的；</Text></View>
                                    <View><Text>(2)用户注册信息中的主要内容不真实或不准确或不及时或不完整。</Text></View>
                                    <View><Text>(3)本协议(含规则)变更时，用户明示并通知爱特缘不愿接受新的协议的。</Text></View>
                                    <View><Text>(4)其它爱特缘认为应当终止服务的情况。</Text></View>
                                    <Text style={{ marginTop: cal(10), color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>8.3用户同意，用户与爱特缘的合同关系终止后，爱特缘仍享有下列权利：</Text>
                                    <View><Text>(1) 继续保存用户的注册信息及用户使用本应用服务期间的所有信息。</Text></View>
                                    <View><Text>(2) 用户在使用本应用服务期间存在违法行为或违反本协议或规则的行为的，爱特缘仍可依据本协议向用户主张权利。</Text></View>
                                </View>
                            </View>
                            <View style={{ marginTop: cal(25) }}>
                                <Text style={{ color: PublicColor.Public_Text3, fontSize: cal(15) }}>9.法律</Text>
                                <View style={{ marginTop: cal(15), }}>
                                    <Text style={{ color: PublicColor.Public_Text1, fontSize: cal(14), lineHeight: 20 }}>9.1用户和本应用一致同意有关服务条款以及使用本应用的服务产生的争议交由当地仲裁委员会解决。若有任何服务条款与法律相抵触，那这些条款将按尽可能接近的方法重新解析，而其它条款则保持对用户产生法律效力和影响。</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
let RegistrationClause = StyleSheet.create({
})