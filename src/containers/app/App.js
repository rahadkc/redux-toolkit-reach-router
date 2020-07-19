import { Router } from "@reach/router";
import React, { Component, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import Header from '../../components/header/index';
import { PrivateRoute } from '../misc/PrivateRoute';
// import About from '../about/About';
// import Counter from '../counter/Counter';
// import Home from "../home/Home";
// import Login from "../login/Login";
// import NotFound from "../misc/NotFound";
import './App.scss';

const Home = lazy(() => import('../home/Home'))
const About = lazy(() => import('../about/About'))
const NotFound = lazy(() => import('../misc/NotFound'))
const Counter = lazy(() => import('../counter/Counter'))
const Login = lazy(() => import('../login/Login'))


class App extends Component {

  render() {
    const { user } = this.props
    const isAuth = true && user;
    
    return (
      <div className="App">
        <Header />
        {/* Reach router will throw error if found any component 
        without 'path' props inside 'Router'. So 'Suspense' had 
        to wrap around 'Router' not inside like React-router */}
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Home path="/" />
            <About path="about" />
            <Login path="login" />
            <PrivateRoute isAuth={isAuth} path="counter" component={Counter} />
            <NotFound default />
          </Router>
        </Suspense>
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
