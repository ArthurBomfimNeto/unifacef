import React, {useState} from 'react'

export default function Exemplo3(){
    // definição da variaveis com seus respectivos setters - useState()
    const [peso, setPeso] = useState(0)
    const [altura, setAltura] = useState(1)
    const [imc, setImc] = useState(0)

    const calculaImc = e => {
        setImc(Number(peso)/ Number(altura*altura))
    }
    return(
        <div className="container">
            <form>
                <div className="form-group">
                    <label>Peso</label>
                    <input type="number" className="form-control" value={peso} onChange={(e) => setPeso(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Altura</label>
                    <input type="number" className="form-control" value={altura} onChange={(e) => setAltura(e.target.value)}/>
                </div>

                <div className="form-group">
                   <button type="button" className="btn btn-primary" onClick={calculaImc}>Calcula</button>
                </div>

                <div className="form-group">
                    IMC: {imc}
                </div>
            </form>
        </div>
    )
}   
