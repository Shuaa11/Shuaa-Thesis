import React, {useEffect, useRef, useState} from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import DemoDropDownMenu from "./DemoDropDownMenu";
import DropDownChartMenu from "./DropdownMenu";
import {Col, Row,Switch, Button} from "antd";
let worker = new Worker('/scripts/worker.js');
let activeListener =false
export default function Toolbar({props,route})

{
const [day, setDay] = useState("Dec 1, 2021");
const[refresh, setRefresh] = useState(true)
const [spacy, setSpacy] =useState(true)
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
    worker.postMessage({ type: 'RESET',ttype: tradeType, payload: {} });
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
        worker.postMessage({ type: 'UPDATE',ttype: tradeType,  payload: {} });




    }
useEffect(()=>{
console.log("procced")
    mounted.current = true;
  const listener = ({ data: { type, payload } }) => {
      console.log(type, payload);
      if (type === 'UPDATE_SUCCESS') {
          console.log("succes update props")
             setTrade(payload)
           worker.postMessage({ type: 'UPDATE', ttype: tradeType, payload: {} });
      }
       if (type === 'RESET_SUCCESS') {
              worker.terminate()
             worker = new Worker('/worker.js',{ type: "module" });

            setReset(false)
      }
    };



  console.log("active listener")
        worker.addEventListener('message', listener);


        worker.postMessage({ type: 'START',ttype: tradeType, payload: {} });


return () => {
            mounted.current = false;
        };
  }, [reset]
)





  function getPerformance() {
        fetch('http://localhost:5000/performance').then(function(response) {
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
                <Col style={{color:"white"}}  xs={3} lg={2}><Button type="primary"  onClick={handleReset} icon={<BsArrowCounterclockwise/>}></Button></Col>
                <Col style={{color:"white"}}  xs={3} lg={2}><Button type="primary"  onClick={handleTradeClick}>Trade</Button></Col>
                <Col style={{color:"white"}}  xs={3} lg={2}><Switch onChange={handleSwitch} checkedChildren="NLTK" unCheckedChildren="spaCy" /></Col>
                <Col style={{color:"white"}} xs={3} lg={2}>Date <span style={{display:"block"}}>{trade.today_date}</span></Col>
              <Col style={{color:"white"}} xs={3} lg={2}>Funds<span style={{display:"block"}}>${Number(trade.usd_balance).toFixed(2) }</span></Col>
              <Col  style={{color:"white"}} xs={3}  lg={2}>Bitcoin Balance<span style={{display:"block"}}>BTC {Number(trade.btc_balance).toFixed(4)}</span></Col>
              <Col style={{color:"white"}} xs={3} lg={2}>Action<span style={{color: trade.result =="SELL" ? "#FF3131" : "#39FF14", fontWeight:"900", display:"block"}}>{trade.result}</span></Col>
                <Col style={{color:"white"}} xs={3} lg={2}>Bitcoin price<span style={{display:"block"}}>${trade.price}</span></Col>
                <Col style={{color:"white"}} xs={3} lg={2}><DemoDropDownMenu/></Col>

        </Row>

    </div>
}
//<img src={"header/header_overlay.png"} style ={{width:"100%"}}/>
function activeListenerExists(){
    return localStorage.getItem("listener") !== null;


}
function setActiveListenerToTrue(){
    localStorage.setItem("listener","true")
}