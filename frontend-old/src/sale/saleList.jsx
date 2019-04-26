import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { SALE_FORM } from '../main/util/types';
import { floatToString } from '../crud/functions';

class SaleList extends Component {

    componentWillMount() {
        this.props.getList('sales', SALE_FORM);
    }

    renderRows() {
        const list = this.props.list || [];
        // console.log(list);
        return list.map(sale => (
            <tr key={sale._id}>
                <td>{sale.date}</td>
                <td>{sale.paymentForm}</td>
                <td>{sale.client[0].name}</td>
                <td>{floatToString(sale.total)}</td>
                <td>
                    <button
                        className='btn btn-warning' onClick={() =>
                            this.props.showUpdate(sale, SALE_FORM)}
                    >
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button
                        className='btn btn-danger' onClick={() =>
                            this.props.showDelete(sale, SALE_FORM)}
                    >
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div> {/* table-hover */}
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th className='sorting'>Data</th>
                            <th>Forma de Pagamento</th>
                            <th>Cliente</th>
                            <th>Total</th>
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

const mapStateToProps = state => ({ list: state.crud.salesList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SaleList);
