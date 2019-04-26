import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

import { init } from '../crud/crudActions';
import LabelAndInput from '../common/form/labelAndInput';
import { PRODUCT_FORM } from '../main/util/types';

class ProductForm extends Component {

    render() {
        const { handleSubmit, readOnly } = this.props;
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field
                        name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome'
                    />
                    <Field
                        name='description' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 4' placeholder='Informe a descrição'
                    />
                    <Field
                        name='purchasePrice' component={LabelAndInput} readOnly={readOnly} //type='number'
                        label='Preço Compra' cols='12 4' placeholder='Informe o preço de compra'
                    />
                    <Field
                        name='salePrice' component={LabelAndInput} readOnly={readOnly}
                        label='Preço Venda' cols='12 4' placeholder='Informe o preço de venda'
                    />
                    <Field
                        name='quantity' component={LabelAndInput} readOnly={readOnly}//type='number'
                        label='Quantidade' cols='12 4' placeholder='Informe a quantidade'
                    />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={() => this.props.init('products', PRODUCT_FORM)}>
                        Cancelar</button>
                </div>
            </form>
        );
    }
}

ProductForm = reduxForm({ form: PRODUCT_FORM, destroyOnUnmount: false })(ProductForm);

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);

export default connect(null, mapDispatchToProps)(ProductForm);
