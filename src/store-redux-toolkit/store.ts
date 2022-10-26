import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/user-slice';
import categoriesSlice from './categories/categories-slice';
import cartSlice from './cart/cart-slice';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Para que el store de redux persista en localStorage
const persistConfig = {
  key: 'root',
  storage: storage,
};

// Creo un reducer para que se mantenga en localStorage. Le paso la configuración y que slice quiero mantener.
const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

const loggerMiddleware = [
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

// Cuando creo el store, si quiero que tenga persistencia en el local storage lo tengo que pointear acá.
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    categories: categoriesSlice.reducer,
    // cart: cartSlice.reducer,
    cart: persistedReducer,
  },
  //middleware for redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

// exporto lo que quiero que persista
export const persistor = persistStore(store); //Exporto esto y lo tengo que usar en index.js con PersistGate
export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
