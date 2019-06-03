import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import 'moment/locale/pt-br';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { SALE_FORM } from '../main/util/types';
import { floatToString, convertStringToDateTime } from '../crud/functions';
import CustomButton from '../common/form/CustomButton';

class SaleList extends Component {

    componentWillMount() {
        this.props.getList('sales', SALE_FORM);
    }

    render() {
        const list = this.props.list || [];
        const columns = [
            {
                name: 'Data',
                selector: 'date',
                sortable: true,
                format: d => moment(convertStringToDateTime(d.date)).format('L') // DD/mm/yyyy
                // format: d => moment(d.date, 'DD/MM/YYYY').format('L') // DD/mm/yyyy
                // format: d => moment(d.date, 'DD/MM/YYYY').format('lll') // 15 Abr 2019 as 12:05
            },
            {
                name: 'Forma de Pagamento',
                selector: 'paymentForm',
                sortable: true
            },
            {
                name: 'Cliente',
                selector: 'name',
                cell: row => row.client[0].name,
                sortable: true
            },

            {
                name: 'Total',
                selector: 'total',
                cell: row => floatToString(row.total),
                sortable: true,
                width: '80px'
            },
            {
                name: 'Editar',
                selector: 'edit',
                sortable: true,
                right: true,
                cell: row => <CustomButton row={row} nameBtn='warning' icon='pencil' onClickBtn={() => this.props.showUpdate(row, SALE_FORM)} />,
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
                cell: row => <CustomButton row={row} nameBtn='danger' icon='trash-o' onClickBtn={() => this.props.showDelete(row, SALE_FORM)} />,
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
                    defaultSortField='date'
                    defaultSortAsc
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({ list: state.crud.salesList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SaleList);
