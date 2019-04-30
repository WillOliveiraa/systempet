import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { CLIENT_FORM } from '../main/util/types';
import CustomButton from '../common/form/CustomButton';

class ClientList extends Component {

    componentWillMount() {
        this.props.getList('clients', CLIENT_FORM);
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
                name: 'CPF',
                selector: 'cpf',
                sortable: true,
                right: true,
            },
            {
                name: 'E-mail',
                selector: 'email',
                sortable: true,
                right: true,
            },
            {
                name: 'Celular',
                selector: 'cellphone',
                sortable: true,
                right: true,
            },
            {
                name: 'Editar',
                selector: 'edit',
                sortable: true,
                right: true,
                cell: row => <CustomButton row={row} nameBtn='warning' icon='pencil' onClickBtn={() => this.props.showUpdate(row, CLIENT_FORM)} />,
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
                cell: row => <CustomButton row={row} nameBtn='danger' icon='trash-o' onClickBtn={() => this.props.showDelete(row, CLIENT_FORM)} />,
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
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.crud.clientsList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
