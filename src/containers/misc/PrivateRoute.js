import { Redirect } from '@reach/router';
import React from 'react';


export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (isAuth
    ? <Component {...rest} />
    : <Redirect from="" to="/login" noThrow />)
}

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
)

export default PrivateRoute
