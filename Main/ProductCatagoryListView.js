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


import GroupBuyCar from './GroupBuyCar'

import Dimensions from 'Dimensions';
import Grid from 'react-native-grid-component';
import px2dp from '../common/util'
import CommitButton from '../common/CommitButton'
import ProductDetail from './ProductDetail'
const isIOS = Platform.OS == "ios"
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import LoginView from '../Login/LoginView'
import Banner from 'react-native-banner';

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
        groupBuyDetail: PropTypes.object
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
        if(this.props.groupBuyDetail)
        {
            let rowData = this.props.groupBuyDetail.group_buy_goods
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
        return (<TouchableOpacity underlayColor="#dad9d7" style={[styles.row]} onPress={this.onPress.bind(this)}>
            <View style={[styles.row]}>

                <Image style={{
                    resizeMode: 'contain', alignItems: 'center',
                    justifyContent: 'center', width: w - 2,
                    backgroundColor: '#ffffff',
                    flex: 4
                }}
                    source={{ uri: item.goods.images[0].image }}
                />
                <View style={{ backgroundColor: '#fdf3ec', flex: 2 }}>
                    <Text style={{
                        alignItems: 'center', fontSize: 14,
                        color: '#1c1c1c',
                        justifyContent: 'center', margin: 2, numberOfLines: 2, ellipsizeMode: 'tail',
                        flex: 1
                    }}>{item.goods.name}</Text>

                    <View style={{
                        alignItems: 'center', flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <Text style={{ alignItems: 'center', textAlign: 'left', justifyContent: 'flex-start', numberOfLines: 1, color: '#e31515', fontSize: 20, }}>S$ {item.price}</Text>
                        <Text style={{
                            alignItems: 'center', marginLeft: 10,
                            justifyContent: 'center', numberOfLines: 1, color: '#757575', fontSize: 12
                        }}>{item.brief_dec}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
        )
    };

    onPress = (index, item) => {
        // this.props.navigator.push({
        //     component: ProductDetail,
        //     props: {
        //         prouduct: item,
        //     }
        // })
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
        if (this.props.groupBuyDetail) {
            image = this.props.groupBuyDetail.classify.image
        }
        this.banners = [
            {
                title: '',
                image: image
            }
        ];

        return (
            <Banner
                style={styles.topView}
                banners={this.banners}
                defaultIndex={this.defaultIndex}
                onMomentumScrollEnd={this.bannerOnMomentumScrollEnd.bind(this)}
                intent={this.bannerClickListener.bind(this)}
            />

        )
    }

    startGroupBuy() {

        AsyncStorage.setItem('k_cur_gbdetail', JSON.stringify(this.props.groupBuyDetail), (error, result) => {
            if (error) {
                console.log('save k_cur_gbdetail faild.')
            }
        })

        Global.gbDetail = this.props.groupBuyDetail

        this.props.navigator.push({
            component: GroupBuyCar,
            props: {
                showBack: true,
            }
        })
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
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    initialListSize={21}
                    pageSize={10}
                    scrollRenderAheadDistance={500}
                    renderRow={this.renderItem}
                    removeClippedSubviews={false}
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
    },
    row: {
        justifyContent: 'center',
        padding: 1,
        margin: 5,
        width: (width - 20) / 2,
        height: 220,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#CCC'
    },
    topView: {
        height: 150,
        width: width,
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

});
