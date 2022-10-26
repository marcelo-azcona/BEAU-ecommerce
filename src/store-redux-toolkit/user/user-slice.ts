import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
// import { UserData } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

type InitialState = {
  currentUser: User | null;
};

const initialState: InitialState = {
  currentUser: null,
};

// CREO EL SLICE DEL STORE: ESTADO INICIAL Y QUE SE VA A MODIFICAR CON LAS ACTIONS
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
  },
});

// ESTO VA A CREAR ACTIONS OBJECT AUTOMATICOS con Types automáticos.

export const userActions = userSlice.actions;

export default userSlice;
