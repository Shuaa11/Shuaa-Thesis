import React,{useState,useEffect} from 'react'
import { Layout, Menu } from 'antd';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { BsGraphUp , BsCompass } from "react-icons/bs";
import styles from "./styles/Menu.module.css"
import DropDownChartMenu from "./components/DropdownMenu";
import Toolbar from "./components/toolbar";
import ChartsTab from "./components/ChartsTab";
import LiveLineChart from "./components/LiveLineChart";
import {
  BarChartOutlined,

} from '@ant-design/icons';
import {Col, Row, Switch} from "antd";
import NewsFeed from "./components/NewsFeed";
import TradeLog from "./components/structure/TradeLog";
function App() {
    const [tradeData,setTradeData] =useState([])

    const [showCharts,setShowCharts] = useState(false)
    const { Header, Content, Sider } = Layout;
    const [showGraph, setShowGraph]= useState(false)
    const [showDiscover, setDiscover]= useState(false)
    const [showTradeHistory,setShowTrade] = useState(true)
const handleGraphClick=(e)=>{
    setShowGraph(true)
}

const handleTradeClick=()=>{
        setShowTrade(true)
    setDiscover(false)
    setShowCharts(false)
}
const handleDiscoverClick=()=>{
        setDiscover(true)
    setShowCharts(false)
    setShowTrade(false)
}
const handleChartsClick=()=>{
       setShowCharts(true)
    setDiscover(false)
    setShowTrade(false)
}
    useEffect(()=>{
        setInterval(()=>{
         fetch('http://localhost:5000/tradeLog').then(function(response) {
            // The response is a Response instance.

            // You parse the data into a useable format using .json()
            return response.json();
          }).then(function(data) {
              setTradeData(data)

         })
    },5000)
    },[])
return<>


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
        <Menu.Item key="1" icon={<BsGraphUp/>} onClick={handleTradeClick} >
            Trade
        </Menu.Item>
        <Menu.Item key="2" icon={<BarChartOutlined />} onClick={handleChartsClick}>
          Charts
        </Menu.Item>
          <Menu.Item key="3" icon={<BsCompass />} onClick={handleDiscoverClick}>
          Discover
        </Menu.Item>
      </Menu>
    </Sider>
      <Content>
         <Toolbar/>
          {showCharts ? <Row><Col span={12}> <ChartsTab/></Col></Row> : null}
          {showDiscover ? <Row><Col span={12}> <NewsFeed/></Col></Row> : null}
        {showTradeHistory ?
             <Row>
                 <Col span={12}> <TradeLog logs={tradeData}/>
                  </Col>

                  <Col span={12}> <LiveLineChart  logs={tradeData}/> </Col>

                  </Row>
            : null}

      </Content>
    </Layout>

</Layout>


</>

}

export default App;

