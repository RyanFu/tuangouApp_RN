import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    BackAndroid,
    Alert,
} from 'react-native';


import HomeView from './HomeView';
import GroupBuyCar from './GroupBuyCar';
import MineView from './MineView';
import Navigation from '../common/Navigation';
import TabNavigator from 'react-native-tab-navigator';
import Welcome from '../Login/Welcome'
var Global = require('../common/globals');

export default class TabView extends Component {
    state =
    {
        selectedTab: 'tab1'
    }

    componentWillMount() {
        var me = this;
        BackAndroid.addEventListener('harwardBackPress', () => {
            const routers = me.props.navigator.getCurrentRoutes();
            if (routers.length > 1) {
                me.props.navigator.pop();
                return true;
            } else {
                if (routers[0].name == 'MainPage') {
                    BackAndroid.exitApp();
                    return true;
                } else {
                    _navigator.pop();
                    return true;
                }

            }
            return false;
        });
    }


    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    onPressWelcome(){



            this.props.navigator.resetTo({
                component: Welcome,
                name: 'Welcome'
            })

    }

    render() {

        if (Global.wxUserInfo){
            return (
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab1'}
                        title="爱邻购"
                        renderIcon={() => <Image source={require('../images/home_icon.png')} />}
                        renderSelectedIcon={() => <Image source={require('../images/home_icon_click.png')} />}
                        badgeText=""
                        selectedTitleStyle={styles.tabBarTintColor}
                        onPress={() => this.setState({ selectedTab: 'tab1' })}>
                        {<HomeView {...this.props} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab2'}
                        title="拼团车"
                        renderIcon={() => <Image source={require('../images/shoppingcart_icon.png')} />}
                        renderSelectedIcon={() => <Image source={require('../images/shoppingcart_icon_click.png')} />}
                        selectedTitleStyle={styles.tabBarTintColor}
                        onPress={() => this.setState({ selectedTab: 'tab2' })}>
                        {<GroupBuyCar {...this.props} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab3'}
                        title="团长"
                        renderIcon={() => <Image source={require('../images/me_icon.png')} />}
                        renderSelectedIcon={() => <Image source={require('../images/me_icon_click.png')} />}
                        selectedTitleStyle={styles.tabBarTintColor}
                        onPress={() => this.setState({ selectedTab: 'tab3' })}>

                    {<MineView {...this.props} />}
                    </TabNavigator.Item>
                </TabNavigator>

            )
        }else {
            return (
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab1'}
                        title="爱邻购"
                        renderIcon={() => <Image source={require('../images/home_icon.png')} />}
                        renderSelectedIcon={() => <Image source={require('../images/home_icon_click.png')} />}
                        badgeText=""
                        selectedTitleStyle={styles.tabBarTintColor}
                        onPress={() => this.setState({ selectedTab: 'tab1' })}>
                        {<HomeView {...this.props} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab2'}
                        title="拼团车"
                        renderIcon={() => <Image source={require('../images/shoppingcart_icon.png')} />}
                        renderSelectedIcon={() => <Image source={require('../images/shoppingcart_icon_click.png')} />}
                        selectedTitleStyle={styles.tabBarTintColor}
                        onPress={this.onPressWelcome.bind(this)}>
                        {<GroupBuyCar {...this.props} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab3'}
                        title="团长"
                        renderIcon={() => <Image source={require('../images/me_icon.png')} />}
                        renderSelectedIcon={() => <Image source={require('../images/me_icon_click.png')} />}
                        selectedTitleStyle={styles.tabBarTintColor}
                        onPress={this.onPressWelcome.bind(this)}>
                        {<MineView {...this.props} />}
                    </TabNavigator.Item>
                </TabNavigator>

            )
        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tabBarTintColor: {

        color: '#ea6b10'
    },

});
