import { TAB_SELECTED, TAB_SHOWED } from '../../main/util/types';

export function selectTab(tabId) {
    return {
        type: TAB_SELECTED,
        payload: tabId
    };
}

export function showTabs(...tabIds) { // operador spred || rest (conjunto de ids)
    const tabsToShow = {};
    tabIds.forEach(e => tabsToShow[e] = true);
    return {
        type: TAB_SHOWED,
        payload: tabsToShow
    };
}
