const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')

const router = require('./router')

// 开放文件访问权限,通过指定标识访问目标路径
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')))
app.use('/public/',express.static(path.join(__dirname,'./public')))

// 引入及配置模板引擎默认渲染目录
app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views'))

// 配置post请求的请求体,拿到req.body
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// 配置session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))

// 挂载路由
app.use(router)

//启动端口为3000的本地服务
app.listen(3000,function(){
    console.log("running......")
})