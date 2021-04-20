const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/hero',{useNewUrlParser: true, useUnifiedTopology: true})

//设计数据库集合结构
const schema = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createTime:{
        type:Date,
        default:Date.now
    },
    lastTime:{
        type:Date,
        default:Date.now
    }

})
// 导出用户信息数据库集合
module.exports = mongoose.model('User',schema)