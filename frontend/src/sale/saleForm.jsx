import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

import { init, create, update, remove, getList, changeClient, changeDate } from '../crud/crudActions';
import ItemList from './itemList';
import LabelAndSelect from '../common/form/labelAndSelect';
import Summary from './summary';
import { SALE_FORM, CLIENT_FORM } from '../main/util/types';
import { PAYMENTS_FORM } from '../main/util/string';
import labelAndInput from '../common/form/labelAndInput';
import LabelAndSelectSimple from '../common/form/labelAndSelectSimple';
import DatePicker from '../common/form/labelAndInputPicker';
import { convertDateTimeToStringMoment } from '../crud/functions';

class SaleForm extends Component {

    componentWillMount() {
        this.props.getList('clients', CLIENT_FORM);
    }

    componentDidMount() {
        if (this.props.clientId !== undefined) this.props.changeClient(this.props.clientId[0]._id);
        if (this.props.submitLabel === 'Excluir') {
            this.props.changeDate('sale', convertDateTimeToStringMoment(this.props.dateInit), true);
        }
    }

    onSubmit(values, action) {
        // console.log(values);
        const { productsList, clientsList, create, update, remove } = this.props;
        let validate = true;
        for (let j = 0; j < values.saleItens.length; j++) {
            if (values.saleItens[j].product === undefined || values.saleItens[j].product === []) {
                validate = false;
                toastr.warning('Alerta', 'Por favor selecione um produto');
            } else if (typeof values.saleItens[j].product[0] === 'string') {
                for (let i = 0; i < productsList.length; i++) {
                    if (productsList[i]._id === values.saleItens[j].product[0]) {
                        values.saleItens[j].product[0] = productsList[i];
                    }
                }
            }
            values.saleItens[j].quantity = +values.saleItens[j].quantity;
        }
        if (values.client === undefined || values.client.length === 0) {
            validate = false;
            toastr.warning('Alerta', 'Por favor selecione um cliente');
        } else if (typeof values.client[0] === 'string') {
            for (let i = 0; i < clientsList.length; i++) {
                if (clientsList[i]._id === values.client[0]) {
                    values.client[0] = clientsList[i];
                }
            }
        }
        if (typeof values.paymentForm !== 'string') {
            values.paymentForm = values.paymentForm[0];
        }
        if (values.saleItens.length === 0) {
            validate = false;
            toastr.warning('Alerta', 'Por adicione um item de venda');
        }
        if (values.product !== undefined) delete values.product;
        if (values.quantity !== undefined) delete values.quantity;
        if (validate) {
            // const data = new Date();
            // data.toString()
            this.props.date !== '' ? values.date = this.props.date
                : values.date = this.props.dateInit;
            // this.props.date !== '' ? values.date = setDateTime(this.props.date)
            //     : values.date = setDateTime(convertStringToDateTime(this.props.dateInit));
            // console.log(values);
            const total = this.calculateSummary();
            values.total = total.sumOfTotal;
            if (action === 'Incluir') create(values);
            else if (action === 'Alterar') update(values);
            else if (action === 'Excluir') remove(values);
        }
    }

    calculateSummary() {
        // console.log(_.isEmpty({}));
        // console.log(_.isEmpty(this.props.saleItens));
        if (this.props.saleItens !== undefined && !_.isEmpty(this.props.saleItens[0])) {
            const sum = (t, v) => t + v;
            // console.log(this.props.saleItens[0].product[0].salePrice);
            // this.props.saleItens.map(item => console.log(item.product[0].salePrice));
            return {
                sumOfTotal: this.props.saleItens.map(item => +item.subTotal || 0).reduce(sum)
                // sumOfTotal: this.props.saleItens.map(item => +item.product[0].salePrice || 0).reduce(sum)
            };
        }
        return {
            sumOfTotal: 0
        };
    }

    render() {
        const { handleSubmit, readOnly, saleItens, clientsList, date, dateInit } = this.props;
        const { sumOfTotal } = this.calculateSummary();
        let dateValue = dateInit;
        if (date !== '') dateValue = date;
        // console.log(this.field);
        return (
            <form onSubmit={handleSubmit(v => this.onSubmit(v, this.props.submitLabel))}>
                <div className='box-body'>
                    {this.props.submitLabel === 'Excluir' ?
                        <Field
                            name='date' component={labelAndInput} readOnly={readOnly}
                            label='Data' cols='12 2' placeholder='Informe a data'
                        /> :
                        <DatePicker
                            startDate={dateValue} name='date' label='Data' cols='12 2'
                            placeholder='Informe a data' idForm='sale'
                        />}
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
                        name='client[0]'
                        component={LabelAndSelect}
                        // component='select'
                        label='Cliente'
                        values={clientsList}
                        className='form-control'
                        readOnly={this.props.readOnly}
                        hide={false}
                        type='client'
                    />
                    <ItemList
                        cols='12 12' list={saleItens} readOnly={readOnly}
                        field='saleItens' legend='Itens de Venda'
                        update={this.props.updateT} isSale
                    />
                    <Summary legend='Resumo' total={sumOfTotal} count={saleItens.length} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={() => this.props.init('sales', SALE_FORM)}>
                        Cancelar</button>
                </div>
            </form>
        );
    }
}

SaleForm = reduxForm({ form: SALE_FORM, destroyOnUnmount: false })(SaleForm);
const selector = formValueSelector(SALE_FORM);
const mapStateToProps = state => ({
    saleItens: selector(state, 'saleItens'),
    clientId: selector(state, 'client'),
    dateInit: selector(state, 'date'),
    clientsList: state.crud.clientsList,
    updateT: state.crud.update,
    date: state.crud.dateSale
});
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove, getList, changeClient, changeDate },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SaleForm);
