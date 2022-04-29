import { Menu, Dropdown, Space } from 'antd';
import {DownOutlined, SlidersOutlined} from '@ant-design/icons';
import {VscGraphLine} from "react-icons/vsc";
import React, {useEffect, useState} from "react";
export default function DemoDropDownMenu(){
const [live, setLive] = useState(false)
const handleLiveClick = (e) => {
       e.preventDefault()
        setLive(true)
    };
const menu = (
    <Menu>
        <Menu.Item key="0">
          <a href="" onClick={handleLiveClick} >Switch to Live</a>
        </Menu.Item>
          <Menu.Divider />
        <Menu.Item key="1">
          <a href="" >Trading Options</a>
        </Menu.Item>

      </Menu>
);

return<>
    <Dropdown overlay={menu} trigger={['click']}>
        <a style={{color:"white"}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {live? "LIVE" : "DEMO"}
                    <DownOutlined />

        </a>
  </Dropdown>
</>
}