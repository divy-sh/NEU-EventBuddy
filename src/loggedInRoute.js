import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInRoute = ({ component: Component, ...rest }) => {
const userLoggedData = JSON.parse(sessionStorage.getItem("userLoggedData"));
var isAuthenticated = false;
if(userLoggedData != null) {
    isAuthenticated = true;
}
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to={{ pathname: '/admin/all-events', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default LoggedInRoute;