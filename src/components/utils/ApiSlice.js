import { createSlice } from '@reduxjs/toolkit';

// const fetchData = createAsyncThunk(
//   'fetch',
//   async () => {}
// )

const { reducer, actions } = createSlice({
  name: 'apicall',
  initialState: {
    isLoading: false,
    list: [],
    error: {}
  },
  reducers: {
    request: state => {
      state.isLoading = true
    },
    onRequestSuccess: (state, action) => {
      state.isLoading = false
      state.list = action.payload
    },
    onRequestFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { request, onRequestSuccess, onRequestFailure } = actions

export default reducer
