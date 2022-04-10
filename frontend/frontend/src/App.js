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
// const [tradeLog, setTradeLog] = useState([trade])
//
//   useEffect(() => {
//         let s = ""
//        var options = {
//             method: 'POST',
//             headers: {
//                   'Accept': 'application/json',
//                    'Content-Type': 'application/json'
//                     },
//             body: JSON.stringify({"date":"Nov 8, 2021"})
//         }
//          var obj = JSON.parse(options.body);
//         var myDate = new Date(obj["date"])
//
//             setInterval(()=>{
//             var obj = JSON.parse(options.body);
//             var myDate = new Date(obj["date"])
//            myDate.setDate(myDate.getDate() + 1);
//            obj["date"]=convert_date(myDate)
//             options.body=JSON.stringify(obj)
//             print_trade_action(options)
//
//             },5000)
//
//
//
//         },[] );
//   function print_trade_action(options) {
//       fetch('http://localhost:5000/tradeLog').then(function(response) {
//     // The response is a Response instance.
//     // You parse the data into a useable format using .json()
//     return response.json();
//   }).then(function(data) {
//     // data is the parsed version of the JSON returned from the above endpoint.
//     //       setTradeLog(data.his)
//           //using unshift so the trade is added in the beginning to the list to get the proper history order
//           console.log(tradeLog)
//           // var obj = JSON.parse(options.body);
//           // var myDate = new Date(obj["date"])
//
//           // setDay(convert_date(myDate))
//
//           // console.log(tradeLog)
//
//   });
//   }
//
//   function convert_date(myDate){
//       let d =myDate.toLocaleString('default', { month: 'short' }) +" "+myDate.getDate()+", "+myDate.getFullYear()
//         return d;
//   }
return<>
       <Toolbar  ></Toolbar>
    {/*<App />*/}
      <Row>
          <Col span={6}>
                  <TradeLog ></TradeLog>

          </Col>
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

