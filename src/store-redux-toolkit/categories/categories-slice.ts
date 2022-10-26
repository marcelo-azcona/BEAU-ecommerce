import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { Category } from './categories-types';

type InitialState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: InitialState = {
  categories: [],
  isLoading: false,
  error: null,
};

// createAsyncThunks generate automatic pending, fulfilled and rejected action types
const fetchCategories = createAsyncThunk(
  'categories/fetch_categories',
  async () => {
    const response = await getCategoriesAndDocuments('categories');
    return response;
  }
);

// CREO EL SLICE DEL STORE: ESTADO INICIAL Y QUE SE VA A MODIFICAR CON LAS ACTIONS
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = [];
      state.error = action.error.message;
    });
  },
});

// ESTO VA A CREAR ACTIONS OBJECT AUTOMATICOS con Types automáticos.

export const categoriesActions = categoriesSlice.actions;
export { fetchCategories };
export default categoriesSlice;
