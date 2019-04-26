import { CLIENTS_COUNT, PRODUCTS_COUNT, ANIMALS_COUNT } from '../main/util/types';

const INITIAL_STATE = { dashboard: { client: 0, product: 0, animal: 0 } };

export default function (state = INITIAL_STATE, action) {
    // console.log(action);
    switch (action.type) {
        case CLIENTS_COUNT:
            return {
                ...state,
                dashboard: {
                    client: action.payload.data.value,
                    product: state.dashboard.product,
                    animal: state.dashboard.animal
                }
            };
        case PRODUCTS_COUNT:
            return {
                ...state,
                dashboard: {
                    product: action.payload.data.value,
                    client: state.dashboard.client,
                    animal: state.dashboard.animal
                }
            };
        case ANIMALS_COUNT:
            return {
                ...state,
                dashboard: {
                    animal: action.payload.data.value,
                    client: state.dashboard.client,
                    product: state.dashboard.product
                }
            };
        default:
            return state;
    }
}
