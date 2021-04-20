const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 防止使用findByIdAndUpdate方法时出现异常
mongoose.set('useFindAndModify', false)
// 连接数据库
mongoose.connect('mongodb://localhost/hero',{useNewUrlParser: true, useUnifiedTopology: true})

// 设计数据库集合结构
const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    classify:{
        type:String,
        required:true
    },
    press:{
        type:String,
        required:true
    }
})
// 导出英雄信息数据库集合
module.exports = mongoose.model('Hero',schema)