import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { initialize, change } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';

import consts from '../main/util/string';
import {
    CLIENTS_FETCHED, CLIENT_FORM, PRODUCT_FORM, ANIMAL_FORM, SALE_FORM, PRODUCTS_FETCHED,
    ANIMALS_FETCHED, SALES_FETCHED, CHANGE_PRODUCT_SALES, CHANGE_PAYMENT_SALES, CHANGE_CLIENT_SALES,
    UPDATE_TOTAL_SALES, PURCHASE_FORM, PURCHASE_FETCHED, PROVIDER_FORM, PROVIDERS_FETCHED, CHANGE_PROVIDER_PURCHASES,
    CHANGE_DATE_SALES, CHANGE_DATE_PURCHASES, CHANGE_BIRTHDATE_ANIMAL, CHANGE_BIRTHDATE_CLIENT
} from '../main/util/types';

const INITIAL_VALUES = {};
// const INITIAL_VALUES_SALES = {};
const INITIAL_VALUES_SALES = { saleItens: [], date: new Date(), paymentForm: 'a vista' };
const INITIAL_VALUES_PURCHASE = { purchaseItens: [], date: new Date(), paymentForm: 'a vista' };
const INITIAL_VALUES_ANIMAL = { birthDate: new Date() };
const INITIAL_VALUES_CLIENT = { birthDate: new Date() };
// const INITIAL_VALUES_SALES = { saleItens: [{ product: [{}] }] };

export function getList(url, form) {
    const request = axios.get(`${consts.API_URL}/${url}`);
    switch (form) {
        case CLIENT_FORM:
            return {
                type: CLIENTS_FETCHED,
                payload: request
            };
        case PROVIDER_FORM:
            return {
                type: PROVIDERS_FETCHED,
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
        case PURCHASE_FORM:
            return {
                type: PURCHASE_FETCHED,
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
    // console.log(values);
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
        case PROVIDER_FORM:
            url = 'providers';
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
        case PURCHASE_FORM:
            url = 'purchases';
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
    let values;
    if (form === SALE_FORM) {
        values = INITIAL_VALUES_SALES;
    } else if (form === PURCHASE_FORM) {
        values = INITIAL_VALUES_PURCHASE;
    } else if (form === ANIMAL_FORM) {
        values = INITIAL_VALUES_ANIMAL;
    } else if (form === CLIENT_FORM) {
        values = INITIAL_VALUES_CLIENT;
    } else values = INITIAL_VALUES;
    // console.log(values);
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(url, form),
        initialize(form, values),
        form === PURCHASE_FORM ? changeDate('purchase', '') : changeDate('sale', '')
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

export function changeProvider(id) {
    return dispatch => {
        dispatch({ type: CHANGE_PROVIDER_PURCHASES, payload: id });
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

export function changeDate(key, value, deleted) {
    if (key === 'sale') {
        return dispatch => {
            deleted === true ?
            dispatch(change(SALE_FORM, 'date', value)) :
            dispatch({ type: CHANGE_DATE_SALES, payload: value });
        };
    } else if (key === 'purchase') {
        return dispatch => {
            deleted === true ?
            dispatch(change(PURCHASE_FORM, 'date', value)) :
            dispatch({ type: CHANGE_DATE_PURCHASES, payload: value });
        };
    } else if (key === 'animal') {
        return dispatch => {
            dispatch({ type: CHANGE_BIRTHDATE_ANIMAL, payload: value });
        };
    } else if (key === 'client') {
        return dispatch => {
            dispatch({ type: CHANGE_BIRTHDATE_CLIENT, payload: value });
        };
    }
}
