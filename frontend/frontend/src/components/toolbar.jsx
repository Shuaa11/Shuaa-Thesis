import React, {useEffect, useState} from "react";
import PageFrame from "./structure/pageframe";
import {Col, Row,Switch} from "antd";

export default function Toolbar()
{const [day, setDay] = useState("Nov 8, 2021");

const [trade, setTrade] = useState({
    "result": "START",
    "price": 0,
    "usd_balance": 1000,
    "btc_balance": 0,
    "today_date": day
});

  useEffect(() => {
        let s = ""
       var options = {
            method: 'POST',
            headers: {
                  'Accept': 'application/json',
                   'Content-Type': 'application/json'
                    },
            body: JSON.stringify({"date":"Nov 8, 2021"})
        }
        fetch('http://localhost:5000/resetbalance')
         var obj = JSON.parse(options.body);
        var myDate = new Date(obj["date"])

            setInterval(()=>{
            var obj = JSON.parse(options.body);
            var myDate = new Date(obj["date"])
           myDate.setDate(myDate.getDate() + 1);
           obj["date"]=convert_date(myDate)
            options.body=JSON.stringify(obj)
            print_trade_action(options)

            },5000)



        },[] );
  function print_trade_action(options) {
      fetch('http://localhost:5000/predict',options).then(function(response) {
    // The response is a Response instance.
    // You parse the data into a useable format using .json()
    return response.json();
  }).then(function(data) {
    // data is the parsed version of the JSON returned from the above endpoint.
          setTrade(data)

          // var obj = JSON.parse(options.body);
          // var myDate = new Date(obj["date"])

          // setDay(convert_date(myDate))

          // console.log(tradeLog)

  });
  }

  function convert_date(myDate){
      let d =myDate.toLocaleString('default', { month: 'short' }) +" "+myDate.getDate()+", "+myDate.getFullYear()
        return d;
  }
    return <div style={{backgroundColor:'#596780' ,padding:"15px"}}>
        {/*<Divider orientation="left">sub-element align right</Divider>*/}
            <Row justify="end" >
                <Col style={{color:"white"}} span={3}>Training model:</Col>
                <Col style={{color:"white"}} span={3}>Today is:</Col>
              <Col style={{color:"white"}} span={3}>Balance in USD:</Col>
              <Col  style={{color:"white"}} span={3}>Bitcoin Balance:</Col>
              <Col style={{color:"white"}} span={3}>Action today:</Col>
                <Col style={{color:"white"}} span={3}>Price of Bitcoin today:</Col>
        </Row>
         <Row justify="end" >
                <Col style={{color:"white"}} span={3}><Switch checkedChildren="NLP with NLTK" unCheckedChildren="NLP with spaCy" /></Col>
                <Col style={{color:"white"}} span={3}>{trade.today_date}</Col>
              <Col style={{color:"white"}} span={3}>${Number(trade.usd_balance).toFixed(2) }</Col>
              <Col style={{color:"white"}} span={3}>BTC {Number(trade.btc_balance).toFixed(4)}</Col>
              <Col style={trade.result == "SELL"? {color:"#FF3131", fontWeight:"900"} : {color:"#39FF14", fontWeight:"900"}} span={3}>{trade.result}</Col>
                <Col  style={{color:"white"}} span={3}>${trade.price}</Col>
        </Row>





    </div>
}
//<img src={"header/header_overlay.png"} style ={{width:"100%"}}/>