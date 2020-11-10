import React, {useState} from 'react'
import axios from 'axios'
export default function Exemplo4() {

//inicializando os campos do formulario 
const camposIniciais = {nome:"", peso:0, altura:1, imc:0}
//definir os setters do campos 
//campos represenya todas as variaveis 
const [campos, setCampos] = useState(camposIniciais)

const handleChange = (e) => {
    //recupera nome e valor do componente que sofreu o evento
    const {name, value} = e.target
    //altera o campo definindo por
    setCampos({...campos, [name]: value})
}

//vamos fazer o calcula
const calculaImc = () => {
    let url = 'http://localhost:3003/imc'
    axios.post(url, campos)
    .then(resposta => {
        //mostra p imc calculado 
        console.log(resposta.data)
        //define o campo da estrutura campos que sera alterado 
        let campo = 'imc'
        // altera o estado da variaveis campos, mudando o campo imc para o novo valor vindo do servidor 

        setCampos({...campos, [campo]: resposta.data.imc})
    })
}

return(
<div className="container">
    <form>
        <div className="form-group">
            <label>Nome</label>
            <input type="text" className="form-control" name="nome" value={campos.nome} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label>Peso</label>
            <input type="number" className="form-control" name="peso" value={campos.peso} onChange={handleChange}/>
        </div>
        <div className="form-group">
             <label>Altura</label>
            <input type="number" className="form-control" name="altura" value={campos.altura} onChange={handleChange}/>
        </div>
        <div>
            <button type="button" className="btn btn-primary" onClick={calculaImc}>Calcula</button>
        </div>
        <div>
            IMC: {campos.imc.toFixed(2)}
        </div>
    </form>
</div>
)
}