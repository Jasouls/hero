const express = require('express')
const md5 = require('blueimp-md5')
const router = express.Router()

//导入用户信息数据库集合
const User = require('./models/use')
//导入英雄信息数据库集合
const Hero = require('./models/herolist')


//注册登录路由配置

//登录页面渲染
router.get('/',(req,res) => {
    res.render('log.html')
})
//登录页面post请求处理以及重定向
router.post('/',(req,res) => {
    let body = req.body
    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },function(error,data){
        if(error){
            return res.status(500).send("Server Error")
        }
        if(!data){
            return res.render('log.html',{
                errMes:'邮箱或密码错误',
                form:body
            })
        }
        req.session.user = data
        res.redirect('/home')
    })
})
//注册页面渲染
router.get('/reg',(req,res) => {
    res.render('reg.html')
})
//注册页面的post请求处理，包括验证是否存在、双重MD5加密、保存登录信息、重定向
router.post('/reg',(req,res) => {
    let body = req.body
    User.findOne({
        $or:[
            {email:body.email},{username:body.username}
        ]
    },function(error,data){
        if(error){
            return res.status(500).send("Error")
        }
        
        if(data){
            return res.render('reg.html',{
                errMes:'邮箱或用户名已存在',
                form:body
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save(function(error,user){
            if(error){
                return res.status(500).send("Error")
            }
            req.session.user = user
            res.redirect('/home')
        })
    })
})
//退出登录处理
router.get('/logout',(req,res) => {
    req.session.user = null
    res.redirect('/')
})




//后台管理系统的增删改查
//登录后主页面渲染
router.get('/home',(req,res) => {
    Hero.find(function(error,data){
        if(error){
            return res.status(500).send("Server Error")
        }
        res.render('home.html',{
            user:req.session.user,
            herolist:data
        })
    })
    
})
//渲染添加页面
router.get('/addhero',(req,res) => {
    res.render("addhero.html")
})
//添加页面post提交到mongodb数据库
router.post('/addhero',(req,res) => {
    let body = req.body
    new Hero(body).save(function(error){
        if(error){
            return res.status(500).send("Server Error")
        }
        res.redirect('/home')
    })
})
//渲染修改页面
router.get('/change',(req,res) => {
    Hero.findById(req.query.id.replace(/"/g,''),function(error,data){
        if(error){
            return res.status(500).send('Server Error')
        }
        res.render('change.html',{
            herolist:data
        })
    })
})
//修改页面post提交处理
router.post('/change',(req,res) => {
    const id = req.body.id.replace(/"/g,'')
    Hero.findByIdAndUpdate(id,req.body,function(error){
        if(error){
            return res.status(500).send("Server Error")
        }
        res.redirect('/home')
    })
})
//删除数据处理并刷新当前页面
router.get('/delete',(req,res) => {
    const id = req.query.id.replace(/"/g,'')
    Hero.findByIdAndRemove(id,function(error){
        if(error){
            return res.status(500).send("Server Error")
        }
        res.redirect('/home')
    })
})
// 导出路由模块
module.exports = router