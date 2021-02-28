import { Profile, ProfileAction, State } from '@redux/profile/types';
import { setAccessToken } from '@lib/access-token';

export const initialState: State = {
    data: null,
    error: null,
    loading: false
};

export default function reducer(state: State = initialState, action: ProfileAction): State {
    switch (action.type) {
        case 'USER_SIGNIN_REQUEST':
        case 'USER_SIGNIN_REQUEST':
        case 'GET_PROFILE_REQUEST':
        case 'USER_UPDATE_REQUEST':
        case 'USER_UPDATE_PHOTO_REQUEST':
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'USER_SIGNUP_SUCCESS':
        case 'USER_SIGNIN_SUCCESS':
            setAccessToken(action.data.token.accessToken);
            return {
                ...state,
                data: action.data.profile,
                loading: false
            };
        case 'GET_PROFILE_SUCCESS':
        case 'USER_UPDATE_SUCCESS':
            return {
                ...state,
                data: action.profile,
                loading: false
            };
        case 'USER_UPDATE_PHOTO_SUCCESS':
            return {
                ...state,
                data: {
                    ...state.data,
                    photo: action.photo
                } as Profile,
                loading: false
            };
        case 'USER_SIGNUP_FAIL':
        case 'USER_SIGNIN_FAIL':
        case 'GET_PROFILE_FAIL':
        case 'USER_UPDATE_PHOTO_FAIL':
        case 'USER_UPDATE_FAIL':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}
