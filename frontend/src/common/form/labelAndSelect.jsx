import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeProduct, changeClient, changeProvider } from '../../crud/crudActions';
import If from '../operator/if';
import Grid from '../layout/grid';
import { floatToString } from '../../crud/functions';

class LabelAndSelect extends Component {

    changeValue(e) {
        const { value } = e.target;
        // this.props.isPro ? this.props.changeProduct(value) : this.props.changeClient(value);
        if (this.props.type === 'provider') {
            this.props.changeProvider(value);
        } else if (this.props.type === 'client') {
            this.props.changeClient(value);
        } else this.props.changeProduct(value);
    }

    render() {
        // if (!this.props.isPro) console.log(this.props);
        const { clientId, providerId } = this.props;
        let value;
        if (this.props.type === 'provider') {
            value = providerId;
        } else if (this.props.type === 'client') {
            value = clientId;
        } else value = this.props.input.value._id;
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
                        // value={this.props.isPro ? this.props.input.value._id : clientId}
                        value={value}
                        onChange={(e) => this.changeValue(e)}
                    >
                        <option></option>
                        {this.props.values.map((item, i) =>
                            <option key={i} value={item._id}>
                                {this.props.isPro ? 
                                    `${item.name} - Preço Compra: ${floatToString(item.purchasePrice)} 
                                    - Preço Venda: ${floatToString(item.salePrice)}` : item.name }
                            </option>
                        )}
                    </select>
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ clientId: state.crud.clientId, providerId: state.crud.providerId });
const mapDispatchToProps = dispatch => bindActionCreators({ changeProduct, changeClient, changeProvider }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LabelAndSelect);
