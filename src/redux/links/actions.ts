import { Dispatch } from 'react';
import axios from 'axios';
import { Links, LinksAction } from '@redux/links/types';
import { API } from '@lib/global-var';
import { writeError, Response } from '@redux/common';
import { StoreState } from '@redux/store';

interface GetLinksResponse extends Response {
    data?: {
        linkID: number;
        profileID: number;
        order: number;
        title: string;
        url: string;
        display: boolean;
        createdAt: number;
        updatedAt: number;
    }[];
}

export const getLinks = (accessToken: string) => async (dispatch: Dispatch<LinksAction>) => {
    dispatch({ type: 'GET_LINKS_REQUEST' });

    try {
        const res = await axios.get<GetLinksResponse>(`${API}/api/v1/link`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'GET_LINKS_SUCCESS', links: res.data.data as Links });
    } catch (err) {
        dispatch({ type: 'GET_LINKS_FAIL', error: writeError(err, 'Get profile links error') });
    }
};

interface AddLinkRequest {
    order: number;
    title: string;
    url: string;
    display: boolean;
}

interface AddLinkResponse {
    data: {
        linkID: number;
        order: number;
        title: string;
        url: string;
        display: boolean;
    };
}

export const addLink = (accessToken: string, req: AddLinkRequest) => async (dispatch: Dispatch<LinksAction>) => {
    dispatch({ type: 'ADD_LINK_REQUEST' });

    try {
        const res = await axios.post<AddLinkResponse>(`${API}/api/v1/link`, req, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'ADD_LINK_SUCCESS', link: res.data.data });
    } catch (err) {
        dispatch({ type: 'ADD_LINK_FAIL', error: writeError(err, 'Add new link error') });
    }
};

export interface UpdateLinkRequest {
    order: number;
    title: string;
    url: string;
    display: boolean;
}

export type UpdateLinkResponse = AddLinkResponse;

export const updateLink = (accessToken: string, linkID: number, req: UpdateLinkRequest) => async (dispatch: Dispatch<LinksAction>) => {
    dispatch({ type: 'UPDATE_LINK_REQUEST' });

    try {
        const res = await axios.put<UpdateLinkResponse>(`${API}/api/v1/link/${linkID}`, req, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'UPDATE_LINK_SUCCESS', link: res.data.data });
    } catch (err) {
        dispatch({ type: 'UPDATE_LINK_FAIL', error: writeError(err, 'Update link error') });
    }
};

export interface UpdateDisplayRequest {
    display: boolean;
}

export const updateDisplay = (accessToken: string, linkID: number, req: UpdateDisplayRequest) => async (
    dispatch: Dispatch<LinksAction>,
    getState: () => StoreState
) => {
    const defaultDisplay = getState().links.data?.find((link) => link.linkID === linkID)?.display as boolean;
    if (req.display === defaultDisplay) return;

    dispatch({ type: 'UPDATE_LINK_DISPLAY_REQUEST', display: req.display, linkID });

    try {
        await axios.patch<Response>(`${API}/api/v1/link/display/${linkID}`, req, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'UPDATE_LINK_DISPLAY_SUCCESS' });
    } catch (err) {
        dispatch({ type: 'UPDATE_LINK_DISPLAY_FAIL', error: writeError(err, 'Update link display error'), linkID, defaultDisplay });
    }
};

export interface UpdateLinkOrderRequest {
    linkID: number;
    order: number;
    title: string;
    url: string;
    display: boolean;
}

export const updateOrder = (accessToken: string, req: Array<UpdateLinkOrderRequest>) => async (
    dispatch: Dispatch<LinksAction>,
    getState: () => StoreState
) => {
    const defaultLinks = getState().links.data as Links;
    const mapped = req.map((link) => ({ linkID: link.linkID, order: link.order }));
    if (JSON.stringify(defaultLinks.map((link) => ({ linkID: link.linkID, order: link.order }))) === JSON.stringify(mapped)) return;

    dispatch({ type: 'UPDATE_LINK_ORDER_REQUEST', links: req });

    try {
        await axios.patch(`${API}/api/v1/link/order`, mapped, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        dispatch({ type: 'UPDATE_LINK_ORDER_SUCCESS' });
    } catch (err) {
        dispatch({ type: 'UPDATE_LINK_ORDER_FAIL', error: writeError(err, 'Update links order error'), defaultLinks });
    }
};

export const deleteLink = (accessToken: string, linkID: number) => async (dispatch: Dispatch<LinksAction>) => {
    dispatch({ type: 'DELETE_LINK_REQUEST', linkID });

    try {
        await axios.delete<Response>(`${API}/api/v1/link/${linkID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'DELETE_LINK_SUCCESS' });
    } catch (err) {
        dispatch({ type: 'DELETE_LINK_FAIL', error: writeError(err, 'Delete link error') });
    }
};
