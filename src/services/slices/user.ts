import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserState } from '@utils-types';
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchGetUser,
  fetchUpdateUser
} from '@actions';

/**
 *  начальное состояние параметров пользователя
 **/
const initialState: IUserState = {
  userData: null,
  isAuth: false,
  isCheck: false,
  isLoading: false,
  isError: false,
  errorMessage: ''
};
/**
 * Slice Пользователь
 **/
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //  authChecked: (state) => {state.isAuth = true;},
  },
  selectors: {
    userData: (state) => state.userData,
    userIsAuth: (state) => state.isAuth,
    userIsCheck: (state) => state.isCheck,
    userIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuth = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message as string;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = true;
        state.userData = null;
        state.isAuth = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuth = true;
        state.isError = false;
        state.errorMessage = '';
      });
  }
});

export const { userData, userIsAuth, userIsCheck, userIsLoading } =
  userSlice.selectors;
//export const { authChecked } = userSlice.actions;
