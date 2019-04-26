import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { CLIENT_FORM } from '../main/util/types';

class ClientList extends Component {

    componentWillMount() {
        this.props.getList('clients', CLIENT_FORM);
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map(cli => (
            <tr key={cli._id}>
                <td>{cli.name}</td>
                <td>{cli.cpf}</td>
                <td>{cli.email}</td>
                <td>{cli.cellphone}</td>
                <td>
                    <button
                        className='btn btn-warning' onClick={() =>
                            this.props.showUpdate(cli, CLIENT_FORM)}
                    >
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button
                        className='btn btn-danger' onClick={() =>
                            this.props.showDelete(cli, CLIENT_FORM)}
                    >
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>E-mail</th>
                            <th>Celular</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.crud.clientsList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
