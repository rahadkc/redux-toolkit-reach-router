const { createSlice } = require("@reduxjs/toolkit");

const { reducer, actions } = createSlice({
  name: 'bug',
  initialState: {
    bugs: [],
  },
  reducers: {
    bugReceived: (state, action) => {
      state.bugs = action.payload.data 
    },
    bugAdd: (state, action) => {
      state.bugs.push(action.payload.data)
    },
    bugRemove: (state, action) => {
      state.bugs.filter(b => b.id !== action.payload)
    },
    bugResolve: (state, action) => {
      const { entities: { api } } = state 
      const bug = api.list.find(b => b.id === action.payload)
      if (bug) {
        bug.resolved = !bug.resolved
      }
    }
  }
})

export const { bugReceived, bugAdd, bugResolve, bugRemove } = actions
export default reducer
