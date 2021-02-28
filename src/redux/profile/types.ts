import { ErrorDetail } from '@redux/common';
import { initialState } from './reducer';

export interface Profile {
    profileID: number;
    photo: string;
    username: string;
    email: string;
}

export interface Token {
    accessToken: string;
}

export interface Data {
    profile: Profile;
    token: Token;
}

export interface State {
    data: Profile | null;
    error: ErrorDetail | null;
    loading: boolean;
}

export type ProfileAction =
    | { type: 'USER_SIGNIN_REQUEST' }
    | { type: 'USER_SIGNIN_SUCCESS'; data: Data }
    | { type: 'USER_SIGNIN_FAIL'; error: ErrorDetail }
    | { type: 'USER_SIGNUP_REQUEST' }
    | { type: 'USER_SIGNUP_SUCCESS'; data: Data }
    | { type: 'USER_SIGNUP_FAIL'; error: ErrorDetail }
    | { type: 'GET_PROFILE_REQUEST' }
    | { type: 'GET_PROFILE_SUCCESS'; profile: Profile }
    | { type: 'GET_PROFILE_FAIL'; error: ErrorDetail }
    | { type: 'USER_UPDATE_REQUEST' }
    | { type: 'USER_UPDATE_SUCCESS'; profile: Profile }
    | { type: 'USER_UPDATE_FAIL'; error: ErrorDetail }
    | { type: 'USER_UPDATE_PHOTO_REQUEST' }
    | { type: 'USER_UPDATE_PHOTO_SUCCESS'; photo: string }
    | { type: 'USER_UPDATE_PHOTO_FAIL'; error: ErrorDetail };
