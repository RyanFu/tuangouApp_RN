import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight,
    Picker,
    AsyncStorage,
    TextInput
} from 'react-native';

import NavBar from '../common/NavBar'
import Dimensions from 'Dimensions'
import Welcome from '../Login/Welcome'
var Global = require('../common/globals');
var width = Dimensions.get('window').width;

export default class DownloadExcelView extends Component {
    constructor(props) {
        super(props)

    }


    back() {
        this.props.navigator.pop()
    }
    _logout_function(){

        //logout here
        this._removeStorage();
        //logout success go 2 call page
        // var routes = this.props.navigator.state.routeStack;
        // for (var i = routes.length - 1; i >= 0; i--) {
        //     if(routes[i].name === "MyDestinationRoute"){
        //     var destinationRoute = this.props.navigator.getCurrentRoutes()[i]
        //     this.props.navigator.popToRoute(destinationRoute);
        //
        //     }
        // }
        this.props.navigator.resetTo({
            component: Welcome,
            name: 'Welcome'
        })
    };
    async _removeStorage() {
        Global.UserInfo = null;
            AsyncStorage.removeItem('k_login_info').then((value) => {

            }
            ).done();

        }

        onExcelSendMailPress(){
            alert('发送成功')
        }


    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="下载Excel表"
                    leftIcon={require('../images/back.png')}
                    leftPress={this.back.bind(this)} />
                    <View style={[{justifyContent:'center', alignItems:'center',marginTop: 10 }]}
                        >
                        <Image style={{resizeMode:'contain', alignItems:'center',width: 70, height: 70,
                        justifyContent:'center',margin:2,}} source={require('../images/excel_icon.png')}/>

                        <Text style={{textAlign:'center',marginTop:20,fontSize:14,color:'#1b1b1b'}}>我们会将生成的Excel表发送到您的邮箱</Text>

                        <TextInput  style={{marginTop:20,marginLeft:0,fontSize: 14,width:width-70,height:50,
                         textAlign: 'left',color: '#1c1c1c',}}
                         editable={true}
                         placeholder="请输入邮箱"
                         onChangeText={(text) => this.setState({ mail: text })}
                         ></TextInput>

                        <TouchableOpacity style= {{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft:10,
                            width:width-70,
                            marginTop:20,
                            paddingRight:10,
                            backgroundColor:'#ea6b10',
                            borderColor: '#ea6b10',
                            borderWidth: 1,
                            borderRadius: 50,
                            height: 49,

                        }} onPress = {this.onExcelSendMailPress.bind(this)} >
                        <View style= {{justifyContent: 'center',alignItems:'center',flex:1,}}>
                        <Text style= {{fontSize:18,color:'#ffffff',textAlign:'center',}}>确认</Text>

                        </View>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }


}


const styles = StyleSheet.create({

    btnLogout: {
        marginTop: 30,
        height: 50,
        width: width,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
},
logoutText: {
    color: '#ea6b10',
    fontSize: 16,
},
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    defaultText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    itemView:
    {
        alignSelf: 'stretch',
        // justifyContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: width,
        borderColor: 'gray',
        borderWidth: 0.5,
        flexDirection: 'row',
        backgroundColor: 'white'
    }
})