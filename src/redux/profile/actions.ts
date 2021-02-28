import axios from 'axios';
import { Dispatch } from 'react';
import { API } from '@lib/global-var';
import { Data, ProfileAction } from '@redux/profile/types';
import { writeError, Response } from '@redux/common';
import { AnyAction } from 'redux';

/*Sign In action*/

interface SignInRequest {
    username: string;
    password: string;
}

interface SignInResponse extends Response {
    data?: {
        profile: {
            profileID: number;
            photo: string;
            username: string;
            email: string;
        };
        token: {
            accessToken: string;
        };
    };
}

export const signIn = (req: SignInRequest) => async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({ type: 'USER_SIGNIN_REQUEST' });

    try {
        const res = await axios.post<SignInResponse>(`${API}/api/v1/profile/signin`, req);
        dispatch({ type: 'USER_SIGNIN_SUCCESS', data: res.data.data as Data });
    } catch (err) {
        dispatch({ type: 'USER_SIGNIN_FAIL', error: writeError(err, 'Sign In') });
    }
};

/* Sign Up action*/

interface SignUpRequest {
    email?: string;
    username?: string;
    password?: string;
}

type SignUpResponse = SignInResponse;

export const signUp = (req: SignUpRequest) => async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({ type: 'USER_SIGNUP_REQUEST' });

    try {
        const res = await axios.post<SignUpResponse>(`${API}/api/v1/profile/signup`, req);
        dispatch({ type: 'USER_SIGNUP_SUCCESS', data: res.data.data as Data });
    } catch (err) {
        dispatch({ type: 'USER_SIGNUP_FAIL', error: writeError(err, 'Sign Up error') });
    }
};

/* Get Profile action*/

interface GetProfileResponse extends Response {
    data: {
        profileID: number;
        photo: string;
        username: string;
        email: string;
    };
}

export const getProfile = (accessToken: string) => async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({ type: 'GET_PROFILE_REQUEST' });

    try {
        const res = await axios.get<GetProfileResponse>(`${API}/api/v1/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'GET_PROFILE_SUCCESS', profile: res.data.data });
    } catch (err) {
        dispatch({ type: 'GET_PROFILE_FAIL', error: writeError(err, 'Get profile by access token') });
    }
};

/* Update Profile */

export type UpdateRequest = SignUpRequest;

export type UpdateResponse = GetProfileResponse;

export const updateProfile = (accessToken: string, req: UpdateRequest) => async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({ type: 'USER_UPDATE_REQUEST' });

    try {
        const res = await axios.put<UpdateResponse>(`${API}/api/v1/profile/update`, req, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch({ type: 'USER_UPDATE_SUCCESS', profile: res.data.data });
    } catch (err) {
        dispatch({ type: 'USER_UPDATE_FAIL', error: writeError(err, 'Profile Update') });
    }
};

/* Update photo */

export interface UpdatePhotoResponse {
    data: string;
}

export const updatePhoto = (accessToken: string, req: File) => async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({ type: 'USER_UPDATE_PHOTO_REQUEST' });

    const formData = new FormData();
    formData.append('photo', req);

    try {
        const res = await axios.patch<UpdatePhotoResponse>(`${API}/api/v1/profile/photo`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: 'USER_UPDATE_PHOTO_SUCCESS', photo: res.data.data });
    } catch (err) {
        dispatch({ type: 'USER_UPDATE_PHOTO_FAIL', error: writeError(err, 'Profile photo Update error') });
    }
};

/* Sign Out action */

export const signOut = () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: 'CLEAR_STATE' });
};
