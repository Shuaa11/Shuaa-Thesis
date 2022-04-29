import React, {useState} from "react";
import CandleChart from "./CandleChart";
import { Menu, Dropdown } from 'antd';
import { DownOutlined , SlidersOutlined} from '@ant-design/icons';

import { VscGraphLine } from "react-icons/vsc";
import LineChart from "./LineChart";


export default function DropDownChartMenu(props){
    const [showCandle, setShowCandle] = useState(true)
    const [showLine, setShowLine] = useState(false)

      const handleCandleClick = (e) => {
       e.preventDefault()
        setShowCandle(true)
          setShowLine(false)
    };
     const handleLineClick = (e) => {
         e.preventDefault()
        setShowCandle(false)
          setShowLine(true)
    };
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href=""  onClick={handleCandleClick}><SlidersOutlined />  Candle Chart</a>
        </Menu.Item>
          <Menu.Divider />
        <Menu.Item key="1">
          <a href="" onClick={handleLineClick} ><VscGraphLine></VscGraphLine>  Line Graph</a>
        </Menu.Item>

      </Menu>
)
    return <>

        <Dropdown overlay={menu} trigger={['click']}>
        <a style={{fontSize:"30px"}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <VscGraphLine></VscGraphLine><DownOutlined />
        </a>
  </Dropdown>
        {showCandle ? <CandleChart name={props.name}></CandleChart> : <LineChart name={props.name}></LineChart>}
        </>
}