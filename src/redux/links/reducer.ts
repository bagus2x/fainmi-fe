import { LinksAction, State } from '@redux/links/types';

export const initialState: State = {
    data: null,
    error: null,
    loading: false
};

export default function reducer(state: State = initialState, action: LinksAction): State {
    switch (action.type) {
        case 'ADD_LINK_REQUEST':
        case 'GET_LINKS_REQUEST':
        case 'UPDATE_LINK_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'DELETE_LINK_REQUEST':
            return {
                ...state,
                data: state.data!.filter((link) => link.linkID != action.linkID)
            };
        case 'UPDATE_LINK_DISPLAY_REQUEST':
            return {
                data: state.data!.map((link) => (link.linkID === action.linkID ? { ...link, display: action.display } : link)),
                loading: true,
                error: null
            };
        case 'UPDATE_LINK_ORDER_REQUEST':
            return {
                data: action.links,
                loading: true,
                error: null
            };
        case 'ADD_LINK_SUCCESS':
            return {
                ...state,
                loading: false,
                data: state.data ? [action.link, ...state.data] : [action.link]
            };
        case 'GET_LINKS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.links
            };
        case 'UPDATE_LINK_ORDER_SUCCESS':
            return {
                ...state,
                loading: false
            };
        case 'DELETE_LINK_SUCCESS':
            return {
                ...state,
                loading: false
            };
        case 'UPDATE_LINK_SUCCESS':
            return {
                ...state,
                loading: false,
                data: state.data!.map((link) => (link.linkID === action.link.linkID ? action.link : link))
            };
        case 'UPDATE_LINK_DISPLAY_SUCCESS':
            return {
                ...state,
                loading: false
            };
        case 'ADD_LINK_FAIL':
        case 'GET_LINKS_FAIL':
        case 'UPDATE_LINK_FAIL':
        case 'DELETE_LINK_FAIL':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'UPDATE_LINK_DISPLAY_FAIL':
            return {
                data: state.data!.map((link) => (link.linkID === action.linkID ? { ...link, display: action.defaultDisplay } : link)),
                loading: false,
                error: action.error
            };
        case 'UPDATE_LINK_ORDER_FAIL':
            return {
                data: action.defaultLinks,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}
