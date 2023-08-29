import { Component } from "react";
import Main from "../template/Main";
import axios from 'axios';


// props do componente header
const headerProps = {
    icon: "users",
    title: "Usuarios",
    subtitle: "Cadastro de Usuário: Incluir, Listar, Excluir, Criar e Alterar"
}
const basedUrl = 'http://localhost:3001/user'// url dos dados

// estado inicial com os campos vazios
const initialState = {
    user: {email: '', name: ''},
    list: []
}

export default class UserCrud extends Component{

    state = {...initialState}// clonando o estado inicial com o operador spred

    componentWillMount(){
        axios(basedUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }
    clear(){
        this.setState({ user: initialState.user})
         //limpando os valores de usuario, setando o estado inicial
    }
    save(){
        const user = this.state.user //pegando a referencia de usuario no estado
        const method = user.id ? 'put' : 'post'
        // se houver um id use put para substituir, se não use post para adicionar
        const url = user.id ? `${basedUrl}/${user.id}` : basedUrl
    // verificação se o usuario existe se existir altera ele, senão usa a url padrão 
        axios[method](url, user)
            .then(resp =>{
                const list = this.getUpadateList(user)
                /* passa o usuario do webservice como parametro, o json server vai
                 persistir esse dado no db.json da pasta backend desse projeto e nos retornar
                  o usuario com id preechido e atualizado */

                this.setState({user: initialState.user, list: list})
                //pos formulário ser usado ele limpa tudo e atualiza a lista
            })
    }
    getUpadateList(user, add=true){
        // atualiza a lista e passa os elementos adicionados para o começo da lista
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add)list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    // função que renderiza o formulário 
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

    load(user){
        this.setState({user})
    }
    //função que remove o usuario e atualiza a lista com todos os dados
    remove(user){
        axios.delete(`${basedUrl}/${user.id}`).then(resp =>{
            const list = this.getUpadateList(user, false)
            this.setState({ list })
            })
    }
    //função que redenderiza as tabelas
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // transforma em componente depois...
    // função que rederiza as linhas
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="btn-table">
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

    render(){
        return(
            //props que foram declaradas no começo desse componente
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}