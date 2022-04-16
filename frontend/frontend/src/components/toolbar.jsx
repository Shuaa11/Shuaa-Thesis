import React, {useEffect, useState} from "react";
import PageFrame from "./structure/pageframe";
import {Col, Row,Switch, Button} from "antd";

export default function Toolbar()
{const [day, setDay] = useState("Dec 1, 2021");
    const[refresh, setRefresh] = useState(true)
const [spacy, setSpacy] =useState(true)
    const[tradeType, setTradeType] = useState("SPACY")
const [trade, setTrade] = useState({
    "result": "START",
    "price": 0,
    "usd_balance": 1000,
    "btc_balance": 0,
    "today_date": day
});

const handleReset=(e)=>{
    fetch('http://localhost:5000/resetbalance')
    setDay("Dec 1, 2021")
    setTrade({
        "result": "START",
    "price": 0,
    "usd_balance": 1000,
    "btc_balance": 0,
    "today_date": "Dec 1, 2021"

    })

    localStorage.clear()
    localStorage.setItem("reset","true")

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

        let s = ""
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"date": day})
        }
        fetch('http://localhost:5000/resetbalance')
        var obj = JSON.parse(options.body);
        var myDate = new Date(obj["date"])

        const interval = setInterval(() => {
            if(localStorage.getItem("reset")==="true"){
                options.body = JSON.stringify({"date": day})
                localStorage.setItem("reset","false")
            }else{
            var obj = JSON.parse(options.body);
            var myDate = new Date(obj["date"])
            myDate.setDate(myDate.getDate() + 1);
            obj["date"] = convert_date(myDate)
            options.body = JSON.stringify(obj)
            }



            fetch('http://localhost:5000/predict' + tradeType, options).then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using .json()
                return response.json();
            }).then(function (data) {
                // data is the parsed version of the JSON returned from the above endpoint.
                if (data.info == "") {
                    console.log("the end")
                    var obj = JSON.parse(options.body);
                    var myDate = new Date(obj["date"])
                    setTrade({
                        "result": "End of simulation",
                        "price": 0,
                        "usd_balance": 0,
                        "btc_balance": 0,
                        "today_date": convert_date(myDate)
                    })
                    clearInterval(interval)
                    getPerformance()
                } else {
                    console.log("bulshit")
                    localStorage.setItem("trade",JSON.stringify(data))
                    // setTrade(data)

                }


            });

        }, 5000)

    }
useEffect(()=>{
    setInterval(()=>{
        const name = localStorage.getItem('trade');

    if(name){
        setTrade(JSON.parse(name))
    }else{
        setTrade(trade)
    }
    },5000)


},[])

useEffect(()=>{
    const name = localStorage.getItem('trade');
    if(name){
        setTrade(JSON.parse(name))
    }else{
        setTrade(trade)
    }
},[])



  function getPerformance() {
        fetch('http://localhost:5000/performance').then(function(response) {
            // The response is a Response instance.

            // You parse the data into a useable format using .json()
            return response.json();
          }).then(function(data) {
             console.log(data)
          });
  }

  function convert_date(myDate){
      let d =myDate.toLocaleString('default', { month: 'short' }) +" "+myDate.getDate()+", "+myDate.getFullYear()
        return d;
  }

    return <div style={{backgroundColor:'#596780' ,padding:"15px"}}>
        {/*<Divider orientation="left">sub-element align right</Divider>*/}
            <Row justify="end" >
                <Col style={{color:"white"}} span={3}><button onClick={handleReset}> Reset</button></Col>
                <Col style={{color:"white"}} span={3}><Switch onChange={handleSwitch} checkedChildren="NLP with NLTK" unCheckedChildren="NLP with spaCy" /></Col>
                <Col style={{color:"white"}} span={3}>Today is:</Col>
              <Col style={{color:"white"}} span={3}>Balance in USD:</Col>
              <Col  style={{color:"white"}} span={3}>Bitcoin Balance:</Col>
              <Col style={{color:"white"}} span={3}>Action today:</Col>
                <Col style={{color:"white"}} span={3}>Price of Bitcoin today:</Col>
        </Row>
         <Row justify="end" >
              <Col style={{color:"white"}} span={3}><Button type="primary" onClick={handleTradeClick}>Start Trading</Button></Col>
                <Col style={{color:"white"}} span={3}>{trade.today_date}</Col>
              <Col style={{color:"white"}} span={3}>${Number(trade.usd_balance).toFixed(2) }</Col>
              <Col style={{color:"white"}} span={3}>BTC {Number(trade.btc_balance).toFixed(4)}</Col>
              <Col style={trade.result == "SELL"? {color:"#FF3131", fontWeight:"900"} : {color:"#39FF14", fontWeight:"900"}} span={3}>{trade.result}</Col>
                <Col  style={{color:"white"}} span={3}>${trade.price}</Col>
        </Row>





    </div>
}
//<img src={"header/header_overlay.png"} style ={{width:"100%"}}/>