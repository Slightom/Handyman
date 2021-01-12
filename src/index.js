import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./redux/configureStore";
import { Provider as Reduxprovider } from "react-redux";

const store = configureStore(); // here is a good place to init store data - load from database for example

ReactDOM.render(
  <Reduxprovider store={store}>
    <Router>
      <App />
    </Router>
  </Reduxprovider>,
  document.getElementById('root')
);