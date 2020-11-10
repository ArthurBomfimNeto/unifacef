import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '', rg: '', cpf: '', civil: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    // consome a API e traz os dados do usuário para a lista
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // limpa os campos do formulário
    clear() {
        this.setState({ user: initialState.user })
    }

    // insere ou altera um usuário
    save() {
        const user = this.state.user
        // o método escolhido é de acordo com o id (se tiver), put, senão tiver id, post
        const method = user.id ? 'put' : 'post'
        // url vai conter o id do usuário caso seja para atualização
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                // obtem a lista atualizada (com o usuário novo ou usuário alterado)
                const list = this.getUpdatedList(resp.data)
                // limpar os dados do campo do formulário
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        // ordena a lista colocando no topo o usuário inserido ou alterado
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    // altera o valor da propriedade do usuário o campo do formulário for alterado
    updateField(event) {
        // ... (spread)
        const user = { ...this.state.user }
        // altera a propriedade específica do usuário com o valor digitado
        user[event.target.name] = event.target.value
        // atualiza o valor do usuário
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                
                
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>RG </label>
                            <input type="text" className="form-control"
                                name="rg"
                                value={this.state.user.rg}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o rg ..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="cpf"
                                value={this.state.user.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CPF..." />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado Civil </label>
                            <select value={this.state.user.civil} className="form-control" name="civil" onChange={e => this.updateField(e)}>
                                <option value="casado"> Casado </option>
                                <option value="solteiro"> Solteiro </option>
                                <option value="viuva"> Viuva </option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    // carrega os dados atuais do usuário
    load(user) {
        this.setState({ user })
    }
    // remove um usuário
    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }
    // desenha a tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>RG</th>
                        <th>CPF</th>
                        <th> Estado Civil </th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        // percorrendo todos os usuários
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.rg}</td>
                    <td> {user.cpf} </td>
                    <td> {user.civil} </td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}