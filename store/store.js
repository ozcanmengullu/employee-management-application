import { configureStore } from 'https://cdn.skypack.dev/@reduxjs/toolkit';
import { persistStore, persistReducer } from 'https://cdn.skypack.dev/redux-persist';
import storage from 'https://cdn.skypack.dev/redux-persist/lib/storage';
import employeeReducer from './employeeSlice.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['employeeData']
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
export default store;
