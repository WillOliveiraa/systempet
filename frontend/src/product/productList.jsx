import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { PRODUCT_FORM } from '../main/util/types';
import CustomButton from '../common/form/CustomButton';

class ProductList extends Component {

    componentWillMount() {
        this.props.getList('products', PRODUCT_FORM);
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
                name: 'Descrição',
                selector: 'description',
                sortable: true,
                right: true,
            },
            {
                name: 'Preço Compra',
                selector: 'purchasePrice',
                sortable: true,
                right: true,
            },
            {
                name: 'Preço Venda',
                selector: 'salePrice',
                sortable: true,
                right: true,
            },
            {
                name: 'Quantidade',
                selector: 'quantity',
                sortable: true,
                right: true,
            },
            {
                name: 'Editar',
                selector: 'edit',
                sortable: true,
                right: true,
                cell: row => <CustomButton row={row} nameBtn='warning' icon='pencil' onClickBtn={() => this.props.showUpdate(row, PRODUCT_FORM)} />,
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
                cell: row => <CustomButton row={row} nameBtn='danger' icon='trash-o' onClickBtn={() => this.props.showDelete(row, PRODUCT_FORM)} />,
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

const mapStateToProps = state => ({ list: state.crud.productsList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
