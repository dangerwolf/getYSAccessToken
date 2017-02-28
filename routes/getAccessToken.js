/**
 * Created by SLB on 2017/2/27.
 */
var express = require('express');
var router = express.Router();


//加载配置文件
var cg = require('../config');
//加载request模块
var request = require('request');

//从配置文件中读取萤石云接口的入参
var formData = {
    appKey      :cg.appKey,
    appSecret   :cg.appSecret
};



/* GET users listing. */
router.get('/', function(req, res, next) {
    //以POST的形式发送请求，并在回调过程中，将结果输出给界面
    request.post({url:cg.YSurl, form:formData}, function (error, response, body){

        if (error) {
            res.send('调用失败');
        }else{

            //将获取到json结果解析为js对象
            var jsonObject = JSON.parse(body.toString());
            res.send(jsonObject.data);
            console.log(body);


        }

    });

});

module.exports = router;