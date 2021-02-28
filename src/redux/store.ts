import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { MODE } from '@lib/global-var';
import profileReducer, { initialState as profileInitialState } from '@redux/profile/reducer';
import linksReducer, { initialState as linksInitialState } from '@redux/links/reducer';

const middlewares = [thunk];

export type Middlewares = typeof middlewares;

const bindMiddleware = (middleware: Middlewares) => {
    if (MODE !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
    profile: profileReducer,
    links: linksReducer
});

const initialState = {
    profile: profileInitialState,
    links: linksInitialState
};

export type StoreState = typeof initialState;

const reducer = (state: StoreState | undefined = initialState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case 'CLEAR_STATE':
            state = undefined;
        default:
            return combinedReducer(state, action);
    }
};

const makeStore: MakeStore<StoreState> = () => createStore(reducer, bindMiddleware(middlewares));

export const wrapper = createWrapper<StoreState>(makeStore, { debug: true });
