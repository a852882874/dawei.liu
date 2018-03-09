import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { cal } from '../../Common/Cal';
const screen_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    tab: {
        justifyContent: 'center',
        paddingBottom: cal(20)
    },
  
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor: 'red',
    },
});

export default class Tabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: false
        }
    }

    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        underlineColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        scrollContainerStyle: PropTypes.object,
        tabStyles: PropTypes.object
    };

    static defaultProps = {
        tabStyles: {}
    };

    state = {
        renderUnderline: false,
        tabScrollValue: 0
    };

    componentWillMount() {
        this.tabState = {}
    }

    componentDidUpdate(prevProps, prevState) {
        const paddingValue = cal(20);
        if (prevProps.activeTab === this.props.activeTab) return;

        const overscrollValue = cal(120);
        let curTabLayout = this.tabState[this.props.activeTab];

        if ((curTabLayout.x + curTabLayout.width - this.state.tabScrollValue) > screen_width) {
            let scrollValue = curTabLayout.x + curTabLayout.width - screen_width;
            if (this.props.tabs.length != this.props.activeTab + 1) scrollValue += overscrollValue;
            this.scrollTabs.scrollTo({ x: scrollValue + paddingValue, y: 0 });
        } else if (curTabLayout.x < this.state.tabScrollValue) {
            if (this.props.activeTab === 0) this.scrollTabs.scrollTo({ x: 0, y: 0 });
            else this.scrollTabs.scrollTo({ x: curTabLayout.x - overscrollValue, y: 0 });
        }
    }

    onTabLayout(event, page) {
        var { x, y, width, height } = event.nativeEvent.layout;
        this.tabState[page] = { x: x, y: y, width: width, height: height };
        if (this.props.tabs.length === Object.keys(this.tabState).length) {
            this.setState({ renderUnderline: true });
        }
    }
    _color_pan(tab) {
        if (this.state.color) {
            return (
                <View style={{ width: cal(8), height: cal(2), borderRadius: cal(5), backgroundColor: "#000", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: cal(11), color: '#fff' }}></Text>
                </View>
            )
        } else {
            return (
                <View style={{ width: cal(8), height: cal(2), borderRadius: cal(5), backgroundColor: "#fff", borderWidth: 1, borderColor: "#b8b8b8", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: cal(11), color: '#000' }}></Text>
                </View>
            )
        }
    }
    renderTabOption(tab, page) {
        const { activeTab, tabBadgeColor } = this.props;
        const color = this.props.activeTab == page ? this.state.color = true : this.state.color = false;
        const isTabActive = activeTab === page;
        const activeTextColor = this.props.activeTextColor || "navy";
        const inactiveTextColor = this.props.inactiveTextColor || "black";
        const textStyle = this.props.tabBarTextStyle || {};
        console.log()
        return (
            <TouchableOpacity style={[styles.tab, this.props.tabStyles.tab]}
                key={page}
                onPress={() => this.props.goToPage(page)}
                onLayout={(event) => this.onTabLayout(event, page)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this._color_pan(tab)}
                </View>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <View style={{ height: 0, }}>
                <ScrollView horizontal={true}
                    contentContainerStyle={{ height: cal(50) }}
                    showsHorizontalScrollIndicator={false}
                    ref={(node) => this.scrollTabs = node}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={(e) => this.setState({ tabScrollValue: e.nativeEvent.contentOffset.x })}>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        {this.props.tab2s.map((tab, i) => this.renderTabOption(tab, i))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
