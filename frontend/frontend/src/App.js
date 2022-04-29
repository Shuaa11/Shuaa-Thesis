import React,{useState,useEffect} from 'react'
import { Layout, Menu } from 'antd';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { BsGraphUp , BsCompass } from "react-icons/bs";
import styles from "./styles/Menu.module.css"
import DropDownChartMenu from "./components/DropdownMenu";
import Toolbar from "./components/toolbar";
import ChartsTab from "./components/ChartsTab";
import {
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {Col, Row, Switch} from "antd";
import NewsFeed from "./components/NewsFeed";
import TradeLog from "./components/structure/TradeLog";
import DemoDropDownMenu from "./components/DemoDropDownMenu";
function App() {
        const { pathname } = useLocation();
    const navigate = useNavigate()
    const { Header, Content, Sider } = Layout;
    const [showGraph, setShowGraph]= useState(false)
const handleGraphClick=(e)=>{
    setShowGraph(true)
}
const displayGraph=()=>{
        if (showGraph == true){
            return <Row><Col span={12} offset={12}>
                <DropDownChartMenu></DropDownChartMenu>
            </Col></Row>
        }
    }
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
       {/*<Toolbar  ></Toolbar>*/}
    {/*<App />*/}
    {/*  <Row>*/}
          {/*<Col span={6}>*/}
                  {/*<TradeLog ></TradeLog>*/}

          {/*/!*})}*!/*/}
          {/*</Col>*/}
          {/*<Col span = {12}>*/}
          {/*        <DropDownChartMenu></DropDownChartMenu>*/}

          {/*</Col>*/}
          {/*<Col  span= {6} >*/}
          {/*    <NewsFeed></NewsFeed>*/}
          {/*</Col>*/}
      {/*</Row>*/}

<Layout>


 <Layout className="site-layout" style={{ marginLeft: 100 }}>
<Sider
      width={100}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Menu className={styles.customMenu} theme="dark"   >
        <Menu.Item key="1" icon={<BsGraphUp/>} onClick={()=> navigate('/')} >
            Trade
        </Menu.Item>
        <Menu.Item key="2" icon={<BarChartOutlined />} onClick={()=>navigate('charts')}>
          Charts
        </Menu.Item>
          <Menu.Item key="3" icon={<BsCompass />} onClick={()=>navigate('discover')}>
          Discover
        </Menu.Item>
      </Menu>
    </Sider>
      <Content>
         <Toolbar/>

          <Routes>

            <Route path='/' element={
                   <TradeLog dis={"block"}/>

              }></Route>
              <Route path='charts' element={
                  <Row><Col span={12}> <ChartsTab/></Col></Row>

              }></Route>
               <Route path='discover' element={
                 <NewsFeed/>

              }></Route>


          </Routes>
      </Content>
    </Layout>

</Layout>


</>

}

export default App;

