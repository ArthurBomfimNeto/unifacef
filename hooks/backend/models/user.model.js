// importar dependência mongoose
let mongoose = require('mongoose')

// criar o esquema do banco de dados
let Schema  = mongoose.Schema
let userSchema = new Schema({
    username: {type:String, required: true},
    password: {type:Number, required: true}
})


module.exports = mongoose.model('User', userSchema) 