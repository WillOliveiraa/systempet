import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { ANIMAL_FORM } from '../main/util/types';

class AnimalList extends Component {

    componentWillMount() {
        this.props.getList('animals', ANIMAL_FORM);
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map(ani => (
            <tr key={ani._id}>
                <td>{ani.name}</td>
                <td>{ani.breed}</td>
                <td>{ani.situation}</td>
                <td>{ani.birthDate}</td>
                <td>{ani.color}</td>
                <td>
                    <button
                        className='btn btn-warning' onClick={() =>
                            this.props.showUpdate(ani, ANIMAL_FORM)}
                    >
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button
                        className='btn btn-danger' onClick={() =>
                            this.props.showDelete(ani, ANIMAL_FORM)}
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
                            <th>Raça</th>
                            <th>Situação</th>
                            <th>Data de Nascimento</th>
                            <th>Cor</th>
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

const mapStateToProps = state => ({ list: state.crud.animalsList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AnimalList);
