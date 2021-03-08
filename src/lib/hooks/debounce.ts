import { useCallback } from 'react';
import debounce from 'lodash.debounce';

interface DebounceSettings {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}

const useDebounce = (callback: any, delay: number, settings?: DebounceSettings) => {
    return useCallback(debounce(callback, delay, settings), [delay]);
};

export default useDebounce;
