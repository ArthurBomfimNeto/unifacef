// importa dependência do express
let express = require('express')
// cria o servidor express
server = express()

// importa dependência do cors
let cors = require('cors')
// configura o servidor para usar cors - torna as rotas públicas
server.use(cors())

// import dependência body-parser
let bodyParser = require('body-parser')

// configura o servidor para usar o body-parser
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())


// importar dependência mongoose
let mongoose = require('mongoose')
// vamos conectar no BD
mongoose.connect('mongodb://localhost/imc', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

let UserController = require('./controllers/user.controller')

let ImcController = require('./controllers/imc.controller')
const { busca } = require('./controllers/imc.controller')
const { insere } = require('./controllers/user.controller')


server.get('/imc', ImcController.busca)
server.post('/imc', ImcController.insere)
server.delete('/imc/:id', ImcController.remove)
server.put('/imc/:id', ImcController.atualiza)

//cria as rotas para o user
//get
//post
server.get('/user', UserController.busca)
server.post('/user',UserController.insere)


server.listen(3003, () => {
    console.log(`Servidor ouvindo na porta 3003`)
})