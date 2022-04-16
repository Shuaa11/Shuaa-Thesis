import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import Toolbar from "../toolbar";
import DropDownChartMenu from "../DropdownMenu";
import NewsFeed from "../NewsFeed";
export default function TradeLog(){
const [day, setDay] = useState("April 1, 2022");

const [trade, setTrade] = useState({
    "result": "START",
    "price": 0,
    "usd_balance": 1000,
    "btc_balance": 0,
    "today_date": day
});
const [logs, setLogs] = useState([trade])
useEffect(()=>{
    setInterval(()=>{
          fetch('http://localhost:5000/tradeLog').then(function(response) {
            // The response is a Response instance.

            // You parse the data into a useable format using .json()
            return response.json();
          }).then(function(data) {
             setLogs(data)
          });
    },5500)

},[])

return<>
    <h2 style={{padding:"6px",borderBottom:"1px solid #9b9e9c", backgroundColor:"#81b7cc",color:"white"}} >
         Trade History
     </h2>
  <ul style={{paddingLeft:"0",height:"550px", overflow:"auto", overflowY:"scroll", listStyleType:"none"}}>
      <li style={{borderBottom:"1px solid black"}}>
          <p style={{fontWeight:"700",paddingLeft:"5px",display:"inline"}}>Date</p>
          <p style={{fontWeight:"700",paddingLeft:"40px",display:"inline"}}>Action</p>
          <p style={{fontWeight:"700",paddingLeft:"40px",display:"inline"}}>USD</p>
          <p style={{fontWeight:"700",paddingLeft:"40px",display:"inline"}}>BTC</p>

      </li>
    {
      logs.map(log=>{
          return <li style={{padding:"5px",borderBottom:"1px solid black"}}>
              <p style={{display:"inline"}} >{log.today_date}</p>
              <p style={{paddingLeft:"10px",display:"inline", color:log.result=="SELL" ? "#FF3131" : "#39FF14"}}> {log.result}</p>
              <p style={{paddingLeft:"10px",display:"inline"}} >${Number(log.usd_balance).toFixed(2) }</p>
              <p style={{paddingLeft:"10px",display:"inline"}} >{Number(log.btc_balance).toFixed(3) }</p>

          </li>
      })
    }
  </ul>
</>
}

