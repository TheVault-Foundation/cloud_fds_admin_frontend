import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import reducer from './reducers';
import RootSaga from './sagas/rootSagas';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
  ]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'test') {
  middlewares.push(logger);
}

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);
sagaMiddleware.run(RootSaga);

export { store, persistor };
