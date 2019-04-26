import axios from 'axios';

import consts from '../main/util/string';

export function initialCount(url, type) {
    const request = axios.get(`${consts.API_URL}/${url}/count`);
    return {
        type,
        payload: request
    };
}
