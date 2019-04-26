import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';

import consts from '../main/util/string';
import {
    CLIENTS_FETCHED, CLIENT_FORM, PRODUCT_FORM, ANIMAL_FORM, SALE_FORM, PRODUCTS_FETCHED,
    ANIMALS_FETCHED, SALES_FETCHED, CHANGE_PRODUCT_SALES, CHANGE_PAYMENT_SALES, CHANGE_CLIENT_SALES,
    UPDATE_TOTAL_SALES
} from '../main/util/types';

const INITIAL_VALUES = {};
// const INITIAL_VALUES_SALES = {};
const INITIAL_VALUES_SALES = { saleItens: [], date: getDateToday(), paymentForm: 'a vista' };
// const INITIAL_VALUES_SALES = { saleItens: [{ product: [{}] }] };

export function getList(url, form) {
    const request = axios.get(`${consts.API_URL}/${url}`);
    switch (form) {
        case CLIENT_FORM:
            return {
                type: CLIENTS_FETCHED,
                payload: request
            };
        case PRODUCT_FORM:
            return {
                type: PRODUCTS_FETCHED,
                payload: request
            };
        case ANIMAL_FORM:
            return {
                type: ANIMALS_FETCHED,
                payload: request
            };
        case SALE_FORM:
            return {
                type: SALES_FETCHED,
                payload: request
            };
        default:
            return {};
    }
}

export function create(values) {
    return submit(values, 'post', localStorage.getItem('form'));
}

export function update(values) {
    return submit(values, 'put', localStorage.getItem('form'));
}

export function remove(values) {
    return submit(values, 'delete', localStorage.getItem('form'));
}

function submit(values, method, form) {
    let url = '';
    switch (form) {
        case CLIENT_FORM:
            url = 'clients';
            break;
        case PRODUCT_FORM:
            url = 'products';
            break;
        case ANIMAL_FORM:
            url = 'animals';
            break;
        case SALE_FORM:
            url = 'sales';
            break;
        default:
            url = '';
    }
    return dispatch => {
        const id = values._id ? values._id : '';
        axios[method](`${consts.API_URL}/${url}/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.');
                dispatch(init(url, form));
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error));
            });
        return {
            type: 'TEMP'
        };
    };
}

export function showUpdate(values, form) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize(form, values)
    ];
}

export function showDelete(values, form) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize(form, values)
    ];
}

export function init(url, form) {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(url, form),
        form === SALE_FORM ? initialize(form, INITIAL_VALUES_SALES) :
            initialize(form, INITIAL_VALUES)
    ];
}

export function changeProduct(id) {
    return dispatch => {
        dispatch({ type: CHANGE_PRODUCT_SALES, payload: id });
    };
}

export function changeClient(id) {
    return dispatch => {
        dispatch({ type: CHANGE_CLIENT_SALES, payload: id });
    };
}

export function changePaymentForm(value) {
    // console.log(value);
    return dispatch => {
        dispatch({ type: CHANGE_PAYMENT_SALES, payload: value });
    };
}

export function changeUpdate(value) {
    return dispatch => {
        dispatch({ type: UPDATE_TOTAL_SALES, payload: value });
    };
}

function getDateToday() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}
