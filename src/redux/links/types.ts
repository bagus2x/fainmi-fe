import { ErrorDetail } from '@redux/common';

export interface Link {
    linkID: number;
    order: number;
    title: string;
    url: string;
    display: boolean;
}

export type Links = Array<Link>;

export interface State {
    data: Links | null;
    error: ErrorDetail | null;
    loading: boolean;
}

export type LinksAction =
    | { type: 'GET_LINKS_REQUEST' }
    | { type: 'GET_LINKS_SUCCESS'; links: Links }
    | { type: 'GET_LINKS_FAIL'; error: ErrorDetail }
    | { type: 'ADD_LINK_REQUEST' }
    | { type: 'ADD_LINK_SUCCESS'; link: Link }
    | { type: 'ADD_LINK_FAIL'; error: ErrorDetail }
    | { type: 'DELETE_LINK_REQUEST' }
    | { type: 'DELETE_LINK_SUCCESS'; linkID: number }
    | { type: 'DELETE_LINK_FAIL'; error: ErrorDetail }
    | { type: 'UPDATE_LINK_REQUEST' }
    | { type: 'UPDATE_LINK_SUCCESS'; link: Link }
    | { type: 'UPDATE_LINK_FAIL'; error: ErrorDetail }
    | { type: 'UPDATE_LINK_DISPLAY_REQUEST'; display: boolean; linkID: number }
    | { type: 'UPDATE_LINK_DISPLAY_SUCCESS' }
    | { type: 'UPDATE_LINK_DISPLAY_FAIL'; error: ErrorDetail; linkID: number; defaultDisplay: boolean }
    | { type: 'UPDATE_LINK_ORDER_REQUEST'; links: Links }
    | { type: 'UPDATE_LINK_ORDER_SUCCESS' }
    | { type: 'UPDATE_LINK_ORDER_FAIL'; error: ErrorDetail; defaultLinks: Links };
