import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

import { init } from '../crud/crudActions';
import LabelAndInput from '../common/form/labelAndInput';
import { CLIENT_FORM } from '../main/util/types';

class ClientForm extends Component {

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
                        name='cpf' component={LabelAndInput} readOnly={readOnly} //type='number'
                        label='CPF' cols='12 4' placeholder='Informe o cpf'
                    />
                    <Field
                        name='birthDate' component={LabelAndInput} readOnly={readOnly} //type='number'
                        label='Data de Nascimento' cols='12 4' placeholder='Informe a data de nascimento'
                    />
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

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);

export default connect(null, mapDispatchToProps)(ClientForm);
