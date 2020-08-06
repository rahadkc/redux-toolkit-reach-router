import {createSlice} from '@reduxjs/toolkit';

// const fetchData = createAsyncThunk(
//   'fetch',
//   async () => {}
// )

const { reducer, actions } = createSlice({
  name: 'api',
  initialState: {
    isLoading: false,
    list: null,
    error: null
  },
  reducers: {
    request: state => {
      state.isLoading = true
    },
    requestSuccess: (state, action) => {
      state.isLoading = false
      state.list = action.payload.data
    },
    requestFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    requestEnd: (state) => {
      state.isLoading = false
    }
  }
})

export const { request, requestSuccess, requestFailure, requestEnd } = actions

export default reducer
