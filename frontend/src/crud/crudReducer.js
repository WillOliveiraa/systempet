import {
    CLIENTS_FETCHED, PRODUCTS_FETCHED, ANIMALS_FETCHED, SALES_FETCHED, CHANGE_PRODUCT_SALES,
    CHANGE_PAYMENT_SALES, CHANGE_CLIENT_SALES, UPDATE_TOTAL_SALES, PURCHASE_FETCHED, PROVIDERS_FETCHED,
    CHANGE_PROVIDER_PURCHASES, CHANGE_DATE_SALES, CHANGE_DATE_PURCHASES, CHANGE_DATE_ANIMAL
} from '../main/util/types';

const INITIAL_STATE = {
    clientsList: [],
    providersList: [],
    productsList: [],
    animalsList: [],
    salesList: [],
    purchasesList: [],
    productId: '',
    clientId: '',
    providerId: '',
    paymentForm: '',
    update: false,
    dateSale: '',
    datePurchase: '',
    dateAnimal: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLIENTS_FETCHED:
            return { ...state, clientsList: action.payload.data };
        case PROVIDERS_FETCHED:
            return { ...state, providersList: action.payload.data };
        case PRODUCTS_FETCHED:
            return { ...state, productsList: action.payload.data };
        case ANIMALS_FETCHED:
            return { ...state, animalsList: action.payload.data };
        case SALES_FETCHED:
            return { ...state, salesList: action.payload.data };
        case PURCHASE_FETCHED:
            return { ...state, purchasesList: action.payload.data };
        case CHANGE_PRODUCT_SALES:
            return { ...state, productId: action.payload };
        case CHANGE_CLIENT_SALES:
            return { ...state, clientId: action.payload };
        case CHANGE_PROVIDER_PURCHASES:
            return { ...state, providerId: action.payload };
        case CHANGE_PAYMENT_SALES:
            return { ...state, paymentForm: action.payload };
        case UPDATE_TOTAL_SALES:
            return { ...state, update: action.payload };
        case CHANGE_DATE_SALES:
            return { ...state, dateSale: action.payload };
        case CHANGE_DATE_PURCHASES:
            return { ...state, datePurchase: action.payload };
        case CHANGE_DATE_ANIMAL:
            return { ...state, dateAnimal: action.payload };
        default:
            return state;
    }
};
