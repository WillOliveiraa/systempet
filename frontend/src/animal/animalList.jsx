import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { ANIMAL_FORM } from '../main/util/types';
import CustomButton from '../common/form/CustomButton';

class AnimalList extends Component {

    componentWillMount() {
        this.props.getList('animals', ANIMAL_FORM);
    }

    render() {
        const list = this.props.list || [];
        const columns = [
            {
                name: 'Nome',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Raça',
                selector: 'breed',
                sortable: true,
                right: true,
            },
            {
                name: 'Situação',
                selector: 'situation',
                sortable: true,
                right: true,
            },
            {
                name: 'Data de Nascimento',
                selector: 'birthDate',
                sortable: true,
                right: true,
            },
            {
                name: 'Cor',
                selector: 'color',
                sortable: true,
                right: true,
            },
            {
                name: 'Editar',
                selector: 'edit',
                sortable: true,
                right: true,
                cell: row => <CustomButton row={row} nameBtn='warning' icon='pencil' onClickBtn={() => this.props.showUpdate(row, ANIMAL_FORM)} />,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                width: '56px',
            },
            {
                name: 'Remover',
                selector: 'remove',
                sortable: true,
                right: true,
                cell: row => <CustomButton row={row} nameBtn='danger' icon='trash-o' onClickBtn={() => this.props.showDelete(row, ANIMAL_FORM)} />,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                width: '56px',
            },
        ];
        return (
            <div>
                <DataTable
                    columns={columns}
                    data={list}
                    pagination
                    noHeader
                    defaultSortField='name'
                    // highlightOnHover
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.crud.animalsList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AnimalList);
