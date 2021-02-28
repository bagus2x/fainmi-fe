import { useCallback } from 'react';
import debounce from 'lodash.debounce';

const useDebounce = (callback: any, delay: number) => {
    return useCallback(debounce(callback, delay), [delay]);
};

export default useDebounce;
