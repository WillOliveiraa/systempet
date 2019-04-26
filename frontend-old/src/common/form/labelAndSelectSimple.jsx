import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changePaymentForm } from '../../crud/crudActions';
import If from '../operator/if';
import Grid from '../layout/grid';

class LabelAndSelectSimple extends Component {

    componentWillMount() {
        this.props.changePaymentForm(this.props.input.value);
    }

    changeItem(e) {
        const { value } = e.target;
        this.props.changePaymentForm(value);
    }

    render() {
        // console.log(this.props);
        const { paymentForm } = this.props;
        return (
            <Grid cols={this.props.cols}>
                <div className='form-group'>
                    <If test={!this.props.hide}>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </If>
                    <select {...this.props.input} className='form-control'
                        placeholder={this.props.placeholder}
                        disabled={this.props.readOnly}
                        type={this.props.type}
                        value={paymentForm}
                        onChange={(e) => this.changeItem(e)}
                    >
                        {this.props.values.map((item, i) =>
                            <option key={i} value={item._id}>
                                {item.value}
                            </option>
                        )}
                    </select>
                </div>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({ paymentForm: state.crud.paymentForm });
const mapDispatchToProps = dispatch => bindActionCreators({ changePaymentForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LabelAndSelectSimple);
