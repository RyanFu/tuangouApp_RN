import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    ScrollView,
    TouchableHighlight,
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

import Banner from 'react-native-banner';
import Dimensions from 'Dimensions';
import Grid from 'react-native-grid-component';
import NavBar from '../common/NavBar'
import px2dp from '../common/util'
import CommitButton from '../common/CommitButton'
import GroupBuyCar from './GroupBuyCar'

const isIOS = Platform.OS == "ios"
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import LoginView from '../Login/LoginView'


export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state={
            goods:{description:'',image:'http://images.meishij.net/p/20120905/d3c961321d94bcfa08b33fc99b754874.jpg'}
        }
    }


    onItemClick(prouduct){

    }


    renderProductView() {
         var categoryDataAry = [];
         var displayCategoryAry = [];

          categoryDataAry.push({id:'meat',name:'品质水果',prouductItems:toolsData,countdown:'201123232'},);

            for (var i = 0; i<categoryDataAry.length; i++) {
                displayCategoryAry.push(
                        <View style={{margin:5}}>
                        <View style = {styles.brandLabelContainer}>
                            {/* <Image style={{resizeMode:'contain', alignItems:'center',
                  justifyContent:'center'}} source={require('../images/login_wechat.png')}/> */}
                            <Text style={{fontSize:16,color:'#1b1b1b'}}>
                                {categoryDataAry[i].name}
                            </Text>
                            </View>
                        {this.renderCategorysView(categoryDataAry[i].prouductItems)}
                        <View style = {{flex:1,justifyContent:'flex-end',alignItems: 'flex-end',marginRight:5}}>

                        </View>
                        </View>
            );
            }
            return displayCategoryAry;
    }




    componentDidMount() {
        // var prouduct = this.props.prouduct;
        // this.setState({
        //   goods: prouduct,
        // });
        this._fetchGoods(12);
    }

    _fetchGoods(spec_id) {

    var thiz = this;
    // Util.post(API.GOODSDETAIL,{'spec_id':spec_id},function (ret){
    //   if(ret.code==0){
    //     thiz.setState({
    //       goods: ret.data,
    //     });
    //   }else{
    //     alert(ret.msg);
    //   }
    // });
    }

    clickBack() {
     this.props.navigator.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar title="商品详情"
                leftIcon={require('../images/back.png')}
                leftPress={this.clickBack.bind(this)}/>
                {this.renderProductDetailView()}
            </View>
        )
    }

    startGroupBuy(){
        this.props.navigator.push({
           component: GroupBuyCar,
            props: {

               }
       })
    }

    renderProductDetailView() {
        var goods = this.state.goods;
        var goodsRecommendItems=[{image:{uri:'http://img.shelive.net/201608/ba70006454058984a1a.jpg'}},{image:{uri:'http://img.shelive.net/201608/ba70006454058984a1a.jpg'}},{image:{uri:'http://img.shelive.net/201608/ba70006454058984a1a.jpg'}}]
        // if(!goods){
        //     return <Loading loadingtext='正在加载商品...'/>
        // }
        //var htmlContent = goods.description||"";
        return (
            <View style={styles.container}>
            <ScrollView
            style={{marginBottom:50}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false}
            >
                <View>
                    <Image
                        style={{width:width,height:375}}
                        source={{uri: goods.image}}
                        />
                    <Text style={{flex:1,color:'#1c1c1c',fontSize:18,margin:10}}>山东烟台大樱桃新鲜水果 露天车厘子美早红灯黑珍珠，纯天然绿色无污染</Text>
                    <View style={{alignItems:'center',flexDirection:'row',
                    justifyContent:'flex-start',margin:10,
                    flex:1}}>
                    <Text style={{alignItems:'center', textAlign: 'left', justifyContent:'flex-start',numberOfLines:1,color:'#e31515',fontSize:20,}}>S$ 20</Text>
                    <Text style={{alignItems:'center',marginLeft:10,flex:7,
                    justifyContent:'center',numberOfLines:1,color:'#757575',fontSize:12}}>3斤装／件</Text>
                    <Text style={{alignItems:'center',marginLeft:10,flex:2,
                    justifyContent:'flex-end',numberOfLines:1,color:'#757575',fontSize:12}}>库存 230</Text>
                    </View>


                    <View style = {{
                        flexDirection:'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        margin:10,
                    }}>
                        <Image style={{resizeMode:'contain', marginRight:5,alignItems:'center',
              justifyContent:'center'}} source={require('../images/fruit_type.png')}/>
                        <Text style={{fontSize:16,color:'#1b1b1b'}}>
                            品质水果
                        </Text>
                        </View>
                        {this.renderCategorysView(goodsRecommendItems)}
                        <View style={{backgroundColor:'#f2f2f2',height:10,flex:1,}}>
                        </View>

                        <Text style={{fontSize:18,color:'#757575',textAlign:'center',marginTop:20}}>
                            商品详情
                        </Text>

                        <Text style={{fontSize:16,color:'#1b1b1b',textAlign:'left',margin:10}}>
                            山东烟台大樱桃新鲜水果 露天车厘子美早红灯黑珍珠，纯天然绿色无污染.山东烟台大樱桃新鲜水果 露天车厘子美早红灯黑珍珠，纯天然绿色无污染
                            山东烟台大樱桃新鲜水果 露天车厘子美早红灯黑珍珠，纯天然绿色无污染.山东烟台大樱桃新鲜水果 露天车厘子美早红灯黑珍珠，纯天然绿色无污染
                        </Text>

                    {/* <HTMLView
                        value={htmlContent}
                        style={styles.container}
                      /> */}
                </View>
            </ScrollView>

            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><CommitButton title={'申请拼团'} onPress = {this.startGroupBuy.bind(this)}></CommitButton></View>
            </View>
        );
    }

    renderCategorysView(prouductItems) {
        const w = width / 3 - 9, h = w

        let renderSwipeView = (types, n) => {
            return (
                <View style={styles.toolsView}>
                    {
                        types.map((item, i) => {
                            let render = (
                                <View style={[{ width: w, height: h ,marginTop:5,marginRight:5,marginBottom:5 }, styles.toolsItem]}>

                                    <Image style={{resizeMode:'contain', alignItems:'center',width: w-2, height: h,
                                    justifyContent:'center',margin:2,
                                    flex:1}} source={item.image}/>
                                </View>
                            )
                            return (
                                isIOS ? (
                                    <TouchableHighlight style={{ width: w, height: h }} key={i} onPress={() => { this.onItemClick(item) }}>{render}</TouchableHighlight>
                                ) : (
                                        <TouchableNativeFeedback style={{ width: w, height: h }} key={i} onPress={() => { this.onItemClick(item) }}>{render}</TouchableNativeFeedback>
                                    )
                            )
                        })
                    }
                </View>
            )
        }
        return (
            renderSwipeView(prouductItems)
        )
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
    line1:{
        height:1,
        backgroundColor:'#dadce2'
    },
    line10:{
        height:10,
        backgroundColor:'#ebeef1'
    },
    textprimary:{
        fontSize:18,
        color:'#4a4d52',
    },
    textsecond:{
        fontSize:18,
        color:'#929aa2',
    },
    textPrice:{
        fontSize:18,
        color:'#fb7e00',
    },
    marginTop10:{
        marginTop:15,
    },
    paddingLeftRight:{
        paddingLeft:10,
        paddingRight:10,
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
    line:{
        height:1,
        backgroundColor: '#eef0f3',
    },
    row: {
        flexDirection: 'row',
    },
    toolsView: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
    },
});
