import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getList, showUpdate, showDelete } from '../crud/crudActions';
import { PRODUCT_FORM } from '../main/util/types';

class ProductList extends Component {

    componentWillMount() {
        this.props.getList('products', PRODUCT_FORM);
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map(pro => (
            <tr key={pro._id}>
                <td>{pro.name}</td>
                <td>{pro.description}</td>
                <td>{pro.purchasePrice}</td>
                <td>{pro.salePrice}</td>
                <td>{pro.quantity}</td>
                <td>
                    <button
                        className='btn btn-warning' onClick={() =>
                            this.props.showUpdate(pro, PRODUCT_FORM)}
                    >
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button
                        className='btn btn-danger' onClick={() =>
                            this.props.showDelete(pro, PRODUCT_FORM)}
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
                            <th>Descrição</th>
                            <th>Preço Compra</th>
                            <th>Preço Venda</th>
                            <th>Quantidade</th>
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

const mapStateToProps = state => ({ list: state.crud.productsList });
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
