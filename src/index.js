import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./redux/configureStore";
import { Provider as Reduxprovider } from "react-redux";
import './index.css';

const store = configureStore(); // here is a good place to init store data - load from database for example

ReactDOM.render(
  <Reduxprovider store={store}>
    <Router>
      {/* <App /> */}
      <Route component={App} />
    </Router>
  </Reduxprovider>,
  document.getElementById('root')
);