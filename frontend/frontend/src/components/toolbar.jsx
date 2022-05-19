import React, {useEffect, useRef, useState} from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import {Col, Row, Switch, Button, Menu, Dropdown} from "antd";
import {DownOutlined} from "@ant-design/icons";
import axios from 'axios'
let worker = new Worker('/scripts/worker.js');
let activeListener =false
export default function Toolbar({props,route})
{

console.log(window.location.host)
const [live, setLive] = useState(false)
const [demo, setDemo] = useState(true)
const handleLiveClick = (e) => {
       e.preventDefault()
        if(live){
            setLive(false)
            setDemo(true)
        }else{
                    setLive(true)
            setDemo(false)
        }
        handleReset(e);


};

const menu = (
    <Menu>
        <Menu.Item key="0">
          <a href="" onClick={handleLiveClick} >Switch to {live ? "demo":"live"}</a>
        </Menu.Item>
      </Menu>
);


const [day, setDay] = useState("Dec 1, 2021");
const[tradeType, setTradeType] = useState("SPACY")
const[reset, setReset] = useState(false)
const mounted = useRef(false);
const [trade, setTrade] = useState({
    "result": "START",
    "price": 0,
    "usd_balance": 1000,
    "btc_balance": 0,
    "today_date": day
});

const handleReset=(e)=>{
    setDay("Dec 1, 2021")
    setTrade({
        "result": "START",
    "price": 0,
    "usd_balance": 1000,
    "btc_balance": 0,
    "today_date": "Dec 1, 2021"

    })
    worker.postMessage({ type: 'RESET', payload: {ttype: tradeType} });
    setReset(true)


}
const handleSwitch=(e)=>{
    if(e){
        console.log("nltk")
        setTradeType("NLTK")
    }else{
        console.log("spacy")
        setTradeType("SPACY")
    }
}
    const handleTradeClick = (e) => {
        e.preventDefault()
        console.log("d")
        worker.postMessage({ type: 'UPDATE', payload: {ttype: tradeType} });




    }
useEffect(()=>{
console.log("procced")
    mounted.current = true;
  const listener = ({ data: { type, payload } }) => {
      console.log(type, payload);
      if (type === 'UPDATE_SUCCESS') {
          console.log("succes update props")
             setTrade(payload)
           worker.postMessage({ type: 'UPDATE',payload: {ttype: tradeType} });
      }
       if (type === 'RESET_SUCCESS') {
              worker.terminate()
             worker = new Worker('/scripts/worker.js');

            setReset(false)
      }
    };



  console.log("active listener")
            worker.addEventListener('message', listener);


        worker.postMessage({ type: 'START', payload: {ttype: tradeType} });


return () => {
            mounted.current = false;
        };
  }, [reset]
)





  function getPerformance() {
        fetch('http://'+window.location.hostname+':5000/performance').then(function(response) {
            // The response is a Response instance.

            // You parse the data into a useable format using .json()
            return response.json();
          }).then(function(data) {
             console.log(data)
          });
  }



    return <div style={{backgroundColor:'#596780' ,padding:"5px"}}>
        {/*<Divider orientation="left">sub-element align right</Divider>*/}
            <Row justify="end" >
                <Col style={{color:"white"}}  xs={3} lg={2}>Hi I am new here</Col>
                <Col style={{color:"white"}}  xs={3} lg={2}><Button type="primary"  onClick={handleReset} icon={<BsArrowCounterclockwise/>}></Button></Col>
                <Col style={{color:"white"}}  xs={3} lg={2}><Button type="primary"  onClick={handleTradeClick}>Trade</Button></Col>
                <Col style={{color:"white"}}  xs={3} lg={2}><Switch onChange={handleSwitch} checkedChildren="NLTK" unCheckedChildren="spaCy" /></Col>
                <Col style={{color:"white"}} xs={3} lg={2}>Date <span style={{display:"block"}}>{trade.today_date}</span></Col>
              <Col style={{color:"white"}} xs={3} lg={2}>Funds<span style={{display:"block"}}>${Number(trade.usd_balance).toFixed(2) }</span></Col>
              <Col  style={{color:"white"}} xs={3}  lg={2}>Bitcoin Balance<span style={{display:"block"}}>BTC {Number(trade.btc_balance).toFixed(4)}</span></Col>
              <Col style={{color:"white"}} xs={3} lg={2}>Action<span style={{color: trade.result =="SELL" ? "#FF3131" : "#39FF14", fontWeight:"900", display:"block"}}>{trade.result}</span></Col>
                <Col style={{color:"white"}} xs={3} lg={2}>Bitcoin price<span style={{display:"block"}}>${trade.price}</span></Col>
                <Col style={{color:"white"}} xs={3} lg={2}> <Dropdown overlay={menu} trigger={['click']}>
        <a style={{color:"white"}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {live? "LIVE" : "DEMO"}
                    <DownOutlined />

        </a>
  </Dropdown></Col>

        </Row>

    </div>
}
function activeListenerExists(){
    return localStorage.getItem("listener") !== null;


}
function setActiveListenerToTrue(){
    localStorage.setItem("listener","true")
}