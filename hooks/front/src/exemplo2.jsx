import React from 'react'
import {useForm} from 'react-hook-form'

export default function Exemplo2(){
    //criar um registrador
    const {register, handleSubmit} =useForm()

    //cria a função do IMC
    //dados_form contém os dados do formulário
    const calcular = dados_form => {
        alert(dados_form.peso / (dados_form.altura * dados_form.altura))
    }

    return (
        // no submit do formulário, vai chamar a função calcular
        <form onSubmit={handleSubmit(calcular)}>
            <label> Peso </label>
            <input ref={register} name="peso"/>
            <label> Altura </label>
            <input ref={register} name="altura"/>
            <button> Enviar </button>
        </form>
    )
}