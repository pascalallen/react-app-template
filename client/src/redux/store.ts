import { applyMiddleware, compose } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { configureStore, Action } from '@reduxjs/toolkit';
import storePersist from '@/redux/storePersist';
import rootReducer, { RootState } from '@/redux/rootReducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: storePersist.loadState(),
  // enhancers: composeEnhancers(applyMiddleware(thunk))
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
