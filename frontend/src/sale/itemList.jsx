import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, formValueSelector, arrayInsert, arrayRemove } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import Row from '../common/layout/row';
import Grid from '../common/layout/grid';
import LabelAndSelect from '../common/form/labelAndSelect';
import Input from '../common/form/input';
import { getList, changeUpdate } from '../crud/crudActions';
import { SALE_FORM, PRODUCT_FORM, PURCHASE_FORM } from '../main/util/types';
import labelAndInput from '../common/form/labelAndInput';
import { stringToFloat, floatToString } from '../crud/functions';

let form;
localStorage.getItem('form') === SALE_FORM ? form = SALE_FORM : form = PURCHASE_FORM;

class ItemList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listReadEdt: [],
            disabledBtn: false
        };
    }

    componentWillMount() {
        this.props.isSale === true ? form = SALE_FORM : form = PURCHASE_FORM;
        this.props.getList('products', PRODUCT_FORM);
        // console.log(this.sunDiscount(500, 35));
        // console.log(this.props.isSale);
    }

    componentDidMount() {
        this.updateRead();
    }

    updateRead(count) {
        const list = [];
        if (count === undefined) count = this.props.list.length;
        for (let i = 0; i < count; i++) {
            const item = { id: i, value: true, icon: 'pencil', disabled: false };
            list.push(item);
        }
        this.setState({ listReadEdt: list });
    }

    add(operation, index = 0, item = {}, isEdit) { // op - true = edt || false = add
        let isOk = true;
        if (!operation) {
            if (this.props.quantity === undefined) {
                toastr.error('Error', 'Por favor informe a quantidade de produto');
                isOk = false;
            } else if (this.props.quantity === '0') {
                toastr.error('Error', 'Por favor informe uma quantidade maior que 0');
                isOk = false;
            }
            if (this.props.productId === '') {
                toastr.error('Error', 'Por favor selecione um produto');
                isOk = false;
            }
        }
        // console.log(this.props);
        // console.log(form);
        if (isOk) {
            this.updateRead(index + 1);
            if (item !== null) {
                if (operation) {
                    const subTotal = this.sunSubTotal(item.quantity, item.product[0].salePrice);
                    item.discount !== undefined ?
                        item.subTotal = this.sunDiscount(subTotal, +item.discount)
                        : item.subTotal = subTotal;
                }
                // console.log(item);
                this.props.arrayInsert(form, this.props.field, index, item);
                if (isEdit) this.props.changeUpdate(true);
            } else {
                for (let i = 0; i < this.props.productsList.length; i++) {
                    if (this.props.productsList[i]._id === this.props.productId) {
                        const subTotal = this.sunSubTotal(+this.props.quantity, this.props.productsList[i].salePrice);
                        const saleItem = {
                            quantity: this.props.quantity,
                            product: [this.props.productsList[i]],
                            discount: this.props.discount !== undefined ? +this.props.discount : 0,
                            subTotal: this.props.discount !== undefined ?
                                this.sunDiscount(subTotal, +this.props.discount) : subTotal
                        };
                        // console.log(saleItem);
                        this.props.arrayInsert(form, this.props.field, index, saleItem);
                    }
                }
            }
        }
    }

    sunSubTotal(quantity, price) {
        return quantity * price;
    }

    sunDiscount(subTotal, discount) {
        return subTotal - ((subTotal * discount) / 100);
    }

    remove(index, isDel) {
        if (this.props.list.length >= 1) {
            // console.log('del');
            if (isDel) {
                const list = this.state.listReadEdt;
                list.splice(index, 1);
                this.setState({ listReadEdt: list });
            }
            this.props.arrayRemove(form, this.props.field, index);
        }
    }

    edit(index, item) {
        const list = this.state.listReadEdt;
        let msgError = true;
        if (!list[index].value) {
            if (+item.quantity === 0) {
                toastr.warning('Error', 'A quantidade não pode ser zero!');
                msgError = false;
            } else if (item.quantity === undefined) {
                toastr.warning('Error', 'Por favor preencha a quantidade');
                msgError = false;
            } else {
                item.quantity = +item.quantity;
                item.discount !== undefined ? item.discount = +item.discount
                    : item.discount = '0';
                this.remove(index, false);
                this.add(true, index, item, true);
                if (item.discount === '0') this.props.changeUpdate(false); // update total
            }
        }
        if (msgError) {
            let disabledBtn = false;
            list[index].value = !list[index].value;
            if (list[index].icon === 'pencil') {
                this.disabledBtns(this.state.listReadEdt, false, index);
                list[index].icon = 'floppy-o';
                disabledBtn = true;
            } else {
                this.disabledBtns(this.state.listReadEdt, true, index);
                this.state.listReadEdt[index].disabled = false;
                list[index].icon = 'pencil';
                disabledBtn = false;
            }
            this.setState({ listReadEdt: list, disabledBtn });
        }
    }

    disabledBtns(list, value, index) {
        for (let i = 0; i < list.length; i++) {
            list[i].id === index ? list[i].disabled = value : list[i].disabled = !value;
        }
    }

    renderRows() {
        const list = this.props.list || [];
        // console.log(list);
        return list.map((item, index) => (
            <tr key={index}>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].product[0].name`}
                        component={Input} readOnly hide cols='12 12'
                    />
                    {/* <Field
                        name={`${this.props.field}[${index}].product[0]`}
                        component={LabelAndSelect}
                        values={proList}
                        // component='select'
                        // cols='12'
                        readOnly={this.props.readOnly}
                        hide
                    /> */}
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].product[0].salePrice`} component={Input}
                        placeholder='Informe o preço de venda' readOnly
                        parse={stringToFloat} format={floatToString}
                        cols='12 12'
                    />
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].quantity`} component={Input}
                        placeholder='Informe a quantidade'
                        //readOnly={this.state.readOnly}
                        readOnly={this.state.listReadEdt.length === list.length ?
                            this.state.listReadEdt[index].value : true}
                        cols='12 12'
                    />
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].discount`} component={Input}
                        placeholder='Percentual do desconto'
                        //parse={stringToFloat} format={floatToString}
                        readOnly={this.state.listReadEdt.length === list.length ?
                            this.state.listReadEdt[index].value : true}
                        cols='12 12'
                    />
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].subTotal`}
                        component={Input} placeholder='Sub Total' readOnly
                        parse={stringToFloat} format={floatToString}
                        cols='12 12'
                    />
                </td>
                <td>
                    <button
                        type='button' className='btn btn-warning'
                        disabled={this.state.listReadEdt.length === list.length ?
                            this.state.listReadEdt[index].disabled : false}
                        onClick={() => this.edit(index, item)}
                    >
                        <i
                            className={this.state.listReadEdt.length === list.length ?
                                `fa fa-${this.state.listReadEdt[index].icon}` : 'fa fa-pencil'}
                        ></i>
                    </button>
                    <button
                        type='button' className='btn btn-success'
                        disabled={this.state.disabledBtn}
                        onClick={() => this.add(true, index + 1, item)}
                    >
                        <i className='fa fa-clone'></i>
                    </button>
                    <button
                        type='button' className='btn btn-danger'
                        disabled={this.state.disabledBtn}
                        onClick={() => this.remove(index, true)}
                    >
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        // console.log(this.props);
        const { productsList } = this.props;
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <Grid cols='12 9'>
                        <Row>
                            <Field
                                cols='12 4' name='product[0]' component={LabelAndSelect}
                                // component='select'
                                label='Produto' values={productsList} className='form-control'
                                readOnly={this.props.readOnly} hide={false} isPro
                            />
                            <Field
                                cols='12 3' component={labelAndInput} name='quantity'
                                label='Quantidade' readOnly={this.props.readOnly}
                                placeholder='Informe a quantidade'
                            />
                            <Field
                                cols='12 3' component={labelAndInput} name='discount'
                                label='% Desconto' readOnly={this.props.readOnly}
                                placeholder='Informe o % desconto do item'
                            />
                            <Grid cols='12 2'>
                                {/* <div style={{ backgroundColor: 'red' }}> */}
                                <button
                                    type='button' className='btn btn-success'
                                    onClick={() => this.add(false, this.props.list.length, null)}
                                >
                                    <i className='fa fa-plus'></i> Adicionar Item
                                </button>
                                {/* </div> */}
                            </Grid>
                        </Row>
                    </Grid>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Preço Venda</th>
                                <th>Quantidade</th>
                                <th>% Desconto</th>
                                <th>Sub Total</th>
                                <th className='table-actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        );
    }
}
const selector = formValueSelector(form);
const mapStateToProps = state => ({
    productsList: state.crud.productsList,
    productId: state.crud.productId,
    quantity: selector(state, 'quantity'),
    discount: selector(state, 'discount')
});
const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, getList, changeUpdate }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
