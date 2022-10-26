import React, { createContext, useState, useEffect } from 'react';
// import { addCollectionAndDocument } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../models/shop-data.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

const CategoriesContext = createContext({
  categoriesMap: {},
});

const CategoriesContextProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCatergoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories');

      setCategoriesMap(categoryMap);
    };

    getCatergoriesMap();
  }, []);

  /* To STORE VALUES IN THE FIRESTORE DATABASE - ONLY USE WHEN I WANT TO SENT DATA */
  // useEffect(() => {
  //   addCollectionAndDocument('categories', SHOP_DATA);
  // }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

// export { CategoriesContext, CategoriesContextProvider };
