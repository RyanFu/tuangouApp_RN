import { AsyncStorage } from 'react-native';

const apiAddr = 'http://47.88.139.113:3000/api/v1'
var httpToken = ''
var Global = require('../common/globals');

module.exports = {
    get(apiName, body, successCallback, failCallback) {
        if (!httpToken || !httpToken.length) {
            httpToken = Global.token;

            AsyncStorage.getItem('k_http_token', function (errs, result) {
                if (!errs) {
                    httpToken = result
                    console.log('httpToken = ' + httpToken)
                }
                else {
                    console.log('get http token error:' + errs)
                }
            });
        } 

        var param = ""
        var url = apiAddr + apiName + '?format=json'
        for (var element in body) {
            param += element + "=" + body[element] + "&";
        }
        url = url + "&" + param;

        console.log('Get requesr:' + url)
        if (httpToken == null) httpToken = ''
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': httpToken
            }),
        })
            .then((response) => response.text())
            .then((responseText) => {
                console.log("responseText:" + responseText);
                var response = JSON.parse(responseText);
                if (response.code == 1) {
                    successCallback(response);
                } else {
                    failCallback(responseText)
                }

            })
            .catch(function (err) {
                failCallback(err);
            });

    },

    post(apiName, body, successCallback, failCallback) {
        if (!httpToken || !httpToken.length) {
            httpToken = Global.token;

            AsyncStorage.getItem('k_http_token', function (errs, result) {
                if (!errs) {
                    httpToken = result
                    console.log('httpToken = ' + httpToken)
                }
                else {
                    console.log('get http token error:' + errs)
                }
            });
        }

        var url = apiAddr + apiName
        try {
            console.log('Post requesr:' + url + ":[param body]=" + JSON.stringify(body))
        } catch (e) {

        } finally {

        }

        if (httpToken == null) httpToken = ''
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': httpToken
            }),
            body: JSON.stringify(body)
        })
            .then((response) => response.text())
            .then((responseText) => {
                console.log(responseText);
                var response = JSON.parse(responseText);
                if (response.code == 1) {
                    successCallback(response);
                } else {
                    failCallback(responseText)
                }

            })
            .catch(function (err) {
                failCallback(err);
            });
    }
}
