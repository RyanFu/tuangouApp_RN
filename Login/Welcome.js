import React, { Component } from 'react';
import HttpRequest from '../HttpRequest/HttpRequest'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    Image,
    Alert,
    Platform,
    ActivityIndicator

} from 'react-native';
var  WeChat = require('react-native-wechat');
import Dimensions from 'Dimensions';
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import TabView from '../Main/TabView'
// import * as WeChat from 'react-native-wechat';

var Global = require('../common/globals');
var width = Dimensions.get('window').width;
var index;
export default class Welcome extends Component {
    constructor(props) {
        super(props)
        index = this.props.index;
        isIOS = false;
        this.state = {
            isHaveWX : true,
        }
    }



componentDidMount() {
    WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled){
                this.setState({
                    isHaveWX : true,

                })
                console.log('isHaveWX1 :'+this.state.isHaveWX)
            }else {
                this.setState({
                    isHaveWX : false,
                })
                console.log('isHaveWX2 :'+this.state.isHaveWX)
            }
        });

}
    onLoginWXPress() {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled){
                    WeChat.sendAuthRequest('snsapi_userinfo', '63a7a33c0b5b75d1f44b8edb7a4ea7cd').then(res => {
                    // WeChat.sendAuthRequest('snsapi_userinfo', '8f124947d450ee56458828481d183889').then(res => {
                        console.log('wx login result=' + JSON.stringify(res));

                        if (res.errCode == 0) {
                            AsyncStorage.setItem('k_wx_auth_info', JSON.stringify(res), (error, result) => {
                                if (error) {
                                    console.log('save k_wx_auth_info faild.')
                                }
                            })
                            Global.wxAuth = res;
                            this.onGetWxToken('wx22795e8274245d59', res.code)
                            // this.onGetWxToken('wx3dfb837875e773af', res.code)

                        }
                        else {
                            alert('Login faild, please try again.1')
                        }
                    })
                }else {
                    Alert.alert(
                        '提示',
                        '没有安装微信软件，您可以前往AppStore安装微信之后再进行绑定登录',
                        [


                            {text: 'OK', onPress: this.onPressToWeChat.bind(this)},
                        ],
                        { cancelable: false }
                    )
                }
            });

    }
    onLoginPress() {
        this.props.navigator.push({
            component: LoginView,
        })

    }
    onPressToWeChat(){

    }
    onRegiserPress() {
        this.props.navigator.push({
            component: RegisterView,
        })
    }

    onGetWxToken(appid, code) {
        let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=63a7a33c0b5b75d1f44b8edb7a4ea7cd&code=' + code + '&grant_type=authorization_code'
        // let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=8f124947d450ee56458828481d183889&code=' + code + '&grant_type=authorization_code'
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.text())
            .then((responseText) => {
                console.log("responseText2:" + responseText);
                var response = JSON.parse(responseText);
                Global.wxToken = response;

                AsyncStorage.setItem('k_wx_token_info', responseText, (error, result) => {
                    if (error) {
                        console.log('save k_wx_token_info faild.')
                    }
                })

                this.onGetWxUserInfo(response.access_token, response.openid)
            })
            .catch(function (err) {
                console.log('get wx token error:' + err)
                alert('Login faild, please try again.2')
            });
    }

    onGetWxUserInfo(token, openid) {
        let url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + token + '&openid=' + openid
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.text())
            .then((responseText) => {
                console.log("responseText3:" + responseText);
                var response = JSON.parse(responseText);
                Global.wxUserInfo = response;

                AsyncStorage.setItem('k_wx_user_info', responseText, (error, result) => {
                    if (error) {
                        console.log('save k_wx_user_info faild.')
                    }
                })

                this.onLoginWithWxInfo(response)
            })
            .catch(function (err) {
                console.log('get wx token error:' + err)
                alert('Login faild, please try again.3')
            });
    }

    onLoginWithWxInfo(userInfo) {
        HttpRequest.post('/v2','/api.user.login.app', userInfo, this.onLoginSuccess.bind(this),
            (e) => {
                try {
                    var errorInfo = JSON.parse(e);
                    console.log(errorInfo.description)
                    if (errorInfo != null && errorInfo.description) {
                        console.log(errorInfo.description)
                    } else {
                        console.log(e)
                    }
                }
                catch (err) {
                    console.log(err)
                }

                console.log(' error:' + e)
                // alert('Login faild, please try again.4')
            })
    }

    onLoginSuccess(response) {

        console.log('login success'+JSON.stringify(response))
        console.log('login successToken:'+response.data.token)
        AsyncStorage.setItem('k_http_token',response.data.token, (error, result) => {

            if (error) {
                console.log('save k_http_token faild.')
            }else {
                console.log('save k_http_token result:'+result)
            }
        })

        Global.token = response.data.token
        HttpRequest.get('/v2','/api.user.info', {}, this.onGetUserInfoSuccess.bind(this),
            (e) => {
                console.log(' usererror:' + e)
            })


    }

    onGetUserInfoSuccess(response) {
        Global.user_profile = response.data.user_profile
        Global.agent_url = response.data.user_profile.agent_url
        Global.nickname = response.data.user_profile.nickname
        Global.headimgurl =response.data.user_profile.headimgurl
        Global.role = response.data.user_profile.role
        Global.agree_ua = response.data.user_profile.agree_ua
        console.log('Global.user_profile :'+JSON.stringify(Global.user_profile))
        this.props.navigator.resetTo({
            component: TabView,
            name: 'MainPage'
        })
    }
    renderBtnView(){
        console.log(' isIOS1:' + isIOS)
        if (this.state.isHaveWX === true && isIOS === true){
            return(

            <View style={styles.btnView}>

                <TouchableOpacity onPress={this.onLoginWXPress.bind(this)}
                                  style={styles.loginButton}>
                    <View style={styles.logincontainer}>
                        <Image style={{
                            resizeMode: 'contain', alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }} source={require('../images/login_wechat.png')} />
                        <Text style={[styles.loginWXText, { marginTop: 5 }]} >
                            微信登录
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
                // <View style={styles.btnView}>
                //
                //     <TouchableOpacity onPress={this.onLoginWXPress.bind(this)}
                //                       style={styles.loginButton}>
                //         <View style={styles.logincontainer}>
                //             <Image style={{
                //             resizeMode: 'contain', alignItems: 'center',
                //             justifyContent: 'center',
                //             flex: 1
                //         }} source={require('../images/login_wechat.png')} />
                //             <Text style={[styles.loginWXText, { marginTop: 5 }]} >
                //                 微信登录
                //             </Text>
                //         </View>
                //     </TouchableOpacity>
                //     <TouchableOpacity onPress={this.onLoginPress.bind(this)}
                //                       style={styles.loginButton}>
                //         <View style={styles.logincontainer}>
                //             <Image style={{
                //             resizeMode: 'contain', alignItems: 'center',
                //             justifyContent: 'center',
                //             flex: 1
                //         }} source={require('../images/loginAccount.png')} />
                //             <Text style={[styles.loginAccountText, { marginTop: 5 }]} >
                //                 账号登录
                //             </Text>
                //         </View>
                //     </TouchableOpacity>
                // </View>
            )
        }else if(this.state.isHaveWX === true && isIOS === false){
            return(
                <View style={styles.btnView}>

                    <TouchableOpacity onPress={this.onLoginWXPress.bind(this)}
                                      style={styles.loginButton}>
                        <View style={styles.logincontainer}>
                            <Image style={{
                            resizeMode: 'contain', alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }} source={require('../images/login_wechat.png')} />
                            <Text style={[styles.loginWXText, { marginTop: 5 }]} >
                                微信登录
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )
        }else {
            return(
                <View style={styles.btnView}>

                    <TouchableOpacity onPress={this.onLoginPress.bind(this)}
                                      style={styles.loginButton}>
                        <View style={styles.logincontainer}>
                            <Image style={{
                            resizeMode: 'contain', alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }} source={require('../images/loginAccount.png')} />
                            <Text style={[styles.loginAccountText, { marginTop: 5 }]} >
                                账号登录
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )
        }

    }
    render() {
        console.log('OS: '+Platform.OS)
        if(Platform.OS === 'ios'){
            isIOS = true
        }else {
            isIOS = false
        }
        return (
            <View style={styles.rootcontainer}>
                <Image style={{
                    resizeMode: 'contain', alignItems: 'center',
                    marginTop: 120,
                    justifyContent: 'center'
                }}
                    source={require('../images/logo_icon.png')} />
                <Text style={{
                    alignItems: 'center', marginTop: 5,
                    color: '#dc6917',
                    fontSize: 16,
                    justifyContent: 'center',
                    letterSpacing: 5,
                    flex: 1
                }} >
                    用 心 为 您 精 挑 细 选
            </Text>

                {this.renderBtnView()}


            </View>
        )
    }
}

const styles = StyleSheet.create(
    {

        buttonText: {
            color: '#ffffff',
            fontSize: 45,
            fontWeight: 'bold',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            marginTop: 20,
            alignSelf: 'center',
            height: 100,
            width: 100,
            resizeMode: Image.resizeMode.contain,
        },
        logincontainer:
        {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        rootcontainer:
        {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#ebebeb',
        },
        btnView:
            {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin:50,
            },
        loginWXText:
        {
            color: '#8dc81b',
            fontSize: 14,
            fontFamily:'PingFangSC-Light',
            textAlign:'center'
        },
        loginAccountText:
        {

            color: 'rgb(219,105,24)',
            fontSize: 14,
            fontFamily:'PingFangSC-Light',
            textAlign:'center'
        },
        labelText:
        {
            marginTop: 70,
            color: '#ffffff',
            fontSize: 45,
            backgroundColor: '#00000000'
        },

        loginButton:
        {
            height: 100,
            width: width / 2 - 40,
            flexDirection: 'row',
            justifyContent: 'center',

        },
    });
