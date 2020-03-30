import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/userSlice';
import storePersist from '@/redux/storePersist';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: storePersist.loadState(),
  enhancers: composeEnhancers(applyMiddleware(thunk))
});

export default store;
