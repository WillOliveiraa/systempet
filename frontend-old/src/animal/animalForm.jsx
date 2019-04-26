import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

import { init } from '../crud/crudActions';
import LabelAndInput from '../common/form/labelAndInput';
import { ANIMAL_FORM } from '../main/util/types';

class AnimalForm extends Component {

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
                        name='breed' component={LabelAndInput} readOnly={readOnly}
                        label='Raça' cols='12 4' placeholder='Informe a raça'
                    />
                    <Field
                        name='birthDate' component={LabelAndInput} readOnly={readOnly} //type='number'
                        label='Data de Nascimento' cols='12 4' placeholder='Informe a data de nascimento'
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

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);

export default connect(null, mapDispatchToProps)(AnimalForm);
