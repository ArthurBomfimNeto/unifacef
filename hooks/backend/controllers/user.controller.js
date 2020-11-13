let User = require('../models/user.model')

let userController = {
    // rota para inserção 
    insere : async (req, res) => {
        let username = req.body.username
        let password = req.body.password

        // cria um objeto para salvar 
        var novo = User({username: username, password: password})
        // envia o resultado para o frontend 
        novo.save()
        //envia o resultado para o frontend 
        res.json(novo)
    },
    busca : async (req, res) => {
        User.find()
        .then (todosUsers => {
            res.json(todosUsers) // retorna para FRONT todos os usuarios 
        })
    }
}

module.exports = userController