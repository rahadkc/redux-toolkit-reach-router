import loadable from '@loadable/component';
import { Router } from "@reach/router";
import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from '../../components/utils/Loader';
import './App.scss';

const AsyncComponent = loadable(props => import(`../../${props.path}`))
const AsyncPage = loadable(props => import(`../${props.page}`), {
  fallBack: <Loader />
})


class App extends Component {

  render() {
    const { user } = this.props
    const isAuth = true && user;
    
    return (
      <div className="App">
        <AsyncComponent path="components/header/index" />
        <Router>
          <AsyncPage page="home/Home" path="/" />
          <AsyncPage page="counter/Counter" path="counter" />
          <AsyncPage page="login/Login" path="login" />
          <AsyncPage 
            isAuth={isAuth} 
            page="misc/PrivateRoute"
            path="about" 
            component={<AsyncPage page="about/About"/>} 
          />
          <AsyncPage page="misc/NotFound" default />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = undefined
  console.log(auth)
  return {
    user: auth ? auth.user : null
  }
}


export default connect(mapStateToProps)(App)
