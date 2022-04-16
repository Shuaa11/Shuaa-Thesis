import React from 'react';
import  {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import CandleChart from "./components/CandleChart"
import LineChart from "./components/LineChart";
import PageFrame from "./components/structure/pageframe";
ReactDOM.render(
  <BrowserRouter>

<App></App>
    {/*<Charts></Charts>*/}
    {/*  <PageFrame></PageFrame>*/}

  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

