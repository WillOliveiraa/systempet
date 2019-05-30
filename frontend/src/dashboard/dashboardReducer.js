import { CLIENTS_COUNT, PRODUCTS_COUNT, ANIMALS_COUNT, SALES_COUNT, PURCHASES_COUNT } from '../main/util/types';

const INITIAL_STATE = { dashboard: { client: 0, product: 0, animal: 0, sale: 0, purchase: 0 } };

export default function (state = INITIAL_STATE, action) {
    // console.log(action);
    switch (action.type) {
        case CLIENTS_COUNT:
            return {
                ...state,
                dashboard: {
                    client: action.payload.data.value,
                    product: state.dashboard.product,
                    animal: state.dashboard.animal,
                    sale: state.dashboard.sale,
                    purchase: state.dashboard.purchase
                }
            };
        case PRODUCTS_COUNT:
            return {
                ...state,
                dashboard: {
                    product: action.payload.data.value,
                    client: state.dashboard.client,
                    animal: state.dashboard.animal,
                    sale: state.dashboard.sale,
                    purchase: state.dashboard.purchase
                }
            };
        case ANIMALS_COUNT:
            return {
                ...state,
                dashboard: {
                    animal: action.payload.data.value,
                    client: state.dashboard.client,
                    product: state.dashboard.product,
                    sale: state.dashboard.sale,
                    purchase: state.dashboard.purchase
                }
            };
        case SALES_COUNT:
            return {
                ...state,
                dashboard: {
                    sale: action.payload.data.value,
                    animal: state.dashboard.animal,
                    client: state.dashboard.client,
                    product: state.dashboard.product,
                    purchase: state.dashboard.purchase
                }
            };
        case PURCHASES_COUNT:
            return {
                ...state,
                dashboard: {
                    purchase: action.payload.data.value,
                    animal: state.dashboard.animal,
                    client: state.dashboard.client,
                    product: state.dashboard.product,
                    sale: state.dashboard.sale
                }
            };
        default:
            return state;
    }
}
