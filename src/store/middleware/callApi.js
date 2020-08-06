import axios from 'axios'
import {request, requestEnd, requestFailure, requestSuccess} from '../../components/utils/apiSlice'

const { REACT_APP_BASE_URL } = process.env

const apiMiddleware = ({ dispatch }) => next => async action => {

  if (action.type !== request().type) return next(action)
  next(action)
  
  const { 
    base,
    url,
    method='GET',
    data,
    onSuccess,
    onError,
    accessToken,
    headers
  } = action.payload
  
  // const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  // axios default configs
  axios.defaults.baseURL = base ?? REACT_APP_BASE_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  
  try {
    const response = await axios.request({
      url,
      method,
      data,
      headers
    })
    
    if (onSuccess) return dispatch(onSuccess(response))
    dispatch(requestSuccess(response))

  } catch (error) {

    if (error.response && error.response.status === 403) {
      // dispatch(accessDenied(window.location.pathname));
    }

    if (onError) return dispatch(onError(error))
    dispatch(requestFailure(error))
    
  } finally {
    dispatch(requestEnd())
  }
}

export default apiMiddleware