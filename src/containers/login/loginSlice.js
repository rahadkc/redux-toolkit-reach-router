import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null,
  },
  reducers: {
    loginRequest: state => {
      state.loggingIn = true
    },
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.loggingIn = false
    },
    loginFailure: (state) => {
      state.user = null
      state.loggingIn = false
      state.loginError = {message: "Login Failed"}
    }
  }
})

export const { loginRequest, loginSuccess, loginFailure } = actions
export default reducer