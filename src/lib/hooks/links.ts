import { State } from '@redux/links/types';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import { getLinks } from '@redux/links/actions';
import { useEffect } from 'react';
import { getAccessToken } from '@lib/access-token';

const useLinks = () => {
    const { data, loading, error } = useSelector<StoreState, State>((state) => state.links);
    const accessToken = getAccessToken();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data) dispatch(getLinks(accessToken as string));
    }, [data]);

    return {
        data,
        loading,
        error
    };
};

export default useLinks;
