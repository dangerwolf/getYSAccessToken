



[TOC]



# 萤石云

使用萤石云SDK过程中，需要根据管理员的appKey和secret获取accessToken。

具体请参看网页：https://open.ys7.com/doc/book/index/user.html



# Node.js

如电脑中未安装Node.js环境，请访问官网https://nodejs.org/进行安装。

![](http://ww1.sinaimg.cn/large/41164137ly1fd65gqldqhj20ql0g4jvl)

安装完毕后，可在终端或者命令行中使用版本查看命令查看版本。

~~~
node -v
~~~

笔者的版本是v6.9.2





# WebStorm

笔者使用的Node.js的IDE是下载于官网的WebStorm。https://www.jetbrains.com/webstorm/download/

请根据自己的操作系统下载对应系统版本的IDE。

![](http://ww1.sinaimg.cn/large/41164137ly1fd65d1natpj20r50bqtaj)

笔者的运行环境

~~~
WebStorm 2016.3.3
Build #WS-163.12024.17, built on January 31, 2017
Licensed to wolf

JRE: 1.8.0_112-release-408-b6 x86_64
JVM: OpenJDK 64-Bit Server VM by JetBrains s.r.o
~~~



# 创建一个Node.js Express App项目

## 新建项目

打开WebStorm后，新建一个Express项目。

![](http://ww1.sinaimg.cn/large/41164137ly1fd65ktfex0j20ii0bbdhf)

如需精简，可将新建项目中关于index和users的部分删除。如无特别介意，可以无视。



## 创建配置文件

在项目文件下，新建配置文件`config.js`。代码如下：

~~~javascript
/**
 * Created by SLB on 2017/2/27.
 */
var  cg = {
    appKey 		:'此处填写从萤石云处获得的管理appKey',
    appSecret 	:'此处填写从萤石云处获得的管理appSecret',
    YSurl     	:'https://open.ys7.com/api/lapp/token/get'
};

module.exports = cg;
~~~



## 修改npm依赖的package.json文件

因为调用了`request`模块，请在`package.json`中添加相应的依赖`"request": "^2.79.0"`。

`package.json`代码如下：

~~~json
{
  "name": "getysaccesstoken",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.16.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.0",
    "express": "~4.14.1",
    "jade": "~1.11.0",
    "morgan": "~1.7.0",
    "request": "^2.79.0",
    "serve-favicon": "~2.3.2"
  }
}
~~~



## 创建getAccessToken.js文件

在项目的`routes`文件下，创建`getAccessToken.js`文件。代码如下：

```javascript
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
```



## 修改app.js文件

在`app.js`文件中添加如下代码：

~~~javascript
app.use('/getAccessToken', getAccessToken);
var getAccessToken = require('./routes/getAccessToken');
~~~



# 运行

启动项目后，在浏览器中输入临时测试地址

~~~
http://localhost:3000/getAccessToken
~~~



可得到类似如下的结果：

~~~json
{"accessToken":"at.3gsl6cr0dsbnf56g9se4651z22pndsse-51b2qo3irt-1k84exf-hqaplr3ln","expireTime":1488865214921}
~~~



# 源代码地址

源代码请访问https://github.com/dangerwolf/getYSAccessToken.git



~~~
https://github.com/dangerwolf/getYSAccessToken.git
~~~



