import {request} from "../../components/utils/apiSlice"
import {bugAdd, bugReceived} from "./bugSlice"

// const TODO_BASE = process.env.REACT_APP_EXTRA_URL
const { REACT_APP_EXTRA_URL } = process.env

export const getBugs = () => (
  request({
    url: '/bugs',
    onSuccess: bugReceived
  })
)

export const getBugById = (id) => (
  request({ 
    url: `/bugs/${id}`, 
    onSuccess: bugReceived
  })
)

export const bugRemoveById = (id) => (
  request({ 
    method: 'DELETE',
    url: `/bugs/${id}`, 
    onSuccess: bugReceived
  })
)

export const addBug = (payload) => (
  request({ 
    url: 'bugs',
    method: 'POST',
    data: {
      ...payload
    },
    onSuccess: bugAdd
  })
)

export const getTodos = () => (
  request({
    base: REACT_APP_EXTRA_URL,
    url: '/todos'
  })
)