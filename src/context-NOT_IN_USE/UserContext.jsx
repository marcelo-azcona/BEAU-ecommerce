import React, { createContext, useState, useEffect, useReducer } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
}); // Creating Context

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

//* REDUCER FUNCTION with the actions and the state modification per action *//
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };

    default:
      throw new Error(`This type is unknown by the app`);
  }
};

export const UserContextProvider = ({ children }) => {
  // Creating the component
  // const [currentUser, setCurrentUser] = useState(null);
  // const value = { currentUser, setCurrentUser };
  /**
   * * useReducer: Que del state van modificar las actions.
   * * setCurrentUser: La action. Que se va a hacer (type) y que se va a actualizar (payload).
   * * dispatch() es para mandar a hacer la action. Es lo que se va a usar a donde sea necesario cambiar el state.
   */
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsuscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsuscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
