import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

import { init, create, update, remove, getList, changeProvider, changeDate } from '../crud/crudActions';
// import LabelAndInput from '../common/form/labelAndInput';
import ItemList from '../sale/itemList';
import Summary from '../sale/summary';
import LabelAndSelect from '../common/form/labelAndSelect';
import { PURCHASE_FORM, PROVIDER_FORM } from '../main/util/types';
import { PAYMENTS_FORM } from '../main/util/string';
import LabelAndSelectSimple from '../common/form/labelAndSelectSimple';
import DatePicker from '../common/form/labelAndInputPicker';
import { setDateTime, convertStringToDateTime } from '../crud/functions';

class PurchaseForm extends Component {

    componentWillMount() {
        this.props.getList('providers', PROVIDER_FORM);
    }

    componentDidMount() {
        if (this.props.providerId !== undefined) this.props.changeProvider(this.props.providerId[0]._id);
    }

    onSubmit(values, action) {
        // console.log(values);
        const { productsList, providersList, create, update, remove } = this.props;
        let validate = true;
        for (let j = 0; j < values.purchaseItens.length; j++) {
            if (values.purchaseItens[j].product === undefined || values.purchaseItens[j].product === []) {
                validate = false;
                toastr.error('Error', 'Por favor selecione um produto');
            } else if (typeof values.purchaseItens[j].product[0] === 'string') {
                for (let i = 0; i < productsList.length; i++) {
                    if (productsList[i]._id === values.purchaseItens[j].product[0]) {
                        values.purchaseItens[j].product[0] = productsList[i];
                    }
                }
            }
            values.purchaseItens[j].quantity = +values.purchaseItens[j].quantity;
        }
        if (values.provider === undefined || values.provider.length === 0) {
            validate = false;
            toastr.error('Error', 'Por favor selecione um fornecedor');
        } else if (typeof values.provider[0] === 'string') {
            for (let i = 0; i < providersList.length; i++) {
                if (providersList[i]._id === values.provider[0]) {
                    values.provider[0] = providersList[i];
                }
            }
        }
        if (typeof values.paymentForm !== 'string') {
            values.paymentForm = values.paymentForm[0];
        }
        if (values.purchaseItens.length === 0) {
            validate = false;
            toastr.error('Error', 'Por adicione um item de compra');
        }
        if (values.product !== undefined) delete values.product;
        if (values.quantity !== undefined) delete values.quantity;
        // console.log(values);
        if (validate) {
            // this.props.date !== '' ? values.date = setDateTime(this.props.date)
            // : values.date = setDateTime(convertStringToDateTime(this.props.dateInit));
            // console.log(values);
            this.props.date !== '' ? values.date = this.props.date
                : values.date = this.props.dateInit;
            const total = this.calculateSummary();
            values.total = total.sumOfTotal;
            if (action === 'Incluir') create(values);
            else if (action === 'Alterar') update(values);
            else if (action === 'Excluir') remove(values);
        }
    }

    calculateSummary() {
        if (this.props.purchaseItens !== undefined && !_.isEmpty(this.props.purchaseItens[0])) {
            const sum = (t, v) => t + v;
            return {
                sumOfTotal: this.props.purchaseItens.map(item => +item.subTotal || 0).reduce(sum)
            };
        }
        return {
            sumOfTotal: 0
        };
    }

    render() {
        const { handleSubmit, readOnly, purchaseItens, providersList, date, dateInit } = this.props;
        const { sumOfTotal } = this.calculateSummary();
        let dateValue = dateInit;
        if (date !== '') dateValue = date;
        // console.log(dateValue);
        return (
            <form onSubmit={handleSubmit(v => this.onSubmit(v, this.props.submitLabel))}>
                <div className='box-body'>
                    {/* <Field
                        name='date' component={LabelAndInput} readOnly={readOnly}
                        label='Data' cols='12 2' placeholder='Informe a data'
                    /> */}
                    <DatePicker
                        startDate={dateValue}
                        name='date' label='Data' cols='12 2'
                        placeholder='Informe a data' idForm='purchase'
                    />
                    <Field
                        cols='12 4'
                        name='paymentForm'
                        component={LabelAndSelectSimple}
                        label='Forma de Pagamento'
                        values={PAYMENTS_FORM}
                        className='form-control'
                        readOnly={this.props.readOnly}
                        hide={false}
                    />
                    <Field
                        cols='12 4'
                        name='provider[0]'
                        component={LabelAndSelect}
                        label='Fornecedor'
                        values={providersList}
                        className='form-control'
                        readOnly={this.props.readOnly}
                        hide={false}
                        type='provider'
                    />
                    <ItemList
                        cols='12 12' list={purchaseItens} readOnly={readOnly}
                        field='purchaseItens' legend='Itens de Compra'
                        update={this.props.updateT} isSale={false}
                    />
                    <Summary legend='Resumo' total={sumOfTotal} count={purchaseItens.length} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={() => this.props.init('purchases', PURCHASE_FORM)}>
                        Cancelar</button>
                </div>
            </form>
        );
    }
}

PurchaseForm = reduxForm({ form: PURCHASE_FORM, destroyOnUnmount: false })(PurchaseForm);
const selector = formValueSelector(PURCHASE_FORM);
const mapStateToProps = state => ({
    purchaseItens: selector(state, 'purchaseItens'),
    providerId: selector(state, 'provider'),
    dateInit: selector(state, 'date'),
    providersList: state.crud.providersList,
    updateT: state.crud.update,
    date: state.crud.datePurchase
});
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove, getList, changeProvider, changeDate },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);
