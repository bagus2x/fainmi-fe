import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@redux/profile/actions';
import { StoreState } from '@redux/store';
import { State } from '@redux/profile/types';
import { getAccessToken } from '../access-token';

const useProfile = () => {
    const { data, loading, error } = useSelector<StoreState, State>((state) => state.profile);
    const accessToken = getAccessToken();
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken && !data) dispatch(getProfile(accessToken));
    }, [data]);

    return {
        data,
        loading,
        error,
        isAuthenticated: error ? !!accessToken && error.status !== 401 : !!accessToken
    };
};

export default useProfile;
