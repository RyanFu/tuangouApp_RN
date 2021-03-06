import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    ScrollView,
    ListView,
    AsyncStorage,
    Alert
} from 'react-native';


import {
    MKIconToggle,
    MKSwitch,
    MKRadioButton,
    MKCheckbox,
    MKColor,
    getTheme,
    setTheme,
} from 'react-native-material-kit'

import CountDownTimer from '../../common/CountDown'
import GroupBuyCar from '../GroupBuyCar'
import {CachedImage} from "react-native-img-cache";
import Dimensions from 'Dimensions';
import Grid from 'react-native-grid-component';

import CommitButton from '../../common/CommitButton'
import ProductDetail from './ProductDetail'
import Welcome from '../../Login/Welcome'
const isIOS = Platform.OS == "ios"
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import Banner from 'react-native-banner';
var Global = require('../../common/globals');
Date.prototype.format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};
export default class ProductCatagoryListView extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            goods: { description: '' },
            dataSource: ds,
        }
    }

    static propTypes = {
        groupBuyDetail: PropTypes.object,
        classifyDetail: PropTypes.object
    }


    onItemClick(prouduct) {

    }


    renderProductView() {
        var categoryDataAry = [];
        var displayCategoryAry = [];

        categoryDataAry.push({ id: 'meat', name: '品质水果', prouductItems: toolsData, countdown: '201123232' }, );

        for (var i = 0; i < categoryDataAry.length; i++) {
            displayCategoryAry.push(
                <View style={{ margin: 5 }}>
                    <View style={styles.brandLabelContainer}>
                        {/* <Image style={{resizeMode:'contain', alignItems:'center',
                  justifyContent:'center'}} source={require('../images/login_wechat.png')}/> */}
                        <Text style={{ fontSize: 16, color: '#1b1b1b' }}>
                            {categoryDataAry[i].name}
                        </Text>
                    </View>
                    {this.renderCategorysView(categoryDataAry[i].prouductItems)}
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5 }}>

                    </View>
                </View>
            );
        }
        return displayCategoryAry;
    }




    componentDidMount() {
        console.log('groupBuyListViewDetail:'+JSON.stringify(this.props.groupBuyDetail))
        if(this.props.groupBuyDetail)
        {
            let rowData = this.props.groupBuyDetail.goods_list
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(rowData)
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderProductCategoryView()}
            </View>
        )
    }


    sleep = (time) => {
        return new Promise(resolve => {
            setTimeout(() => resolve(), time);
        })
    };

    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            //This is required to determinate whether the first loading list is all loaded.
            let pageLimit = 24;
            pageLimit = 60;
            let skip = (page - 1) * pageLimit;

            //Generate dummy data
            let rowData = Array.from({ length: pageLimit }, (value, index) => `item -> ${index + skip}`);

            //Simulate the end of the list if there is no more data returned from the server
            if (page === 10) {
                rowData = [];
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(rowData),
                isLoading: false,
            });
            //Simulate the network loading in ES7 syntax (async/await)
            await this.sleep(2000);
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    renderHeader = () => {
        return (<View style={styles.topView} >
            {this.renderTopView()}
        </View>)
    }

    renderItem = (item, sectionID, rowID) => {
        //write your own layout in list view
        let w = (width - 20) / 2
        return (<TouchableOpacity underlayColor="#dad9d7" style={[styles.row]} onPress={() => { this.onItemPress(item.goods_id,item) }}>
            <View style={[styles.row]}>

                <Image style={{
                    resizeMode: 'contain', alignItems: 'center',
                    justifyContent: 'center', width: w ,height:w,
                    backgroundColor: '#ffffff',
                    flex: 4
                }}
                    source={{ uri: item.image }}
                />
                <View style={{ backgroundColor: '#ffffff', flex: 2 ,width:w,paddingTop:10}}>
                    <Text style={{
                        alignItems: 'center', fontSize: 14,
                        color: '#1c1c1c',
                        justifyContent: 'center', margin: 2, numberOfLines: 2, ellipsizeMode: 'tail',
                        flex: 1 ,textAlign: 'left',marginTop:5,marginLeft:10,marginRight:10
                    }}>{item.name}</Text>

                    <View style={{
                        alignItems: 'center', flexDirection: 'row',
                        justifyContent: 'flex-start',marginTop:5,marginLeft:10,marginRight:10,marginBottom:10,
                        flex: 1
                    }}>
                        <Text style={{ alignItems: 'center', textAlign: 'left', justifyContent: 'flex-start', numberOfLines: 1, color: '#e31515', fontSize: 20, }}>S$ {item.price}</Text>
                        <Text style={{
                            alignItems: 'center', marginLeft: 10,
                            justifyContent: 'center', numberOfLines: 1, color: '#757575', fontSize: 12
                        }}>{item.unit}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
        )
    };

    onItemPress(index, item){
        console.log('index:'+JSON.stringify(index)+' , item :' +JSON.stringify(item) )
        var prouduct = {
            'index': index,
            'image': {uri:item.image},
        }
        this.props.navigator.push({
            component: ProductDetail,
            props: {
                prouduct: prouduct,
            }
        })

    };

    bannerClickListener(index) {
        this.setState({
            clickTitle: this.banners[index].title ? `you click ${this.banners[index].title}` : 'this banner has no title',
        })
    }

    bannerOnMomentumScrollEnd(event, state) {
        this.defaultIndex = state.index;
    }

    renderTopView() {
        var image = ''
        var desc =''
        var groupend_time =''
        if (this.props.groupBuyDetail) {
            image = this.props.classifyDetail.image
            desc = this.props.classifyDetail.desc
            groupend_time = this.props.groupBuyDetail.end_time
        }
        this.banners = [
            {
                title: '',
                image: image,
                desc:desc
            }
        ];
        console.log('groupBuyDetail:'+JSON.stringify(this.props.groupBuyDetail))
        var endTime = (new Date(groupend_time.replace(' ','T'))).getTime();
        var curTime = new Date(endTime).format("yyyy-MM-ddThh:mm:ss+00:00");
        console.log('curTime:'+curTime)
        return (
            <View style={styles.topView}>
                {/*<Banner*/}
                    {/*style={styles.bannerView}*/}
                    {/*banners={this.banners}*/}
                    {/*defaultIndex={this.defaultIndex}*/}
                    {/*onMomentumScrollEnd={this.bannerOnMomentumScrollEnd.bind(this)}*/}
                    {/*intent={this.bannerClickListener.bind(this)}*/}
                {/*/>*/}
                <Image
                    style={{resizeMode:'contain',height: 180,
                   width:width,
                    }}
                    source={{uri: this.banners[0].image}}
                />
                <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                    <Text style={{fontSize:14,marginBoom:5,color:'rgb(227,21,21)',textAlign:'center',alignItems:'center',justifyContent:'center'}}>
                        截团倒计时
                    </Text>
                    <CountDownTimer
                        date={curTime}
                        // date="2017-11-28T00:00:00+00:00"
                        days={{plural: '天:',singular: '天 '}}
                        hours='时:'
                        mins='分:'
                        segs='秒'

                        daysStyle={styles.time}
                        hoursStyle={styles.time}
                        minsStyle={styles.time}
                        secsStyle={styles.time}
                        firstColonStyle={styles.colon}
                        secondColonStyle={styles.colon}
                    />
                </View>

            </View>



        )
    }

    startGroupBuy() {
        var classifyDetailDes = {}
        classifyDetailDes = this.props.classifyDetail
        AsyncStorage.setItem('k_cur_gbdetail', JSON.stringify(this.props.groupBuyDetail), (error, result) => {
            if (error) {
                console.log('save k_cur_gbdetail faild.')
            }
        })

        Global.gbDetail = this.props.groupBuyDetail
        console.log('this.props.classifyDetail'+JSON.stringify(this.props.classifyDetail))
        if (Global.user_profile){

            this.props.navigator.push({
                component: GroupBuyCar,
                props: {
                    showBack: true,
                    classifyDetail:classifyDetailDes
                }
            })
        }else {
            this.props.navigator.resetTo({
                component: Welcome,
                name: 'Welcome'
            })

        }

    }

    renderFooter()
    {
        return(<View style={{height: 49, width: width}}/>)
    }

    renderProductCategoryView() {
        // if(!goods){
        //     return <Loading loadingtext='正在加载商品...'/>
        // }

        return (
            <View style={styles.container}>
                <ListView
                    renderHeader={this.renderHeader}

                    dataSource={this.state.dataSource}
                    contentContainerStyle={styles.list}
                    initialListSize={21}
                    pageSize={10}
                    scrollRenderAheadDistance={500}
                    removeClippedSubviews={false}
                    renderRow={this.renderItem}

                    renderFooter={this.renderFooter}
                />
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 ,paddingTop:100}}><CommitButton title={'申请拼团'} onPress={this.startGroupBuy.bind(this)}></CommitButton></View>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    thumb: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    list: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F2F2F2',

    },
    row: {
        justifyContent: 'center',
        padding: 1,
        margin: 5,
        width: (width - 20) / 2,

        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        // borderWidth: 1,
        // borderRadius: 2,
        // borderColor: '#CCC'
    },
    topView: {

        width: width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white'
    },
    bannerView:{
        height: 150,
        width: width,



    },
    bannerText:{

        width:100,
        color: 'black',
        fontSize:14,
        fontFamily:'PingFangSC-Regular',
        textAlign:'center',
        margin:5,

    },
    line1: {
        height: 1,
        backgroundColor: '#dadce2'
    },
    line10: {
        height: 10,
        backgroundColor: '#ebeef1'
    },
    textprimary: {
        fontSize: 18,
        color: '#4a4d52',
    },
    textsecond: {
        fontSize: 18,
        color: '#929aa2',
    },
    textPrice: {
        fontSize: 18,
        color: '#fb7e00',
    },
    marginTop10: {
        marginTop: 15,
    },
    paddingLeftRight: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    rowSeparator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 10,
    },
    rowSeparatorHide: {
        opacity: 0.0,
    },
    line: {
        height: 1,
        backgroundColor: '#eef0f3',
    },
    //时间文字
    time: {
        paddingHorizontal: 1,
        fontSize: 14,
        color: 'rgb(227,21,21)',
        marginHorizontal: 1,
        borderRadius: 2,
        // fontFamily:'PingFang-SC-Medium'
    },

    //冒号
    colon: {
        fontSize: 14, color: 'rgb(227,21,21)',marginTop:0.5
    },

});
