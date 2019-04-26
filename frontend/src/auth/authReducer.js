import { TOKEN_VALIDATED, USER_FETCHED } from '../main/util/types';

const userKey = '_systempet_user';

const INITIAL_STATE = {
    // localStorage é um obj global que o browser já tem
    user: JSON.parse(localStorage.getItem(userKey)),
    // user: { name: 'Willian Oliveira', email: 'willi.oliveira93@gmail.com' },
    validToken: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOKEN_VALIDATED:
            if (action.payload) {
                return { ...state, validToken: true };
            }
            localStorage.removeItem(userKey);
            return { ...state, validToken: false, user: null };

        case USER_FETCHED:
            localStorage.setItem(userKey, JSON.stringify(action.payload));
            return { ...state, user: action.payload, validToken: true };
        default:
            return state;
    }
};
