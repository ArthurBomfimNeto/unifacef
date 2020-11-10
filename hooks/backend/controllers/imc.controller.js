// criar o modelo de dados
let IMC = require('../models/imc.model')

let imcController = {
    // rota para inserção de uma conta de IMC
    insere: async (req, resp) => {
        let nome = req.body.nome
        let peso = req.body.peso
        let altura = req.body.altura
        let imc = peso / (altura * altura)

        let resposta = {
            nome: nome,
            peso: peso,
            altura: altura,
            imc: imc
        }
        // vamos inserir o IMC calculado no banco de dados
        var novo = IMC(resposta) // cria um objeto do tipo IMC
        novo.save() // salva no banco de dados

        // envia resultado para usuário
        resp.json(resposta)
    },

    // rota para recuperar os IMCs
    busca: async (req, resp) => {
        IMC.find()
            .then(todosimcs => {
                resp.json(todosimcs)
            })
    },

    // rota para remover um IMC
    remove: async (req, res) => {
        // remove o IMC cujo _id é o id passado pelo usuário
        IMC.deleteOne({ _id: req.params.id })
            .then(resultado => {
                console.log(`Removeu com sucesso`)
                res.status(200).json(resultado)
            })
    },

    atualiza: async (req, res) => {
        // atualiza o IMC cujo _id é o id passado pelo usuário
        IMC.updateOne({ _id: req.params.id }, {
            nome: req.body.nome,
            peso: req.body.peso,
            altura: req.body.altura,
            imc: (req.body.peso / (req.body.altura * req.body.altura))
        })
            .then(resultado => {
                console.log(`Atualizou com sucesso`)
                res.json(resultado)
            })
    }
}

module.exports = imcController