// importar dependência mongoose
let mongoose = require('mongoose')
let User = require('./user.model')

// criar o esquema do banco de dados
let Schema  = mongoose.Schema
let imcSchema = new Schema({
    nome: {type:String, required: true},
    peso: {type:Number, required: true},
    altura: {type:Number, required: true},
    imc: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'} // Para criar a referencia do User
})


module.exports = mongoose.model('ImcData', imcSchema) 