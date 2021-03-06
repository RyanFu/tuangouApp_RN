import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Dimensions from 'Dimensions';

import NavBar from '../../common/NavBar'
import ProductCatagoryListView from './ProductCategoryListView'
import HttpRequest from '../../HttpRequest/HttpRequest'
import moment from 'moment';
var width = Dimensions.get('window').width;

export default class ProductCatagoryListViewTab extends Component {


    _handleChangeTab = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
    />;

    state = {
        index: 0,
        routes: [
        ],
        allGbDetail: {},
        gbList: {group_buying_list:[],classify:{}}
    };

    clickBack() {
        this.props.navigator.pop()
    }

    componentDidMount() {
        this.setState({
            product: this.props.prouduct,

        })
        console.log('group_buy_list_index:'+JSON.stringify(this.props.prouduct) );




        let param = { classify_id: this.props.prouduct.index }
        HttpRequest.get('/v2','/api.goods.listing', param, this.onGroupBuyListSuccess.bind(this),
            (e) => {

                console.log(' group_buy_listerro:' + e)
            })
    }

    onGroupBuyListSuccess(response) {
        console.log('GroupBuyList:'+JSON.stringify(response))




        var tabTitle = []
        // for (var i = 0; i < response.data.group_buying_list.length; i++) {
        //     let item = response.data.group_buying_list[i]
        //     var MM = moment(item.ship_time).format("M");
        //     var DD = moment(item.ship_time).format("D");
        //     tabTitle.push({ key: '' + i, title: MM+'月'+DD+'日发货拼团' })
        //
        // }
        for (var i = 0; i < response.data.group_buying_list.length; i++) {
            let item = response.data.group_buying_list[i]
            if (item.eyu ==''){
                tabTitle.push({ key: '' + i, title: '类别'+(i+1) })
            } else {
                tabTitle.push({ key: '' + i, title: item.eyu })
            }



        }
        this.setState({
            gbList: response.data,
            routes: tabTitle
        })


        // if (response.data.group_buying_list.length) {
        //     for (var j = 0;j <response.data.group_buying_list.length; j++){
        //         var paramBody = { group_buy: this.state.gbList.group_buying_list[j].group_buy_id }
        //         console.log('group_buy:'+JSON.stringify(paramBody));
        //         HttpRequest.get('/v1','/group_buy_detail', paramBody, this.onGroupBuyDetailSuccess.bind(this),
        //             (e) => {
        //                 Alert.alert('提示','获取团购详情失败，请稍后重试.')
        //
        //                 console.log(' 获取团购详情失败error:' + e)
        //             })
        //     }
        //
        // }

    }


    onGroupBuyDetailSuccess(response) {
        console.log('GroupBuyDetail:'+JSON.stringify(response))
        let gbData = this.state.allGbDetail
        gbData[response.data.id] = response.data

        this.setState({
            allGbDetail: gbData
        })
    }

    createProdcutCategoryList(gbDetail,classifyDetail) {
        ProductRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]}
        >
            <ProductCatagoryListView groupBuyDetail= {gbDetail} classifyDetail={classifyDetail} navigator= {this.props.navigator}></ProductCatagoryListView>
        </View>

        return ProductRoute
    }

    onSenceItem() {
        var scence = {}
        this.state.routes.map((item, n) => {
            let index = Number(item.key)
            let gbDetail = this.state.gbList.group_buying_list[index]
            let classifyDetail = this.state.gbList.classify
            console.log('createProdcutCategoryList11'+JSON.stringify(item.key))
            scence[item.key] = this.createProdcutCategoryList(gbDetail,classifyDetail)
        })

        return scence
    }
    // _renderScene = SceneMap(this.onSenceItem());

    renderTabView() {
        if (this.state.gbList.group_buying_list && this.state.gbList.group_buying_list.length) {
            return (<TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={SceneMap(this.onSenceItem())}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
                removeClippedSubviews={false}
            />)
        }
        else {
            return (<View />)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar title='申请拼团'
                    leftIcon={require('../../images/back.png')}
                    leftPress={this.clickBack.bind(this)} />
                {this.renderTabView()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        height: 44,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: '#ffffff',
    },
    tab: {
        width: width / 3,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        backgroundColor: '#ea6b10',
    },
    label: {
        color: '#ea6b10',
    },
});


