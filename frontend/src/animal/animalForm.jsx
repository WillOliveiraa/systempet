import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import DatePicker from '../common/form/labelAndInputPickerDefault';
import { init, create, update, remove } from '../crud/crudActions';
import LabelAndInput from '../common/form/labelAndInput';
import { ANIMAL_FORM } from '../main/util/types';

class AnimalForm extends Component {

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
                        name='breed' component={LabelAndInput} readOnly={readOnly}
                        label='Raça' cols='12 4' placeholder='Informe a raça'
                    />
                    {/* <Field
                        name='birthDate' component={LabelAndInput} readOnly={readOnly} //type='number'
                        label='Data de Nascimento' cols='12 4' placeholder='Informe a data de nascimento'
                    /> */}
                    <DatePicker
                        startDate={dateValue} name='birthDate' label='Data de Nascimento' cols='12 4'
                        placeholder='Informe a data de nascimento' idForm='animal'
                    />
                    <Field
                        name='color' component={LabelAndInput} readOnly={readOnly}
                        label='Cor' cols='12 4' placeholder='Informe a cor'
                    />
                    <Field
                        name='situation' component={LabelAndInput} readOnly={readOnly}
                        label='Situação' cols='12 4' placeholder='Informe a situação'
                    />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={() => this.props.init('animals', ANIMAL_FORM)}>
                        Cancelar</button>
                </div>
            </form>
        );
    }
}

AnimalForm = reduxForm({ form: ANIMAL_FORM, destroyOnUnmount: false })(AnimalForm);
const selector = formValueSelector(ANIMAL_FORM);
const mapStateToProps = state => ({
    dateInit: selector(state, 'birthDate'),
    date: state.crud.dateAnimal
});
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimalForm);
