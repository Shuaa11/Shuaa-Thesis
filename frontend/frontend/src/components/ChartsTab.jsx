import { Tabs } from 'antd';
import CandleChart from "./CandleChart";
import React from "react";
import DropDownChartMenu from "./DropdownMenu";


const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default () => (
  <Tabs onChange={callback} type="card">
    <TabPane tab="ETH/USD" key="1">
      <DropDownChartMenu name={"etherum"}/>
    </TabPane>
    <TabPane tab="BTC/USD" key="2">
      <DropDownChartMenu name={"bitcoin"}/>
    </TabPane>

  </Tabs>
);