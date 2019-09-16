import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import DatePicker from '../common/form/labelAndInputPickerDefault';
import { init, create, update, remove } from '../crud/crudActions';
import LabelAndInput from '../common/form/labelAndInput';
import { CLIENT_FORM } from '../main/util/types';

class ClientForm extends Component {

    onSubmit(values, action) {
        const { create, update, remove } = this.props;
        // console.log(values);
        if (this.props.date !== '') {
            const date = new Date(this.props.date);
            values.birthDate = date.toLocaleDateString();
        }
        // console.log(values);
        if (action === 'Incluir') create(values);
        else if (action === 'Alterar') update(values);
        else if (action === 'Excluir') remove(values);
    }

    render() {
        const { handleSubmit, readOnly, date, dateInit } = this.props;
        let dateValue = dateInit;
        if (date !== '') dateValue = date;
        return (
            <form onSubmit={handleSubmit(v => this.onSubmit(v, this.props.submitLabel))}>
                <div className='box-body'>
                    <Field
                        name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome'
                    />
                    <Field
                        name='cpf' component={LabelAndInput} readOnly={readOnly} //type='number'
                        label='CPF' cols='12 4' placeholder='Informe o cpf'
                    />
                    {this.props.submitLabel === 'Excluir' ?
                        <Field
                            name='birthDate' component={LabelAndInput} readOnly={readOnly} //type='number'
                            label='Data de Nascimento' cols='12 4' placeholder='Informe a data de nascimento'
                        /> :
                        <DatePicker
                            startDate={dateValue} name='birthDate' label='Data de Nascimento' cols='12 4'
                            placeholder='Informe a data de nascimento' idForm='client'
                        />}
                    <Field
                        name='email' component={LabelAndInput} readOnly={readOnly}
                        label='E-mail' cols='12 4' placeholder='Informe o e-mail'
                    />
                    <Field
                        name='cellphone' component={LabelAndInput} readOnly={readOnly}//type='number'
                        label='Celular' cols='12 4' placeholder='Informe o celular'
                    />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={() => this.props.init('clients', CLIENT_FORM)}>
                        Cancelar</button>
                </div>
            </form>
        );
    }
}

ClientForm = reduxForm({ form: CLIENT_FORM, destroyOnUnmount: false })(ClientForm);

const selector = formValueSelector(CLIENT_FORM);
const mapStateToProps = state => ({
    dateInit: selector(state, 'birthDate'),
    date: state.crud.birthDateClient
});
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);
