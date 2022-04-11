import React,{useState,useEffect} from 'react'
import NewsFeed from "./components/NewsFeed";
import DropDownChartMenu from "./components/DropdownMenu";
import Toolbar from "./components/toolbar";
import TradeLog from "./components/structure/TradeLog";
import {Col, Row, Switch} from "antd";
function App() {
// const [day, setDay] = useState("Nov 8, 2021");
//
// const [trade, setTrade] = useState({
//     "result": "START",
//     "price": 0,
//     "usd_balance": 1000,
//     "btc_balance": 0,
//     "today_date": day
// });
// const [logs, setLogs] = useState([])
// useEffect(()=>{
//     setInterval(()=>{
//           fetch('http://localhost:5000/tradeLog').then(function(response) {
//             // The response is a Response instance.
//
//             // You parse the data into a useable format using .json()
//             return response.json();
//           }).then(function(data) {
//              setTrade(data)
//               logs.unshift(trade)
//
//           });
//     },5000)
//
// },[])
return<>
       <Toolbar  ></Toolbar>
    {/*<App />*/}
      <Row>
          {/*<Col span={6}>*/}
                  <TradeLog ></TradeLog>

          })}
          {/*</Col>*/}
          {/*<Col span = {12}>*/}
          {/*        <DropDownChartMenu></DropDownChartMenu>*/}

          {/*</Col>*/}
          {/*<Col  span= {6} >*/}
          {/*    <NewsFeed></NewsFeed>*/}
          {/*</Col>*/}
      </Row>
</>
}

export default App;

