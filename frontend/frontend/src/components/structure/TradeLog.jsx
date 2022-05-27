import React, {useEffect, useState} from "react";
export default function TradeLog(props){
const [day, setDay] = useState("Dec 1, 2021");


const [logs, setLogs] = useState([])
useEffect(()=>{
    setLogs(props.logs)
},[props.logs])
return<>
    <div style={{display:props.dis}}>
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
        logs.length != 0 ?

      logs.map(log=>{
          return <li style={{padding:"5px",borderBottom:"1px solid black"}}>
              <p style={{display:"inline"}} >{log.today_date}</p>
              <p style={{paddingLeft:"10px",display:"inline", color: log.result==="SELL" ? '#FF4560' : log.result==="BUY"? "green":"#87CEEB"}}> {log.result}</p>
              <p style={{paddingLeft:"10px",display:"inline"}} >${Number(log.usd_balance).toFixed(2) }</p>
              <p style={{paddingLeft:"10px",display:"inline"}} >{Number(log.btc_balance).toFixed(3) }</p>

          </li>
      })
        :
            null
    }
  </ul>
    </div>
</>
}

