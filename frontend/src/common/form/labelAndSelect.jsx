import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeProduct, changeClient } from '../../crud/crudActions';
import If from '../operator/if';
import Grid from '../layout/grid';
import { floatToString } from '../../crud/functions';

class LabelAndSelect extends Component {

    changeValue(e) {
        const { value } = e.target;
        this.props.isPro ? this.props.changeProduct(value) : this.props.changeClient(value);
    }

    render() {
        // if (!this.props.isPro) console.log(this.props);
        const { clientId } = this.props;
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
                        value={this.props.isPro ? this.props.input.value._id : clientId}
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

const mapStateToProps = state => ({ clientId: state.crud.clientId });
const mapDispatchToProps = dispatch => bindActionCreators({ changeProduct, changeClient }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LabelAndSelect);
