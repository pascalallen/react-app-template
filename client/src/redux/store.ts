import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '@/redux/user/userReducer';
import fundingReducer from '@/redux/fundings/fundingReducer';
import storePersist from '@/redux/storePersist';

const rootReducer = combineReducers({
  user: userReducer,
  fundings: fundingReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storePersist.loadState(), composeEnhancers(applyMiddleware(thunk)));

export default store;
