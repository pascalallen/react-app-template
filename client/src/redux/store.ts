import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import institutionReducer from '@/redux/institution/institutionReducer';
import jobsReducer from '@/redux/jobs/jobsReducer';
import uiReducer from '@/redux/ui/uiReducer';
import userReducer from '@/redux/user/userReducer';
import storePersist from '@/redux/storePersist';

const rootReducer = combineReducers({
  institution: institutionReducer,
  jobs: jobsReducer,
  ui: uiReducer,
  user: userReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storePersist.loadState(), composeEnhancers(applyMiddleware(thunk)));

export default store;
