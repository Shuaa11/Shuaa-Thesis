import React, {useEffect, useState} from "react";
export default function NewsFeed(){


const [news, setNews] = useState([])

    useEffect(()=>{
          fetch('http://'+window.location.hostname+':5000/getNews').then(function(response) {

    return response.json();
  }).then(function(data) {
    let numbers =[]
            for (var i =0;i<data.length;i++){
                numbers.push([data[i].Date,data[i].Title,data[i].Link,data[i].Change])
            }
            setNews(numbers)

  });
    },[])
 return <>
     <h2 style={{padding:"6px",borderBottom:"1px solid #9b9e9c", backgroundColor:"#81b7cc",color:"white"}} >Bitcoin News</h2>
         <nav style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"}}>
         <ul style={{height:"550px", overflow:"auto", overflowY:"scroll", listStyleType:"none"}}>
             {news.map((title) =><li style={title[3]=="Positive" ? {borderLeft:"5px solid green", lineHeight:"25px", borderBottom:"1px solid black"} :
                 {borderLeft:"5px solid red", lineHeight:"25px", borderBottom:"1px solid black"}}>
                 <a style={{paddingLeft:"10px",paddingRight:"10px", display:"inline-block"}} target={"_blank"} href={title[2]}>{title[1]}</a>
                 <p style={{paddingLeft:"10px",display:"block", color:"#596780"}}>{title[0]}</p></li>)}
         </ul>
         </nav>

 </>
}